
// //==================Toggle Mobile Menu================//
// document.getElementById('hamburger').addEventListener('click', function(event) {
//     event.stopPropagation();
//     const mobileMenu = document.querySelector('.menu-wrapper');
//     const btn = document.getElementById('hamburger');
//     const body = document.querySelector('.body');
//     mobileMenu.classList.toggle('is-active');
//     btn.classList.toggle('is-active');
//     body.classList.toggle('overflow-hidden')
// });

// document.querySelector('.menu-wrapper').addEventListener('click', function(event) {
//     const mobileMenu = document.querySelector('.menu-wrapper');
//     const hamburgerButton = document.getElementById('hamburger');
//     const body = document.querySelector('.body');

//     mobileMenu.classList.remove('is-active');
//     hamburgerButton.classList.remove('is-active');
//     body.classList.remove('overflow-hidden')
// });



//================== Form Validation ================//
// Handle form submission via AJAX
document.addEventListener('DOMContentLoaded', function() {
    function handleFormSubmit(form) {
        const formId = form.id; // Get form ID
        const alertBox = document.getElementById(`alert-message-${formId}`);

        // Reset the alert box content
        alertBox.innerHTML = '';

        // Basic validation: Check required fields
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(function(field) {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid'); // Highlight invalid fields
            } else {
                field.classList.remove('is-invalid'); // Remove highlight if valid
            }
        });

        // If validation fails
        if (!isValid) {
            alertBox.innerHTML = `<div class="alert alert-danger">Please fill in all required fields.</div>`;
            setTimeout(function() {
                alertBox.innerHTML = ''; // Hide error message after 2 seconds
            }, 2000);
            return; // Stop form submission
        }

        // Show the loader while submitting the form
        alertBox.innerHTML = `<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>`;

        const formData = new FormData(form);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'mail.php', true); // Update with your form handler path

        xhr.onload = function() {
            alertBox.innerHTML = '';

            if (xhr.status === 200 && xhr.responseText.trim() === 'success') {
                // Success message
                alertBox.innerHTML = `<div class="alert alert-success">Message sent successfully!</div>`;
                form.reset(); // Reset form fields
            } else {
                // Error message
                alertBox.innerHTML = `<div class="alert alert-danger">Message sending failed. Please try again.</div>`;
            }

            // Hide message after 2 seconds
            setTimeout(function() {
                alertBox.innerHTML = '';
            }, 2000);
        };

        xhr.onerror = function() {
            alertBox.innerHTML = `<div class="alert alert-danger">An error occurred. Please try again later.</div>`;
            setTimeout(function() {
                alertBox.innerHTML = '';
            }, 2000);
        };

        xhr.send(formData); // Send form data
    }

    // Attach event listeners to all forms
    document.querySelectorAll('form').forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            handleFormSubmit(this); // Handle submission for this form
        });
    });
});
