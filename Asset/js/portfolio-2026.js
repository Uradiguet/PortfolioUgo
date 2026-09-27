const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('.site-nav');
menuButton?.addEventListener('click',()=>{const open=menu.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');document.body.classList.toggle('menu-open',open)});
menu?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Ouvrir le menu');document.body.classList.remove('menu-open')}));
const filters=document.querySelectorAll('.filter');
const cards=document.querySelectorAll('.project-card');
filters.forEach(button=>button.addEventListener('click',()=>{const selected=button.dataset.filter;filters.forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active))});cards.forEach(card=>{card.hidden=selected!=='all'&&card.dataset.category!==selected})}));
document.getElementById('year').textContent=new Date().getFullYear();
