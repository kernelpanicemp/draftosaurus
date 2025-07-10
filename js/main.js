'use strict'
// Todas las pantallas están ocultas por defecto así que las voy mostrando con esto
// Va una por una en base al id, después voy a cambiar todo esto
// Para el prototipo inicial esto funciona bien
function launchConfetti() {
  confetti({
    particleCount: 100,
    spread: 180,
    origin: { y: 0.6 },
  })
}

function showScreen(screenId) {
  document.querySelectorAll('#content > div').forEach((div) => {
    div.classList.add('hidden')
    div.classList.remove('flex')
  })

  const screenToShow = document.getElementById(screenId)
  if (screenToShow) {
    screenToShow.classList.remove('hidden')
    screenToShow.classList.add('flex')
    if (screenId === 'screen-results') {
      launchConfetti()
    }
  }
}
