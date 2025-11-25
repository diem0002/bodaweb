// Countdown para la boda
function actualizarCountdown() {
    const fechaBoda = new Date('2024-12-15T16:00:00').getTime();
    const ahora = new Date().getTime();
    const diferencia = fechaBoda - ahora;

    if (diferencia > 0) {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = dias.toString().padStart(2, '0');
        document.getElementById('hours').textContent = horas.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutos.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = segundos.toString().padStart(2, '0');
    } else {
        document.getElementById('countdown').innerHTML = '¡Hoy es el gran día!';
    }
}

// Inicializar mapas (placeholders por ahora)
function inicializarMapas() {
    document.getElementById('mapa-ceremonia').innerHTML = 
        '<p>📍 Mapa de la Iglesia San José</p>';
    document.getElementById('mapa-recepcion').innerHTML = 
        '<p>📍 Mapa del Salón Las Flores</p>';
}

// Función para abrir maps
function abrirMapa(tipo) {
    let url;
    
    if (tipo === 'ceremonia') {
        url = 'https://maps.google.com/?q=Av.+Siempre+Viva+123,Ciudad';
    } else {
        url = 'https://maps.google.com/?q=Calle+Falsa+456,Ciudad';
    }
    
    window.open(url, '_blank');
}

// Smooth scroll para navegación
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar
    actualizarCountdown();
    inicializarMapas();
    
    // Actualizar countdown cada segundo
    setInterval(actualizarCountdown, 1000);
    
    // Efecto de scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Scroll suave para nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para el nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de nav al hacer scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.padding = '0.5rem 0';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.padding = '1rem 0';
        }
    });