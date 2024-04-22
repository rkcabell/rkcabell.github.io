// Assuming you have a global array of gallery items
var allGalleryItems = Array.from(document.querySelectorAll('.tm-video-item'))

console.log('Total items: ', allGalleryItems.length)

function setupPagination (items, itemsPerPage) {
  items = site.data[page.gallery]
  const numberOfPages = Math.ceil(items.length / itemsPerPage) // Use the length of the items passed
  const pagingContainer = document.querySelector('.tm-paging')

  pagingContainer.innerHTML = '' // Clear existing pagination links

  console.log('Number of pages: ', numberOfPages)

  for (let i = 0; i < numberOfPages; i++) {
    const pageLink = document.createElement('a')
    pageLink.href = 'javascript:void(0);' // Avoid page reload
    pageLink.textContent = i + 1
    pageLink.className = 'tm-paging-link'
    pageLink.addEventListener('click', () => showPage(i, itemsPerPage, items)) // Pass items to showPage
    pagingContainer.appendChild(pageLink)
  }

  // Automatically set the first page as active if there are pages
  if (pagingContainer.firstChild) {
    pagingContainer.firstChild.classList.add('active')
    showPage(0, itemsPerPage, items) // Show the first page initially
  }
}

function showPage (pageNumber, itemsPerPage, items) {
  const startIndex = pageNumber * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Hide all items first
  allGalleryItems.forEach(item => {
    item.style.display = 'none'
  })

  // Only display the items for the current page
  items.slice(startIndex, endIndex).forEach(item => {
    item.style.display = 'block' // Or use a class to show items
  })

  // Update active class for the current page link
  document.querySelectorAll('.tm-paging-link').forEach((link, index) => {
    if (index === pageNumber) {
      link.classList.add('active')
    } else {
      link.classList.remove('active')
    }
  })
}

// Call this function once to set up pagination when the page loads or the gallery changes
setupPagination(allGalleryItems, 24)
