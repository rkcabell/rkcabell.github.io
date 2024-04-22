document.addEventListener('DOMContentLoaded', function () {
  var itemsPerPage = 24
  var allGalleryItems = document.querySelectorAll('.tm-video-item')
  var pagingContainer = document.querySelector('.tm-paging')
  console.log('num items: ' + allGalleryItems.length)

  function setupPagination (totalItems, itemsPerPage) {
    const numberOfPages = Math.ceil(totalItems / itemsPerPage)
    pagingContainer.innerHTML = '' // Clear existing pagination links
    console.log('items per page: ' + itemsPerPage)
    console.log('number Of Pages: ' + numberOfPages)

    for (let i = 0; i < numberOfPages; i++) {
      const pageLink = document.createElement('a')
      pageLink.href = 'javascript:void(0);'
      pageLink.textContent = i + 1
      pageLink.className = 'tm-paging-link'
      pageLink.addEventListener('click', function () {
        showPage(i)
      })
      pagingContainer.appendChild(pageLink)
    }

    // Activate the first page by default
    if (pagingContainer.children.length > 0) {
      pagingContainer.children[0].classList.add('active')
    }
  }

  function showPage (pageNumber) {
    const start = pageNumber * itemsPerPage
    const end = start + itemsPerPage

    allGalleryItems.forEach((item, index) => {
      if (index >= start && index < end) {
        item.style.display = 'block' // Show item
      } else {
        item.style.display = 'none' // Hide item
      }
    })

    // Update the active class on pagination links
    document.querySelectorAll('.tm-paging-link').forEach((link, index) => {
      link.classList.remove('active')
      if (index === pageNumber) {
        link.classList.add('active')
      }
    })
  }

  // Initialize pagination and display the first page
  setupPagination(allGalleryItems.length, itemsPerPage)
  showPage(0) // Show the first page
})
