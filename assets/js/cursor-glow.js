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
})

// Add a global pointermove listener to update the active overlay
document.body.addEventListener('pointermove', e => {
  containers.forEach(container => {
    const overlay = container.querySelector('.overlay')
    const card = container.querySelector('.card.carve')

    const rect = container.getBoundingClientRect()

    // if inside container
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      overlay.style.setProperty('--opacity', '1')
      overlay.style.setProperty('--x', `${x}px`)
      overlay.style.setProperty('--y', `${y}px`)
      if (card) {
        card.style = `--opacity: 0; --x: ${x}px; --y: ${y}px;`
      }
    } else {
      overlay.style = `--opacity: 0;`
      if (card) {
        card.style.setProperty('--opacity', '1')
        card.style.setProperty('--x', '50%')
        card.style.setProperty('--y', '50%')
      }
    }
  })
})
document.querySelectorAll('.card-overlay-container').forEach(container => {
  const card = container.querySelector('.card.carve')

  if (card) {
    container.addEventListener('mousemove', event => {
      const rect = card.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Update the carving position
      card.style.setProperty('--x', `${x}px`)
      card.style.setProperty('--y', `${y}px`)
    })

    container.addEventListener('mouseleave', () => {
      // Reset carving when leaving the container
      card.style.setProperty('--x', '50%')
      card.style.setProperty('--y', '50%')
    })
  }
})
