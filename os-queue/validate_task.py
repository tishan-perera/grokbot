#!/usr/bin/env python3
"""Read-only task data checker, NOT an authorization engine or production writer.
Only supports the JSON Schema keywords explicitly checked below; not a general
JSON Schema implementation. No tool calls, execution of text, or network access.
"""
import argparse
from datetime import datetime, timezone
import json
import os
from pathlib import Path
import re
import stat
import sys

MAX_BYTES = 262144
STATES = {'queued','assigned','in_progress','blocked','done','cancelled'}
NEXT = {'queued': {'assigned','cancelled'},
        'assigned': {'in_progress','blocked','cancelled'},
        'in_progress': {'blocked','done','cancelled'},
        'blocked': {'in_progress','cancelled'}, 'done': set(), 'cancelled': set()}
ID = re.compile(r'(TASK|EXAMPLE)-[0-9]{3,}')
DATE = re.compile(r'\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[+-]\d{2}:\d{2})')
class Invalid(ValueError):
    pass

def instant(value):
    if not isinstance(value, str) or not DATE.fullmatch(value):
        raise Invalid('invalid_timestamp')
    try:
        dt = datetime.fromisoformat(value.replace('Z', '+00:00'))
        if dt.utcoffset() is None:
            raise ValueError()
        return dt.astimezone(timezone.utc)
    except (ValueError, OverflowError):
        raise Invalid('invalid_timestamp') from None

def unique_object(pairs):
    out = {}
    for key, val in pairs:
        if key in out:
            raise Invalid('duplicate_json_key')
        out[key] = val
    return out

def read_json(path):
    path = Path(path)
    # Reject symlinks in the supplied path; no recursive filesystem scan.
    if any(p.is_symlink() for p in (path, *path.parents)):
        raise Invalid('symlink_path')
    fd = os.open(path, os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK)
    with os.fdopen(fd, 'rb') as stream:
        if not stat.S_ISREG(os.fstat(stream.fileno()).st_mode):
            raise Invalid('not_regular_file')
        raw = stream.read(MAX_BYTES + 1)
    if len(raw) > MAX_BYTES:
        raise Invalid('file_too_large')
    try:
        return json.loads(raw.decode('utf-8'), object_pairs_hook=unique_object,
                          parse_constant=lambda _: (_ for _ in ()).throw(Invalid('nonfinite_json')))
    except (UnicodeError, json.JSONDecodeError, RecursionError):
        raise Invalid('invalid_json') from None

def shape(value, rule, where='task'):
    types = rule.get('type')
    if isinstance(types, str):
        types = [types]
    if types:
        ok = any((t == 'null' and value is None) or
                 (t == 'object' and type(value) is dict) or
                 (t == 'array' and type(value) is list) or
                 (t == 'string' and type(value) is str) or
                 (t == 'boolean' and type(value) is bool) for t in types)
        if not ok:
            raise Invalid(where + ':type')
    if 'const' in rule and value != rule['const']:
        raise Invalid(where + ':const')
    if 'enum' in rule and value not in rule['enum']:
        raise Invalid(where + ':enum')
    if isinstance(value, str):
        if len(value) < rule.get('minLength', 0) or len(value) > rule.get('maxLength', MAX_BYTES):
            raise Invalid(where + ':length')
        if 'pattern' in rule and not re.fullmatch(rule['pattern'], value):
            raise Invalid(where + ':pattern')
        if rule.get('format') == 'date-time':
            instant(value)
    if isinstance(value, list):
        if len(value) < rule.get('minItems', 0) or len(value) > rule.get('maxItems', 500):
            raise Invalid(where + ':items')
        for item in value:
            shape(item, rule.get('items', {}), where + '[]')
    if isinstance(value, dict):
        if any(k not in value for k in rule.get('required', [])):
            raise Invalid(where + ':required')
        props = rule.get('properties', {})
        if rule.get('additionalProperties') is False and any(k not in props for k in value):
            raise Invalid(where + ':unknown_property')
        for key, child in props.items():
            if key in value:
                shape(value[key], child, where + '.' + key)

