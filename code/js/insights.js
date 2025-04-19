
        document.addEventListener("DOMContentLoaded", function () {
            // Function to check visibility of elements
            const elements = document.querySelectorAll('.fade-in, .slide-up');

            function checkVisibility() {
                elements.forEach(element => {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                        element.classList.add('visible');
                    }
                });
            }

            // Initial visibility check
            checkVisibility();

            // Event listener for scrolling
            window.addEventListener('scroll', checkVisibility);
        });
    