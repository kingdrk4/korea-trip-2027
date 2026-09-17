(()=>{
const AIRBNB_URL='https://www.airbnb.co.uk/rooms/1741147734847814544';
const TOTAL=2009.22, PEOPLE=4, PER_PERSON=TOTAL/PEOPLE;
function updateSeoulStay(){
 const list=document.getElementById('stayList'); if(!list)return;
 const cards=[...list.querySelectorAll('.card')];
 const c=cards.find(x=>/3\/6|Seoul|首尔/.test(x.textContent)); if(!c)return;
 c.innerHTML=`<div class="time">3/6–3/10 · 4N · 已预订</div><div class="place">Seoul · Sindang / Hwanghak-dong <span class="v7stars">✓ CONFIRMED</span></div><div class="meta">Airbnb · Hwanghak-dong 659, Jung-gu, Seoul · 靠近 Sindang Station / DDP。Check-in 5:00 PM · Check-out 11:00 AM · 3 Rooms · 2 Bathrooms · 4人入住。</div><div class="shot">1楼 Lobby 可免费寄存行李 · 房源没有 bidet / washlet / 冲洗喷枪。</div><div class="v7actions"><a class="dayToggle" target="_blank" href="${AIRBNB_URL}">Airbnb</a><a class="dayToggle" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Hwanghak-dong 659, Jung-gu, Seoul')}">Google Maps</a></div>`;
}
function updateBudget(){
 const view=document.getElementById('hotelBudgetView'); if(!view)return;
 view.innerHTML=`RM ${TOTAL.toFixed(2)}<div class="small" style="margin-top:6px">首尔 Airbnb · 4晚 · 4人<br>RM ${PER_PERSON.toFixed(2)} / 人</div>`;
 view.title='Seoul Airbnb confirmed accommodation cost';
}
function run(){updateSeoulStay();updateBudget()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(run,700));else setTimeout(run,700);
setTimeout(run,1800);
})();