import {categories,moods,conditions,products,dietaryTags,orderTags,byId,categoryOf,money,matches,cartTotal,cartCount} from './data.js';

const icons={
 leaf:'<path d="M20 4C8 2 3 8 5 17c9 3 16-2 15-13Z"/><path d="m4 21 12-12"/>',
 arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',back:'<path d="m14 5-7 7 7 7"/>',
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',minus:'<path d="M5 12h14"/>',check:'<path d="m5 12 4 4L19 6"/>',
 bag:'<path d="M5 8h14l2 13H3L5 8Z"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/>',
 bell:'<path d="M5 16h14l-2-3V9a5 5 0 0 0-10 0v4l-2 3Z"/><path d="M9 20h6M12 2v2"/>',
 table:'<path d="m4 6-2 8h20l-2-8H4ZM6 14l-2 7m14-7 2 7"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6h4"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14c2 4 6 4 8 0M8 8h.01M16 8h.01"/>',
 moon:'<path d="M20 14A8 8 0 0 1 10 4a9 9 0 1 0 10 10Z"/>',
 gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13"/><path d="M12 8C3 8 5 0 9 3l3 5c9 0 7-8 3-5l-3 5Z"/>',
 flame:'<path d="M12 2c2 5 7 7 7 13a7 7 0 0 1-14 0c0-3 2-5 3-7 0 3 2 4 3 4 2-3 1-7 1-10Z"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>',
 activity:'<path d="M2 12h4l3-8 6 16 3-8h4"/>',strength:'<path d="M7 3H4v8l-2 2v7h17c4-4 2-9-1-11l-3 2-3-2-5 2V3Z"/>',
 bowl:'<path d="M3 12h18c0 6-4 9-9 9s-9-3-9-9ZM7 3c-3 3 3 4 0 7m5-7c-3 3 3 4 0 7m5-7c-3 3 3 4 0 7"/>',
 snow:'<path d="M12 2v20M3 7l18 10M3 17 21 7M9 4l3 3 3-3M9 20l3-3 3 3"/>',
 heart:'<path d="M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-4 4 0 8 8 15 8-7 12-11 8-15Z"/>',
 edit:'<path d="m15 4 5 5M4 16 16 4a2 2 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
 trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
 sparkle:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>'
};
const icon=(name,cls='')=>`<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.leaf}</svg>`;
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ASSET='https://chenyuhan-lgmi.github.io/food-picker/taste/assets/';
const image=p=>`${ASSET}${p.image}.jpg`;
const storageKey='taste-order-v1';
let stored={};try{stored=JSON.parse(localStorage.getItem(storageKey)||'{}')}catch{}
const tableParam=new URLSearchParams(location.search).get('table');
const validTable=t=>typeof t==='string'&&/^[A-Za-z0-9\u4e00-\u9fa5-]{1,12}$/.test(t);
const state={
 view:['menu','checkout'].includes(location.hash.slice(1))?location.hash.slice(1):'home',
 table:validTable(tableParam)?tableParam:validTable(stored.table)?stored.table:'',
 cart:Array.isArray(stored.cart)?stored.cart.filter(l=>byId(l.id)&&Number.isInteger(l.quantity)&&l.quantity>0&&l.quantity<=99).map(l=>({...l,tags:(l.tags||[]).filter(t=>dietaryTags.includes(t)),note:String(l.note||'').slice(0,100)})):[],
 orderTags:Array.isArray(stored.orderTags)?stored.orderTags.filter(t=>orderTags.includes(t)):[],
 orderNote:String(stored.orderNote||'').slice(0,200),query:'',mood:'',states:[],category:'all',
 cartOpen:false,detail:null,dialog:null,tableNext:null
};
let toastTimer,returnFocus;
const persist=()=>{try{localStorage.setItem(storageKey,JSON.stringify({table:state.table,cart:state.cart,orderTags:state.orderTags,orderNote:state.orderNote}))}catch{}};
const price=()=>money(cartTotal(state.cart));
const count=()=>cartCount(state.cart);
const logo=()=>`<button class="brand" data-action="home" aria-label="食刻 TASTE 首页"><span class="brand-word"><b>食刻</b><strong>TASTE</strong>${icon('leaf','brand-leaf')}</span><span class="brand-sub">EVERYDAY LIGHT EATING</span></button>`;
const header=checkout=>`<header class="topbar ${checkout?'checkout-topbar':''}">${checkout?`<button class="back-title" data-action="back-edit">${icon('back')}<span>确认订单</span></button>`:logo()}<div class="header-actions">${checkout?logo():''}<button class="table-pill" data-action="table">${icon('table')}<span>${state.table?`桌号：${escape(state.table)}`:'桌号待确认'}</span>${icon(state.table?'edit':'arrow','small-icon')}</button>${checkout?'':`<button class="service-btn" data-action="service">${icon('bell')}<span>呼叫服务员</span></button>`}</div></header>`;

