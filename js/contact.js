import { responsiveMenu } from "./utils.js";

function validateForm() {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    // let valid = true;

    if (fullName.trim() === "") {
        alert("Please enter your full name.");
        return false
    }

    if (fullName.trim().toLowerCase() === "ironhack") {
        // alert("You cannot be Ironhack, because I am Ironhack.");
        showIronhacker()
        return false
    }

    if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        return false
    }

    if (!phone.match(/[0-9]{6,}/)) {
        alert("Please enter a valid phone number with at least 6 digits.");
        return false
    }

    return valid;
}

function showIronhacker() {
    const ironhacker = document.querySelector('.ironhacker')
    ironhacker.classList.add('active')
    setTimeout(() => {
        ironhacker.classList.remove('active')
    }, "3000");
}

/* FORM VALIDATION */
function sendContactData() {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      
      const isValid = validateForm()
  
      if (isValid) {
        form.submit();
      }
    });
}

window.addEventListener("load", function() {
    responsiveMenu();
    sendContactData()
});
