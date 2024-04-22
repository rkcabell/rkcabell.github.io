document.addEventListener('DOMContentLoaded', function () {
  // var buttonSet = document.querySelectorAll('.tm-paging')
  var pagingContainers = document.querySelectorAll('.tm-paging')
  var itemsPerPageSelect = document.getElementById('itemsPerPage')
  var allGalleryItems = document.querySelectorAll('.tm-video-item')

  function setupPagination (totalItems, itemsPerPage, pagingContainer) {
    const numberOfPages = Math.ceil(totalItems / itemsPerPage)
    pagingContainer.innerHTML = '' // Clear existing pagination links

    console.log('Items per page:', itemsPerPage)
    console.log('Number of pages:', numberOfPages)

    for (let i = 0; i < numberOfPages; i++) {
      const pageLink = document.createElement('a')
      pageLink.href = 'javascript:void(0);'
      pageLink.textContent = i + 1
      pageLink.className = 'tm-paging-link'
      pageLink.addEventListener('click', function () {
        showPage(i, itemsPerPage)
      })
      pagingContainer.appendChild(pageLink)
    }

    if (pagingContainer.children.length > 0) {
      pagingContainer.children[0].classList.add('active')
      showPage(0, itemsPerPage) // Show the first page
    }
  }

  function showPage (pageNumber, itemsPerPage) {
    const startIndex = pageNumber * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    allGalleryItems.forEach((item, index) => {
      item.style.display =
        index >= startIndex && index < endIndex ? 'block' : 'none'
    })

    document.querySelectorAll('.tm-paging').forEach(pagingContainer => {
      pagingContainer
        .querySelectorAll('.tm-paging-link')
        .forEach((link, index) => {
          link.classList.remove('active')
          if (index === pageNumber) {
            link.classList.add('active')
          }
        })
    })
  }

  // Listen for changes in the dropdown
  itemsPerPageSelect.addEventListener('change', function () {
    setupPagination(allGalleryItems.length, parseInt(this.value, 10))
  })

  // Initialize pagination with the selected number of items per page
  pagingContainers.forEach(pagingContainer => {
    setupPagination(
      allGalleryItems.length,
      parseInt(itemsPerPageSelect.value, 10),
      pagingContainer
    )
  })
})
