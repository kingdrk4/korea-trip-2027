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
{name:'Daehan Hanbok 대한한복',score:'4.9',why:'景福宫站附近，评价量大，适合第一次租韩服；营业时间早，最适合你们 DAY 2 早拍。',addr:'133-2 Sajik-ro, Jongno District, Seoul',tag:'首选 · 稳定',q:'Daehan Hanbok Gyeongbokgung'},
{name:'NAYEHANBOK 나예한복',score:'5.0',why:'景福宫旁，评价表现非常高，款式与服务口碑都强，适合情侣拍摄。',addr:'133-10 Sajik-ro, Jongno District, Seoul',tag:'情侣推荐',q:'NAYEHANBOK GYEONGBOKGUNG'},
{name:'3355 Hanbok 삼삼오오',score:'4.7',why:'位置适合景福宫 + 北村线路，选款体验口碑不错，适合想拍传统韩屋氛围。',addr:'41 Yulgok-ro 1-gil, Jongno-gu, Seoul',tag:'路线顺',q:'3355 Hanbok Rental Gyeongbokgung'},
{name:'Hanboknam 한복남',score:'4.8',why:'国际游客知名度高、款式多，并有多语言服务；对第一次体验韩服比较友好。',addr:'133-5 Sajik-ro, Jongno-gu, Seoul',tag:'款式多',q:'Hanboknam Gyeongbokgung'},
{name:'HANBOK DAY 한복데이',score:'4.6',why:'就在景福宫周边，传统/王室主题选择直接，适合想快速完成穿搭后马上进宫拍照。',addr:'7 Hyoja-ro, Jongno District, Seoul',tag:'方便',q:'HANBOK DAY Gyeongbokgung Hanbok Rental'}
];

function buildTab(){
  const nav=document.getElementById('tabs'),main=document.querySelector('main'); if(!nav||!main||document.getElementById('hanbok'))return;
  const b=document.createElement('button');b.className='tab';b.textContent='韩服';
  const sec=document.createElement('section');sec.className='view';sec.id='hanbok';
  sec.innerHTML=`<div class="sectionHead"><div><h2>👘 韩服拍摄</h2><p>DAY 2 · 景福宫 × 北村 · Couple Travel Film</p></div></div>
  <div class="card day" style="margin-bottom:14px"><div class="time">推荐拍摄时段</div><div class="place">08:30–12:00 · 韩服主拍摄</div><div class="meta">08:30 穿搭/发型 → 09:00 景福宫 → 10:45 北村 → 12:00 归还韩服</div><div class="rec"><b>📸 拍摄重点：</b>宫墙长焦、回廊对称构图、牵手背影、走路慢动作、发饰与袖口特写。</div><div class="shot">💡 建议租 4 小时；颜色尽量一深一浅或同色系，Travel Film 画面会更统一。</div></div>
  <div class="hanbokGrid">${shops.map((s,i)=>`<div class="card hanbokCard"><div class="time">#${i+1} · ${s.tag}</div><div class="place">${s.name} <span class="hanbokStar">★ ${s.score}</span></div><div class="meta">${s.why}</div><div class="shot">📍 ${s.addr}</div><div class="hanbokBtns"><a class="dayToggle" target="_blank" rel="noopener" href="${maps(s.q)}">Google Maps</a><a class="dayToggle" target="_blank" rel="noopener" href="${xhs(s.q)}">小红书</a></div></div>`).join('')}</div>
  <div class="card" style="margin-top:14px"><div class="place">预约前 Checklist</div><div class="meta">确认 2027 年 3 月营业时间、4 小时方案是否包含发型/头饰/储物、情侣男装款式、加时费用，以及是否能提前选款。建议出发前 30 天再做一次最终核价。</div></div>`;
  main.appendChild(sec);nav.appendChild(b);
  b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));sec.classList.add('active')};
  const st=document.createElement('style');st.textContent=`.hanbokGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.hanbokStar{color:#d69b19;font-size:13px;margin-left:6px}.hanbokBtns{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.hanbokBtns a{text-decoration:none;display:inline-block}@media(max-width:760px){.hanbokGrid{grid-template-columns:1fr}}`;document.head.appendChild(st);
}
rerenderDay2();buildTab();setTimeout(()=>{rerenderDay2();buildTab()},500);
})();