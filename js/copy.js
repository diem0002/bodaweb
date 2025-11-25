function copiarAlias() {
    const alias = document.getElementById('alias-text').textContent;
    
    // Usar Clipboard API
    navigator.clipboard.writeText(alias).then(function() {
        // Mostrar feedback
        const boton = document.querySelector('.btn-copy');
        const textoOriginal = boton.textContent;
        
        boton.textContent = '✅ Copiado!';
        boton.style.background = 'var(--verde-pastel)';
        
        setTimeout(() => {
            boton.textContent = textoOriginal;
            boton.style.background = 'var(--celeste-pastel)';
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