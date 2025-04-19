window.addEventListener("load", function () {
    document.getElementById("loading").style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
    const newsletterForm = document.querySelector("form[action='/subscribe']");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Thank you for subscribing to our newsletter!");
            newsletterForm.reset();
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    var backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) { // Show when scrolled 300px down
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
backToTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

//  Progress Bar Script
    
window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
});


// document.addEventListener("DOMContentLoaded", function () {
// const loginButton = document.getElementById("loginButton");
// const loginButtonMobile = document.getElementById("loginButtonMobile");

// function updateLoginButton() {
//     const isLoggedIn = localStorage.getItem("loggedIn") === "true";

//     if (isLoggedIn) {
//         // Change to Logout button
//         loginButton.textContent = "Logout";
//         loginButton.classList.remove("btn-primary");
//         loginButton.classList.add("btn-danger");
//         loginButton.setAttribute("onclick", "logoutUser()");

//         loginButtonMobile.innerHTML = '<i class="bi bi-box-arrow-right text-white" style="font-size: 1.4rem;"></i>';
//         loginButtonMobile.classList.remove("btn-primary");
//         loginButtonMobile.classList.add("btn-danger");
//         loginButtonMobile.setAttribute("onclick", "logoutUser()");
//     } else {
//         // Change back to Login button
//         loginButton.textContent = "Login";
//         loginButton.classList.remove("btn-danger");
//         loginButton.classList.add("btn-primary");
//         loginButton.setAttribute("onclick", "window.location.href='10_login.html'");

//         loginButtonMobile.innerHTML = '<i class="bi bi-person-fill text-white" style="font-size: 1.4rem;"></i>';
//         loginButtonMobile.classList.remove("btn-danger");
//         loginButtonMobile.classList.add("btn-primary");
//         loginButtonMobile.setAttribute("onclick", "window.location.href='10_login.html'");
//     }
// }

// // Logout Function
// function logoutUser() {
//     localStorage.removeItem("loggedIn");
//     alert("Logged out successfully!");
//     updateLoginButton();
// }

// // Update button on page load
// updateLoginButton();
// });

   