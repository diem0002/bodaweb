function agendarEnCalendario() {
    const fechaBoda = '20261121T200000';
    const fechaFin = '20261122T210000';
    
    const detalles = {
        title: 'Boda de Florencia & Joaquin',
        description: '¡No te pierdas nuestro día especial! Ceremonia a las 21:00.',
        location: 'Salon de eventos Cuatro elementos,concordia (Ruta Nacional 015, Km 5.5, Acceso Norte)',
        start: fechaBoda,
        end: fechaFin
    };
    
    const urlGoogleCalendar = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${detalles.start}/${detalles.end}&text=${encodeURIComponent(detalles.title)}&details=${encodeURIComponent(detalles.description)}&location=${encodeURIComponent(detalles.location)}`;
    
    window.open(urlGoogleCalendar, '_blank');
    
    // Mostrar confirmación
    alert('¡Gracias por agendar nuestra fecha! Se abrirá Google Calendar para que confirmes.');
}