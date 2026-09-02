(()=>{
const maps=q=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q);
const xhs=q=>'https://www.xiaohongshu.com/search_result?keyword='+encodeURIComponent(q);

function rerenderDay2(){
  try{
    if(typeof route==='undefined'||!route[1]) return;
    route[1].title='韩服拍摄 × 宫殿 × 韩屋';
    route[1].plan='韩服租借 → 景福宫 → 北村 → 三清洞 → 西村 → 光化门';
    route[1].rec='把韩服安排在早上，光线更柔和、人也较少。建议至少租 4 小时，把景福宫主镜头和北村韩屋情侣照一次拍完，再回到轻松逛街节奏。';
    route[1].film='韩服穿戴细节、宫门正中构图、宫墙长焦情侣照、北村背影、袖口/发饰特写、走路慢动作。';
    route[1].schedule=[['08:00','早餐｜酒店附近简单解决'],['08:30','韩服租借 + 发型整理｜景福宫站附近'],['09:00','景福宫｜韩服主拍摄 · 宫墙 / 勤政殿 / 回廊'],['10:45','北村韩屋村｜情侣背影 + 巷弄人像'],['12:00','归还韩服 / 换回便服'],['12:30','三清洞午餐'],['14:00','三清洞咖啡 / 小店'],['15:30','西村｜设计店、巷子、慢逛'],['17:30','光化门 / 广场｜等待蓝调时刻'],['19:00','正式韩牛 / 烤肉晚餐'],['21:00','回酒店整理韩服素材 + 备份']];
    if(document.getElementById('routeList')&&typeof itemCard==='function'){
      document.getElementById('routeList').innerHTML=route.map((x,i)=>`<div class="card day"><div class="time">${x.d} · ${x.city}</div><div class="place">${x.title}</div><div class="meta">${x.plan}</div><div class="rec"><b>💡 当天推荐：</b>${x.rec}</div><div class="shot">🎬 ${x.film}</div><div class="dayDetails"><button class="dayToggle" onclick="toggleDayDetail(${i})">🕒 查看 ${x.d} 详细时间表</button><div class="dayTimeline" id="timeline${i}">${x.schedule.map((s,j)=>{const noHeart=/起床|抵达 ICN|退房|前往首尔市区|前往 ICN|取行李|酒店寄放行李|酒店 Check-in|首尔酒店 Check-in|前往登机口/.test(s[1]);const hid='heart_'+i+'_'+j;const loved=localStorage.getItem(hid)==='1';return `<div class="timeSlot ${loved?'completed':''}"><div class="clock">${s[0]}</div><div class="what">${s[1]}</div>${noHeart?'':`<button class="heartCheck ${loved?'loved':''}" onclick="toggleHeart('${hid}',this)" aria-label="完成">${loved?'♥':'♡'}</button>`}</div>`}).join('')}</div></div><div style="margin-top:10px">${itemCard('day'+i,'完成这一天','走完路线并完成主要摄影素材')}</div></div>`).join('');
    }
    if(document.getElementById('dailyPreview')) document.getElementById('dailyPreview').innerHTML=route.map(x=>`<div class="card day"><div class="time">${x.d} · ${x.city}</div><div class="place">${x.title}</div><div class="meta">${x.plan}</div><div class="rec">${x.rec}</div></div>`).join('');
  }catch(e){console.warn('hanbok day2 update failed',e)}
}

const shops=[
{name:'NAYEHANBOK 나예한복',score:5.0,tag:'情侣首选',area:'景福宫站',q:'NAYEHANBOK GYEONGBOKGUNG',price:'Basic ₩25,000 / 2h · ₩35,000 / 4h；Premium ₩45,000 / 2h · ₩55,000 / 4h',entry:25000,p4:35000,hair:true,flat:false,styles:['premium','royal'],why:'基础方案已含发型、包、衬裙和 locker，情侣拍摄省心；整体服务与拍摄适配度很高。'},
{name:'Oneday Hanbok 원데이한복',score:4.9,tag:'价格透明',area:'景福宫站',q:'Oneday Hanbok Gyeongbokgung',price:'全款式统一价 ₩24,000 / 4h · ₩32,000 / 全天',entry:24000,p4:24000,hair:true,flat:true,styles:['premium','theme'],why:'所有款式同价，不容易到店后被升级价格；免费基础发型、包和 locker，适合第一次租。'},
{name:'Seohwa Hanbok 서화한복',score:4.9,tag:'离宫殿近',area:'景福宫站',q:'Seohwa Hanbok Gyeongbokgung',price:'全款式统一价 ₩24,000 / 4h · ₩32,000 / 全天',entry:24000,p4:24000,hair:true,flat:true,styles:['premium','theme'],why:'位置非常靠近景福宫，统一价简单直接；适合你们 08:30 换装后尽快开始拍摄。'},
{name:'Hanboknam 한복남',score:4.8,tag:'款式最多',area:'景福宫站',q:'Hanboknam Gyeongbokgung',price:'Basic ₩15,000 / 2h · ₩20,000 / 4h；Theme ₩30,000 / 2h · ₩40,000 / 4h；Premium ₩40,000 / 2h · ₩50,000 / 4h',entry:15000,p4:20000,hair:false,flat:false,styles:['premium','theme'],why:'大型连锁、库存超过千套级别，男女款和主题款选择非常多，适合想现场慢慢挑。'},
{name:'Daehan Hanbok 대한한복',score:4.8,tag:'早开门',area:'景福宫站',q:'Daehan Hanbok Gyeongbokgung',price:'Traditional/Fusion ₩10,000 / 1h · ₩18,000 / 全天；Premium ₩25,000 / 1h · ₩35,000 / 全天',entry:10000,p4:null,hair:false,flat:false,styles:['premium','fusion'],why:'08:30 开门，正好贴合 DAY 2 行程；尺寸范围与款式量大，适合想一早开拍。'},
{name:'3355 Hanbok 삼삼오오',score:4.7,tag:'北村顺路',area:'景福宫—安国',q:'3355 Hanbok Rental Gyeongbokgung',price:'C ₩15,000 / 2h · ₩25,000 / 4h；B ₩20,000 / 2h · ₩30,000 / 4h；A ₩30,000 / 2h · ₩40,000 / 4h',entry:15000,p4:25000,hair:false,flat:false,styles:['premium','traditional'],why:'位置在景福宫与北村之间，拍完宫殿直接往北村移动最顺；传统款与发型口碑较好。'},
{name:'Hanbok Girls 한복소녀',score:4.7,tag:'性价比',area:'景福宫站',q:'Hanbok Girls Gyeongbokgung',price:'Traditional ₩10,000 / 2h · ₩20,000 / 4h；Special ₩20,000 / 2h · ₩30,000 / 4h；Premium ₩30,000 / 2h · ₩40,000 / 4h',entry:10000,p4:20000,hair:true,flat:false,styles:['premium','fusion'],why:'入门价低，基础发型与部分配件包含，适合把预算留给正式晚餐或摄影装备。'},
{name:'YES Hanbok 예스한복',score:4.7,tag:'服务完整',area:'景福宫站',q:'YES Hanbok Gyeongbokgung',price:'Premium ₩25,000 / 2h · ₩30,000 / 4h；Luxury ₩35,000 / 2h · ₩40,000 / 4h',entry:25000,p4:30000,hair:true,flat:false,styles:['premium'],why:'免费发型、包与衬裙，服装按颜色陈列，选情侣配色比较直观。'},
{name:'Byulgungteo Hanbok 별궁터한복',score:4.6,tag:'男女款强',area:'景福宫站 Exit 3',q:'Byulgungteo Hanbok Gyeongbokgung',price:'Set B ₩20,000 / 2h · ₩25,000 / 4h；Set A ₩30,000 / 2h · ₩35,000 / 4h；Premium Dangui ₩50,000 / 2h · ₩55,000 / 4h',entry:20000,p4:25000,hair:true,flat:false,styles:['premium','royal','mens'],why:'男女款层次比较完整，适合情侣一起选；基础编发和行李寄存较友好。'},
{name:'Hanbok Day 한복데이',score:4.6,tag:'简单方便',area:'景福宫站',q:'Hanbok Day Gyeongbokgung',price:'Premium ₩25,000 / 2h；高级发型/道具约 +₩5,000–10,000',entry:25000,p4:null,hair:false,flat:false,styles:['premium'],why:'就在景福宫周边，适合临时决定；款式覆盖传统和王室主题，但建议先确认 4 小时方案。'},
{name:'DoryeongAssi Hanbok 도령아씨한복',score:4.6,tag:'不强推升级',area:'景福宫站',q:'DoryeongAssi Hanbok Gyeongbokgung',price:'Special ₩15,000 / 2h · Premium ₩25,000 / 2h · Latest ₩35,000 / 2h',entry:15000,p4:null,hair:false,flat:false,styles:['premium','fusion'],why:'评价常提到服务友好、不会强推升级；适合不想在选款时有压力的情侣。'}
];

let activeFilter='all',activeSort='score';
function filtered(){
  let a=shops.filter(s=>activeFilter==='all'||(activeFilter==='budget'&&s.entry<=25000)||(activeFilter==='4h'&&s.p4&&s.p4<=30000)||(activeFilter==='flat'&&s.flat)||(activeFilter==='hair'&&s.hair)||(activeFilter==='premium'&&s.styles.includes('premium'))||(activeFilter==='top'&&s.score>=4.8));
  a=[...a].sort((x,y)=>activeSort==='price'?(x.entry-y.entry):(y.score-x.score));return a;
}
function renderShops(){
  const g=document.getElementById('hanbokGrid');if(!g)return;
  const a=filtered();
  g.innerHTML=a.length?a.map(s=>`<div class="card hanbokCard"><div class="time">${s.tag} · ${s.area}</div><div class="place">${s.name} <span class="hanbokStar">★ ${s.score.toFixed(1)}</span></div><div class="hanbokPrice">💰 ${s.price}</div><div class="meta">${s.why}</div><div class="hanbokTags">${s.flat?'<span>统一价</span>':''}${s.hair?'<span>含基础发型</span>':''}${s.p4&&s.p4<=30000?'<span>4h ≤ ₩30k</span>':''}${s.styles.includes('premium')?'<span>Premium</span>':''}</div><div class="hanbokBtns"><a class="dayToggle" target="_blank" rel="noopener" href="${maps(s.q)}">Google Maps</a><a class="dayToggle" target="_blank" rel="noopener" href="${xhs(s.q)}">小红书</a></div></div>`).join(''):'<div class="card"><div class="meta">没有符合这个筛选条件的店。</div></div>';
  const c=document.getElementById('hanbokCount');if(c)c.textContent=`显示 ${a.length} / ${shops.length} 家`;
}
function setFilter(v,btn){activeFilter=v;document.querySelectorAll('.hanbokFilter').forEach(x=>x.classList.remove('active'));btn.classList.add('active');renderShops()}
function setSort(v){activeSort=v;renderShops()}
window.hanbokSetFilter=setFilter;window.hanbokSetSort=setSort;

function buildTab(){
  const nav=document.getElementById('tabs'),main=document.querySelector('main'); if(!nav||!main||document.getElementById('hanbok'))return;
  const b=document.createElement('button');b.className='tab';b.textContent='韩服';
  const sec=document.createElement('section');sec.className='view';sec.id='hanbok';
  sec.innerHTML=`<div class="sectionHead"><div><h2>👘 韩服拍摄</h2><p>DAY 2 · 景福宫 × 北村 · Couple Travel Film</p></div></div>
  <div class="card day" style="margin-bottom:14px"><div class="time">推荐拍摄时段</div><div class="place">08:30–12:00 · 韩服主拍摄</div><div class="meta">08:30 穿搭/发型 → 09:00 景福宫 → 10:45 北村 → 12:00 归还韩服</div><div class="rec"><b>📸 拍摄重点：</b>宫墙长焦、回廊对称构图、牵手背影、走路慢动作、发饰与袖口特写。</div><div class="shot">💡 建议优先比较 4 小时总价，而不是门口“起价”。2026 年景福宫周边 4 小时基础档中位数约 ₩20,000/人，实际会因服装等级、发型和配件上升；2027 出发前 30 天再核价。</div></div>
  <div class="hanbokToolbar"><div class="hanbokFilters"><button class="hanbokFilter active" onclick="hanbokSetFilter('all',this)">全部</button><button class="hanbokFilter" onclick="hanbokSetFilter('top',this)">★ 4.8+</button><button class="hanbokFilter" onclick="hanbokSetFilter('budget',this)">入门 ≤ ₩25k</button><button class="hanbokFilter" onclick="hanbokSetFilter('4h',this)">4h ≤ ₩30k</button><button class="hanbokFilter" onclick="hanbokSetFilter('flat',this)">统一价</button><button class="hanbokFilter" onclick="hanbokSetFilter('hair',this)">含基础发型</button><button class="hanbokFilter" onclick="hanbokSetFilter('premium',this)">Premium</button></div><select onchange="hanbokSetSort(this.value)"><option value="score">推荐度排序</option><option value="price">起价排序</option></select></div>
  <div id="hanbokCount" class="meta" style="margin:8px 2px 12px">显示 ${shops.length} / ${shops.length} 家</div><div class="hanbokGrid" id="hanbokGrid"></div>
  <div class="card" style="margin-top:14px"><div class="place">价格怎么看</div><div class="meta">这里显示的是 2026 年公开价，用作参考，不代表 2027 年最终售价。网上平台促销可能低于门市价；“起价”通常只对应基础款。你们这趟建议把 <b>4 小时 + 发型 + 配件</b> 的实际总价作为比较标准。</div></div>`;
  main.appendChild(sec);nav.appendChild(b);
  b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));sec.classList.add('active')};
  const st=document.createElement('style');st.textContent=`.hanbokGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.hanbokStar{color:#d69b19;font-size:13px;margin-left:6px}.hanbokPrice{margin:8px 0;padding:9px 10px;border-radius:10px;background:#fff7e8;border:1px solid #f1dbad;color:#7a5615;font-size:12px;font-weight:800;line-height:1.55}.hanbokBtns,.hanbokFilters,.hanbokTags{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.hanbokBtns a{text-decoration:none;display:inline-block}.hanbokTags span{font-size:10px;font-weight:800;border:1px solid #efc4d5;background:#fff7fb;color:#9d3f68;padding:5px 7px;border-radius:999px}.hanbokToolbar{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;flex-wrap:wrap;margin:0 0 6px}.hanbokFilter,.hanbokToolbar select{border:1px solid #efc4d5;background:#fff;color:#8f4164;border-radius:10px;padding:8px 10px;font:800 11px system-ui;cursor:pointer}.hanbokFilter.active{background:#e85b97;color:#fff;border-color:#e85b97}.hanbokToolbar select{min-width:125px}@media(max-width:760px){.hanbokGrid{grid-template-columns:1fr}.hanbokToolbar{display:block}.hanbokToolbar select{margin-top:10px;width:100%}}`;document.head.appendChild(st);renderShops();
}
rerenderDay2();buildTab();setTimeout(()=>{rerenderDay2();buildTab()},500);
})();