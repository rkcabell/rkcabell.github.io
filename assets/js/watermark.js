document.addEventListener('DOMContentLoaded', function () {
  // Delay execution to ensure it runs after other scripts, like fslightbox.js
  setTimeout(function () {
    const images = document.querySelectorAll('.watermarked img')
    images.forEach(image => {
      const container = image.closest('.watermarked')
      if (!container.classList.contains('watermarked-applied')) {
        const watermarkDiv = document.createElement('div')
        watermarkDiv.style.position = 'absolute'
        watermarkDiv.style.top = '50%'
        watermarkDiv.style.left = '50%'
        watermarkDiv.style.width = '100%'
        watermarkDiv.style.height = '100%'
        watermarkDiv.style.backgroundImage =
          "url('assets/images/watermark.png')"
        watermarkDiv.style.backgroundRepeat = 'no-repeat'
        watermarkDiv.style.backgroundSize = '20%'
        watermarkDiv.style.opacity = '1'
        watermarkDiv.style.pointerEvents = 'none' // Prevent watermark from interfering with image interaction
        watermarkDiv.style.zIndex = '1000' // Ensure it is on top
        container.appendChild(watermarkDiv)
        container.classList.add('watermarked-applied') // Mark it as watermarked
      }
    })
  }, 500) // Adjust this delay based on when other scripts finish manipulating the DOM
})
