var currentSize = 'med' // Default size

function resizeGallery (size) {
  const galleryItems = document.querySelectorAll('.tm-format')
  const buttons = document.querySelectorAll('.size-btn')

  // Reset all buttons to inactive state
  buttons.forEach(button => {
    button.classList.remove('active')
  })

  // Set the selected button to active state
  document.querySelector('.size-btn.' + size).classList.add('active')
  galleryItems.forEach(item => {
    item.style.width = ''
    item.style.height = ''
    item.classList.remove('small', 'med', 'full')

    switch (size) {
      case 'small':
        item.classList.add('small')
        // item.style.width = 'auto'
        // item.style.height = '118px'
        break
      case 'med':
        item.classList.add('med')
        // item.style.width = 'auto'
        // item.style.height = '236px'
        break
      case 'full':
        item.classList.add('full')
        // Given size
        break
    }
  })
  // Update the current size
  currentSize = size

  // Update the active class on buttons
  document.querySelectorAll('.size-btn').forEach(button => {
    button.classList.remove('active')
  })
  document.querySelector('.size-btn.' + size).classList.add('active')
}

function checkWindowSize () {
  // Only resize if necessary to prevent unnecessary calls
  if (currentSize == 'med' && window.innerWidth <= 400) {
    resizeGallery('small')
  } else if (currentSize == 'small' && window.innerWidth > 450) {
    resizeGallery('med')
  }
}

// Listen for resize events
window.addEventListener('resize', checkWindowSize)

resizeGallery('med')
