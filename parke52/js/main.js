document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        // Si es solo "#" o está vacío, no hacer nada
        if (targetId === '#' || targetId === '') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const modules = [
    { icon: "fas fa-tablet-alt", title: "KIOSKOS DE AUTOPAGO", text: "Consulta de cuenta, recarga de créditos y pago rápido de forma autónoma." },
    { icon: "fas fa-store", title: "VENTA ASISTIDA EN TAQUILLA", text: "Herramienta ágil para vender, recargar y asociar tarjetas con soporte en sitio." },
    { icon: "fas fa-qrcode", title: "ACCESO INTELIGENTE A ATRACCIONES", text: "Validación rápida, segura y ordenada, reduciendo tiempos de espera." },
    { icon: "fas fa-mobile-alt", title: "APP MÓVIL PARA VISITANTES", text: "Saldo, beneficios y generación de accesos directamente desde el teléfono." },
    { icon: "fas fa-id-card", title: "TARJETA SIN CONTACTO Y QR", text: "Libertad de movimiento dentro del parque con tarjeta o QR dinámico desde la app." },
    { icon: "fas fa-star-of-life", title: "PROGRAMA DE PUNTOS Y BENEFICIOS", text: "Cada visita suma recompensas, descuentos y experiencias especiales." }
];
let currentIndex = 0;
let autoSlideInterval = null;
const AUTO_SLIDE_DELAY = 6000;
const carouselCard = document.getElementById('carousel-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carousel-dots');

function renderCard() {
    const module = modules[currentIndex];
    carouselCard.innerHTML = `<i class="${module.icon}"></i><h3>${module.title}</h3><p>${module.text}</p>`;
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => { if (idx === currentIndex) dot.classList.add('active'); else dot.classList.remove('active'); });
}
function createDots() {
    dotsContainer.innerHTML = '';
    modules.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => { currentIndex = idx; renderCard(); resetAutoSlide(); });
        dotsContainer.appendChild(dot);
    });
}
function nextModule() { currentIndex = (currentIndex + 1) % modules.length; renderCard(); resetAutoSlide(); }
function prevModule() { currentIndex = (currentIndex - 1 + modules.length) % modules.length; renderCard(); resetAutoSlide(); }
function startAutoSlide() { if (autoSlideInterval) clearInterval(autoSlideInterval); autoSlideInterval = setInterval(() => { nextModule(); }, AUTO_SLIDE_DELAY); }
function resetAutoSlide() { if (autoSlideInterval) { clearInterval(autoSlideInterval); startAutoSlide(); } }
if(prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevModule);
    nextBtn.addEventListener('click', nextModule);
}
createDots();
renderCard();
startAutoSlide();
