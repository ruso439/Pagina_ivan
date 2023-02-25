const encabezados = document.querySelectorAll('.secciones .seccion');

const observer = (entradas, observador) => {
    entradas.forEach((entrada) => {
        let sectionId = entrada.target.id;
        if (entrada.isIntersecting) {
            console.log("Sección actual: " + entrada.target.innerText);
            //document.getElementById('btnSonido').style.visibility = 'visible'; // Mostrar botón sonido
            cargarTexto(entrada.target.innerText);
            document.querySelector('li a[href*="' + sectionId + '"]').classList.add('active');
        } else {
            document.querySelector('li a[href*="' + sectionId + '"]').classList.remove('active');
            speechSynthesis.cancel(); //  Detener sonido cuando la sección no esta en el view
            //document.getElementById('btnSonido').style.visibility = 'hidden'; // Ocultar botón sonido
        }
    });
}

const observador = new IntersectionObserver(observer, {
    root: null,
    threshold: 0.5,
    rootMargin: '0px 0px 0px 0px',
});


encabezados.forEach(encabezado => {
    // Observar todos los encabezados
    observador.observe(encabezado);
});


let message = new SpeechSynthesisUtterance();
function cargarTexto(texto) {
    message.text = texto;
}

function reproducirTexto(aMessage) {
    speechSynthesis.speak(aMessage);
}

// Reproducir cuando se haga click en boton que contenga btn-flotante
document.addEventListener('click', (e) => {
    const target = e.target;
    const btnF = target.parentElement;
    if (!btnF.classList.contains('btn-flotante')) {
        return;
    }
    // btnF.classList.add('active');
    setTimeout(() => {
        reproducirTexto(message);
        // btnF.classList.remove('active');

    }, 800);
});