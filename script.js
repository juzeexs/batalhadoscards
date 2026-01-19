const card = document.getElementById('card');
let rotateX = 0, rotateY = 0;
let targetX = 0, targetY = 15;
let isDragging = false;
let startX, startY;

function animate() {

    rotateX += (targetX - rotateX) * 0.1;
    rotateY += (targetY - rotateY) * 0.1;
    
    if (card) {
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        const bx = 50 + (rotateY * 1.5); 
        const by = 50 + (rotateX * 1.5);
        
        card.style.setProperty('--mx', `${bx}%`);
        card.style.setProperty('--my', `${by}%`);
        
        card.style.setProperty('--angle', `${135 - (rotateY * 2)}deg`);
    }
    requestAnimationFrame(animate);
}
animate();

const onMove = (e) => {

    const x = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
    const y = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);

    if (isDragging) {
        targetY += (x - startX) * 0.5;
        targetX -= (y - startY) * 0.5;
        startX = x; 
        startY = y;
    } else {
        targetY = ((x / window.innerWidth) - 0.5) * 40;
        targetX = ((y / window.innerHeight) - 0.5) * -40;
    }
};

window.addEventListener('mousedown', e => { isDragging = true; startX = e.clientX; startY = e.clientY; });
window.addEventListener('touchstart', e => { isDragging = true; startX = e.touches[0].clientX; startY = e.touches[0].clientY; }, {passive: false});
window.addEventListener('mousemove', onMove);
window.addEventListener('touchmove', e => { onMove(e); e.preventDefault(); }, {passive: false});
window.addEventListener('mouseup', () => isDragging = false);
window.addEventListener('touchend', () => isDragging = false);

function changeTheme(bank) {
    document.body.className = `theme-${bank}`;
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase() === bank);
    });

    const db = {
        nubank: { logo: 'nubank', num: '5162 4800 1122 8347', name: 'Nubank S.A.', brand: 'master' },
        picpay: { logo: 'PicPay', num: '5256 6200 9988 4421', name: 'PicPay Pagamentos S.A.', brand: 'master' },
        santander: { logo: 'Santander', num: '4544 3200 5544 1092', name: 'Banco Santander S.A.', brand: 'visa' }
    };

    const c = db[bank];
    if (c) {
        document.getElementById('logo-display').innerText = c.logo;
        document.getElementById('card-num-display').innerText = c.num;
        document.getElementById('bank-full-name').innerText = c.name;

        const brandDiv = document.getElementById('card-brand');
        brandDiv.innerHTML = c.brand === 'master' 
            ? '<div class="mastercard-circles"><div class="circle red"></div><div class="circle orange"></div></div>'
            : '<span class="visa-logo">VISA</span>';
    }
}