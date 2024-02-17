document.addEventListener("DOMContentLoaded", function() {
    formValidation()
});

/* FORM VALIDATION */
function formValidation() {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const fullName = document.getElementById("fullName").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      let valid = true;

      if (fullName.trim() === "") {
        alert("Please enter your full name.");
        valid = false;
      }

      if (fullName.trim().toLowerCase() === "ironhack") {
        alert("You cannot be Ironhack, because I am Ironhack.");
        valid = false;
      }
  
      if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        valid = false;
      }
  
      if (!phone.match(/[0-9]{6,}/)) {
        alert("Please enter a valid phone number with at least 6 digits.");
        valid = false;
      }
  
      if (valid) {
        form.submit();
      }
    });
}
