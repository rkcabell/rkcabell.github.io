const main = document.querySelector('#main')
const containers = main.querySelectorAll('.card-overlay-container')

// Set up each card-overlay pair
containers.forEach(container => {
  const card = container.querySelector('.card')
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
    const rect = container.getBoundingClientRect()

    // Check if the pointer is inside the container
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      overlay.style = `--opacity: 1; --x: ${x}px; --y: ${y}px;`
    } else {
      overlay.style = `--opacity: 0;`
    }
  })
})