function route(view){state.view=view;state.cartOpen=false;state.detail=null;state.dialog=null;if(view==='checkout'&&!count())state.view='menu';location.hash=state.view;render()}
function toast(msg){const el=document.querySelector('#toast');el.innerHTML=`${icon('check')}<span>${escape(msg)}</span>`;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2600)}
function searchBox(id='menu-search'){return `<label class="search-box">${icon('search')}<input id="${id}" type="search" placeholder="搜索鸡胸、牛肉、藜麦、素食" value="${escape(state.query)}" aria-label="搜索菜品" autocomplete="off">${state.query?`<button data-action="clear-query" aria-label="清空搜索">${icon('close')}</button>`:''}</label>`}
function moodButtons(home=false){return moods.map(m=>`<button class="filter-chip mood-chip ${state.mood===m.id?'selected':''}" data-action="${home?'home-mood':'mood'}" data-id="${m.id}" aria-pressed="${state.mood===m.id}">${icon(m.icon)}<span>${m.name}</span>${state.mood===m.id?`<span class="selected-check">${icon('check')}</span>`:''}</button>`).join('')}

function renderHome(){return `${header()}<main class="home-page"><section class="hero"><div class="hero-copy"><div class="eyebrow">FRESH FOOD. GOOD MOOD.</div><h1>好好吃饭，<br>轻盈一点<span class="hero-leaf">${icon('leaf')}</span></h1><p class="hero-description">能量碗 / 焖饭 / 多多卷 / 帕尼尼 / 沙拉</p>${searchBox('home-search')}<button class="button primary start-btn" data-action="start">开始选餐 ${icon('arrow')}</button><div class="hero-footnote"><span class="tiny-dot"></span>认真对待，每一餐的小满足</div></div><div class="hero-photo"><img src="${ASSET}hero.jpg" alt="自然光下的鸡胸牛油果谷物轻食碗" fetchpriority="high"><div class="photo-note">新鲜食材 · 轻盈日常</div></div></section><section class="home-moods"><div class="mood-heading"><h2>今天想吃什么？选个心情</h2><span>让一餐，刚好合你心意</span></div><div class="mood-grid">${moodButtons(true)}</div></section></main>`}

