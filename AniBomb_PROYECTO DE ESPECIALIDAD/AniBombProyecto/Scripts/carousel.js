document.addEventListener('DOMContentLoaded', () => {
    const carrusel = document.querySelector('.carrusel');
    const imagenes = carrusel.querySelectorAll('.img');
    const puntosContainer = document.querySelector('.puntos');
    let indiceActual = 0;
    let intervalo;

    // Generar puntos dinámicamente si no existen
    if (puntosContainer.children.length === 0) {
        imagenes.forEach(() => {
            const punto = document.createElement('div');
            puntosContainer.appendChild(punto);
        });
    }

    const puntos = puntosContainer.querySelectorAll('div');

    function mostrarImagen(indice) {
        imagenes.forEach((img, i) => {
            img.classList.toggle('visible', i === indice);
            img.classList.toggle('hidden', i !== indice);
        });
        puntos.forEach((punto, i) => {
            punto.classList.toggle('active', i === indice);
        });
    }

    function avanzarCarrusel() {
        indiceActual = (indiceActual + 1) % imagenes.length;
        mostrarImagen(indiceActual);
    }

    function iniciarAutoAvance() {
        intervalo = setInterval(avanzarCarrusel, 8000);
    }

    function detenerAutoAvance() {
        clearInterval(intervalo);
    }

    // Agrega funcionalidad a los puntos
    puntos.forEach((punto, index) => {
        punto.addEventListener('click', () => {
            detenerAutoAvance();
            indiceActual = index;
            mostrarImagen(indiceActual);
            iniciarAutoAvance();
        });
    });

    // Inicializa el carrusel
    mostrarImagen(indiceActual);
    iniciarAutoAvance();
});