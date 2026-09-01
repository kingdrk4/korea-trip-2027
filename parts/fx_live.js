(()=>{
const API='https://api.frankfurter.app/latest?from=KRW&to=MYR';
const FALLBACK=0.00294483;
const fmtMYR=n=>'RM '+n.toLocaleString(undefined,{maximumFractionDigits:2});
const fmtKRW=n=>'₩ '+Math.round(n).toLocaleString();
function rate(){const v=parseFloat(localStorage.getItem('krwMyrRate'));return Number.isFinite(v)&&v>0?v:FALLBACK}
function apply(r,date,source='Frankfurter'){
  localStorage.setItem('krwMyrRate',String(r));
  localStorage.setItem('krwMyrRateUpdated',date||new Date().toISOString());
  const box=document.querySelector('.fxBox'); if(!box)return;
  const rateEl=box.querySelector('.fxRate'); if(rateEl)rateEl.textContent=`₩10,000 ≈ RM ${(10000*r).toFixed(2)}`;
  const smalls=box.querySelectorAll('.small');
  if(smalls[0]) smalls[0].textContent=`🇰🇷 KRW ↔ MYR 自动汇率 · ${source} · ${date||'latest'}`;
  if(smalls[1]) smalls[1].textContent=`当前参考率：1 KRW ≈ RM ${r.toFixed(8)}。这是市场参考汇率，不等于银行 / Money Changer 实际成交价。`;
  const inp=document.getElementById('fxRateInput'); if(inp)inp.value=r.toFixed(8);
  if(typeof convertKRW==='function')convertKRW(); if(typeof convertMYR==='function')convertMYR();
  let st=document.getElementById('fxLiveStatus');
  if(!st){st=document.createElement('div');st.id='fxLiveStatus';st.className='small';st.style.marginTop='8px';box.appendChild(st)}
  st.textContent='🟢 已自动更新 · 打开网页时刷新；下方仍可手动输入 Money Changer 实际汇率。';
}
async function refresh(){
  const box=document.querySelector('.fxBox');
  try{
    const res=await fetch(API,{cache:'no-store'}); if(!res.ok)throw new Error('HTTP '+res.status);
    const data=await res.json(); const r=data&&data.rates&&Number(data.rates.MYR); if(!Number.isFinite(r)||r<=0)throw new Error('invalid rate');
    apply(r,data.date||new Date().toISOString().slice(0,10));
  }catch(e){
    const r=rate(); apply(r,localStorage.getItem('krwMyrRateUpdated')||'缓存值','缓存/备用');
    if(box){let st=document.getElementById('fxLiveStatus');if(st)st.textContent='🟠 实时汇率暂时无法连接，正在使用上次成功更新的汇率；仍可手动输入 Money Changer 实际汇率。'}
  }
}
const oldSave=window.saveFxRate;
window.saveFxRate=function(){
  const v=parseFloat(document.getElementById('fxRateInput')?.value);
  if(Number.isFinite(v)&&v>0){localStorage.setItem('krwMyrRate',String(v));localStorage.setItem('krwMyrRateUpdated','手动 '+new Date().toLocaleString('en-MY',{timeZone:'Asia/Kuala_Lumpur'}));if(typeof convertKRW==='function')convertKRW();if(typeof convertMYR==='function')convertMYR();const st=document.getElementById('fxLiveStatus');if(st)st.textContent='✍️ 当前使用你手动输入的实际换汇率。刷新网页后会再次尝试抓取最新市场参考汇率。';alert('实际换汇率已保存并同步')}else if(oldSave)oldSave();
};
setTimeout(refresh,120);
})();