function sidebar(){return `<aside class="category-sidebar" aria-label="菜品分类"><nav><button class="category-btn mobile-all ${state.category==='all'?'active':''}" data-action="category" data-id="all" aria-pressed="${state.category==='all'}"><b>全部菜单</b></button>${categories.map(c=>`<button class="category-btn ${state.category===c.id?'active':''}" data-action="category" data-id="${c.id}" aria-pressed="${state.category===c.id}"><img src="${ASSET}${c.image}.jpg" alt=""><span><b>${c.name}</b><small>${c.time}min</small></span></button>`).join('')}</nav><button class="all-menu ${state.category==='all'?'active':''}" data-action="category" data-id="all">${icon('grid')}<span>浏览全部菜单</span>${icon('arrow','small-icon')}</button></aside>`}
function productCard(p,compact=false){const c=categoryOf(p);const qty=state.cart.filter(l=>l.id===p.id).reduce((n,l)=>n+l.quantity,0);return `<article class="food-card ${compact?'compact-card':''} ${p.soldOut?'sold-out':''}"><button class="food-photo" data-action="detail" data-id="${p.id}" aria-label="查看${p.name}" ${p.soldOut?'disabled':''}><img src="${image(p)}" alt="${p.name}" loading="lazy" decoding="async">${p.soldOut?'<span class="sold-out-label">售罄</span>':qty?`<span class="food-qty">已选 ${qty}</span>`:''}</button><div class="food-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="food-time">${icon('clock')}<span>${c.time}min · 分类平均</span></div><div class="food-bottom"><strong class="food-price">${money(p.price)}</strong><button class="add-btn" data-action="detail" data-id="${p.id}" aria-label="${p.soldOut?'已售罄':'加购'}${p.name}" ${p.soldOut?'disabled':''}>${icon('plus')}</button></div></div></article>`}
function recommendedHero(p){return `<article class="editors-pick"><button class="pick-image" data-action="detail" data-id="${p.id}" aria-label="查看${p.name}"><img src="${image(p)}" alt="${p.name}" loading="lazy"></button><div class="pick-copy"><span class="eyebrow orange">EDITOR’S PICK</span><h2>${p.name}</h2><div class="small-tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div><p>${p.reason}</p><div class="pick-footer"><strong class="price">${money(p.price)}</strong><button class="button primary" data-action="detail" data-id="${p.id}">加入 ${icon('plus')}</button></div></div></article>`}
function filters(){const mood=moods.find(m=>m.id===state.mood);const hasFilter=!!state.mood||state.states.length;return `<section class="filter-panel"><div class="section-heading"><h2>今天想吃什么？</h2><p>选个心情，帮你挑</p></div><div class="mood-grid">${moodButtons()}</div><div class="condition-grid">${conditions.map(c=>`<button class="filter-chip condition-chip ${state.states.includes(c.id)?'selected':''}" data-action="condition" data-id="${c.id}" aria-pressed="${state.states.includes(c.id)}">${icon(c.icon)}<span>${c.name}</span>${state.states.includes(c.id)?`<span class="selected-check">${icon('check')}</span>`:''}</button>`).join('')}</div>${hasFilter?`<div class="filter-banner">${icon('leaf')}<span>${state.states.length?'按你的选择，优先展示匹配菜品':mood.description}</span><button data-action="clear-filters">清除筛选 ${icon('close')}</button></div>`:''}${state.mood==='light'||state.states.includes('lean')?`<div class="suggestion">${icon('info')}<span>可考虑少油、少盐 · 加购时由你确认</span></div>`:''}</section>`}
function emptyResults(message='暂时没有符合全部条件的菜品'){return `<div class="empty-results">${icon('search')}<h3>${message}</h3><p>试着放宽一个条件，或继续浏览全部菜单。</p><button class="button secondary" data-action="clear-all">清除条件，浏览菜单</button></div>`}
function cartBar(){return `<footer class="cart-bar"><button class="cart-open-area" data-action="cart" aria-label="打开购物车"><span class="bag-icon">${icon('bag')}${count()?`<span class="bag-badge">${count()}</span>`:''}</span><span class="cart-count">已选 <b>${count()}</b> 件</span><span class="cart-divider"></span><span class="cart-hint">${count()?'查看购物车':'请选择菜品'}</span>${count()?icon('arrow','small-icon'):''}</button><div class="cart-bar-total">合计 <strong>${price()}</strong></div><button class="button primary checkout-btn" data-action="cart" ${!count()?'disabled':''}>去结算 ${icon('arrow')}</button></footer>`}
function menuContent(){
 const hasFilter=!!state.mood||state.states.length;
 let selected=products.filter(p=>matches(p,state));
 if(state.category!=='all')selected=selected.filter(p=>p.category===state.category);
 let content='';
 if(state.query.trim()){
  content=`<section class="menu-section"><div class="section-heading"><h2>搜索结果</h2><p>共 ${selected.length} 款相关菜品</p></div>${selected.length?`<div class="food-grid ${selected.length<=2?'two-col':''}">${selected.map(p=>productCard(p)).join('')}</div>`:emptyResults('没有找到相关菜品')}</section>`;
 }else if(state.category!=='all'){
  const category=categories.find(c=>c.id===state.category);
  content=`<section class="menu-section"><div class="section-heading"><h2>${category.name}</h2><p>${category.time} 分钟 · 分类平均制作时长</p></div>${selected.length?`<div class="food-grid category-grid">${selected.map(p=>productCard(p)).join('')}</div>`:emptyResults()}</section>`;
 }else{
  const matchesList=products.filter(p=>matches(p,state));
  const featured=hasFilter?matchesList:products.filter(p=>['chicken','pumpkin','wrap','panini'].includes(p.id));
  const title=hasFilter?(state.mood?`${moods.find(m=>m.id===state.mood).name}推荐`:'为你推荐'):'今天，吃点新鲜的';
  content=`<section class="menu-section"><div class="section-heading"><h2>${title} ${icon('leaf','title-leaf')}</h2><p>${hasFilter?`${featured.length} 款匹配菜品`:'好食材，好好吃'}</p></div>${featured.length?(!hasFilter?recommendedHero(byId('chicken')):'')+`<div class="food-grid">${featured.slice(0,8).map(p=>productCard(p)).join('')}</div>`:emptyResults()}</section><section class="menu-section"><div class="section-heading"><h2>全部菜单</h2><p>更多美味选择，照顾不同口味</p></div><div class="food-grid compact-grid">${products.map(p=>productCard(p,true)).join('')}</div></section>`;
 }
 return `${searchBox()}${filters()}${content}<div class="menu-end">${icon('leaf')}<span>好好吃饭，轻盈一点。</span></div>`;
}
function renderMenu(){return `${header()}<main class="menu-layout">${sidebar()}<div class="menu-content" id="menu-scroll">${menuContent()}</div></main>${cartBar()}`}
function estimate(){const cats=[...new Set(state.cart.map(l=>byId(l.id).category))].map(id=>categories.find(c=>c.id===id));if(!cats.length)return '';const longest=cats.reduce((best,c)=>Number(c.time.split('–')[1])>Number(best.time.split('–')[1])?c:best);return longest.time}
function noteMarkup(line){const notes=[...line.tags,line.note].filter(Boolean);return notes.length?`<div class="item-notes">${icon('leaf')}<span>忌口：${escape(notes.join('、'))}</span></div>`:''}
function orderNotes(){const lines=[...state.orderTags,state.orderNote].filter(Boolean);return lines.length?`<section class="order-notes-panel"><h2>整单忌口</h2><div class="item-notes">${icon('leaf')}<span>${escape(lines.join('；'))}</span></div></section>`:''}
function renderCheckout(){return `${header(true)}<main class="checkout-layout"><div class="order-left"><section class="order-details"><div class="section-heading"><h2>订单明细</h2><p>请核对菜品与忌口</p></div><div class="order-table-head"><span>菜品</span><span>数量</span><span>单价</span><span>小计</span></div>${state.cart.map(l=>{const p=byId(l.id);return `<article class="order-row"><img src="${image(p)}" alt="${p.name}"><div class="order-row-content"><div class="order-row-values"><h3>${p.name}</h3><span>${l.quantity}</span><span>${money(p.price)}</span><strong>${money(p.price*l.quantity)}</strong></div>${noteMarkup(l)}</div></article>`}).join('')}</section>${orderNotes()}</div><aside class="order-summary"><h2>订单摘要</h2><div class="time-summary">${icon('clock')}<div><h3>预计出餐时间</h3><strong>${estimate()}<small> 分钟</small></strong><p>按分类平均制作时长估算<br>实际出餐以门店为准</p></div></div><div class="total-summary"><h3>订单总金额</h3><strong>${price()}</strong><span>共 ${count()} 件菜品</span></div><button class="button secondary" data-action="back-edit">返回修改</button><button class="button primary" data-action="submit">提交订单并去支付 ${icon('arrow')}</button><p class="summary-note">提交前可随时修改菜品与忌口。<br>当前为点餐演示，未接入真实支付。</p></aside></main>`}

