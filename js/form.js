const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx5bg0VNUaJl1XdX4b7oJ839lIgfC7Y8vQ8VK7o2N4lpmmF7khT54atxhC23KycaXFm/exec';

document.getElementById('form-asistencia').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        nombre: document.getElementById('nombre').value.trim(),
        email: document.getElementById('email').value.trim(),
        asistentes: document.getElementById('asistentes').value,
        mensaje: document.getElementById('mensaje').value.trim()
    };
    
    if (!formData.nombre || !formData.email || !formData.asistentes) {
        alert('Por favor completá todos los campos obligatorios');
        return;
    }
    
    enviarConfirmacion(formData);
});

function enviarConfirmacion(datos) {
    const boton = document.querySelector('#form-asistencia button');
    const textoOriginal = boton.textContent;
    boton.textContent = 'Enviando...';
    boton.disabled = true;
    
    console.log('🚀 Enviando confirmación:', datos);
    
    // Método 1: JSONP (el más confiable con GAS)
    const params = new URLSearchParams({
        nombre: datos.nombre,
        email: datos.email,
        asistentes: datos.asistentes,
        mensaje: datos.mensaje || '',
        callback: 'confirmacionRecibida'
    }).toString();
    
    const script = document.createElement('script');
    script.src = `${SCRIPT_URL}?${params}`;
    
    window.confirmacionRecibida = function(response) {
        script.remove();
        delete window.confirmacionRecibida;
        
        console.log('📨 Respuesta:', response);
        
        if (response && response.success) {
            document.getElementById('form-asistencia').reset();
            mostrarMensaje('✅', `¡Gracias ${datos.nombre}! Confirmación registrada.`);
            limpiarLocalStorage(datos);
        } else {
            throw new Error(response ? response.message : 'Error desconocido');
        }
        
        boton.textContent = textoOriginal;
        boton.disabled = false;
    };
    
    script.onerror = function() {
        console.error('❌ Falló JSONP, intentando con Google Forms directo');
        script.remove();
        if (window.confirmacionRecibida) delete window.confirmacionRecibida;
        
        // Fallback: Redirigir a Google Forms
        redirigirAGoogleForms(datos);
        boton.textContent = textoOriginal;
        boton.disabled = false;
    };
    
    document.head.appendChild(script);
}

function redirigirAGoogleForms(datos) {
    // URL de tu Google Form - ACTUALIZÁ ESTO CON TU FORM
    const formUrl = 'https://docs.google.com/forms/d/TU_FORM_ID_AQUI/viewform';
    
    const params = new URLSearchParams({
        'entry.XXXXXXXXX': datos.nombre,    // ← Actualizar IDs
        'entry.XXXXXXXXX': datos.email,     // ← de campos
        'entry.XXXXXXXXX': datos.asistentes,// ← del form
        'entry.XXXXXXXXX': datos.mensaje    // ← reales
    });
    
    const urlCompleta = `${formUrl}?${params.toString()}`;
    
    if (confirm('Se abrirá Google Forms para completar la confirmación. ¿Continuar?')) {
        window.open(urlCompleta, '_blank');
    }
}

function mostrarMensaje(icono, mensaje) {
    alert(icono + ' ' + mensaje);
}

function limpiarLocalStorage(datos) {
    let pendientes = JSON.parse(localStorage.getItem('confirmacionesBoda')) || [];
    pendientes = pendientes.filter(item => 
        item.nombre !== datos.nombre || item.email !== datos.email
    );
    localStorage.setItem('confirmacionesBoda', JSON.stringify(pendientes));
}

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    const pendientes = JSON.parse(localStorage.getItem('confirmacionesBoda')) || [];
    if (pendientes.length > 0) {
        console.log(`📋 Tienes ${pendientes.length} confirmaciones pendientes`);
    }
});