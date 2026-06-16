const KEY="maxcape_state_v5";
let state={cfg:{},plan:null,done:{},log:{},history:[]};
let mem=null;
const LS=(function(){try{localStorage.setItem("__mc_t","1");localStorage.removeItem("__mc_t");return true;}catch(e){return false;}})();
const WS=(typeof window!=="undefined"&&window.storage&&typeof window.storage.get==="function");
async function load(){let raw=null;if(LS){try{raw=localStorage.getItem(KEY);}catch(e){}}if(raw==null&&WS){try{const r=await window.storage.get(KEY);raw=r&&r.value;}catch(e){}}if(raw==null)raw=mem;if(raw){try{state=Object.assign(state,JSON.parse(raw));}catch(e){}}}
function persistNow(){const str=JSON.stringify(state);if(LS){try{localStorage.setItem(KEY,str);return;}catch(e){}}if(WS){try{window.storage.set(KEY,str);return;}catch(e){}}mem=str;}
let st=null;function save(){clearTimeout(st);st=setTimeout(persistNow,250);}
function wipeStore(){if(LS){try{localStorage.removeItem(KEY);}catch(e){}}if(WS){try{window.storage.delete(KEY);}catch(e){}}mem=null;}

function el(t,c,h){const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e;}
function fmt(n){n=Math.round(n);if(n>=1e6)return (n/1e6).toFixed(2).replace(/\.?0+$/,'')+'M';if(n>=1e3)return Math.round(n/1e3)+'K';return ''+n;}
function num(s){if(s==null)return 0;s=(''+s).trim().toLowerCase().replace(/,/g,'').replace(/\s/g,'');if(s==='')return 0;let m=1;if(s.endsWith('m')){m=1e6;s=s.slice(0,-1);}else if(s.endsWith('k')){m=1e3;s=s.slice(0,-1);}const n=parseFloat(s);return isNaN(n)?0:Math.max(0,Math.round(n*m));}
function iconSVG(k,sz){return '<img class="ico-img" src="'+IMG[k]+'" width="'+sz+'" height="'+sz+'" alt="" loading="lazy" decoding="async" onerror="iconFallback(this,&quot;'+k+'&quot;,'+sz+')">';}
function vecSVG(k,sz){return '<svg viewBox="0 0 24 24" width="'+sz+'" height="'+sz+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICONS[k]+'</svg>';}
function iconFallback(img,k,sz){img.outerHTML=vecSVG(k,sz);}
function icoSpan(k,sz){return '<span class="ico" style="color:'+SKILLS[k].color+'">'+iconSVG(k,sz)+'</span>';}
function fmtDate(d){return d.getDate()+" "+MON[d.getMonth()]+" "+String(d.getFullYear()).slice(2);}
function todayMid(){const d=new Date();d.setHours(0,0,0,0);return d;}
function isoDate(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");}
function weeksFromDate(ds){const d=new Date(ds+"T00:00:00");return Math.max(1,Math.floor((d-todayMid())/(7*864e5)));}
function computeHours(){const c=state.cfg;const hours={};let totalHours=0,totalRemXP=0;SCHED.forEach(k=>{const rem=Math.max(0,XP99-num(c.xp[k]));if(rem>0){const r=Math.max(1,num(c.rate[k])||SKILLS[k].rate);hours[k]=rem/r;totalHours+=hours[k];totalRemXP+=rem;}});let combatRem=0;["attack","strength","defence","ranged","magic"].forEach(k=>combatRem+=Math.max(0,XP99-num(c.xp[k])));const slayerRem=Math.max(0,XP99-num(c.xp.slayer));const uncovered=Math.max(0,combatRem-slayerRem*4);let combatNote;if(combatRem<=0)combatNote="All combat skills are already 99.";else if(uncovered<=0)combatNote="Combat (~"+fmt(combatRem)+" XP) rides along with Slayer (~"+fmt(slayerRem*4)+" combat XP from your "+fmt(slayerRem)+" Slayer XP).";else{const eh=uncovered/COMBAT_RATE;if(hours.slayer==null){hours.slayer=0;totalRemXP+=slayerRem;}hours.slayer+=eh;totalHours+=eh;combatNote="Slayer covers most combat; ~"+fmt(uncovered)+" XP needs dedicated combat (NMZ), folded into Slayer (~"+Math.round(eh)+"h).";}return {hours,totalHours,totalRemXP,combatNote};}
function updateSum(th,w,hpw){const e=document.getElementById("liveSum");if(e)e.innerHTML="\u2248 "+Math.round(th)+"h total \u00b7 "+w+" weeks \u00b7 ~"+(Math.round(hpw*10)/10)+"h/week"+(hpw>40?' <span style="color:var(--red)">(heavy \u2014 push the date back)</span>':"");}
function syncFromDate(){const {totalHours}=computeHours();const w=weeksFromDate(state.cfg.date);const hpw=totalHours/w;state.cfg.hpw=Math.round(hpw*10)/10;const hi=document.getElementById("hpwInput");if(hi&&document.activeElement!==hi)hi.value=state.cfg.hpw;updateSum(totalHours,w,hpw);}
function syncFromHpw(val){const hpw=Math.max(1,num(val)||1);const {totalHours}=computeHours();const w=Math.max(1,Math.ceil(totalHours/hpw));const d=new Date(todayMid().getTime()+w*7*864e5);state.cfg.date=isoDate(d);state.cfg.hpw=hpw;const di=document.getElementById("dateInput");if(di&&document.activeElement!==di)di.value=state.cfg.date;updateSum(totalHours,w,hpw);}
async function womFetch(rsn){
  const u=encodeURIComponent(rsn.trim().toLowerCase());const base="https://api.wiseoldman.net/v2/players/"+u;
  let data=null,status=0;
  async function tryJson(url,opt){try{const r=await fetch(url,opt);status=r.status;if(r.ok)return await r.json();}catch(e){}return null;}
  data=await tryJson(base,{method:"POST"});
  if(!data)data=await tryJson(base);
  if(!data)data=await tryJson("https://api.allorigins.win/raw?url="+encodeURIComponent(base));
  if(!data){
    if(status===404)throw new Error("Player not found \u2014 check the exact spelling.");
    throw new Error("Couldn\u2019t reach the hiscores off that RSN. You can also enter XP manually.");
  }
  const snap=data&&data.latestSnapshot&&data.latestSnapshot.data;const sk=snap&&snap.skills;
  if(!sk)throw new Error("No stats found for that name.");return {skills:sk,bosses:snap.bosses||{},activities:snap.activities||{},computed:snap.computed||{},display:data.displayName||rsn};
}
function applyStats(skills){ORDER.forEach(k=>{let s=skills[k];if(!s&&k==="runecraft")s=skills.runecrafting;if(!s||typeof s.experience!=="number")return;state.cfg.xp[k]=s.experience>0?s.experience:0;});}
const BOSSNAME={tztok_jad:"TzTok-Jad",tzkal_zuk:"TzKal-Zuk",kreearra:"Kree'arra",kril_tsutsaroth:"K'ril Tsutsaroth",general_graardor:"General Graardor",commander_zilyana:"Commander Zilyana",chambers_of_xeric:"Chambers of Xeric",chambers_of_xeric_challenge_mode:"CoX: Challenge",theatre_of_blood:"Theatre of Blood",theatre_of_blood_hard_mode:"ToB: Hard",tombs_of_amascut:"Tombs of Amascut",tombs_of_amascut_expert:"ToA: Expert",the_corrupted_gauntlet:"Corrupted Gauntlet",the_gauntlet:"Gauntlet",thermonuclear_smoke_devil:"Thermy",grotesque_guardians:"Grotesque Guardians",the_leviathan:"The Leviathan",the_whisperer:"The Whisperer",vardorvis:"Vardorvis",duke_sucellus:"Duke Sucellus",phantom_muspah:"Phantom Muspah",calvarion:"Calvar'ion",vetion:"Vet'ion",alchemical_hydra:"Alchemical Hydra",king_black_dragon:"King Black Dragon"};
function bossName(k){return BOSSNAME[k]||k.replace(/_/g," ").replace(/\b\w/g,c=>c.toUpperCase());}
function applyPvm(res){const b={},src=res.bosses||{};Object.keys(src).forEach(k=>{const v=src[k];const kills=v&&typeof v.kills==="number"?v.kills:(typeof v==="number"?v:0);if(kills>0)b[k]=kills;});let clog=0;const act=res.activities&&res.activities.collections_logged;if(act&&typeof act.score==="number"&&act.score>0)clog=act.score;let ehb=0;const c=res.computed&&res.computed.ehb;if(c&&typeof c.value==="number"&&c.value>0)ehb=Math.round(c.value);state.cfg.pvm={bosses:b,clog:clog,ehb:ehb,updatedStr:fmtDate(todayMid())};}
function templeUrl(rsn){return "https://templeosrs.com/api/collection-log/player_collection_log.php?player="+encodeURIComponent((rsn||"").trim())+"&categories=all&includenames=1&includemissingitems=1&categoryhours=1";}
function updateTplLink(){const a=document.getElementById("tplLink");if(a)a.href=templeUrl(state.cfg.rsn||"");}
async function templeFetch(rsn){
  const url=templeUrl(rsn);
  async function tryJson(u2,unwrap){try{const r=await fetch(u2);if(!r.ok)return null;const t=await r.text();let s=t;if(unwrap){try{s=JSON.parse(t).contents;}catch(e){return null;}}return JSON.parse(s);}catch(e){return null;}}
  let data=await tryJson(url,false);
  if(!data)data=await tryJson("https://api.allorigins.win/raw?url="+encodeURIComponent(url),false);
  if(!data)data=await tryJson("https://api.allorigins.win/get?url="+encodeURIComponent(url),true);
  if(!data)data=await tryJson("https://corsproxy.io/?url="+encodeURIComponent(url),false);
  if(!data)throw new Error("Couldn’t reach TempleOSRS automatically — use “Paste data manually” below.");
  return data;
}
function doTempleLoad(){
  const ta=document.getElementById("tplPaste"),st=document.getElementById("grindStat");
  let raw;try{raw=JSON.parse((ta&&ta.value)||"");}catch(e){if(st){st.style.color="var(--red)";st.textContent="That isn’t valid JSON — copy the entire response.";}return;}
  const parsed=parseClog(raw);
  if(!parsed||!parsed.cats.length){if(st){st.style.color="var(--red)";st.textContent="Couldn’t read collection log data from that JSON.";}return;}
  parsed.updatedStr=fmtDate(todayMid());state.cfg.clogData=parsed;persistNow();if(state.plan&&!state.plan.empty)renderAll();else renderSetup();
  const slots=parsed.finished!=null?parsed.finished:parsed.cats.reduce((a,c)=>a+c.got,0);
  if(st){st.style.color="var(--green)";st.textContent="✓ Loaded "+slots+(parsed.available?" / "+parsed.available:"")+" slots — "+parsed.cats.filter(c=>c.left>0).length+" grinds below.";}
}
function clogItName(it){if(it==null)return null;if(typeof it==="object")return it.name||(it.id!=null?"#"+it.id:null);return "#"+it;}
function clogItGot(it){if(it&&typeof it==="object"){if(typeof it.count==="number")return it.count>0;if("obtained" in it)return !!it.obtained;}return true;}
function clogNum(x){const n=Number(x);return isFinite(n)?n:null;}
const SKILL2CATS={firemaking:["wintertodt"],fishing:["tempoross","aerial_fishing","fishing_trawler"],runecraft:["guardians_of_the_rift"],agility:["hallowed_sepulchre","rooftop_agility","brimhaven_agility_arena","colossal_wyrm_agility"],mining:["motherlode_mine","volcanic_mine","camdozaal","shooting_stars"],smithing:["giants_foundry"],construction:["mahogany_homes"],farming:["tithe_farm","hespori"],woodcutting:["forestry","temple_trekking"],herblore:["mastering_mixology"],thieving:["rogues_den"],hunter:["hunter_guild","chompy_bird_hunting","monkey_backpacks"],cooking:["gnome_restaurant"],fletching:["vale_totems"],slayer:["slayer"],sailing:["barracuda_trials","sailing_miscellaneous","ocean_encounters","sea_treasures","lost_schematics","boat_paints"]};
function clogSkillData(k){const cd=state.cfg.clogData;if(!cd||!cd.cats)return null;const keys=SKILL2CATS[k];if(!keys)return null;const byKey={};cd.cats.forEach(c=>byKey[c.key]=c);const gotSet={},all={};let found=false;keys.forEach(kk=>{const c=byKey[kk];if(!c)return;found=true;(c.gotNames||[]).forEach(n=>{gotSet[n]=1;all[n]=1;});(c.missing||[]).forEach(n=>{all[n]=1;});});if(!found)return null;const missing=Object.keys(all).filter(n=>!gotSet[n]);const total=Object.keys(all).length;if(!total)return null;return {got:total-missing.length,total:total,missing:missing,obtained:Object.keys(gotSet)};}
function parseClog(resp){
  const d=resp&&resp.data&&typeof resp.data==="object"?resp.data:resp;
  if(!d||typeof d!=="object")return null;
  const deny={all_pets:1,skilling_pets:1};
  const out={finished:clogNum(d.total_collections_finished),available:clogNum(d.total_collections_available),catsDone:clogNum(d.total_categories_finished),catsTotal:clogNum(d.total_categories_available),buckets:(d.category_hours&&typeof d.category_hours==="object")?d.category_hours:null,cats:[]};
  const cont=(d.items&&typeof d.items==="object")?d.items:(d.categories&&typeof d.categories==="object"?d.categories:null);
  if(!cont)return out;
  Object.keys(cont).forEach(key=>{
    if(deny[key])return;
    const v=cont[key];let arr=null;
    if(Array.isArray(v))arr=v;else if(v&&typeof v==="object"&&Array.isArray(v.items))arr=v.items;
    if(!arr||!arr.length)return;
    let got=0;const miss=[],gotNames=[];
    arr.forEach(it=>{const c=(it&&typeof it.count==="number")?it.count:(clogItGot(it)?1:0);const nm=clogItName(it);if(c>0){got++;if(nm)gotNames.push(nm);}else if(nm)miss.push(nm);});
    const total=arr.length;if(!total)return;
    out.cats.push({key:String(key),name:bossName(String(key)),got:got,total:total,left:total-got,missing:miss,gotNames:gotNames});
  });
  return out;
}
async function doTempleSync(){
  const rsn=(state.cfg.rsn||"").trim(),st=document.getElementById("grindStat"),btn=document.getElementById("tplSync");updateTplLink();
  if(!rsn){if(st){st.style.color="var(--red)";st.textContent="Enter your RSN in the setup above first.";}return;}
  if(btn)btn.disabled=true;if(st){st.style.color="";st.textContent="Fetching collection log for "+rsn+"\u2026";}
  try{
    const parsed=parseClog(await templeFetch(rsn));
    if(!parsed||!parsed.cats.length){if(st){st.style.color="var(--red)";st.innerHTML="No collection log data found \u2014 make sure "+esc(rsn)+" has synced once via the TempleOSRS RuneLite plugin.";}return;}
    parsed.updatedStr=fmtDate(todayMid());state.cfg.clogData=parsed;persistNow();if(state.plan&&!state.plan.empty)renderAll();else renderSetup();
    const slots=parsed.finished!=null?parsed.finished:parsed.cats.reduce((a,c)=>a+c.got,0);
    if(st){st.style.color="var(--green)";st.textContent="\u2713 Synced "+slots+(parsed.available?" / "+parsed.available:"")+" slots \u2014 "+parsed.cats.filter(c=>c.left>0).length+" grinds below.";}
  }catch(e){if(st){st.style.color="var(--red)";st.textContent=(e&&e.message)||"Sync failed.";}}
  finally{if(btn)btn.disabled=false;}
}
function renderGrinds(){
  const bd=document.getElementById("grindBody");if(!bd)return;const cd=state.cfg.clogData;
  if(!cd||!cd.cats||!cd.cats.length){bd.innerHTML='<p class="hint" style="margin-top:10px">Load your collection log in <b>Setup</b> (under your RuneScape name) to see your closest grinds.</p>';return;}
  const inc=cd.cats.filter(c=>c.left>0),sortBy=state.cfg.grindSort||"close";
  inc.sort((a,b)=>sortBy==="pct"?((b.got/b.total)-(a.got/a.total))||(a.left-b.left):(a.left-b.left)||((b.got/b.total)-(a.got/a.total)));
  const slots=cd.finished!=null?cd.finished:cd.cats.reduce((a,c)=>a+c.got,0);
  let body='<div style="margin:12px 0 8px"><span class="stat"><b>'+slots+'</b> slots'+(cd.available?" / "+cd.available:"")+'</span>';
  if(cd.catsTotal)body+='<span class="stat"><b>'+(cd.catsDone!=null?cd.catsDone:"?")+'</b> / '+cd.catsTotal+' categories</span>';
  body+='<span class="stat"><b>'+inc.length+'</b> grinds left</span></div>';
  if(cd.buckets){const BK=[["time_to_finish_bosses","Bosses"],["time_to_finish_raids","Raids"],["time_to_finish_minigames","Minigames"],["time_to_finish_clues","Clues"],["time_to_finish_other","Other"]];const parts=BK.filter(b=>cd.buckets[b[0]]!=null).map(b=>b[1]+" ~"+Math.round(cd.buckets[b[0]]).toLocaleString()+"h");if(parts.length)body+='<p class="hint" style="margin:0 0 10px">Est. time to finish — '+parts.join(" · ")+'</p>';}
  body+='<div class="grnav"><button class="gsort'+(sortBy==="close"?" on":"")+'" data-s="close">Fewest items left</button><button class="gsort'+(sortBy==="pct"?" on":"")+'" data-s="pct">Highest % done</button></div>';
  body+='<div class="grinds">';
  inc.slice(0,80).forEach(c=>{const pct=Math.round(c.got/c.total*100);const miss=c.missing.length?(c.missing.slice(0,12).map(esc).join(", ")+(c.missing.length>12?" +"+(c.missing.length-12)+" more":"")):"—";body+='<div class="grind"><div class="gh"><b>'+esc(c.name)+'</b><span>'+c.got+'/'+c.total+' · '+pct+'%</span></div><div class="gbar"><i style="width:'+pct+'%"></i></div><div class="gmiss">'+miss+'</div></div>';});
  body+='</div>';
  bd.innerHTML=body;
  bd.querySelectorAll(".gsort").forEach(b=>b.addEventListener("click",()=>{state.cfg.grindSort=b.dataset.s;save();renderGrinds();}));
}
function esc(s){return (''+s).replace(/[&<>]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;"}[c];});}
async function doFetch(rsn,btn){
  const stat=document.getElementById("fetchStat");rsn=(rsn||"").trim();
  if(!rsn){stat.innerHTML='<span style="color:var(--red)">Enter a name first.</span>';return;}
  state.cfg.rsn=rsn;save();btn.disabled=true;const old=btn.textContent;btn.textContent="Fetching\u2026";stat.style.color="";stat.textContent="Looking up "+rsn+" on Wise Old Man\u2026";
  try{const res=await womFetch(rsn);const had=!!(state.plan&&!state.plan.empty);applyStats(res.skills);applyPvm(res);snapshotProgress();save();renderAll();const s2=document.getElementById("fetchStat");if(s2)s2.innerHTML='<span style="color:var(--green)">\u2713 '+(had?"Updated XP for "+esc(res.display)+" \u2014 goals recalculated, rotation unchanged.":"Loaded stats for "+esc(res.display)+" \u2014 review, then Generate plan.")+'</span>';}
  catch(e){btn.disabled=false;btn.textContent=old;stat.innerHTML='<span style="color:var(--red)">'+esc(e&&e.message||"Lookup failed.")+'</span>';}
}

function cfgInit(){
  const c=state.cfg;
  if(!c.xp)c.xp=Object.assign({},DEFAULT_XP);
  if(!c.rate)c.rate={};if(!c.method)c.method={};
  SCHED.forEach(k=>{if(c.rate[k]==null)c.rate[k]=METHODS[k][0][1];if(c.method[k]==null){const m=METHODS[k].find(x=>x[1]===num(c.rate[k]));c.method[k]=m?m[0]:"Custom";}});
  if(c.rsn==null)c.rsn="";
  if(!c.mode)c.mode="hours";
  if(c.hpw==null)c.hpw=16;
  if(!c.date){const _d=new Date();_d.setHours(0,0,0,0);_d.setFullYear(_d.getFullYear()+1);c.date=isoDate(_d);}
}

/* ---------- generation ---------- */
function allocateWeeks(hours,totalWeeks){
  const keys=Object.keys(hours),n=keys.length,sum=keys.reduce((a,k)=>a+hours[k],0);
  const extra=totalWeeks-n,out={};
  const raw=keys.map(k=>({k,share:sum>0?hours[k]/sum*extra:0}));
  let used=0;raw.forEach(o=>{const f=Math.floor(o.share);out[o.k]=1+f;used+=f;});
  let left=extra-used;
  raw.sort((a,b)=>(b.share-Math.floor(b.share))-(a.share-Math.floor(a.share)));
  for(let i=0;i<left;i++)out[raw[i%n].k]++;
  return out;
}
function evenRotation(sw){
  const keys=Object.keys(sw),N=keys.reduce((a,k)=>a+sw[k],0);
  const ratio={},acc={},placed={};keys.forEach(k=>{ratio[k]=sw[k]/N;acc[k]=0;placed[k]=0;});
  const seq=[];let prev=null;
  for(let s=0;s<N;s++){
    keys.forEach(k=>{if(placed[k]<sw[k])acc[k]+=ratio[k];});
    let avail=keys.filter(k=>placed[k]<sw[k]).sort((a,b)=>acc[b]-acc[a]);
    let pick=avail[0];if(pick===prev&&avail.length>1)pick=avail[1];
    acc[pick]-=1;placed[pick]++;seq.push(pick);prev=pick;
  }
  return seq;
}
function generate(){
  cfgInit();const c=state.cfg;
  const {hours,totalHours,totalRemXP,combatNote}=computeHours();
  const keys=Object.keys(hours),n=keys.length;
  if(n===0){state.plan={empty:true};save();renderAll();return;}
  const start=todayMid();
  let totalWeeks=weeksFromDate(c.date),infeasible=false,warnMsg="";
  if(totalWeeks<n){totalWeeks=n;infeasible=true;warnMsg="That date is too soon to give every skill a week \u2014 extended to "+n+" weeks ("+fmtDate(new Date(start.getTime()+n*7*864e5))+").";}
  const hpw=totalHours/totalWeeks;
  if(!infeasible&&hpw>40)warnMsg="This pace is ~"+Math.round(hpw)+"h/week \u2014 very heavy. Push the date back to ease it.";
  const sw=allocateWeeks(hours,totalWeeks),seq=evenRotation(sw);
  const weeks=seq.map((sk,i)=>[fmtDate(new Date(start.getTime()+i*7*864e5)),sk]);
  const finish=new Date(start.getTime()+totalWeeks*7*864e5);
  state.plan={weeks,skillWeeks:sw,start:start.getTime(),totalHours,hpw,totalWeeks,finish:fmtDate(finish),infeasible,warnMsg,combatNote,totalRemXP,hours};
  state.done={};save();renderAll();
  document.getElementById("trackerWrap").scrollIntoView({behavior:"smooth",block:"start"});
}

/* ---------- setup UI ---------- */
function renderSetup(){
  cfgInit();const c=state.cfg,box=document.getElementById("setup");box.innerHTML="";
  const r1=el("div","frow");
  const rsnInp=inputEl("text",c.rsn,v=>{c.rsn=v;save();},"160px");
  r1.appendChild(field("RuneScape name",rsnInp));
  const planned=!!(state.plan&&!state.plan.empty);
  const fb=el("button","fetchbtn",planned?"Update stats":"Fetch stats");fb.type="button";fb.onclick=()=>doFetch(rsnInp.value,fb);
  const fbf=el("div","fld");fbf.appendChild(el("label",null,"&nbsp;"));fbf.appendChild(fb);r1.appendChild(fbf);
  const sline=el("div","fld");sline.style.flexBasis="100%";const hintTxt=planned?"Hit Update to pull your latest XP \u2014 per-skill goals recalc, the rotation stays put.":"Type your RSN and hit Fetch to auto-fill all 24 skills (via Wise Old Man).";sline.innerHTML='<div id="fetchStat" style="font-size:12.5px;color:var(--muted)">'+hintTxt+'</div>';r1.appendChild(sline);
  const dInput=inputEl("date",c.date,null,"160px");dInput.id="dateInput";
  const hInput=inputEl("number",c.hpw,null,"110px");hInput.id="hpwInput";
  dInput.addEventListener("input",()=>{c.date=dInput.value;save();syncFromDate();});
  hInput.addEventListener("input",()=>{syncFromHpw(hInput.value);save();});
  r1.appendChild(field("Target date",dInput));
  r1.appendChild(field("\u2248 Hours / week",hInput));
  const sumEl=el("div","fld");sumEl.style.flexBasis="100%";sumEl.innerHTML='<label>Workload</label><div id="liveSum" style="color:var(--gold-bright);font-weight:600;font-variant-numeric:tabular-nums">\u2014</div>';r1.appendChild(sumEl);
  box.appendChild(r1);
  const cld=el("details","adv");cld.style.marginBottom="14px";
  cld.appendChild(el("summary",null,"Collection log — load to personalize targets (optional)"));
  const cbody=el("div");cbody.style.marginTop="10px";
  cbody.innerHTML='<p class="hint" style="margin-top:0">Needs a one-time TempleOSRS RuneLite plugin sync. Open <a id="tplLink" target="_blank" rel="noopener" style="color:var(--gold)">your TempleOSRS data</a>, copy it all, paste below, and Load — your targets will then show what you still need. (Auto-fetch usually fails due to TempleOSRS blocking cross-site requests; paste is reliable.)</p>';
  const ta=document.createElement("textarea");ta.id="tplPaste";ta.placeholder="Paste the JSON from the URL here";ta.style.cssText="width:100%;min-height:80px;background:#000;border:1px solid var(--edge);color:var(--cream);border-radius:8px;padding:9px;font-family:monospace;font-size:11px;box-sizing:border-box";cbody.appendChild(ta);
  const brow=el("div");brow.style.cssText="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px";
  const loadBtn=el("button","fetchbtn","Load collection log");loadBtn.type="button";loadBtn.onclick=doTempleLoad;brow.appendChild(loadBtn);
  const syncBtn=el("button","fetchbtn","Try auto-fetch");syncBtn.type="button";syncBtn.id="tplSync";syncBtn.onclick=doTempleSync;brow.appendChild(syncBtn);
  cbody.appendChild(brow);
  const gstat=el("div");gstat.id="grindStat";gstat.style.cssText="font-size:12px;margin-top:7px";
  const _cd=state.cfg.clogData;if(_cd&&_cd.cats&&_cd.cats.length){gstat.style.color="var(--green)";gstat.textContent="✓ "+(_cd.finished!=null?_cd.finished:"?")+(_cd.available?" / "+_cd.available:"")+" slots loaded — targets personalized.";}else{gstat.style.color="var(--muted)";}
  cbody.appendChild(gstat);cld.appendChild(cbody);box.appendChild(cld);
  updateTplLink();

  box.appendChild(el("div","grp","Combat \u2014 trained via Slayer"));
  const cg=el("div","skillsform");COMBAT.forEach(k=>cg.appendChild(srow(k,false)));box.appendChild(cg);
  box.appendChild(el("div","grp","Skills"));
  const sg=el("div","skillsform");SCHED.forEach(k=>sg.appendChild(srow(k,false)));box.appendChild(sg);

  const det=el("details","adv");det.appendChild(el("summary",null,"Advanced \u2014 training method & rate"));
  const rg=el("div");rg.style.cssText="display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:9px;margin-top:10px";
  SCHED.forEach(k=>{
    const row=el("div","srow");row.style.setProperty("--c",SKILLS[k].color);
    row.innerHTML=icoSpan(k,18)+'<span class="nm" style="flex:0 0 auto;min-width:74px">'+SKILLS[k].name+'</span>';
    const sel=document.createElement("select");sel.className="msel";
    (METHODS[k]||[]).forEach((m,i)=>{const o=document.createElement("option");o.value=i;o.textContent=m[0]+" \u00b7 "+fmt(m[1])+"/hr";sel.appendChild(o);});
    const oc=document.createElement("option");oc.value="custom";oc.textContent="Custom rate";sel.appendChild(oc);
    const rateInp=inputEl("text",c.rate[k],null,"82px","numeric");
    const idx=(METHODS[k]||[]).findIndex(m=>m[0]===c.method[k]);sel.value=idx>=0?String(idx):"custom";
    sel.addEventListener("change",()=>{if(sel.value!=="custom"){const m=METHODS[k][+sel.value];c.rate[k]=m[1];c.method[k]=m[0];rateInp.value=m[1];}else{c.method[k]="Custom";}save();syncFromDate();if(state.plan&&!state.plan.empty)refresh();});
    rateInp.addEventListener("input",()=>{c.rate[k]=num(rateInp.value);c.method[k]="Custom";sel.value="custom";save();syncFromDate();if(state.plan&&!state.plan.empty)refresh();});
    row.appendChild(sel);row.appendChild(rateInp);rg.appendChild(row);
  });
  det.appendChild(rg);box.appendChild(det);

  const btn=el("button","genbtn",state.plan?"Update plan":"Generate plan");btn.onclick=generate;box.appendChild(btn);
  box.appendChild(el("div","note","Set a target date \u2014 the planner shows the hours/week it needs. Too much grinding? Push the date back (or type an hours/week and the date moves to match). Rates are editable estimates; combat rides along with Slayer; Farming is real-time-gated, so its hours are a rough active-time figure."));
  syncFromDate();
}
function field(label,input){const f=el("div","fld");f.appendChild(el("label",null,label));f.appendChild(input);return f;}
function inputEl(type,val,on,w,mode){const i=document.createElement("input");i.type=type;if(w)i.style.width=w;if(mode)i.inputMode=mode;else if(type==="number")i.inputMode="numeric";if(type==="text"&&!mode){i.autocapitalize="off";i.autocomplete="off";i.spellcheck=false;}i.value=val==null?"":val;if(on)i.addEventListener("input",()=>on(i.value));return i;}
function srow(k){
  const row=el("div","srow");row.style.setProperty("--c",SKILLS[k].color);
  row.innerHTML=icoSpan(k,18)+'<span class="nm">'+SKILLS[k].name+'<small class="m99" style="display:none">99 \u2713</small></span>';
  const small=row.querySelector(".m99");
  const inp=inputEl("text",state.cfg.xp[k],null,"96px","numeric");
  function upd(){const is99=num(inp.value)>=XP99;row.classList.toggle("maxed",is99);small.style.display=is99?"":"none";}
  inp.addEventListener("input",()=>{state.cfg.xp[k]=num(inp.value);save();syncFromDate();upd();});
  row.appendChild(inp);upd();return row;
}

/* ---------- tracker ---------- */
function planWeekNums(key){const a=[];state.plan.weeks.forEach((w,i)=>{if(w[1]===key)a.push(i+1);});return a;}
function calc(key){
  const wns=planWeekNums(key),cur=num(state.cfg.xp[key]),rem=Math.max(0,XP99-cur);
  const doneCount=wns.filter(wn=>state.done[wn]).length,weeksLeft=wns.length-doneCount;
  return {wns,cur,rem,weeksLeft,doneCount,total:wns.length,target:(rem>0&&weeksLeft>0)?rem/weeksLeft:0,behind:rem>0&&weeksLeft===0};
}
const weekEls={};
function renderTracker(){
  const wrap=document.getElementById("trackerWrap");wrap.classList.remove("hidden");
  const p=state.plan;
  // skill grid
  const g=document.getElementById("skillgrid");g.innerHTML="";
  Object.keys(p.skillWeeks).forEach(k=>{
    const s=SKILLS[k],c=el("div","skill");c.dataset.k=k;c.style.setProperty("--c",s.color);
    c.innerHTML='<div class="row1">'+icoSpan(k,20)+'<span class="sname">'+s.name+'</span><span class="wk" data-wk></span></div>'
      +'<div class="smeth" data-meth></div>'
      +'<input class="cur" type="text" inputmode="numeric">'
      +'<div class="nums"><span class="b">left <b data-rem></b></span><span class="b">need/wk <b data-tgt></b></span></div>'
      +'<div class="mini"><i data-bar style="width:0%"></i></div>';
    const inp=c.querySelector("input");inp.value=state.cfg.xp[k];
    inp.addEventListener("input",()=>{state.cfg.xp[k]=num(inp.value);save();refresh();});
    g.appendChild(c);
  });
  // timeline
  const t=document.getElementById("timeline");t.innerHTML="";Object.keys(weekEls).forEach(k=>delete weekEls[k]);
  let curKey=null,ww=null;
  p.weeks.forEach((row,i)=>{
    const wn=i+1,[date,key]=row,s=SKILLS[key],parts=date.split(" "),mk=parts[1]+parts[2];
    if(mk!==curKey){curKey=mk;const grp=el("div","phasegroup");grp.appendChild(el("div","monthbar",parts[1]+" 20"+parts[2]));ww=el("div","weeks");grp.appendChild(ww);t.appendChild(grp);}
    const w=el("div","week");w.style.setProperty("--c",s.color);
    w.innerHTML='<div class="wn">WEEK '+wn+' \u00b7 '+date+'</div>'+icoSpan(key,26).replace('class="ico"','class="ico" style="justify-content:center;color:'+s.color+'"')+'<div class="ws">'+s.name+'</div><div class="wgoal" data-goal></div><div class="wsub" data-sub>this week</div><div class="wbreak" data-break></div>';
    w.addEventListener("click",()=>{state.done[wn]=!state.done[wn];if(!state.done[wn])delete state.done[wn];save();refresh();});
    weekEls[wn]={card:w,goal:w.querySelector("[data-goal]"),sub:w.querySelector("[data-sub]"),brk:w.querySelector("[data-break]"),key};
    ww.appendChild(w);
  });
  // collection log
  const cl=document.getElementById("clog");cl.innerHTML="";let any=false;
  Object.keys(p.skillWeeks).forEach(k=>{
    const cs=clogSkillData(k);
    if(cs){any=true;const s=SKILLS[k],card=el("div","card");card.style.setProperty("--c",s.color);
      const pct=cs.total?Math.round(cs.got/cs.total*100):0;
      card.innerHTML='<h3>'+icoSpan(k,17)+s.name+'</h3><div class="cnt">'+cs.got+' / '+cs.total+' logged · '+pct+'%</div><div class="mini"><i style="width:'+pct+'%;background:var(--c)"></i></div>';
      if(cs.missing.length){const SHOW=6,need=el("div");need.style.marginTop="8px";
        cs.missing.forEach((nm,i)=>{const r=el("div","item need"+(i>=SHOW?" extra":""));r.innerHTML='<span class="box"></span><span class="txt">'+esc(nm)+'</span>';need.appendChild(r);});
        card.appendChild(need);
        if(cs.missing.length>SHOW){const more=cs.missing.length-SHOW,btn=el("div","moretoggle");btn.textContent='+ '+more+' more still needed';btn.addEventListener("click",()=>{const ex=card.classList.toggle("expanded");btn.textContent=ex?'Show less':('+ '+more+' more still needed');});card.appendChild(btn);}
      }else{const dn=el("div","item");dn.style.cursor="default";dn.innerHTML='<span class="txt" style="color:var(--green)">✓ all logged</span>';card.appendChild(dn);}
      if(cs.obtained&&cs.obtained.length){const det=document.createElement("details");det.className="gotlist";det.innerHTML='<summary>✓ '+cs.obtained.length+' obtained — tap to view</summary>';const wrap=el("div");cs.obtained.slice().sort().forEach(nm=>{const r=el("div","item on");r.innerHTML='<span class="box"></span><span class="txt">'+esc(nm)+'</span>';wrap.appendChild(r);});det.appendChild(wrap);card.appendChild(det);}
      cl.appendChild(card);return;}
    if(!LOG[k])return;any=true;const s=SKILLS[k],card=el("div","card");card.style.setProperty("--c",s.color);
    const items=LOG[k],got=items.filter((it,idx)=>state.log[k+idx]).length;
    card.innerHTML='<h3>'+icoSpan(k,17)+s.name+'</h3><div class="cnt" data-cnt="'+k+'">'+got+' / '+items.length+' logged</div>';
    items.forEach((it,idx)=>{const id=k+idx,rowi=el("div","item");let txt='<span class="txt '+(it[1]==='prio'?'priority':'')+'">'+it[0]+'</span>';if(it[1]==='rng')txt+='<span class="rng">RNG</span>';rowi.innerHTML='<span class="box"></span>'+txt;if(state.log[id])rowi.classList.add("on");rowi.addEventListener("click",()=>{state.log[id]=!state.log[id];rowi.classList.toggle("on",!!state.log[id]);save();logCount(k,items.length);});card.appendChild(rowi);});
    cl.appendChild(card);
  });
  document.getElementById("clogSec").style.display=any?"":"none";
  {const ch=document.getElementById("clogHint"),cl2=state.cfg.clogData;if(ch)ch.innerHTML=(cl2&&cl2.cats&&cl2.cats.length)?"Cards show the items you still need per skill, pulled from your loaded collection log.":'Tap an item to mark it logged. <span class="priority">Gold = do first</span>, <span style="color:#4fb6e8">RNG = luck-gated</span>.';}
  const pv=state.cfg.pvm,pvmSec=document.getElementById("pvmSec");
  if(pv&&((pv.bosses&&Object.keys(pv.bosses).length)||pv.clog||pv.ehb)){
    const bs=pv.bosses||{},bk=Object.keys(bs).sort((a,b)=>bs[b]-bs[a]);
    let body='<div class="pvmbody"><div style="margin-bottom:6px">';
    if(pv.clog)body+='<span class="stat"><b>'+pv.clog+'</b> log slots</span>';
    if(pv.ehb)body+='<span class="stat"><b>'+pv.ehb+'</b> EHB</span>';
    body+='</div>';
    if(bk.length){body+='<div class="pvm">';bk.forEach(k=>{body+='<div class="kc"><span title="'+esc(bossName(k))+'">'+esc(bossName(k))+'</span><b>'+fmt(bs[k])+'</b></div>';});body+='</div>';}
    else body+='<p class="hint">No boss kills recorded.</p>';
    body+='<p class="hint" style="margin-top:10px">Kill counts, log slots &amp; EHB come from Wise Old Man (refreshed on Fetch). Per-item collection log needs the TempleOSRS RuneLite plugin.</p></div>';
    pvmSec.innerHTML='<details class="pvmsec" open><summary>PvM / boss KC<span class="tag">updated '+esc(pv.updatedStr||"\u2014")+'</span></summary>'+body+'</details>';
    pvmSec.style.display="";
  }else{pvmSec.style.display="";pvmSec.innerHTML='<div class="sechead"><h2>PvM / boss KC</h2></div><p class="hint">No boss data yet. Head to <b>Setup</b> and tap <b>Update stats</b> to pull your kill counts, log slots &amp; EHB from Wise Old Man.</p>';}
  renderGrinds();
  logCountAll();
  refresh();
}
function methodLabel(k){const m=(state.cfg.method&&state.cfg.method[k]);if(!m)return "";return m==="Custom"?("Custom \u00b7 "+fmt(num(state.cfg.rate[k]))+"/hr"):m;}
function refresh(){
  const p=state.plan;if(!p||p.empty)return;
  const cw=Math.min(Math.max(Math.floor((Date.now()-p.start)/(7*864e5))+1,1),p.totalWeeks);
  const hpw=p.hpw;const perDay=t=>fmt(t/7),perHr=t=>fmt(t/hpw);
  const cache={};Object.keys(p.skillWeeks).forEach(k=>cache[k]=calc(k));
  Object.entries(weekEls).forEach(([wn,ref])=>{wn=+wn;const sc=cache[ref.key];ref.card.classList.remove("done","flex","now");if(wn===cw)ref.card.classList.add("now");
    if(state.done[wn]){ref.card.classList.add("done");ref.goal.textContent="done";ref.sub.textContent="";ref.brk.textContent="";}
    else if(sc.rem<=0){ref.card.classList.add("flex");ref.goal.textContent="Maxed";ref.sub.textContent="flex week";ref.brk.textContent="train anything";}
    else{ref.goal.textContent=fmt(sc.target)+" XP";ref.sub.textContent="this week";ref.brk.textContent=perDay(sc.target)+"/day \u00b7 "+perHr(sc.target)+"/hr";}});
  document.querySelectorAll(".skill").forEach(card=>{const k=card.dataset.k,sc=cache[k];card.querySelector("[data-wk]").textContent=sc.doneCount+"/"+sc.total+" done";card.querySelector("[data-rem]").textContent=fmt(sc.rem);card.querySelector("[data-tgt]").textContent=sc.rem<=0?"done":(sc.behind?"\u2014":fmt(sc.target));card.querySelector("[data-bar]").style.width=Math.min(100,sc.cur/XP99*100)+"%";const me=card.querySelector("[data-meth]");if(me)me.textContent=methodLabel(k);card.classList.toggle("maxed",sc.rem<=0);});
  let remTotal=0,maxed=0,nsk=Object.keys(p.skillWeeks).length;Object.keys(p.skillWeeks).forEach(k=>{remTotal+=cache[k].rem;if(cache[k].rem<=0)maxed++;});
  const pct=p.totalRemXP>0?Math.min(100,(p.totalRemXP-remTotal)/p.totalRemXP*100):100;
  document.getElementById("heroMeta").classList.remove("hidden");
  document.getElementById("heroRem").textContent=fmt(remTotal);
  document.getElementById("heroDone").textContent=maxed+" / "+nsk;
  document.getElementById("heroFill").style.width=pct+"%";
  document.getElementById("heroPct").textContent=Math.round(pct)+"% done";
  document.getElementById("heroHours").textContent="~"+Math.round(p.totalHours)+"h total";
  document.getElementById("heroTitle").innerHTML=(state.cfg.rsn||"Your")+"'s Road to <em>Max</em>";
  const goalWord="target "+p.finish;
  const hpwTxt="~"+(Math.round(p.hpw*10)/10)+"h/week";
  document.getElementById("heroSub").innerHTML=p.totalWeeks+"-week plan \u00b7 "+hpwTxt+" \u00b7 <b>"+goalWord+"</b>"+(p.warnMsg?' &nbsp;<span style="color:var(--gold-bright)">\u26a0 '+p.warnMsg+'</span>':'');
  // this week
  const [cd,ck]=p.weeks[cw-1],csc=cache[ck],cs=SKILLS[ck];
  const gn=csc.rem<=0?"Maxed":fmt(csc.target);
  const cwRate=Math.max(1,num(state.cfg.rate[ck])||SKILLS[ck].rate||1);
  const cwHrs=csc.rem>0?csc.target/cwRate:0;
  const cwHrsTxt=csc.rem>0?'<div class="lbl" style="margin-top:3px;color:var(--cream)">\u2248 '+(cwHrs>=10?Math.round(cwHrs):cwHrs.toFixed(1))+'h this week</div>':'';
  const meta=csc.rem<=0?"this skill is done \u2014 train anything":(csc.behind?"no weeks left \u2014 "+fmt(csc.rem)+" to go":methodLabel(ck)+" \u00b7 "+fmt(csc.rem)+" over "+csc.weeksLeft+" wk"+(csc.weeksLeft===1?"":"s"));
  const tw=document.getElementById("thisweek");tw.style.setProperty("--c",cs.color);
  tw.innerHTML=icoSpan(ck,34).replace('class="ico"','class="ico" style="color:'+cs.color+'"')+'<div><div class="lbl">This week \u00b7 Week '+cw+' \u00b7 '+cd+'</div><div class="sk">'+cs.name+'</div></div><div style="margin-left:auto;text-align:right"><div class="lbl">Goal</div><div class="goal">'+gn+'</div>'+cwHrsTxt+'</div><div class="meta">'+meta+(p.combatNote&&ck==="slayer"?" \u2014 "+p.combatNote:"")+'</div>';
}
function logCount(k,total){const got=Array.from({length:total}).filter((_,i)=>state.log[k+i]).length;const n=document.querySelector('[data-cnt="'+k+'"]');if(n)n.textContent=got+" / "+total+" logged";logCountAll();}
function logCountAll(){const n=document.getElementById("logcount");if(!n)return;const cd=state.cfg.clogData;if(cd&&cd.finished!=null){n.textContent=cd.finished+(cd.available?" / "+cd.available:"")+" logged";}else{n.textContent=Object.values(state.log).filter(Boolean).length+" logged";}}

function snapStats(){return {total:ORDER.reduce((a,k)=>a+num(state.cfg.xp[k]),0),rem:ORDER.reduce((a,k)=>a+Math.max(0,XP99-num(state.cfg.xp[k])),0)};}
function snapshotProgress(){
  if(!Array.isArray(state.history))state.history=[];
  const d=isoDate(todayMid()),s=snapStats();
  const ex=state.history.find(h=>h.date===d);
  if(ex){ex.total=s.total;ex.rem=s.rem;}else state.history.push({date:d,total:s.total,rem:s.rem});
  state.history.sort((a,b)=>a.date<b.date?-1:(a.date>b.date?1:0));
}
function logTodayClick(){snapshotProgress();persistNow();renderProgress();}
function progressChart(hist,targetIso){
  const W=720,H=230,L=54,R=16,T=16,B=30;
  let minX=Math.min.apply(null,hist.map(h=>Date.parse(h.date)));
  let maxX=Math.max.apply(null,hist.map(h=>Date.parse(h.date)));
  const tT=targetIso?Date.parse(targetIso):0; if(tT>maxX)maxX=tT;
  if(maxX<=minX)maxX=minX+7*864e5;
  const maxY=Math.max.apply(null,hist.map(h=>h.rem))||1;
  const px=t=>L+(t-minX)/(maxX-minX)*(W-L-R);
  const py=v=>T+(1-v/maxY)*(H-T-B);
  const pts=hist.map(h=>px(Date.parse(h.date)).toFixed(1)+","+py(h.rem).toFixed(1)).join(" ");
  const dots=hist.map(h=>'<circle cx="'+px(Date.parse(h.date)).toFixed(1)+'" cy="'+py(h.rem).toFixed(1)+'" r="3.2" fill="var(--gold-bright)"/>').join("");
  let ideal="";
  if(tT>minX){ideal='<line x1="'+px(minX).toFixed(1)+'" y1="'+py(hist[0].rem).toFixed(1)+'" x2="'+px(tT).toFixed(1)+'" y2="'+py(0).toFixed(1)+'" stroke="var(--gold)" stroke-width="1.3" stroke-dasharray="5 4" opacity=".5"/>';}
  const fx=t=>{const d=new Date(t);return d.getDate()+" "+MON[d.getMonth()];};
  return '<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" font-family="inherit">'
    +'<line x1="'+L+'" y1="'+py(0).toFixed(1)+'" x2="'+(W-R)+'" y2="'+py(0).toFixed(1)+'" stroke="var(--edge)"/>'
    +'<text x="'+(L-6)+'" y="'+(py(maxY)+4).toFixed(1)+'" text-anchor="end" font-size="11" fill="var(--muted)">'+fmt(maxY)+'</text>'
    +'<text x="'+(L-6)+'" y="'+(py(0)+4).toFixed(1)+'" text-anchor="end" font-size="11" fill="var(--muted)">0</text>'
    +'<text x="'+L+'" y="'+(H-8)+'" font-size="11" fill="var(--muted)">'+fx(minX)+'</text>'
    +'<text x="'+(W-R)+'" y="'+(H-8)+'" text-anchor="end" font-size="11" fill="var(--muted)">'+fx(maxX)+'</text>'
    +ideal
    +'<polyline points="'+pts+'" fill="none" stroke="var(--gold-bright)" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>'
    +dots
    +'<text x="'+L+'" y="11" font-size="10.5" fill="var(--muted)">XP remaining to max cape \u2014 lower is better; dashed = ideal pace</text>'
    +'</svg>';
}
function renderProgress(){
  const box=document.getElementById("progressBody");if(!box)return;
  const hist=Array.isArray(state.history)?state.history.slice():[];
  const live=snapStats();
  if(hist.length===0){
    box.innerHTML='<p class="hint">No snapshots yet. Go to <b>Setup</b> and hit <b>Fetch stats</b> \u2014 that records a snapshot automatically, and each weekly update builds your gains, pace and chart here. Only use the manual button below if you type your XP in by hand.</p><button class="logbtn" id="logToday">Log today manually</button>';
    const b=document.getElementById("logToday");if(b)b.onclick=logTodayClick;return;
  }
  const latest=hist[hist.length-1],remNow=live.rem,ms=864e5,latestT=Date.parse(latest.date);
  let base=hist[0];
  for(let i=0;i<hist.length;i++){if(latestT-Date.parse(hist[i].date)<=28*ms){base=hist[i];break;}}
  let daysSpan=(latestT-Date.parse(base.date))/ms;
  if(daysSpan<1){base=hist[0];daysSpan=(latestT-Date.parse(base.date))/ms;}
  const rate=daysSpan>=1?(latest.total-base.total)/(daysSpan/7):null;
  const prev=hist.length>=2?hist[hist.length-2]:null;
  const sinceLast=prev?latest.total-prev.total:0;
  const wTarget=weeksFromDate(state.cfg.date),reqWk=wTarget>0?remNow/wTarget:remNow;
  let pill,txt;
  if(remNow<=0){pill="ok";txt="\ud83c\udf89 All 24 skills at 99 \u2014 you\u2019ve maxed! Cape earned.";}
  else if(rate==null||rate<=0){pill="neutral";txt="Log another snapshot about a week apart to calculate your pace.";}
  else{const wToMax=remNow/rate,eta=new Date(todayMid().getTime()+wToMax*7*ms);
    if(rate>=reqWk){const ahead=Math.max(0,wTarget-wToMax);pill="ok";txt="On track \u2014 at "+fmt(rate)+" XP/week you\u2019ll max around "+fmtDate(eta)+(ahead>=1?" (~"+Math.round(ahead)+" wk ahead of target)":" (right on target)")+".";}
    else{pill="behind";txt="Behind pace \u2014 at "+fmt(rate)+" XP/week you\u2019d max around "+fmtDate(eta)+". You need ~"+fmt(reqWk)+" XP/week to hit your target date.";}
  }
  let html='<div class="prow">';
  html+='<div class="pcard"><div class="lbl">Since last update</div>'+(prev?'<div class="big gain">'+(sinceLast>0?"+"+fmt(sinceLast):"\u00b10")+'</div>':'<div class="waiting">after your next update</div>')+'</div>';
  html+='<div class="pcard"><div class="lbl">Per week (recent)</div>'+(rate!=null&&rate>0?'<div class="big">'+fmt(rate)+'</div>':'<div class="waiting">after a week of data</div>')+'</div>';
  html+='<div class="pcard"><div class="lbl">To max cape</div><div class="big">'+(remNow>0?fmt(remNow):"0")+'</div></div></div>';
  html+='<div class="statuspill '+pill+'">'+txt+'</div>';
  if(hist.length>=2)html+='<div class="pchart">'+progressChart(hist,state.cfg.date)+'</div>';
  else html+='<p class="hint">First snapshot logged on '+fmtDate(new Date(Date.parse(latest.date)))+'. Fetch or log again in about a week to unlock the pace chart.</p>';
  html+='<details class="snaplist"><summary>\u2630 '+hist.length+' snapshot'+(hist.length===1?"":"s")+' (tap to manage)</summary><div>';
  for(let i=hist.length-1;i>=0;i--){const h=hist[i];html+='<div class="snaprow"><span class="d">'+fmtDate(new Date(Date.parse(h.date)))+'</span><span class="t">'+fmt(h.total)+' total \u00b7 '+fmt(h.rem)+' to max</span><button class="del" data-i="'+i+'">delete</button></div>';}
  html+='</div></details><div class="loghint">Snapshots save automatically every time you <b>Fetch / Update stats</b> in Setup. Use this only if you enter your XP by hand.</div><button class="logbtn" id="logToday">Log today manually</button>';
  box.innerHTML=html;
  const lb=document.getElementById("logToday");if(lb)lb.onclick=logTodayClick;
  box.querySelectorAll(".snaprow .del").forEach(b=>b.onclick=()=>{const i=+b.dataset.i;state.history.splice(i,1);persistNow();renderProgress();});
}
function renderAll(){renderSetup();if(state.plan&&!state.plan.empty){renderTracker();renderProgress();}else document.getElementById("trackerWrap").classList.add("hidden");}

document.getElementById("reset").addEventListener("click",()=>{if(!confirm("Reset everything (config, plan, progress)?"))return;state={cfg:{},plan:null,done:{},log:{},history:[]};wipeStore();location.reload();});
(function(){const hd=document.getElementById("clogHead"),bd=document.getElementById("clogBody");if(hd&&bd)hd.addEventListener("click",()=>{const closed=bd.style.display==="none";bd.style.display=closed?"":"none";hd.classList.toggle("closed",!closed);});})();
(function(){const tb=document.getElementById("tabs");if(!tb)return;tb.addEventListener("click",e=>{const b=e.target.closest(".tab");if(!b)return;const t=b.dataset.tab;tb.querySelectorAll(".tab").forEach(x=>x.classList.toggle("on",x===b));document.querySelectorAll(".tabpanel").forEach(p=>p.classList.toggle("hidden",p.dataset.panel!==t));const tw=document.getElementById("trackerWrap");if(tw&&tw.scrollIntoView)tw.scrollIntoView({behavior:"smooth",block:"start"});});})();
document.getElementById("export").addEventListener("click",()=>{const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);const nm=((state.cfg&&state.cfg.rsn)||"maxcape").replace(/[^a-z0-9_-]+/gi,"_");a.download="maxcape-"+nm+"-"+new Date().toISOString().slice(0,10)+".json";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1500);});
document.getElementById("import").addEventListener("click",()=>document.getElementById("importFile").click());
document.getElementById("importFile").addEventListener("change",e=>{const file=e.target.files&&e.target.files[0];if(!file){return;}const r=new FileReader();r.onload=()=>{let obj;try{obj=JSON.parse(r.result);}catch(err){alert("That file isn\u2019t valid JSON.");return;}if(!obj||typeof obj!=="object"||(!obj.cfg&&!obj.plan)){alert("That doesn\u2019t look like a Max Cape backup.");return;}if(!confirm("Import this backup and replace your current data?"))return;state=Object.assign({cfg:{},plan:null,done:{},log:{}},obj);persistNow();location.reload();};r.readAsText(file);e.target.value="";});

(async function(){await load();cfgInit();renderAll();})();