function restoreSearchFocus(previous){if(!previous?.id)return;const input=document.getElementById(previous.id);if(input){input.focus();try{input.setSelectionRange(previous.start,previous.end)}catch{}}}
function render(){const focused=document.activeElement;const previous=focused?.tagName==='INPUT'?{id:focused.id,start:focused.selectionStart,end:focused.selectionEnd}:null;const scroll=document.querySelector('#menu-scroll')?.scrollTop||0;document.querySelector('#app').innerHTML=state.view==='home'?renderHome():state.view==='checkout'?renderCheckout():renderMenu();const menu=document.querySelector('#menu-scroll');if(menu)menu.scrollTop=scroll;renderLayers();restoreSearchFocus(previous)}
function stepper(quantity,context,key=''){return `<div class="stepper"><button data-action="${context}-minus" data-key="${key}" aria-label="减少数量">${icon('minus')}</button><span>${quantity}</span><button data-action="${context}-plus" data-key="${key}" aria-label="增加数量" ${quantity>=99?'disabled':''}>${icon('plus')}</button></div>`}
function cartDrawer(){return `<div class="overlay" data-action="dismiss-overlay"><section class="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title"><div class="drawer-header"><h2 id="cart-title">购物车 <small>已选 <b>${count()}</b> 件</small></h2><button class="close-btn" data-action="close-cart" aria-label="关闭购物车">${icon('close')}</button></div>${count()?`<div class="drawer-content">${state.cart.map(l=>{const p=byId(l.id);return `<article class="cart-item"><div class="cart-item-main"><img src="${image(p)}" alt="${p.name}"><div class="cart-item-info"><h3>${p.name}</h3><p>${categoryOf(p).name}</p><strong>${money(p.price)}</strong></div><div class="cart-item-right">${stepper(l.quantity,'cart',l.key)}<p>小计 <strong>${money(p.price*l.quantity)}</strong></p></div></div><div class="cart-item-note">${noteMarkup(l)}<button data-action="edit-item" data-key="${l.key}">修改忌口</button><button class="delete-btn" data-action="delete-item" data-key="${l.key}" aria-label="删除${p.name}">${icon('trash')}</button></div></article>`}).join('')}<section class="whole-order"><h3>整单忌口</h3><p class="helper">建议需主动确认；请写明共同过敏源。</p><div class="tag-group">${orderTags.map(t=>`<button class="tag ${state.orderTags.includes(t)?'selected':''}" data-action="order-tag" data-tag="${t}" aria-pressed="${state.orderTags.includes(t)}">${state.orderTags.includes(t)?icon('check'):''}${t}</button>`).join('')}</div><label class="field-label" for="order-note">其他整单要求（选填）</label><textarea id="order-note" maxlength="200" placeholder="填写整单忌口或共同过敏源">${escape(state.orderNote)}</textarea><span class="char-count" id="order-note-count">${state.orderNote.length}/200</span></section></div>`:`<div class="empty-cart"><span class="empty-bag">${icon('bag')}</span><h3>购物车还是空的</h3><p>请选择菜品</p><button class="button secondary" data-action="close-cart">返回菜单</button></div>`}<div class="drawer-footer"><div>合计 <strong>${price()}</strong></div><button class="button primary" data-action="confirm-order" ${!count()?'disabled':''}>去确认订单 ${icon('arrow')}</button></div></section></div>`}
function detailModal(){const d=state.detail,p=byId(d.id);return `<div class="overlay" data-action="dismiss-overlay"><section class="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title"><button class="close-btn" data-action="close-detail" aria-label="关闭菜品详情">${icon('close')}</button><div class="detail-scroll"><div class="detail-header"><img src="${image(p)}" alt="${p.name}"><div><span class="eyebrow">FRESHLY PREPARED</span><h2 id="detail-title">${p.name}</h2><p>${p.desc}</p><div class="small-tags"><span>${categoryOf(p).name}</span></div><strong class="detail-price">${money(p.price)}</strong></div></div><section class="dietary-section"><div class="section-heading"><h3>忌口偏好</h3><p>按你的口味来</p></div><div class="tag-group">${dietaryTags.map(t=>`<button class="tag ${d.tags.includes(t)?'selected':''}" data-action="diet-tag" data-tag="${t}" aria-pressed="${d.tags.includes(t)}">${d.tags.includes(t)?icon('check'):''}${t}</button>`).join('')}</div></section><div class="allergen-warning">${icon('info')}<div><b>过敏源提示</b><p>如对以下成分过敏，请联系服务员确认。</p><div class="allergen-tags"><span>坚果</span><span>海鲜</span><span>乳制品</span><span>麸质</span></div></div></div><label class="field-label" for="item-note">其他忌口要求（选填）</label><textarea id="item-note" maxlength="100" placeholder="填写其他忌口要求">${escape(d.note)}</textarea><span class="char-count" id="item-note-count">${d.note.length}/100</span></div><div class="detail-footer">${stepper(d.quantity,'detail')}<div class="detail-subtotal">小计 <strong>${money(p.price*d.quantity)}</strong></div><button class="button primary" data-action="save-item">${d.editKey?'保存修改':'加入购物车'} ${icon('arrow')}</button></div></section></div>`}
function smallDialog(){let title='',body='',buttons='';if(state.dialog==='table'){title='确认你的桌号';body=`<p>让美味准确来到你的桌边。</p><label class="field-label" for="table-input">桌号</label><input id="table-input" class="text-field" placeholder="例如 A08" maxlength="12" value="${escape(state.table)}" autocomplete="off"><p id="table-error" class="field-error" aria-live="polite"></p>`;buttons='<button class="button primary" data-action="save-table">确认桌号</button>'}else if(state.dialog==='service'){title='呼叫服务员';body=`<div class="dialog-illustration">${icon('bell')}</div><p>当前为点餐演示，尚未连接门店服务。<br>用餐需要协助时，请直接联系工作人员。</p>`;buttons='<button class="button primary" data-action="close-dialog">知道了</button>'}else if(state.dialog==='submitted'){title='演示订单已提交';body=`<div class="dialog-illustration">${icon('check')}</div><p>桌号 ${escape(state.table)} · 共 ${count()} 件</p><strong class="dialog-total">${price()}</strong><p>点餐流程已完成。<br>尚未接入真实门店订单和支付，不会扣款。</p>`;buttons='<button class="button primary" data-action="new-order">继续选餐</button>'}return `<div class="overlay" data-action="dismiss-overlay"><section class="small-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title">${state.dialog!=='submitted'?`<button class="close-btn" data-action="close-dialog" aria-label="关闭弹窗">${icon('close')}</button>`:''}<h2 id="dialog-title">${title}</h2>${body}<div class="dialog-buttons">${buttons}</div></section></div>`}
function renderLayers(){
 const html=state.detail?detailModal():state.dialog?smallDialog():state.cartOpen?cartDrawer():'';
 const old=document.activeElement;const wasInLayer=document.querySelector('#layers').contains(old);
 const previous=wasInLayer?{id:old.id,action:old.dataset.action,key:old.dataset.key,tag:old.dataset.tag}:null;
 document.querySelector('#layers').innerHTML=html;document.querySelector('#app').inert=!!html;
 if(html){const dialog=document.querySelector('[role="dialog"]');let next;
  if(previous?.id)next=document.getElementById(previous.id);
  if(!next&&previous?.action)next=[...dialog.querySelectorAll('[data-action]')].find(el=>el.dataset.action===previous.action&&el.dataset.key===previous.key&&el.dataset.tag===previous.tag);
  (next||dialog.querySelector('#table-input')||dialog.querySelector('button'))?.focus({preventScroll:true});
 }
}
function openDetail(id,editKey){if(!byId(id)||byId(id).soldOut){toast('该菜品已售罄');return}returnFocus=document.activeElement;const line=state.cart.find(l=>l.key===editKey);state.detail={id,quantity:line?.quantity||1,tags:line?[...line.tags]:[],note:line?.note||'',editKey:editKey||null};renderLayers()}
function closeDetail(){state.detail=null;renderLayers();returnFocus?.isConnected&&returnFocus.focus()}
function saveItem(){const d=state.detail;const line={id:d.id,quantity:d.quantity,tags:[...d.tags],note:d.note.trim()};if(d.editKey){const old=state.cart.find(l=>l.key===d.editKey);Object.assign(old,line)}else{const same=state.cart.find(l=>l.id===line.id&&[...l.tags].sort().join()===line.tags.sort().join()&&l.note===line.note);if(same){if(same.quantity+line.quantity>99){toast('同一配置最多选择 99 件');return}same.quantity+=line.quantity}else{state.cart.push({...line,key:crypto.randomUUID?.()||String(Date.now())})}}state.detail=null;persist();render();toast(d.editKey?'菜品与忌口已更新':'已加入购物车')}
function needTable(next){if(!state.table){state.tableNext=next;state.dialog='table';renderLayers();return true}return false}
function confirmOrder(){if(!count())return;if(needTable('checkout'))return;route('checkout')}
function submit(){if(!count())return;if(needTable('submit'))return;state.dialog='submitted';renderLayers()}
function resetFilters(all=false){state.mood='';state.states=[];if(all){state.query='';state.category='all'}render()}

