// Career Map v4.1 extension — preserves existing localStorage data.
const CAREER_MAP_VERSION='4.1';
const careerMapSeed=[
 {name:'MURC',fullName:'三菱UFJリサーチ&コンサルティング',group:'A',rank:'A1',priority:5,status:'Researching',fit:['Economic Security','Policy Research','Trade / Rules'],workflow:{research:5,scenario:4,response:5,recommend:4},access:'◎ 専門分野別の政策研究採用',themeFit:'◎',notes:'経済安全保障が採用上の専門領域として明示。若手が①〜④をどこまで一貫して担当するか確認。',questions:'案件開始→調査設計→情報・データ収集→分析→政策オプション→顧客説明の実際の流れと、若手の担当範囲は？'},
 {name:'MRI',fullName:'三菱総合研究所',group:'A',rank:'A1',priority:5,status:'Researching',fit:['Economic Security','Supply Chain','Geopolitical Risk'],workflow:{research:5,scenario:5,response:5,recommend:4},access:'○ 研究員・コンサルタント採用／配属要確認',themeFit:'◎',notes:'地政学リスク→SC可視化→影響評価→シミュレーション→対応策が研究関心に近い。',questions:'研究とコンサルの比率、研究背景・本人希望が配属へ反映される程度、学生時の希望と実際の担当の差は？'},
 {name:'JRI',fullName:'日本総合研究所',group:'A',rank:'A2',priority:4,status:'Researching',fit:['Policy Research','Geopolitical Risk','Corporate Strategy'],workflow:{research:4,scenario:3,response:4,recommend:4},access:'○ リサーチ・コンサル部門の新卒採用',themeFit:'○〜◎',notes:'本人のテーマ希望を尊重する配属・キャリア形成が魅力。経済安保案件の実態は追加確認。',questions:'若手が経済安全保障・地政学リスクを継続テーマにできるか？官民案件をどう横断するか？'},
 {name:'NRI',fullName:'野村総合研究所',group:'A',rank:'A2',priority:3,status:'Researching',fit:['Policy Research','Economic Security'],workflow:{research:4,scenario:3,response:4,recommend:4},access:'△〜○ 関連部署への配属確度を要確認',themeFit:'○〜◎',notes:'政策・経済安保業務は存在。新卒から社会システム／経済安保領域へ到達する経路が主要確認点。',questions:'経営・政策系コンサル志望の場合、社会システムや経済安全保障領域への配属に本人希望はどの程度反映されるか？'},
 {name:'Daiwa',fullName:'大和総研',group:'A',rank:'A3',priority:2,status:'Researching',fit:['IPE','International Economy','Policy Analysis'],workflow:{research:5,scenario:3,response:3,recommend:4},access:'○ リサーチコースあり／採用数少',themeFit:'△〜○',notes:'エコノミスト・マクロ分析寄り。安全保障・リスク管理への現在の関心から優先度は低め。',questions:'地政学・経済安全保障を継続的な研究テーマにする余地はどの程度あるか？'},
 {name:'PwC Security',fullName:'PwC 安全保障戦略コンサルタント',group:'B',rank:'B1',priority:5,status:'Researching',fit:['Security Strategy','Economic Security','Consulting'],workflow:{research:4,scenario:5,response:5,recommend:5},access:'◎ 安全保障戦略の新卒職種へ直接応募可能（現行）',themeFit:'◎',notes:'制度上の入口が最も明確。①〜④と⑤実装の実際の比率を確認。',questions:'若手の調査・シナリオ分析・政策／戦略立案・顧客提言の比率は？実装支援はどの程度か？'},
 {name:'EY Risk',fullName:'EY Strategy and Consulting — Risk',group:'B',rank:'B1',priority:5,status:'Researching',fit:['Economic Security','Geopolitical Risk','Supply Chain'],workflow:{research:4,scenario:5,response:5,recommend:5},access:'○ 新卒採用あり／経済安保Riskへの配属要確認',themeFit:'◎',notes:'経済安保・海外紛争・SCリスクから戦略形成まで仕事内容は高Fit。',questions:'新卒から経済安全保障・地政学Risk案件へ入る経路と配属の仕組みは？'},
 {name:'KPMG SRS',fullName:'KPMG Consulting — Strategic Risk Services',group:'B',rank:'B1-2',priority:4,status:'Researching',fit:['Economic Security','Geopolitical Risk','Risk Strategy'],workflow:{research:4,scenario:5,response:5,recommend:5},access:'△〜○ 新卒→SRS→経済安保の入口を要確認',themeFit:'◎',notes:'仕事内容は非常に直接的だが、新卒から専門チームへ入る経路が最大の確認事項。',questions:'新卒採用からSRS／経済安全保障・地政学リスク領域へ配属される具体的経路は？'},
 {name:'Deloitte',fullName:'Deloitte Tohmatsu',group:'B',rank:'B2',priority:3,status:'Researching',fit:['Security','Economic Security','Risk'],workflow:{research:4,scenario:4,response:5,recommend:5},access:'△〜○ 組織・採用ルートを要確認',themeFit:'○〜◎',notes:'安全保障・インテリジェンス・官民連携の仕事はあるが、新卒の入口が他社より見えにくい。',questions:'経済安全保障・安全保障案件を担当する組織と、新卒からそこへ入る採用／配属ルートは？'},
 {name:'NIDS',fullName:'防衛研究所',group:'C',rank:'C1',priority:5,status:'Researching',fit:['Security Studies','Policy Simulation','China / Taiwan'],workflow:{research:5,scenario:5,response:5,recommend:4},access:'○ 修士級研究職／募集分野依存・特殊選考',themeFit:'◎',notes:'Security→Strategy→Policy。政策シミュレーションと安全保障研究が強く、Strategic Studies履修後に再評価。',questions:'若手研究員が政策部門へのブリーフィングや政策シミュレーションにどの程度参加するか？'},
 {name:'IOG',fullName:'地経学研究所（Institute of Geoeconomics）',group:'C',rank:'C1',priority:5,status:'Researching',fit:['Economic Security','Semiconductors','Supply Chain','China / Taiwan'],workflow:{research:5,scenario:4,response:5,recommend:5},access:'○ 現行公募は修士可／ポスト発生型',themeFit:'◎◎',notes:'Geopolitics→Economy/Technology/SC→Policy。テーマFitは全候補でもトップ級。',questions:'修士修了直後の研究員に期待される役割、定量分析の利用、①〜④の担当範囲、成果が政府・企業の意思決定へどう接続するか？'},
 {name:'JIIA',fullName:'日本国際問題研究所',group:'C',rank:'C1-2',priority:4,status:'Researching',fit:['Foreign Policy','Security','Policy Research'],workflow:{research:5,scenario:4,response:4,recommend:5},access:'△〜○ 研究員公募は募集テーマ依存',themeFit:'◎',notes:'外交・安全保障の政策研究Fitは高い。ポストと募集テーマの一致が重要。',questions:'若手研究員の研究テーマ設定、政策担当者への提言機会、修士新卒での採用実績は？'},
 {name:'SPF',fullName:'笹川平和財団',group:'C',rank:'C2',priority:3,status:'To Research',fit:['Security','International Affairs'],workflow:{research:4,scenario:3,response:4,recommend:4},access:'? 採用経路を追加調査',themeFit:'○',notes:'安全保障・国際問題の候補。具体的職種と採用経路を追加調査。',questions:'研究・事業職の新卒／修士採用と、経済安全保障テーマへの関与は？'},
 {name:'IDE-JETRO',fullName:'日本貿易振興機構アジア経済研究所',group:'C',rank:'C2-3',priority:2,status:'To Research',fit:['Area Studies','IPE','Asia'],workflow:{research:5,scenario:2,response:3,recommend:4},access:'? 研究職採用を確認',themeFit:'△〜○',notes:'地域研究・IPE比較用。安全保障・リスク管理中心の現在の関心からは優先度低め。',questions:'経済安全保障や地政学リスクを地域研究と接続する研究機会は？'}
];

