const main = document.querySelector('#main')
const containers = main.querySelectorAll('.card-overlay-container')

// Set up each card-overlay pair
containers.forEach(container => {
  const card = container.querySelector('.card')
  const overlay = container.querySelector('.textoverlay')

  container.addEventListener('mousemove', event => {
    const rect = container.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (overlay) {
      overlay.style.setProperty('--color', '#fff')
      overlay.style.setProperty('--text-shadow', ' 0 0 10px rgba(0, 0, 0, 0.9')
    }

    if (card) {
      card.classList.add('hover')
      card.style.setProperty('--opacity', '0')
      card.style.setProperty('--x', `${x}px`)
      card.style.setProperty('--y', `${y}px`)
    }
  })

  container.addEventListener('mouseleave', () => {
    if (overlay) {
      overlay.style.setProperty('--color', '#000')
      overlay.style.setProperty(
        '--text-shadow',
        ' 0 0 5px rgba(255, 255, 255, 0.7'
      )
    }

    if (card) {
      card.classList.remove('hover')
      card.style.setProperty('--opacity', '0')
      card.style.setProperty('--x', '50%')
      card.style.setProperty('--y', '50%')
    }
  })
})
