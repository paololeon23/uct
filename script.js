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

// Objeto para almacenar aulas y sus problemas
let aulaProblems = {};

// Función para mostrar/ocultar aulas
function toggleAulas(button) {
    const aulasDiv = button.nextElementSibling;
    const allAulas = document.querySelectorAll('.aulas');

    // Cerrar otras aulas si están abiertas
    allAulas.forEach(aula => {
        if (aula !== aulasDiv) {
            aula.style.display = 'none';
            aula.previousElementSibling.innerHTML = '<i class="fas fa-plus"></i> Ver Aulas'; // Resetear el botón
        }
    });

    // Mostrar/ocultar las aulas de la clase actual
    if (aulasDiv.style.display === 'none') {
        aulasDiv.style.display = 'block';
        button.innerHTML = '<i class="fas fa-minus"></i> Ocultar Aulas'; // Cambiar el texto del botón
        document.getElementById('imagen-bienvenida').style.display = 'none'; // Ocultar la imagen
    } else {
        aulasDiv.style.display = 'none';
        button.innerHTML = '<i class="fas fa-plus"></i> Ver Aulas'; // Cambiar el texto del botón
        document.getElementById('imagen-bienvenida').style.display = 'block'; // Mostrar la imagen
    }

    // Actualizar la visibilidad del resumen al cambiar las aulas
    updateSummary();
}

// Función para manejar los cambios en los checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const aulaId = this.closest('.aula').id; // Obtener el ID del aula
        const aulaName = this.closest('.aula').querySelector('h5').textContent; // Obtener el nombre del aula

        // Inicializar el array de problemas para el aula si no existe
        if (!aulaProblems[aulaName]) {
            aulaProblems[aulaName] = [];
        }

        // Verificar si el checkbox está seleccionado
        if (this.checked) {
            aulaProblems[aulaName].push(this.value); // Agregar problema seleccionado
        } else {
            // Si el checkbox se deselecciona
            aulaProblems[aulaName] = aulaProblems[aulaName].filter(problem => problem !== this.value); // Eliminar problema de la lista
            // Si no hay más problemas en el aula, eliminar el aula del objeto
            if (aulaProblems[aulaName].length === 0) {
                delete aulaProblems[aulaName];
            }
        }

        // Actualizar el resumen
        updateSummary();
    });
});

// Función para actualizar el resumen
function updateSummary() {
    const detallesResumen = document.getElementById('detalles-resumen');
    detallesResumen.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevos cuadros

    for (const [aula, problemas] of Object.entries(aulaProblems)) {
        // Crear un cuadro para el aula
        const aulaDiv = document.createElement('div');
        aulaDiv.className = 'aula-cuadro'; // Clase para estilos
        aulaDiv.innerHTML = `<strong>${aula}</strong>: ${problemas.join(', ') || 'Ninguno'}`;
        detallesResumen.appendChild(aulaDiv);
    }

    // Actualizar la visibilidad del resumen
    document.getElementById('resumen').style.display = Object.keys(aulaProblems).length > 0 ? 'block' : 'none';
}

// Manejo del enlace de WhatsApp
document.getElementById('enlace-whatsapp').addEventListener('click', function () {
    // Construir el mensaje
    const aulaDetails = Object.entries(aulaProblems).map(([aula, problemas]) => {
        return `${aula}: ${problemas.join(', ')}`;
    }).join('\n');

    const mensaje = `Detalles de Aulas:\n${aulaDetails || 'Ninguno'}`;

    // Asegúrate de que el número de teléfono esté en el formato correcto
    const phoneNumber = '913420257'; // Cambia esto por el número de teléfono real

    // Crea el enlace de WhatsApp
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`;
    this.href = whatsappLink; // Actualiza el href del enlace
});

// Restablecer los detalles al hacer clic en el botón "Limpiar"
document.getElementById('btn-limpiar').addEventListener('click', function() {
    // Limpiar detalles del resumen
    aulaProblems = {}; // Reiniciar el objeto de problemas de aulas
    document.getElementById('detalles-resumen').innerHTML = ''; // Limpiar el contenedor

    // Limpiar checkboxes
    const checkboxes = document.querySelectorAll('.opciones input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false; // Desmarcar todos los checkboxes
    });

    // Ocultar el resumen
    document.getElementById('resumen').style.display = 'none';
});

// Función para cerrar el modal (debes adaptar a tu implementación)
function cerrarModal() {
    const modal = document.getElementById('resumen'); // Reemplaza 'resumen' con el ID de tu modal
    if (modal) {
        modal.style.display = 'none'; // Ocultar el modal
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const resumen = document.getElementById('resumen');
    const imagenBienvenida = document.getElementById('imagen-bienvenida');

    // Muestra la imagen de bienvenida al cargar
    imagenBienvenida.style.display = 'block';

    // Estilos para que el resumen sea flotante y en la esquina inferior derecha
    resumen.style.position = 'fixed';
    resumen.style.bottom = '20px';
    resumen.style.right = '20px';
    resumen.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)'; // Sombra para el resumen
    resumen.style.padding = '10px'; // Espaciado interno
    resumen.style.zIndex = '1000'; // Asegurarse de que esté por encima de otros elementos

    // Inicialmente ocultar el resumen
    resumen.style.display = 'none';
});
