function copiarAlias() {
    const alias = document.getElementById('alias-text').textContent;
    
    // Usar Clipboard API
    navigator.clipboard.writeText(alias).then(function() {
        // Mostrar feedback
        const boton = document.querySelector('.btn-copy');
        const htmlOriginal = boton.innerHTML;
        
        boton.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 5px; margin-bottom: 3px;"><polyline points="20 6 9 17 4 12"></polyline></svg> Copiado!';
        boton.style.background = 'var(--verde-oliva)';
        
        setTimeout(() => {
            boton.innerHTML = htmlOriginal;
            boton.style.background = '';
        }, 2000);
        
    }).catch(function(err) {
        // Fallback para navegadores antiguos
        const textArea = document.createElement('textarea');
        textArea.value = alias;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        alert('Alias copiado: ' + alias);
    });
}

// Funciones del Modal de Regalos
function abrirModalRegalos() {
    const modal = document.getElementById('modal-regalos');
    if (modal) modal.style.display = 'flex';
}

function cerrarModalRegalos() {
    const modal = document.getElementById('modal-regalos');
    if (modal) modal.style.display = 'none';
}

window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-regalos');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});