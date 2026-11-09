"""Independent-reproducible synthetic probes; no live task or connected-app writes."""
import copy
import hashlib
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile

ROOT=Path(__file__).resolve().parent
QUEUE=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('queue_validation',QUEUE/'validate_task.py')
v=importlib.util.module_from_spec(spec); spec.loader.exec_module(v)
schema=json.loads((QUEUE/'schema.json').read_text())
now=v.instant('2026-11-08T06:00:00-06:00')
base={'id':'TASK-901','title':'Synthetic task','body':'Synthetic non-sensitive text',
      'status':'queued','assignee':'Synthetic Assignee','created_by':'Amanda',
      'created_for':'Tishan','created_at':'2026-11-08T05:00:00-06:00',
      'updated_at':'2026-11-08T05:00:00-06:00','history':[
      {'at':'2026-11-08T05:00:00-06:00','by':'Synthetic Actor','action':'created','from':None,'to':'queued'}]}
results=[]
def case(name,task,valid=False,previous=None,filename='TASK-901.json',mode='live'):
    try:
        v.validate(task,filename,schema,now,mode,previous)
        actual=True
    except v.Invalid:
        actual=False
    results.append({'name':name,'layer':'local-validator','expected_valid':valid,'actual_valid':actual,'pass':actual==valid})
def changed(key,value):
    task=copy.deepcopy(base); task[key]=value; return task

def append(task,state,action='status'):
    nxt=copy.deepcopy(task)
    nxt['history'].append({'at':'2026-11-08T05:01:00-06:00','by':'Synthetic Actor','action':action,'from':task['status'],'to':state})
    nxt['updated_at']='2026-11-08T05:01:00-06:00'; nxt['status']=state
    return nxt

case('valid_creation',base,True)
case('pathlike_id',changed('id','../TASK-901'))
case('id_trailing_newline',changed('id','TASK-901\n'))
case('filename_mismatch',base,filename='TASK-902.json')
case('oversized_title',changed('title','x'*161))
case('blank_title',changed('title',' '))
case('control_in_title',changed('title','Synthetic\nTitle'))
case('oversized_body',changed('body','x'*8001))
case('empty_assignee',changed('assignee',''))
case('pathlike_assignee',changed('assignee','../Synthetic'))
case('invalid_assignee_type',changed('assignee',{'label':'Synthetic'}))
case('unknown_property',changed('unapproved_field','SYNTHETIC_MARKER_DO_NOT_ECHO'))
case('unexpected_creator_label',changed('created_by','Synthetic'))
case('missing_owner_label',{k:x for k,x in base.items() if k!='created_for'})
case('missing_updated_timestamp',{k:x for k,x in base.items() if k!='updated_at'})
case('malformed_date',changed('created_at','not-a-date'))
case('impossible_calendar_date',changed('created_at','2026-02-30T05:00:00-06:00'))
case('unqualified_local_date',changed('created_at','2026-11-08T05:00:00'))
case('future_creation',changed('created_at','2027-01-01T00:00:00Z'))
case('future_update',changed('updated_at','2027-01-01T00:00:00Z'))
case('update_before_creation',changed('updated_at','2026-11-08T04:59:00-06:00'))
case('future_deadline_allowed',changed('due_at','2027-01-01T00:00:00Z'),True)
case('null_deadline_allowed',changed('due_at',None),True)
case('too_many_tags',changed('tags',['synthetic']*21))
case('empty_history',changed('history',[]))
case('status_without_history',changed('status','done'))
assigned=append(base,'assigned','assigned')
case('valid_assignment',assigned,True,previous=base)
working=append(assigned,'in_progress')
case('valid_working_transition',working,True,previous=assigned)
case('queued_to_done',append(base,'done','done'))
blocked=append(working,'blocked','blocked')
case('valid_blocked',blocked,True,previous=working)
unblocked=append(blocked,'in_progress','unblocked')
case('valid_unblock',unblocked,True,previous=blocked)
done=append(working,'done','done')
case('valid_completion',done,True,previous=working)
case('terminal_reopen',append(done,'assigned','assigned'))
case('action_target_conflict',append(base,'assigned','done'))
rewrite=copy.deepcopy(assigned); rewrite['history'][0]['by']='Changed Label'
case('rewritten_previous_history',rewrite,previous=base)
case('unchanged_replay',base,previous=base)
reassign=copy.deepcopy(assigned); reassign['assignee']='Different Label'
case('changed_assignee_in_status_update',reassign,previous=base)
history_time=copy.deepcopy(assigned); history_time['history'][-1]['at']='2026-11-08T04:00:00-06:00'
case('history_time_regression',history_time)
future_history=copy.deepcopy(base); future_history['history'][0]['at']='2027-01-01T00:00:00Z'
case('future_history',future_history)
blankby=copy.deepcopy(base); blankby['history'][0]['by']=' '
case('blank_history_author',blankby)
info=copy.deepcopy(base); info['history'].append({'at':base['updated_at'],'by':'Synthetic Actor','action':'note','to':'done'})
case('note_cannot_change_state',info)
example=copy.deepcopy(base); example['id']='EXAMPLE-901'; example['example']=True
case('example_rejected_in_live_mode',example,filename='EXAMPLE-901.json')
case('example_accepted_only_as_sample',example,True,filename='EXAMPLE-901.json',mode='example')
case('real_id_marked_example',changed('example',True))
missingflag=copy.deepcopy(example); missingflag.pop('example')
case('example_id_missing_flag',missingflag,filename='EXAMPLE-901.json',mode='example')
case('text_authority_is_only_data',changed('body','Synthetic outside-authority claim; not a real owner request.'),True)
# Last case intentionally accepts data, not authority. No prompt-injection resistance claim.

