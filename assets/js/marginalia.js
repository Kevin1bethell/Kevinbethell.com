(function(){
  const input=document.getElementById('marginalia-search'),list=document.getElementById('marginalia-posts'),nav=document.getElementById('marginalia-pages'),filters=document.getElementById('marginalia-tags'),count=document.getElementById('marginalia-count');
  if(!input||!list)return;
  let posts=[];try{posts=JSON.parse(document.getElementById('marginalia-index').textContent)}catch(e){return}
  const allTags=[...new Set(posts.flatMap(p=>p.tags||[]))].sort((a,b)=>a.localeCompare(b));let selected=new URLSearchParams(window.location.search).get('tag')||'',page=1;const perPage=10;
  function el(tag,cls,txt){const node=document.createElement(tag);if(cls)node.className=cls;if(txt!==undefined)node.textContent=txt;return node}
  function tagButton(tag){const b=el('button','tag-pill'+(selected===tag?' active':''),tag);b.type='button';b.setAttribute('aria-pressed',String(selected===tag));b.addEventListener('click',()=>{selected=tag==='All'||selected===tag?'':tag;page=1;render()});return b}
  function render(){document.querySelectorAll('.search-pages').forEach(n=>n.remove());const q=input.value.trim().toLocaleLowerCase();const filtering=!!(q||selected);filters.replaceChildren();if(allTags.length){filters.append(tagButton('All'));for(const tag of allTags){const b=tagButton(tag);if(!selected&&tag==='All')b.classList.add('active');filters.append(b)}}
    if(!filtering){document.querySelectorAll('.search-pages').forEach(n=>n.remove());list.hidden=false;nav.hidden=false;count.hidden=true;return}
    const matches=posts.filter(p=>(!selected||selected==='All'||(p.tags||[]).includes(selected))&&(!q||[p.title,p.description,p.text,...(p.tags||[])].join(' ').toLocaleLowerCase().includes(q)));
    const pages=Math.max(1,Math.ceil(matches.length/perPage));page=Math.min(page,pages);list.replaceChildren();
    for(const p of matches.slice((page-1)*perPage,page*perPage)){const li=el('li'),date=el('p','meta',p.date),a=el('a','',p.title);a.href=p.url;li.append(date,a);if(p.description)li.append(el('p','',p.description));if(p.tags&&p.tags.length){const tags=el('p','entry-tags');p.tags.forEach(t=>tags.append(tagButton(t)));li.append(tags)}list.append(li)}
    if(!matches.length)list.append(el('li','', 'No matching entries.'));
    nav.hidden=true;count.hidden=false;count.textContent=matches.length+' matching '+(matches.length===1?'entry':'entries');
    if(pages>1){const pagination=el('div','marginalia-pages search-pages');const prev=el('button','','← Newer'),next=el('button','','Older →');prev.disabled=page===1;next.disabled=page===pages;prev.onclick=()=>{page--;render()};next.onclick=()=>{page++;render()};pagination.append(prev,el('span','', 'Page '+page+' of '+pages),next);list.after(pagination)}
    document.querySelectorAll('.search-pages').forEach((node,i)=>{if(i>0)node.remove()});
  }
  input.addEventListener('input',()=>{page=1;render()});
  filters.addEventListener('click',()=>{});
  list.addEventListener('click',e=>{const b=e.target.closest('[data-tag]');if(b){selected=b.dataset.tag;page=1;render()}});
  render();
})();