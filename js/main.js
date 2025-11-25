
// Countdown CORREGIDO con zona horaria local
function actualizarCountdown() {
    // Fecha CORRECTA para hoy 25 de Noviembre 2025 a las 16:00 LOCAL
    const fechaBoda = new Date(2025, 10, 27, 16, 0, 0); // Mes 10 = Noviembre (0-11)
    
    const ahora = new Date();
    const diferencia = fechaBoda.getTime() - ahora.getTime();
    
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    console.log('DEBUG:', {
        horaActual: ahora.toLocaleString(),
        horaBoda: fechaBoda.toLocaleString(),
        diferenciaHoras: (diferencia / (1000 * 60 * 60)).toFixed(1) + ' horas',
        yaPasó: diferencia < 0
    });

    if (diferencia > 0) {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        
        // VERDADERO cálculo de "mañana"
        const manana = new Date();
        manana.setDate(manana.getDate() + 1);
        const esManana = fechaBoda.getDate() === manana.getDate() && 
                        fechaBoda.getMonth() === manana.getMonth() && 
                        fechaBoda.getFullYear() === manana.getFullYear();
        
        // VERDADERO cálculo de "hoy"  
        const esHoy = fechaBoda.getDate() === ahora.getDate() && 
                     fechaBoda.getMonth() === ahora.getMonth() && 
                     fechaBoda.getFullYear() === ahora.getFullYear();

        console.log('Cálculos:', { esHoy, esManana, dias, horas, minutos });

        if (esHoy) {
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
        else if (esManana) {
            countdownElement.innerHTML = `
                <div class="countdown-dias">
                    <span class="numero-dias">¡Mañana!</span>
                    <small>nos casamos</small>
                    <div style="font-size: 0.8rem; margin-top: 0.5rem; color: #666;">
                        en ${horas + (dias * 24)}h ${minutos}m
                    </div>
                </div>
            `;
        }
        else if (dias > 0) {
            countdownElement.innerHTML = `
                <div class="countdown-dias">
                    <span class="numero-dias">${dias}</span>
                    <small>días para nuestro gran día</small>
                </div>
            `;
        }
    } else {
        // Ya pasó la boda
        countdownElement.innerHTML = `
            <div class="countdown-final">
                <span class="texto-final">¡Hoy es el gran día!</span>
                <small>Gracias por acompañarnos</small>
            </div>
        `;
    }
}

// Función para abrir maps
function abrirMapa(tipo) {
    let url;
    
    if (tipo === 'ceremonia') {
        url = 'https://maps.google.com/?q=Castorial+Sara+Antonio+de+Padua';
    } else {
        url = 'https://maps.google.com/?q=Cuba+Progresiva';
    }
    
    window.open(url, '_blank');
}

// ========== NAVBAR FUNCTIONALITY ==========

// Navbar functionality
function initNavbar() {
    const navbar = document.querySelector('.navbar-elegante');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navbar) return; // Si no existe el navbar nuevo, salir
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scroll for navigation - MEJORADO
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajuste para navbar fijo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========== ANIMACIONES AL SCROLL ==========

// Efectos de animación al scroll
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

    // Observar elementos para animar
    const elementsToAnimate = document.querySelectorAll('.card-evento, .form-embed-container, .alias-card, .agendar-content, .faq-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========== FUNCIONES DE DEBUG ==========

// Función para ver estadísticas (solo desarrollo)
function debugInfo() {
    console.log('🐛 Debug Info:');
    console.log('- Navbar:', document.querySelector('.navbar-elegante') ? '✅ Encontrado' : '❌ No encontrado');
    console.log('- Countdown:', document.getElementById('countdown') ? '✅ Encontrado' : '❌ No encontrado');
    console.log('- Form confirmación:', document.getElementById('confirmar') ? '✅ Encontrado' : '❌ No encontrado');
    console.log('- Fecha de boda:', new Date('2025-04-26T16:00:00').toLocaleDateString());
}

// ========== INICIALIZACIÓN COMPLETA ==========

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando web de boda...');
    
    // 1. Countdown - actualizar inmediatamente y cada minuto
    actualizarCountdown();
    setInterval(actualizarCountdown, 60000); // Cada minuto en lugar de cada segundo
    
    // 2. Navbar
    initNavbar();
    initSmoothScroll();
    
    // 3. Animaciones
    initScrollAnimations();
    
    // 4. Debug info (opcional - quitar en producción)
    debugInfo();
    
    console.log('✅ Web inicializada correctamente');
});

// Función para probar el countdown con fechas diferentes (solo desarrollo)
function testCountdown(dias = 0) {
    const fechaTest = new Date();
    fechaTest.setDate(fechaTest.getDate() + dias);
    fechaTest.setHours(16, 0, 0, 0);
    
    const fechaBodaOriginal = new Date('2025-04-26T16:00:00');
    window.testFechaOriginal = fechaBodaOriginal;
    
    // Temporalmente cambiar la fecha para testing
    window.actualizarCountdown = function() {
        const ahora = new Date().getTime();
        const diferencia = fechaTest.getTime() - ahora;
        const countdownElement = document.getElementById('countdown');
        
        if (!countdownElement) return;

        if (diferencia > 0) {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            
            if (dias > 1) {
                countdownElement.innerHTML = `
                    <div class="countdown-dias">
                        <span class="numero-dias">${dias}</span>
                        <small>días para nuestro gran día</small>
                        <div style="font-size: 0.7rem; margin-top: 0.5rem; color: #999;">TEST: ${dias} días</div>
                    </div>
                `;
            } else if (dias === 1) {
                countdownElement.innerHTML = `
                    <div class="countdown-dias">
                        <span class="numero-dias">¡Mañana!</span>
                        <small>nos casamos</small>
                        <div style="font-size: 0.7rem; margin-top: 0.5rem; color: #999;">TEST: 1 día</div>
                    </div>
                `;
            } else {
                countdownElement.innerHTML = `
                    <div class="countdown-hoy">
                        <span class="numero-dias">¡Hoy es el día!</span>
                        <small>Falta poco para la ceremonia</small>
                        <div class="countdown-horas">
                            <span>${horas.toString().padStart(2, '0')}</span>:<span>${minutos.toString().padStart(2, '0')}</span>
                        </div>
                        <div style="font-size: 0.7rem; margin-top: 0.5rem; color: #999;">TEST: Hoy</div>
                    </div>
                `;
            }
        } else {
            countdownElement.innerHTML = `
                <div class="countdown-final">
                    <span class="texto-final">¡Hoy es el gran día!</span>
                    <small>Gracias por acompañarnos</small>
                    <div style="font-size: 0.7rem; margin-top: 0.5rem; color: rgba(255,255,255,0.7);">TEST: Pasado</div>
                </div>
            `;
        }
    };
    
    // Actualizar inmediatamente
    window.actualizarCountdown();
    console.log(`🧪 Test countdown: ${dias} días desde hoy`);
}

// Función para restaurar countdown normal
function restaurarCountdownNormal() {
    window.actualizarCountdown = actualizarCountdown;
    actualizarCountdown();
    console.log('✅ Countdown restaurado a fecha real');
}