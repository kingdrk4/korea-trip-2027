(()=>{
function decodeKeyword(href){try{const u=new URL(href,location.href);return u.searchParams.get('keyword')||''}catch(e){return''}}
function webUrl(q){return 'https://www.xiaohongshu.com/search_result?keyword='+encodeURIComponent(q)+'&source=web_explore_feed'}
function appUrl(q){return 'xhsdiscover://search/result?keyword='+encodeURIComponent(q)+'&target_search=notes&source=deeplink'}
async function copy(q,b){try{await navigator.clipboard.writeText(q);const old=b.textContent;b.textContent='已复制 ✓';setTimeout(()=>b.textContent=old,1400)}catch(e){prompt('复制这个关键词到小红书 App 搜索：',q)}}
function fix(){
 const links=[...document.querySelectorAll('a[href*="xiaohongshu.com/search_result"]')];
 links.forEach(a=>{
  const q=a.dataset.xhsKeyword||decodeKeyword(a.getAttribute('href'));if(!q)return;
  a.dataset.xhsKeyword=q;a.href=webUrl(q);a.target='_blank';a.rel='noopener noreferrer';a.title='小红书网页版搜索：'+q;
  if(!a.nextElementSibling?.classList?.contains('xhsOpenApp')){
   const app=document.createElement('button');app.type='button';app.className='xhsOpenApp';app.textContent='打开小红书 App';
   app.onclick=e=>{e.preventDefault();e.stopPropagation();location.href=appUrl(q)};
   const cp=document.createElement('button');cp.type='button';cp.className='xhsCopy';cp.textContent='复制关键词';cp.onclick=e=>{e.preventDefault();e.stopPropagation();copy(q,cp)};
   a.insertAdjacentElement('afterend',cp);a.insertAdjacentElement('afterend',app);
  }
 });
}
const s=document.createElement('style');s.textContent=`.xhsOpenApp,.xhsCopy{border:1px solid #f1bfd3;background:#fff7fb;color:#a53d69;border-radius:9px;padding:7px 9px;font-size:10px;font-weight:800;margin-left:4px;cursor:pointer}.xhsOpenApp{background:#ff5c9b;color:#fff;border-color:#ff5c9b}`;document.head.appendChild(s);
fix();setTimeout(fix,400);setTimeout(fix,1200);new MutationObserver(()=>fix()).observe(document.body,{childList:true,subtree:true});
})();