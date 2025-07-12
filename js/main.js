'use strict'
// Todas las pantallas están ocultas por defecto así que las voy mostrando con esto
// Va una por una en base al id, después voy a cambiar todo esto
// Para el prototipo inicial esto funciona bien
// Usa el hash para navegar entre pantallas sin recargar la página y también para que se mantenga el estado al recargar
// Probablemente tendré que hacer algún que otro cambio
function showScreen(screenId, updateHash = true) {
  document.querySelectorAll('[id^="screen-"]').forEach((screen) => {
    screen.classList.add('hidden')
    screen.classList.remove('flex')
    screen.setAttribute('aria-hidden', 'true')
  })

  const screenToShow = document.getElementById(screenId)
  if (screenToShow) {
    screenToShow.classList.remove('hidden')
    screenToShow.classList.add('flex')
    screenToShow.setAttribute('aria-hidden', 'false')
  }

  if (updateHash && window.location.hash !== `#${screenId}`) {
    window.location.hash = screenId
  }

  if (screenId === 'screen-results') {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }
}

function toggleProfileDropdown(event) {
  event.stopPropagation()
  const dropdown = event.currentTarget.nextElementSibling
  closeAllDropdowns(dropdown)
  dropdown.classList.toggle('hidden')
}

function closeAllDropdowns(excludeDropdown = null) {
  document.querySelectorAll('.profile-dropdown').forEach((dropdown) => {
    if (dropdown !== excludeDropdown) {
      dropdown.classList.add('hidden')
    }
  })
}

window.addEventListener('hashchange', () => {
  const screenId = window.location.hash.replace('#', '')
  if (screenId.startsWith('screen-')) {
    showScreen(screenId, false)
  }
})

window.addEventListener('click', () => {
  closeAllDropdowns()
})

document.addEventListener('DOMContentLoaded', () => {
  const initialScreen = window.location.hash.replace('#', '') || 'screen-home'
  showScreen(initialScreen, false)
})
