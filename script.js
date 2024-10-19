// Obtener el elemento de fecha y hora
const currentDateTime = document.getElementById('current-date-time');

// Función para mostrar la fecha y hora actual
function updateDateTime() {
    const now = new Date();
    currentDateTime.textContent = now.toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' });
}

// Llamar a la función para inicializar la fecha y hora
updateDateTime();
setInterval(updateDateTime, 1000); // Actualizar cada segundo

// Función para mostrar/ocultar aulas
function toggleAulas(button) {
    const aulasDiv = button.nextElementSibling;
    const allAulas = document.querySelectorAll('.aulas');
    const aulaId = button.closest('.aula') ? button.closest('.aula').id : null; // Obtener el ID del aula actual
    const hasCheckedBoxes = Array.from(document.querySelectorAll(`input[name="${aulaId}"]:checked`)).length > 0;

    // Cerrar otras aulas si están abiertas
    allAulas.forEach(aula => {
        if (aula !== aulasDiv) {
            aula.style.display = 'none';
            aula.previousElementSibling.innerHTML = '<i class="fas fa-plus"></i> Ver Aulas'; // Resetear el botón
        }
    });

    // Si hay checkboxes seleccionados y el aula se está cerrando, mostrar alerta
    if (hasCheckedBoxes && aulasDiv.style.display === 'block') {
        Swal.fire({
            title: 'Enviar Reporte',
            text: 'Tienes problemas seleccionados. ¿Deseas enviar el reporte antes de cambiar de aula?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí puedes implementar el código para enviar el reporte
                // Por ejemplo, simular que se envió el reporte y cerrar el aula
                Swal.fire('Reporte enviado!', 'Los problemas han sido reportados correctamente.', 'success');
                aulasDiv.style.display = 'none';
                button.innerHTML = '<i class="fas fa-plus"></i> Ver Aulas'; // Cambiar el texto del botón
            } else {
                // No cerrar el aula
                return;
            }
        });
    } else {
        // Mostrar/ocultar las aulas de la clase actual
        if (aulasDiv.style.display === 'none') {
            aulasDiv.style.display = 'block';
            button.innerHTML = '<i class="fas fa-minus"></i> Ocultar Aulas'; // Cambiar el texto del botón
        } else {
            aulasDiv.style.display = 'none';
            button.innerHTML = '<i class="fas fa-plus"></i> Ver Aulas'; // Cambiar el texto del botón
        }
    }
}

// Función para manejar los cambios en los checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const aulaId = this.closest('.aula').id; // Obtener el ID del aula
        const selectedProblems = Array.from(document.querySelectorAll(`input[name="${aulaId}"]:checked`))
                                      .map(input => input.value);
        
        // Actualizar el resumen con los problemas seleccionados
        document.getElementById('detalle-aula').textContent = `Aula: ${this.closest('.aula').querySelector('h5').textContent}`;
        document.getElementById('detalle-problemas').textContent = `Problemas: ${selectedProblems.join(', ') || 'Ninguno'}`;
        
        // Mostrar el resumen
        document.getElementById('resumen').style.display = selectedProblems.length > 0 ? 'block' : 'none';
    });
});

// Manejo del enlace de WhatsApp
document.getElementById('enlace-whatsapp').addEventListener('click', function () {
    const aula = document.getElementById('detalle-aula').textContent.replace('Aula: ', '');
    const problemas = document.getElementById('detalle-problemas').textContent.replace('Problemas: ', '');
    
    // Asegúrate de que el número de teléfono esté en el formato correcto
    const phoneNumber = '913420257'; // Cambia esto por el número de teléfono real
    const mensaje = `Aula: ${aula}\nProblemas: ${problemas}`;
    
    // Crea el enlace de WhatsApp
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`;
    this.href = whatsappLink; // Actualiza el href del enlace
});
