/* ============================================================
   File Name      : main.js
   Student's Name : 徐斌航
   StudentID      : 2024110514
   Date           : 2026-11-03
   Description    : Client-side JavaScript for the Express
                    Portfolio site. Highlights the current page
                    in the navigation bar, keeps the footer year
                    up to date and performs simple validation of
                    the contact form before it is submitted.
   ============================================================ */

// Run the script once the DOM has finished loading
document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================================
     FUNCTION 1: highlightNavlink()
     Adds the "active" class to the nav link that matches the
     current URL so the user always knows which page they are on.
     ========================================================== */
  function highlightNavLink() {
    var currentPath = window.location.pathname;  // e.g. "/about"
    var navLinks = document.querySelectorAll('#nav-links .nav-link');

    navLinks.forEach(function (link) {
      var linkPath = link.getAttribute('href');
      // Mark the link as active only when the paths match
      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });
  }

  /* ==========================================================
     FUNCTION 2: updateFooterYear()
     Keeps the copyright year in the footer up to date.
     ========================================================== */
  function updateFooterYear() {
    var yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  /* ==========================================================
     FUNCTION 3: setupContactFormValidation()
     Performs simple client-side validation on the contact form.
     The form data is still captured server-side by POST /contact
     (see routes/index.js).
     ========================================================== */
  function setupContactFormValidation() {
    var contactForm = document.getElementById('contact-form');

    // Do nothing if this page has no contact form
    if (!contactForm) {
      return;
    }

    contactForm.addEventListener('submit', function (event) {
      var firstName = document.getElementById('firstName').value.trim();
      var lastName = document.getElementById('lastName').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();
      var isValid = true;

      // Reset any previous invalid styling
      contactForm.querySelectorAll('.form-control').forEach(function (field) {
        field.classList.remove('is-invalid');
      });

      // Required fields must not be empty
      if (firstName === '') {
        document.getElementById('firstName').classList.add('is-invalid');
        isValid = false;
      }
      if (lastName === '') {
        document.getElementById('lastName').classList.add('is-invalid');
        isValid = false;
      }
      if (message === '') {
        document.getElementById('message').classList.add('is-invalid');
        isValid = false;
      }

      // The email address must contain "@" and "." to be plausible
      if (email === '' || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        document.getElementById('email').classList.add('is-invalid');
        isValid = false;
      }

      // Stop the submission and show the browser error summary if invalid
      if (!isValid) {
        event.preventDefault();
      }
    });
  }

  /* ==========================================================
     INITIALISATION: run all GUI setup functions
     ========================================================== */
  highlightNavLink();
  updateFooterYear();
  setupContactFormValidation();
});
