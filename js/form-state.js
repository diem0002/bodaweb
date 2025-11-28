// js/form-state.js - Manejo inteligente del estado del formulario
class FormStateManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.iframe = document.querySelector('.form-embed-container iframe');
        this.contenedor = document.querySelector('.form-embed-container');
        this.backupText = document.querySelector('.form-backup');
        
        if (!this.iframe) return;
        
        this.startMonitoring();
    }
    
    startMonitoring() {
        // Verificar inmediatamente
        this.checkFormState();
        
        // Seguir monitoreando cada 2 segundos
        this.interval = setInterval(() => {
            this.checkFormState();
        }, 2000);
    }
    
    checkFormState() {
        try {
            const iframeSrc = this.iframe.src.toLowerCase();
            const isSubmitted = iframeSrc.includes('formresponse') || 
                              iframeSrc.includes('alreadyresponded') ||
                              iframeSrc.includes('submitted');
            
            if (isSubmitted) {
                this.applySubmittedStyles();
                this.stopMonitoring();
            }
        } catch (e) {
            // Error de CORS, continuar silenciosamente
        }
    }
    
    applySubmittedStyles() {
        this.contenedor.classList.add('formulario-enviado');
        
        // Opcional: ajustar altura del iframe
        this.iframe.style.minHeight = '200px';
        this.iframe.style.height = '200px';
        
        // Ocultar texto de backup
        if (this.backupText) {
            this.backupText.style.display = 'none';
        }
    }
    
    stopMonitoring() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new FormStateManager();
});