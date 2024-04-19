// Navegação entre as páginas
function Cadastro() {
  window.location.href = "cadastro.html"
}


// Aniamção do ícone de loading, usando a biblioteca Vivus, && Preloader
var myVivus = new Vivus('asas-rsup', {
  start: 'autostart',
  animTimingFunction: Vivus.EASE
});

new Vivus('asas-rsup', {}, function (myVivus) {
  myVivus.play(myVivus.getStatus() === 'end' ? -1 : 1);
})

//Lógica da saída do loader

document.addEventListener('DOMContentLoaded', () => {
  var overlayPreloader = document.querySelector('.overlay-preloader');
  var preloaderLogo = document.getElementById('asas-rsup');

  window.addEventListener('load', () => {
    overlayPreloader.style.display = 'none';
    preloaderLogo.style.display = 'none';
  });
})