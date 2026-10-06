const WHATSAPP = '5511997034894';

const products = [
  {id:1,name:'Caixinha Mini Surpresa',price:34.90,category:'Caixinhas',badge:'4 itens',desc:'Quatro itens surpresa selecionados para uma experiência delicada e divertida.',media:'media-box',art:'Mini'},
  {id:2,name:'Caixinha Super Surpresa',price:64.90,category:'Caixinhas',badge:'8 itens',desc:'Oito itens surpresa em uma seleção maior, ideal para presente ou unboxing.',media:'media-box',art:'Super'},
  {id:3,name:'Presilhas Misteriosas',price:19.90,category:'Cabelo',badge:'Mais querida',desc:'Laços, estrelas e modelos delicados. A combinação exata é parte da surpresa.',media:'media-box',art:'Clips'},
  {id:4,name:'Presilhas Rock',price:24.90,category:'Cabelo',badge:'Coleção rock',desc:'Uma seleção com preto, pink, estrelas e uma estética mais marcante.',media:'media-rock',art:'Rock'},
  {id:5,name:'Acessórios de Cabelo',price:29.90,category:'Cabelo',badge:'Mix',desc:'Combinação misteriosa de presilhas, scrunchies e acessórios selecionados.',media:'media-box',art:'Hair'},
  {id:6,name:'Chaveiro Misterioso',price:24.90,category:'Acessórios',badge:'Fofo',desc:'Chaveiro grande em modelo surpresa, escolhido conforme disponibilidade.',media:'media-gift',art:'Key'},
  {id:7,name:'Pulseira Misteriosa',price:29.90,category:'Acessórios',badge:'Presenteável',desc:'Pulseira delicada em uma combinação surpresa da curadoria Clara Bellla.',media:'media-gift',art:'Pulseira'},
  {id:8,name:'Papelaria Misteriosa',price:39.90,category:'Papelaria',badge:'13–16 anos',desc:'Canetas, adesivos, bloquinhos e itens criativos em uma seleção jovem.',media:'media-paper',art:'Paper'},
  {id:9,name:'Kit Presente Professores',price:49.90,category:'Presentes',badge:'Edição especial',desc:'Papelaria e acessórios em uma composição pensada para presentear com carinho.',media:'media-gift',art:'Prof'}
];

let cart = JSON.parse(localStorage.getItem('claraCart') || '[]');
let activeCategory = 'Todos';

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = v => v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