function ensureCareerMap(){
 const aliases={'三菱UFJリサーチ&コンサルティング':'MURC','三菱総合研究所':'MRI','日本総合研究所':'JRI','野村総合研究所':'NRI','大和総研':'Daiwa','防衛研究所':'NIDS','地経学研究所':'IOG','日本国際問題研究所':'JIIA'};
 careerMapSeed.forEach(c=>{
   const existing=state.hosts.find(h=>h.name===c.name||h.fullName===c.fullName||aliases[h.name]===c.name||aliases[h.fullName]===c.name);
   if(existing){Object.keys(c).forEach(k=>{if(['name','fullName'].includes(k))return;if(existing[k]===undefined||['group','rank','workflow','access','themeFit','questions'].includes(k))existing[k]=clone(c[k]);});}
   else state.hosts.push({id:uid(),fitScores:{economicSecurity:3,quantitative:3,irMethods:3,japan:3,policy:3,learning:3},links:[],interest:'',learn:'',...clone(c)});
 });
 save();
}

let careerGroupFilter='ALL';
const groupLabel=g=>({A:'A 政策・総合シンクタンク',B:'B 経済安保・安全保障コンサル',C:'C 公的・安全保障研究'}[g]||'Other / ANIP');
const flowDots=h=>{const w=h.workflow||{};return [['①調査',w.research],['②シナリオ',w.scenario],['③対応策',w.response],['④提言',w.recommend]].map(([k,v])=>`<span class="tag">${k} ${v?stars(Math.min(5,Number(v))):'—'}</span>`).join('')};
function setCareerGroup(g){careerGroupFilter=g;renderOrganizations()}

