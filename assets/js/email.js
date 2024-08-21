// Get the modal
var modal = document.getElementById('contactModal')

// Get the button that opens the modal
var btn = document.getElementById('contactButton')

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0]

// Get the cancel button
var cancelBtn = document.querySelector('.cancel')

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = 'block'
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none'
}

// When the user clicks the cancel button, close the modal
cancelBtn.onclick = function () {
  modal.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none'
  }
}

function checkHoneypot () {
  // Get the honeypot field
  var honeypot = document.querySelector('.ohnohoney')

  // If the honeypot field has any value, prevent the form from submitting
  if (honeypot.value) {
    console.log('Honeypot triggered. Submission blocked.')
    return false // This prevents the form from submitting
  }

  // If honeypot is empty, allow the form to be submitted
  return true
}

// Attach the checkHoneypot function to the form submission
document.querySelector('form').onsubmit = function () {
  return checkHoneypot() // This will check the honeypot and submit if valid
}
