function agendarEnCalendario() {
    const fechaBoda = '20251126T230000';
    const fechaFin = '20251126T230000';
    
    const detalles = {
        title: 'Boda de María & Juan',
        description: '¡No te pierdas nuestro día especial! Ceremonia a las 16:00 y recepción a las 19:00.',
        location: 'Iglesia San José, Av. Siempre Viva 123, Ciudad',
        start: fechaBoda,
        end: fechaFin
    };
    
    const urlGoogleCalendar = `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${detalles.start}/${detalles.end}&text=${encodeURIComponent(detalles.title)}&details=${encodeURIComponent(detalles.description)}&location=${encodeURIComponent(detalles.location)}`;
    
    window.open(urlGoogleCalendar, '_blank');
    
    // Mostrar confirmación
    alert('¡Gracias por agendar nuestra fecha! Se abrirá Google Calendar para que confirmes.');
}