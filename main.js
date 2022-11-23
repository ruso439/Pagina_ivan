const encabezados = document.querySelectorAll('.contenedor .encabezado');
console.log('encabezados ', encabezados);
const enlaces = document.querySelectorAll('#enlaces a');

const observer = new IntersectionObserver((entradas, observador) => {
	entradas.forEach(entrada => {
		if(entrada.isIntersecting){
			const id = '#' + entrada.target.id;
			history.pushState({}, entrada.target.innetText, id);

			enlaces.forEach(enlace => {
				enlace.classList.remove('activo');

				const href = enlace.attributes.href.nodeValue;
				if(href === id){
					enlace.classList.add('activo');
				}
			});
		}
	});
}, {
	threshold: 1,
	rootMargin: '0px 0px -50% 0px'
});


// function speakArticle() {
// 	var container = document.getElementsByTagName("article")[0];
// 	var contentToSpeak = container.innerText;
// 	speak(contentToSpeak, 'es-es');
// }

function textToSpeech (element) {
	const text = element.innerText;
	var s = new SpeechSynthesisUtterance(text);
	s.lang = 'es';
	speechSynthesis.speak(s);
}

encabezados.forEach(encabezado => {
	observer.observe(encabezado);
	encabezado.onclick = () => { textToSpeech(encabezado) };
	console.log('onclick ', encabezado.onclick);
});