document.addEventListener('DOMContentLoaded', function () {
  const darkroom = document.getElementById('darkroom')
  const lightswitch = document.getElementById('lightswitch')

  const clickSound = new Audio('/assets/audio/button-press.mp3')
  clickSound.onerror = () => console.error('Failed to load lightswitch audio')

  const hoverSound = new Audio('/assets/audio/pyrite.mp3')
  hoverSound.loop = true

  const incandescentSound = new Audio('/assets/audio/incandescent-light.mp3')
  incandescentSound.onerror = () =>
    console.error('Failed to load incandescent-light audio')

  lightswitch.addEventListener('click', function () {
    console.log('CLUNK!')
    hoverSound.pause()
    clickSound.play().catch(error => {
      console.error('Audio playback failed:', error)
    })
    clickSound.currentTime = 0

    // Fade out the overlay
    darkroom.style.opacity = '0'
    setTimeout(() => {
      darkroom.style.display = 'none'
      incandescentSound.play()
    }, 500)
  })

  // document.addEventListener(
  //   'click',
  //   event => {
  //     if (event.target === lightswitch) {
  //       clickSound.play()
  //       clickSound.currentTime = 0
  //     }
  //   }
  // )

  const calculateVolume = (cursorX, cursorY, button) => {
    const circle = button.getBoundingClientRect()
    const centerX = circle.left + circle.width / 2
    const centerY = circle.top + circle.height / 2

    const distance = Math.hypot(cursorX - centerX, cursorY - centerY)
    const range = 16 // Adjust range
    const maxDistance = Math.max(circle.width, circle.height) * range
    const linearVolume = Math.max(0, 1 - distance / maxDistance)

    const exponent = 2 // ajust volume scaling
    return Math.pow(linearVolume, exponent)
  }

  let animationFrame
  document.addEventListener('mousemove', event => {
    if (animationFrame) cancelAnimationFrame(animationFrame)
    animationFrame = requestAnimationFrame(() => {
      const volume = calculateVolume(event.clientX, event.clientY, lightswitch)
      hoverSound.volume = volume
      if (volume > 0 && hoverSound.paused) {
        hoverSound.play()
      } else if (volume === 0 && !hoverSound.paused) {
        hoverSound.pause()
      }
    })
  })
})
