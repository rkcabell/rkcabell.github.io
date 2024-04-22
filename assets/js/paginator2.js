document.addEventListener('DOMContentLoaded', function () {
  const itemsPerPage = 24
  const galleryItems = document.querySelectorAll('.tm-video-item')
  const paginationLinks = document.querySelectorAll('.tm-paging-link')

  console.log(galleryItems.length)

  function showPage (pageNumber) {
    // Hide all items
    galleryItems.forEach(item => {
      item.style.display = 'none'
    })

    // Calculate start and end indices
    const start = pageNumber * itemsPerPage
    const end = start + itemsPerPage

    // Show items for the current page
    galleryItems.forEach((item, index) => {
      if (index >= start && index < end) {
        item.style.display = 'block'
      }
    })

    // Update active link
    paginationLinks.forEach(link => {
      link.classList.remove('active')
    })
    paginationLinks[pageNumber].classList.add('active')
  }

  // Setup initial page and click handlers
  paginationLinks.forEach((link, index) => {
    link.addEventListener('click', () => showPage(index))
  })

  // Show the first page initially
  showPage(0)
})
