// Local-only career research patch importer.
(() => {
 const input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.hidden=true;document.body.append(input);
 const button=document.createElement('button');button.className='ghost-btn';button.textContent='Import Research Update';document.querySelector('.top-actions').append(button);button.onclick=()=>input.click();
 input.onchange=async()=>{try{const f=input.files[0];if(!f)return;const p=JSON.parse(await f.text());if(p.format!=='Career Research Update'||!Array.isArray(p.companies)||!p.strategy||typeof p.strategy!=='string')throw Error('Invalid research update');
 if((state.researchUpdates||[]).includes(p.id)){alert('Already imported');return;}
 if(!confirm('Merge research update into existing local data? Existing notes and tasks will be retained.'))return;
 const next=clone(state);
 for(const c of p.companies){const h=next.hosts.find(h=>h.name===c.name||h.fullName===c.fullName);if(!h)throw Error('Organization not found: '+c.name);h.companyResearch=c;h.priority=c.priority;h.status='Research complete';}
 next.careerStrategy=p.strategy;next.researchUpdates=[...(next.researchUpdates||[]),p.id];
 for(const t of next.tasks)if(t.due==='2026-11-30'&&t.title.includes('主要シンクタンク5社'))t.status='Done';
 for(const c of p.companies)for(const l of c.links||[])if(/^https:\/\//.test(l.url)&&!next.resources.some(r=>r.url===l.url))next.resources.push({id:uid(),title:l.title,url:l.url,type:'Career Knowledge'});
 state=next;render();alert('Research update merged locally');
 }catch(e){alert('Import failed: '+e.message)}finally{input.value=''}};
 const originalDetail=careerOrgDetail;careerOrgDetail=function(id){originalDetail(id);const h=state.hosts.find(h=>h.id===id),c=h?.companyResearch;if(!c)return;const el=document.createElement('div');el.className='detail-section';el.innerHTML='<h4>Company Research · '+esc(c.date)+'</h4><div class="note-box" style="white-space:pre-wrap">'+esc(c.summary)+'</div><h4>Fit / 30</h4>'+['Research Fit','Job Fit','Entry Feasibility','Skill Fit','Career Development','Application Opportunities'].map((n,i)=>'<div class="list-row"><span>'+n+'</span><strong>'+esc(c.scores[i])+'/5</strong></div>').join('')+'<h4>Application Priority</h4><div class="note-box">'+esc(c.tier)+'</div>';document.getElementById('modal-content').append(el);};
 const originalCareer=renderCareer;renderCareer=function(){originalCareer();if(!state.careerStrategy)return;const el=document.createElement('div');el.className='card';el.style.marginTop='16px';el.innerHTML='<h3>Career Strategy</h3><div class="note-box" style="white-space:pre-wrap">'+esc(state.careerStrategy)+'</div>';document.getElementById('career').append(el);};
 const originalOrg=renderOrganizations;renderOrganizations=function(){originalOrg();const rows=state.hosts.filter(h=>h.companyResearch).sort((a,b)=>b.companyResearch.priority-a.companyResearch.priority||b.companyResearch.scores.reduce((x,y)=>x+y,0)-a.companyResearch.scores.reduce((x,y)=>x+y,0));if(!rows.length)return;const el=document.createElement('div');el.className='card';el.style.marginTop='16px';el.innerHTML='<h3>Company Comparison</h3>'+rows.map(h=>'<div class="list-row"><strong>'+esc(h.name)+'</strong><span>'+esc(h.companyResearch.tier)+' · '+h.companyResearch.scores.reduce((a,b)=>a+b,0)+'/30</span></div>').join('');document.getElementById('organizations').append(el);};
 render();
})();