renderOrganizations=function(){
 const groups=['ALL','A','B','C','OTHER'];
 const filtered=state.hosts.filter(h=>careerGroupFilter==='ALL'||(careerGroupFilter==='OTHER'?!['A','B','C'].includes(h.group):h.group===careerGroupFilter));
 filtered.sort((a,b)=>String(a.group||'Z').localeCompare(String(b.group||'Z'))||String(a.rank||'Z').localeCompare(String(b.rank||'Z'))||(b.priority||0)-(a.priority||0));
 document.getElementById('organizations').innerHTML=`<div class="toolbar"><button class="primary-btn" onclick="orgForm()">+ Organization</button><span class="row-sub">Career Map v${CAREER_MAP_VERSION} · 公開情報→社員訪問→本人評価で更新</span></div><div class="subtabs">${groups.map(g=>`<button class="subtab ${careerGroupFilter===g?'active':''}" onclick="setCareerGroup('${g}')">${g==='ALL'?'All':g==='OTHER'?'ANIP / Other':groupLabel(g)}</button>`).join('')}</div><div class="grid grid-2" style="margin-top:14px">${filtered.map(h=>`<div class="card host-card"><div class="host-top"><div><div class="row-sub">${esc(h.rank||groupLabel(h.group))}</div><h3 class="host-name">${esc(h.name)}</h3><div class="row-sub">${esc(h.fullName||'')}</div></div><span class="stars">${stars(h.priority)}</span></div><div class="tags"><span class="tag">${esc(groupLabel(h.group))}</span>${h.themeFit?`<span class="tag">Theme ${esc(h.themeFit)}</span>`:''}${(h.fit||[]).slice(0,4).map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div><div class="host-notes">${esc(h.notes||'')}</div>${h.workflow?`<div class="tags" style="margin-top:10px">${flowDots(h)}</div>`:''}${h.access?`<div class="note-box" style="margin-top:10px"><strong>Recruitment Access</strong><div class="row-sub">${esc(h.access)}</div></div>`:''}<div class="list-row"><span class="badge ${statusClass(h.status)}">${esc(h.status||'')}</span><div class="action-row"><button class="small-btn" onclick="careerOrgDetail('${h.id}')">Career Detail</button><button class="small-btn" onclick="orgForm('${h.id}')">Edit Basic</button></div></div></div>`).join('')||'<div class="empty">No organizations in this group</div>'}</div>`;
}

function careerOrgDetail(id){
 const h=state.hosts.find(x=>x.id===id);if(!h)return;
 const raw=state.organizationNotes[id]||'';
 openModal(`<div class="row-sub">${esc(h.rank||'')} · ${esc(groupLabel(h.group))}</div><h2>${esc(h.name)}</h2><div class="row-sub">${esc(h.fullName||'')}</div><h4>Theme Fit / Priority</h4><div class="note-box">Theme Fit: <strong>${esc(h.themeFit||'—')}</strong> · Priority: <span class="stars">${stars(h.priority)}</span></div><h4>①〜④ Workflow Fit</h4><div class="tags">${flowDots(h)}</div><h4>Public-information assessment</h4><div class="note-box">${esc(h.notes||'')}</div><h4>Recruitment Access</h4><div class="note-box">${esc(h.access||'要確認')}</div><h4>社員・研究員訪問で確認</h4><textarea id="career-question" class="textarea">${esc(h.questions||'')}</textarea><h4>訪問後メモ / Raw Notes</h4><textarea id="career-raw" class="textarea" style="min-height:150px">${esc(raw)}</textarea><div class="form-actions"><button class="primary-btn" onclick="saveCareerDetail('${id}')">Save</button></div>`);
}
function saveCareerDetail(id){const h=state.hosts.find(x=>x.id===id);if(h)h.questions=document.getElementById('career-question').value;state.organizationNotes[id]=document.getElementById('career-raw').value;save();closeModal();renderOrganizations()}

ensureCareerMap();
render();
