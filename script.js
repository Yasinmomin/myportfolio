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
 const canvas = document.getElementById('frameCanvas')
const context = canvas.getContext('2d')

const frameCount = 51;
const currentFrame = (index) =>
    `frames/ezgif-frame-${String(index +1).padStart(3, '0')}.jpg`;

const images = []
let imagesLoaded = 0;

for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    img.onload = () => {
        imagesLoaded++;
        if (i === 0) drawFrame(0);
    };
    images.push(img);
}

function resizeCanvas() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function drawFrame(index) {
    const img = images[index];
    if (!img || !img.complete) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function updateFrameFromScroll() {
    const stage = document.querySelector('.scroll-stage');
    const stageRect = stage.getBoundingClientRect();
    const stageHeight = stage.offsetHeight - window.innerHeight;

    let progress = -stageRect.top / stageHeight;
    progress = Math.min(Math.max(progress, 0), 1);

    const frameIndex = Math.floor(progress * (frameCount - 1));
    drawFrame(frameIndex);
    progressFill.style.width = `${progress * 100}%`;
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateFrameFromScroll();
            ticking = false;
        });
        ticking = true;
    }
});

updateFrameFromScroll();
