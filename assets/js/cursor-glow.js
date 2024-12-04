const main = document.querySelector('#main')
const containers = main.querySelectorAll('.card-overlay-container')

// Set up each card-overlay pair
containers.forEach(container => {
  const card = container.querySelector('.heading-box')
  const overlay = container.querySelector('.overlay')

  if (card && overlay) {
    // Clone the card content into the overlay
    const clone = card.cloneNode(true)
    overlay.appendChild(clone)
  }

  container.addEventListener('mousemove', event => {
    const rect = container.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (overlay) {
      overlay.style.setProperty('--opacity', '1')
      overlay.style.setProperty('--x', `${x}px`)
      overlay.style.setProperty('--y', `${y}px`)
    }

    if (card) {
      card.style.setProperty('--opacity', '0')
      card.style.setProperty('--x', `${x}px`)
      card.style.setProperty('--y', `${y}px`)
    }
  })

  container.addEventListener('mouseleave', () => {
    if (overlay) {
      overlay.style.setProperty('--opacity', '0')
    }

    if (card) {
      card.style.setProperty('--opacity', '1')
      card.style.setProperty('--x', '50%')
      card.style.setProperty('--y', '50%')
    }
  })
})
