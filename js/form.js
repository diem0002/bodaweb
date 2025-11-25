// No necesitamos JavaScript para el formulario embebido
// Pero podemos agregar tracking simple

console.log('✅ Formulario de confirmación cargado');

// Opcional: Contador de cargas del formulario
document.addEventListener('DOMContentLoaded', function() {
    const loads = parseInt(localStorage.getItem('formLoads') || '0');
    localStorage.setItem('formLoads', (loads + 1).toString());
    console.log(`📊 El formulario se ha cargado ${loads + 1} veces`);
});

// Función opcional para ver estadísticas (solo para vos)
function verEstadisticas() {
    const loads = localStorage.getItem('formLoads') || '0';
    console.log(`📈 Estadísticas:
    - Cargas del formulario: ${loads}
    - Fecha: ${new Date().toLocaleString()}
    `);
}