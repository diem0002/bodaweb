// ========== COUNTDOWN CON ZONA HORARIA ARGENTINA ==========

function actualizarCountdown() {
    // 🎯 SOLO CAMBIÁ ESTA FECHA - Formato ISO con zona horaria Argentina
    const fechaBoda = new Date('2026-11-22T20:20:00-03:00'); // 22 Nov 2026, 20:00 ARG
    
    const ahora = new Date(); // Hora local Argentina
    const diferencia = fechaBoda.getTime() - ahora.getTime();
    const countdownElement = document.getElementById('countdown');
    
    if (!countdownElement) return;

    // Debug para verificar
    console.log('🔍 COUNTDOWN:', {
        hoy: ahora.toLocaleString('es-AR'),
        boda: fechaBoda.toLocaleString('es-AR'),
        dias: Math.floor(diferencia / (1000 * 60 * 60 * 24)),
        horas: Math.floor(diferencia / (1000 * 60 * 60))
    });

    if (diferencia > 0) {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        
        if (dias >= 2) {
            countdownElement.innerHTML = `
                <div class="countdown-dias">
                    <span class="numero-dias">${dias}</span>
                    <small>días para nuestro gran día</small>
                </div>
            `;
        }
        else if (dias === 1) {
            countdownElement.innerHTML = `
                <div class="countdown-dias">
                    <span class="numero-dias">¡Mañana!</span>
                    <small>nos casamos</small>
                </div>
            `;
        }
        else {
            const horas = Math.floor(diferencia / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            
            countdownElement.innerHTML = `
                <div class="countdown-hoy">
                    <span class="numero-dias">¡Hoy es el día!</span>
                    <small>Falta poco para la ceremonia</small>
                    <div class="countdown-horas">
                        <span>${horas.toString().padStart(2, '0')}</span>:<span>${minutos.toString().padStart(2, '0')}</span>
                    </div>
                </div>
            `;
        }
    } else {
        countdownElement.innerHTML = `
            <div class="countdown-final">
                <span class="texto-final">¡Hoy es el gran día!</span>
                <small>Gracias por acompañarnos</small>
            </div>
        `;
    }
}

// ========== FUNCIONES DE MAPAS ==========

function abrirMapa(tipo) {
    let url = tipo === 'ceremonia' 
        ? 'https://maps.google.com/?q=Castorial+Sara+Antonio+de+Padua'
        : 'https://maps.google.com/?q=Cuba+Progresiva';
    window.open(url, '_blank');
}

// ========== NAVBAR ==========

function initNavbar() {
    const navbar = document.querySelector('.navbar-elegante');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 100);
    });
    
    if (navToggle) {
        navToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
    }
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });
}

// ========== SCROLL SUAVE ==========

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== ANIMACIONES AL SCROLL ==========

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.card-evento, .form-embed-container, .alias-card, .agendar-content, .faq-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========== FUNCIONES EXTRAS ==========

function debugInfo() {
    const fechaBoda = new Date('2026-11-22T20:00:00-03:00');
    console.log('🐛 Debug Info:');
    console.log('- Fecha boda:', fechaBoda.toLocaleString('es-AR'));
    console.log('- Días faltantes:', Math.floor((fechaBoda - new Date()) / (1000 * 60 * 60 * 24)));
}

// ========== INICIALIZACIÓN ==========

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando web de boda - Zona horaria Argentina');
    
    // Countdown
    actualizarCountdown();
    setInterval(actualizarCountdown, 60000);
    
    // Navbar y scroll
    initNavbar();
    initSmoothScroll();
    
    // Animaciones
    initScrollAnimations();
    
    // Debug
    debugInfo();
    
    console.log('✅ Web lista - Cambiá la fecha en actualizarCountdown()');
});

// 🧪 FUNCIÓN PARA VERIFICAR FECHAS
function verificarFechas() {
    const fechaBoda = new Date('2026-11-22T20:00:00-03:00');
    const ahora = new Date();
    
    console.log('🔍 VERIFICACIÓN FECHAS:', {
        'Hora actual ARG': ahora.toLocaleString('es-AR'),
        'Hora boda ARG': fechaBoda.toLocaleString('es-AR'),
        'Diferencia días': Math.floor((fechaBoda - ahora) / (1000 * 60 * 60 * 24)),
        'Diferencia horas': ((fechaBoda - ahora) / (1000 * 60 * 60)).toFixed(1)
    });
}