function icon(name,size=20){
  const paths={
    bag:'<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    gift:'<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8H7.5A2.5 2.5 0 1 1 10 5.5L12 8Zm0 0h4.5A2.5 2.5 0 1 0 14 5.5L12 8Z"/>',
    truck:'<path d="M3 5h11v11H3z"/><path d="M14 9h4l3 3v4h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
    shield:'<path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
    heart:'<path d="M20.8 5.8a5.4 5.4 0 0 0-7.6 0L12 7l-1.2-1.2a5.4 5.4 0 1 0-7.6 7.6L12 22l8.8-8.6a5.4 5.4 0 0 0 0-7.6Z"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    close:'<path d="m6 6 12 12M18 6 6 18"/>',
    whatsapp:'<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.7 8.7 0 0 1-3.6-.8L3 20.5l1.5-5.2A8.5 8.5 0 1 1 21 11.5Z"/><path d="M9 8.5c.3 2.6 1.9 4.6 4.8 5.7"/>',
    spark:'<path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z"/><path d="m18 14 .7 2.1 2.1.7-2.1.7L18 19.6l-.7-2.1-2.1-.7 2.1-.7L18 14Z"/>',
    arrow:'<path d="M5 12h14M14 7l5 5-5 5"/>',
    check:'<path d="m5 12 4 4L19 6"/>'
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.spark}</svg>`;
}

function artMarkup(p){
  return `<div class="product-art">
    <i class="spark s1"></i><i class="spark s2"></i>
    <div class="pack"><b>Clara Bellla</b><small>${p.art}</small></div>
  </div>`;
}

function renderFilters(){
  const categories=['Todos',...new Set(products.map(p=>p.category))];
  $('#filters').innerHTML=categories.map(c=>`<button class="filter-btn ${activeCategory===c?'active':''}" data-filter="${c}">${c}</button>`).join('');
  $$('#filters [data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
    activeCategory=btn.dataset.filter;renderFilters();renderProducts();
  }));
}

function renderProducts(){
  const list=activeCategory==='Todos'?products:products.filter(p=>p.category===activeCategory);
  $('#productsGrid').innerHTML=list.map(p=>`
    <article class="product-card">
      <div class="product-media ${p.media}">
        <span class="product-badge">${p.badge}</span>
        ${artMarkup(p)}
      </div>
      <div class="product-body">
        <span class="product-kicker">${p.category}</span>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="product-footer">
          <span class="price">${money(p.price)}</span>
          <button class="add-btn" aria-label="Adicionar ${p.name}" onclick="addToCart(${p.id})">${icon('plus',18)}</button>
        </div>
      </div>
    </article>`).join('');
}

function total(){
  return cart.reduce((sum,item)=>{
    const p=products.find(x=>x.id===item.id);
    return p?sum+p.price*item.qty:sum;
  },0);
}

function count(){
  return cart.reduce((sum,item)=>sum+item.qty,0);
}

function save(){
  localStorage.setItem('claraCart',JSON.stringify(cart));
  renderCart();
  renderBonus();
}

function addToCart(id){
  const found=cart.find(i=>i.id===id);
  found?found.qty++:cart.push({id,qty:1});
  save();showToast('Produto adicionado ao carrinho');
}

function changeQty(id,delta){
  const item=cart.find(i=>i.id===id);
  if(!item)return;
  item.qty+=delta;
  if(item.qty<=0)cart=cart.filter(i=>i.id!==id);
  save();
}

function removeItem(id){
  cart=cart.filter(i=>i.id!==id);save();
}

function renderCart(){
  $('#cartCount').textContent=count();
  const body=$('#cartBody');
  if(!cart.length){
    body.innerHTML='<div class="empty-cart"><strong>Seu carrinho está vazio.</strong><p>Escolha seus favoritos e volte aqui para finalizar pelo WhatsApp.</p></div>';
  }else{
    body.innerHTML=cart.map(item=>{
      const p=products.find(x=>x.id===item.id);
      return `<div class="cart-item">
        <div class="cart-thumb">CB</div>
        <div><strong>${p.name}</strong><small>${money(p.price)}</small>
          <div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${item.qty}</span><button onclick="changeQty(${p.id},1)">+</button></div>
        </div>
        <button class="remove" onclick="removeItem(${p.id})">remover</button>
      </div>`;
    }).join('');
  }
  $('#cartTotal').textContent=money(total());
  const remaining=Math.max(0,100-total());
  $('#drawerGift').innerHTML=remaining===0?'<strong>Seu Saquinho Misterioso está garantido.</strong> Ele será incluído no pedido.':`Faltam <strong>${money(remaining)}</strong> para ganhar o Saquinho Misterioso.`;
}

function renderBonus(){
  const t=total(),remaining=Math.max(0,100-t);
  const pct=Math.min(100,(t/100)*100);
  $('#bonusProgress').style.width=pct+'%';
  $('#bonusTitle').textContent=t>=100?'Presente desbloqueado: Saquinho Misterioso':'Ganhe um Saquinho Misterioso';
  $('#bonusText').textContent=t>=100?'Seu carrinho já atingiu R$ 100,00. O mimo será incluído no pedido.':`Faltam ${money(remaining)} para liberar seu presente.`;
}

function openCart(){
  $('#overlay').classList.add('open');$('#cartDrawer').classList.add('open');document.body.classList.add('no-scroll');
}
function closeCart(){
  $('#overlay').classList.remove('open');$('#cartDrawer').classList.remove('open');document.body.classList.remove('no-scroll');
}

function checkout(){
  if(!cart.length){showToast('Adicione pelo menos um produto ao carrinho');return;}
  const t=total();
  const lines=['Olá! Quero fazer um pedido na Clara Bellla.','','Meu carrinho:'];
  cart.forEach(item=>{
    const p=products.find(x=>x.id===item.id);
    lines.push(`• ${item.qty}x ${p.name} — ${money(p.price*item.qty)}`);
  });
  lines.push('',`Total: ${money(t)}`);
  if(t>=100)lines.push('Presente da promoção: Saquinho Misterioso.');
  lines.push('','Pode me confirmar disponibilidade, pagamento e entrega?');
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer');
}

function openWhatsApp(){
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá! Vim pelo site da Clara Bellla e gostaria de tirar uma dúvida.')}`,'_blank','noopener,noreferrer');
}

let toastTimer;
function showToast(message){
  const t=$('#toast');t.textContent=message;t.classList.add('show');
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),2200);
}

function initFaq(){
  $$('.faq-question').forEach(btn=>btn.addEventListener('click',()=>{
    btn.parentElement.classList.toggle('open');
  }));
}

function initNav(){
  $('#menuBtn').addEventListener('click',()=>$('#mobileNav').classList.toggle('open'));
  $$('#mobileNav a').forEach(a=>a.addEventListener('click',()=>$('#mobileNav').classList.remove('open')));
}

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon,Number(el.dataset.size||20)));
  renderFilters();renderProducts();renderCart();renderBonus();initFaq();initNav();
  $('#cartBtn').addEventListener('click',openCart);$('#overlay').addEventListener('click',closeCart);$('#drawerClose').addEventListener('click',closeCart);
  $('#checkoutBtn').addEventListener('click',checkout);$('#whatsappFab').addEventListener('click',openWhatsApp);
});