def validate(task, filename, schema, now, mode='live', previous=None):
    shape(task, schema)
    if not task['title'].strip() or not task['assignee'].strip():
        raise Invalid('empty_display_label')
    if not ID.fullmatch(task['id']) or filename != task['id'] + '.json':
        raise Invalid('filename_id_mismatch')
    example = task['id'].startswith('EXAMPLE-')
    if bool(task.get('example', False)) != example:
        raise Invalid('example_id_mismatch')
    if (mode == 'live' and example) or (mode == 'example' and not example):
        raise Invalid('example_live_mode_mismatch')
    if example and task['status'] != 'queued':
        raise Invalid('example_must_stay_queued')
    created, updated = instant(task['created_at']), instant(task['updated_at'])
    if created > now or updated > now or updated < created:
        raise Invalid('task_time_order')
    if task.get('due_at') is not None:
        instant(task['due_at'])  # Future due dates are valid; do not reject deadlines.
    state = None
    last_at = created
    for index, event in enumerate(task['history']):
        at = instant(event['at'])
        if at < last_at or at > updated or at > now:
            raise Invalid('history_time_order')
        last_at = at
        action = event['action']
        if not event['by'].strip():
            raise Invalid('empty_history_label')
        if index == 0:
            if action != 'created' or event.get('from') is not None or event.get('to') != 'queued' or at != created:
                raise Invalid('first_history_event')
            state = 'queued'
        elif action in ('note', 'stamped'):
            if event.get('from') not in (None, state) or event.get('to') not in (None, state):
                raise Invalid('informational_event_changes_state')
        else:
            target = event.get('to')
            if event.get('from') != state or target not in NEXT[state]:
                raise Invalid('invalid_status_transition')
            expected = {'assigned':'assigned','blocked':'blocked','unblocked':'in_progress',
                        'done':'done','cancelled':'cancelled'}
            if action not in ('status', *expected) or (action in expected and expected[action] != target):
                raise Invalid('action_status_mismatch')
            if action == 'unblocked' and state != 'blocked':
                raise Invalid('invalid_unblock')
            state = target
    if state != task['status']:
        raise Invalid('history_status_mismatch')
    if previous is not None:
        # A supplied previous file is not authenticated. This checks consistency only.
        validate(previous, filename, schema, now, mode)
        if any(task.get(k) != previous.get(k) for k in set(task) | set(previous)
               if k not in ('status','updated_at','history')):
            raise Invalid('immutable_field_changed')
        n = len(previous['history'])
        if len(task['history']) <= n or task['history'][:n] != previous['history']:
            raise Invalid('history_not_appended')
        if updated < instant(previous['updated_at']):
            raise Invalid('update_time_regressed')
    return True

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('candidate', type=Path)
    parser.add_argument('--previous', type=Path)
    parser.add_argument('--mode', choices=('live','example'), default='live')
    parser.add_argument('--now', help='Explicit-zone test clock; omit for real current time')
    args = parser.parse_args()
    try:
        if not ID.fullmatch(args.candidate.stem) or args.candidate.suffix != '.json':
            raise Invalid('invalid_filename')
        schema = read_json(Path(__file__).with_name('schema.json'))
        task = read_json(args.candidate)
        previous = read_json(args.previous) if args.previous else None
        if args.previous and args.previous.name != args.candidate.name:
            raise Invalid('previous_filename_mismatch')
        now = instant(args.now) if args.now else datetime.now(timezone.utc)
        validate(task, args.candidate.name, schema, now, args.mode, previous)
        print(json.dumps({'data_valid': True, 'authorization_verified': False,
                          'safe_to_execute': False, 'writes_performed': False}))
        return 0
    except (Invalid, OSError, RecursionError, ValueError) as exc:
        # Fixed validation codes only; do not print file paths, contents, values, or OS errors.
        code = str(exc) if isinstance(exc, Invalid) else 'read_or_validation_error'
        print(json.dumps({'data_valid': False, 'error': code, 'authorization_verified': False,
                          'safe_to_execute': False, 'writes_performed': False}))
        return 2
if __name__ == '__main__':
    sys.exit(main())