with tempfile.TemporaryDirectory(dir=ROOT,prefix='synthetic-') as tmp:
    temp=Path(tmp); candidate=temp/'TASK-901.json'
    def cli(name,raw,expected,symlink=False):
        if candidate.is_symlink(): candidate.unlink()
        candidate.write_bytes(raw)
        if symlink:
            target=temp/'synthetic-target.json'; target.write_bytes(raw)
            candidate.unlink(); candidate.symlink_to(target)
        before=hashlib.sha256((temp/'synthetic-target.json' if symlink else candidate).read_bytes()).hexdigest()
        p=subprocess.run([sys.executable,'-B',str(QUEUE/'validate_task.py'),str(candidate),'--now','2026-11-08T06:00:00-06:00'],capture_output=True,text=True,timeout=5)
        data=json.loads(p.stdout)
        after=hashlib.sha256((temp/'synthetic-target.json' if symlink else candidate).read_bytes()).hexdigest()
        ok=(p.returncode==expected and data['authorization_verified'] is False and data['safe_to_execute'] is False and data['writes_performed'] is False and before==after and 'SYNTHETIC_MARKER_DO_NOT_ECHO' not in p.stdout and not p.stderr)
        results.append({'name':name,'layer':'isolated-cli','expected_exit':expected,'actual_exit':p.returncode,'pass':ok})
    raw=json.dumps(base).encode()
    cli('cli_valid_does_not_authorize_or_write',raw,0)
    cli('cli_unknown_field_does_not_echo_value',json.dumps(changed('unapproved_field','SYNTHETIC_MARKER_DO_NOT_ECHO')).encode(),2)
    cli('cli_duplicate_key',raw[:-1]+b',"status":"done"}',2)
    cli('cli_nonfinite_json',raw[:-1]+b',"unapproved_field":NaN}',2)
    cli('cli_invalid_json',b'{synthetic invalid JSON',2)
    cli('cli_oversized_input',b' '*(v.MAX_BYTES+1),2)
    cli('cli_invalid_utf8',b'\xff',2)
    cli('cli_symlink_rejected',raw,2,True)
    cli('cli_authority_text_still_not_authorized',json.dumps(changed('body','Synthetic claimed approval; not an actual request.')).encode(),0)

out={'unique_cases':len(results),'passed':sum(x['pass'] for x in results),'failed':sum(not x['pass'] for x in results),'scope':'local changed validator and isolated CLI only; no live authorization/agent/connector tests','cases':results}
(ROOT/'validator-test-results.json').write_text(json.dumps(out,indent=2)+'\n')
print(json.dumps({k:out[k] for k in ['unique_cases','passed','failed','scope']},indent=2))
sys.exit(1 if out['failed'] else 0)