document.addEventListener('click',e=>{
 const button=e.target.closest('[data-action]');if(!button||button.disabled)return;
 const a=button.dataset.action,id=button.dataset.id,key=button.dataset.key,tag=button.dataset.tag;
 if(a==='dismiss-overlay'&&e.target!==button)return;
 switch(a){
  case 'home':route('home');break;
  case 'start':route('menu');break;
  case 'home-mood':state.mood=id;route('menu');break;
  case 'mood':state.mood=state.mood===id?'':id;render();break;
  case 'condition':state.states=state.states.includes(id)?state.states.filter(s=>s!==id):[...state.states,id];render();break;
  case 'category':state.category=id;render();document.querySelector('#menu-scroll')?.scrollTo({top:0});break;
  case 'clear-query':state.query='';render();break;
  case 'clear-filters':resetFilters();break;
  case 'clear-all':resetFilters(true);break;
  case 'detail':openDetail(id);break;
  case 'edit-item':openDetail(state.cart.find(l=>l.key===key).id,key);break;
  case 'close-detail':closeDetail();break;
  case 'detail-plus':if(state.detail.quantity<99)state.detail.quantity++;renderLayers();break;
  case 'detail-minus':if(state.detail.quantity>1)state.detail.quantity--;renderLayers();break;
  case 'diet-tag':{const d=state.detail;if(d.tags.includes(tag))d.tags=d.tags.filter(t=>t!==tag);else{if(['免辣','微辣','加辣'].includes(tag))d.tags=d.tags.filter(t=>!['免辣','微辣','加辣'].includes(t));d.tags.push(tag)}renderLayers();break;}
  case 'save-item':saveItem();break;
  case 'cart':returnFocus=button;state.cartOpen=true;renderLayers();break;
  case 'close-cart':state.cartOpen=false;renderLayers();returnFocus?.isConnected&&returnFocus.focus();break;
  case 'cart-plus':case 'cart-minus':{const l=state.cart.find(l=>l.key===key);if(a==='cart-plus'&&l.quantity<99)l.quantity++;else if(a==='cart-minus'){l.quantity--;if(l.quantity===0)state.cart=state.cart.filter(x=>x.key!==key)}persist();render();break;}
  case 'delete-item':state.cart=state.cart.filter(l=>l.key!==key);persist();render();toast('已移除菜品');break;
  case 'order-tag':state.orderTags=state.orderTags.includes(tag)?state.orderTags.filter(t=>t!==tag):[...state.orderTags,tag];persist();renderLayers();break;
  case 'confirm-order':confirmOrder();break;
  case 'back-edit':route('menu');state.cartOpen=true;renderLayers();break;
  case 'submit':submit();break;
  case 'table':returnFocus=button;state.dialog='table';renderLayers();break;
  case 'save-table':{const value=document.querySelector('#table-input').value.trim();if(!validTable(value)){document.querySelector('#table-error').textContent='请输入 1–12 位桌号，使用文字、字母、数字或短横线。';return}state.table=value;const next=state.tableNext;state.tableNext=null;state.dialog=null;persist();render();if(next==='checkout')confirmOrder();else if(next==='submit')submit();else toast('桌号已确认');break;}
  case 'service':returnFocus=button;state.dialog='service';renderLayers();break;
  case 'close-dialog':state.dialog=null;state.tableNext=null;renderLayers();returnFocus?.isConnected&&returnFocus.focus();break;
  case 'new-order':state.cart=[];state.orderTags=[];state.orderNote='';persist();route('menu');break;
  case 'dismiss-overlay':if(state.detail)closeDetail();else if(state.dialog!=='submitted'){state.cartOpen=false;state.dialog=null;state.tableNext=null;renderLayers()}break;
 }
});
document.addEventListener('input',e=>{
 if(e.target.id==='menu-search'){state.query=e.target.value;render()}
 if(e.target.id==='home-search')state.query=e.target.value;
 if(e.target.id==='item-note'){state.detail.note=e.target.value;document.querySelector('#item-note-count').textContent=`${e.target.value.length}/100`}
 if(e.target.id==='order-note'){state.orderNote=e.target.value;persist();document.querySelector('#order-note-count').textContent=`${e.target.value.length}/200`}
});
document.addEventListener('keydown',e=>{
 if(e.key==='Enter'&&e.target.id==='home-search'){route('menu');return}
 if(e.key==='Enter'&&e.target.id==='table-input'){document.querySelector('[data-action="save-table"]').click();return}
 const dialog=document.querySelector('[role="dialog"]');if(!dialog)return;
 if(e.key==='Escape'&&state.dialog!=='submitted'){if(state.detail)closeDetail();else{state.dialog=null;state.cartOpen=false;state.tableNext=null;renderLayers()}return}
 if(e.key==='Tab'){const els=[...dialog.querySelectorAll('button:not([disabled]),input,textarea')].filter(el=>el.getClientRects().length);const first=els[0],last=els.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}
});
window.addEventListener('hashchange',()=>{const view=location.hash.slice(1);if(['home','menu','checkout'].includes(view)&&state.view!==view){state.view=view==='checkout'&&!count()?'menu':view;state.cartOpen=false;state.detail=null;state.dialog=null;render()}});
persist();render();
