(()=>{
function decodeKeyword(href){try{const u=new URL(href,location.href);return u.searchParams.get('keyword')||''}catch(e){return''}}
function direct(q){return 'https://www.xiaohongshu.com/search_result/?keyword='+encodeURIComponent(q)+'&type=51'}
function fix(){
  const links=[...document.querySelectorAll('a[href*="xiaohongshu.com/search_result"]')];
  links.forEach(a=>{
    const q=decodeKeyword(a.getAttribute('href'));
    if(!q)return;
    a.href=direct(q);a.target='_blank';a.rel='noopener noreferrer';a.dataset.xhsKeyword=q;
    a.title='打开小红书搜索：'+q;
    if(!a.querySelector('.xhsFallback')){
      const b=document.createElement('button');
      b.type='button';b.className='xhsFallback';b.textContent='复制关键词';b.title='如果小红书网页要求登录或无法跳转，可复制关键词后在 App 内搜索';
      b.onclick=async e=>{e.preventDefault();e.stopPropagation();try{await navigator.clipboard.writeText(q);b.textContent='已复制 ✓';setTimeout(()=>b.textContent='复制关键词',1400)}catch(err){prompt('复制这个关键词到小红书 App 搜索：',q)}};
      a.insertAdjacentElement('afterend',b);
    }
  });
}
const s=document.createElement('style');s.textContent=`.xhsFallback{border:1px solid #f1bfd3;background:#fff7fb;color:#a53d69;border-radius:9px;padding:7px 9px;font-size:10px;font-weight:800;margin-left:4px;cursor:pointer}`;document.head.appendChild(s);
fix();setTimeout(fix,400);setTimeout(fix,1200);new MutationObserver(()=>fix()).observe(document.body,{childList:true,subtree:true});
})();