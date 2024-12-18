//  _.--.__.-'""`-.__.--.__.-'""`-.__.--.__.-'""`-.__.--.__.-'""`-._
//                          CLAIRVOYANCE
//  "`--'""`-.__.-'""`--'""`-.__.-'""`--'""`-.__.-'""`--'""`-.__.-'"
document.addEventListener('DOMContentLoaded', function () {
  const keyMapping = {
    smrfhaoc: 'personal',
    szosxzfarvay: 'professional'
  }

  function getKeyFromURL () {
    let urlParams = window.location.search.substring(1) // Get the query string without the '?'
    return urlParams // Return the key directly since it's the only part in the query string
  }

  let key = getKeyFromURL()
  console.log('Key from URL:', key)
  let origin = keyMapping[key]
  console.log('origin:', origin)

  if (origin === 'personal') {
    let homeLink = document.querySelector('a[title="Home"]')
    console.log('Home Link:', homeLink)
    let projectsLink = document.querySelector('a[title="Projects"]')
    if (homeLink) {
      homeLink.href = '/'
      console.log('Home link updated to /')
    }
    if (projectsLink) {
      projectsLink.href = '/projects.html'
      console.log('Projects link updated to /projects.html')
    }
  } else if (origin === 'professional') {
    let homeLink = document.querySelector('a[title="Home"]')
    let projectsLink = document.querySelector('a[title="Projects"]')
    if (homeLink) {
      homeLink.href = '/professional.html'
      console.log('Home link updated to /professional.html')
    }
    if (projectsLink) {
      projectsLink.href = '/professional/projects.html'
      console.log('Projects link updated to /professional/projects.html')
    }
  }
})
