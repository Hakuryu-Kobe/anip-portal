// Master CV: private local data only; included in existing JSON backup.
(() => {
 const base=renderCareer;
 renderCareer=function(){
  base();
  const root=document.getElementById('career');
  const card=document.createElement('div');card.className='card';card.style.marginTop='16px';
  const cv=state.masterCV;
  card.innerHTML='<div class="section-head"><h3>Master CV</h3><span class="row-sub">'+esc(cv?.version||'Not imported')+'</span></div><p class="row-sub">Private working CV · stored in this browser · included in Export JSON</p><div class="toolbar"><button class="small-btn" data-cv-import>Import Master CV</button></div>';
  const input=document.createElement('input');input.type='file';input.accept='.json,application/json';input.hidden=true;card.append(input);
  card.querySelector('[data-cv-import]').onclick=()=>input.click();
  input.onchange=async()=>{try{if(!input.files[0])return;const p=JSON.parse(await input.files[0].text());if(p.format!=='Career Portal Master CV'||typeof p.version!=='string'||!Array.isArray(p.sections)||!p.sections.length||!p.sections.every(s=>typeof s.title==='string'&&typeof s.text==='string'))throw Error('Invalid Master CV file');if(state.masterCV&&!confirm('Replace only the existing Master CV? Other portal data will be retained.'))return;state.masterCV={version:p.version,sections:p.sections};save();renderCareer();}catch(e){alert('Import failed: '+e.message)}finally{input.value=''}};
  if(cv){
   const all=document.createElement('button');all.className='small-btn';all.textContent='Copy application text';card.querySelector('.toolbar').append(all);
   const copy=async t=>{try{await navigator.clipboard.writeText(t);alert('Copied')}catch(e){alert('Copy failed; select and copy the text manually.')}};
   all.onclick=()=>copy(cv.sections.filter(s=>!s.title.startsWith('INTERNAL REVIEW')).map(s=>s.title+'\n'+s.text).join('\n\n'));
   cv.sections.forEach((s,i)=>{const d=document.createElement('details');d.style.marginTop='12px';const title=document.createElement('summary');title.textContent=s.title;d.append(title);const ta=document.createElement('textarea');ta.className='textarea';ta.style.minHeight='180px';ta.value=s.text;d.append(ta);const actions=document.createElement('div');actions.className='form-actions';const b=document.createElement('button');b.className='small-btn';b.textContent='Save section';b.onclick=()=>{state.masterCV.sections[i].text=ta.value;save();alert('Saved locally')};const c=document.createElement('button');c.className='small-btn';c.textContent='Copy section';c.onclick=()=>copy(ta.value);actions.append(c,b);d.append(actions);card.append(d)});
  }
  root.append(card);
 };
 renderCareer();
})();