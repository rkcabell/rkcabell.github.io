document.addEventListener('DOMContentLoaded', function () {
  const dropdownButtons = document.querySelectorAll('.dropbtn')
  const dropdownContents = document.querySelectorAll('.dropdown-content')

  // Event listener for each dropdown button
  dropdownButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      // Prevent the body click event from firing when a dropdown is clicked
      event.stopPropagation()

      const dropdownContent = this.nextElementSibling
      // Close all other dropdowns and toggle the current one
      dropdownContents.forEach(function (content) {
        if (content !== dropdownContent) {
          content.style.display = 'none'
          content.previousElementSibling.parentElement.classList.remove(
            'drop-active'
          )
        }
      })

      // Toggle visibility of the current dropdown
      if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none'
        this.parentElement.classList.remove('drop-active')
      } else {
        dropdownContent.style.display = 'block'
        this.parentElement.classList.add('drop-active')
      }
    })
  })

  // Close all dropdowns when clicking anywhere else on the body
  document.body.addEventListener('click', function () {
    dropdownContents.forEach(function (content) {
      content.style.display = 'none'
      if (content.previousElementSibling) {
        content.previousElementSibling.parentElement.classList.remove(
          'drop-active'
        )
      }
    })
  })

  // Ensure dropdowns close when the hamburger menu is toggled off
  const menuToggle = document.getElementById('menu-toggle')
  menuToggle.addEventListener('change', function () {
    if (!this.checked) {
      dropdownContents.forEach(function (content) {
        content.style.display = 'none'
      })
    }
  })
})
