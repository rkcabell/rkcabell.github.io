var modal = document.getElementById('contactModal')
var btn = document.getElementById('contactButton')

// open
if (btn) {
  var span = document.getElementsByClassName('close')[0]
  var cancelBtn = document.querySelector('.cancel')

  btn.onclick = function () {
    modal.style.display = 'block'
  }
  //close
  if (span) {
    span.onclick = function () {
      modal.style.display = 'none'
    }
  }

  // cancel (close)
  cancelBtn.onclick = function () {
    modal.style.display = 'none'
  }

  // close when unfocused
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none'
    }
  }

  // simple botcheck
  function checkHoneypot () {
    var honeypot = document.querySelector('.ohnohoney')

    // If the honeypot field has any value, prevent the form from submitting
    if (honeypot.checked) {
      console.log('Honeypot triggered. Submission blocked.')
      return false
    }
    // If honeypot is empty, allow the form to be submitted
    if (honeypot) {
      honeypot.parentNode.removeChild(honeypot)
    }
    return true
  }

  // This will check the honeypot and submit if valid
  document.querySelector('form').onsubmit = function (event) {
    event.preventDefault()

    var honeypot = document.querySelector('.ohnohoney')

    // If the honeypot field has any value or is checked, block submission
    if (honeypot && honeypot.checked) {
      console.log('Honeypot triggered. Submission blocked.')
      return false // Stop form submission
    }

    console.log('Honeypot passed. Submitting form.')
    event.target.submit()
  }
}
