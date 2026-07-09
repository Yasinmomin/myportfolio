 const toggle = document.getElementById("navtoggle");
 const menu = document.getElementById("navmenu");

 toggle.addEventListener('click', ()  => {

    const isopen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded',isopen);
 });

 menu.querySelectorAll('a').forEach(link =>{
    link.addEventListener('click',() =>{
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');

    })
 });