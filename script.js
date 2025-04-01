// Add fade-in effect on load
document.addEventListener('DOMContentLoaded', () => {
    // Slight delay to ensure CSS is loaded
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Reviews Navigation
let currentReviewIndex = 0;
const reviews = document.querySelectorAll('.review');

function showReview(index) {
    if (!reviews || reviews.length === 0) return; // Ensure reviews exist
    reviews.forEach((review, i) => {
        review.classList.remove('active');
        if (i === index) {
            review.classList.add('active');
        }
    });
}

function nextReview() {
    if (!reviews || reviews.length === 0) return;
    currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
    showReview(currentReviewIndex);
}

function prevReview() {
    if (!reviews || reviews.length === 0) return;
    currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
    showReview(currentReviewIndex);
}

// Initialize the first review
document.addEventListener('DOMContentLoaded', () => {
    showReview(0);
});

// Hero Slider
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // Time between slides in milliseconds

    function showSlide(n) {
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Calculate new slide index
        currentSlide = (n + slides.length) % slides.length;
        
        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        // Clear any existing interval
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        // Start new interval
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    function stopSlideShow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopSlideShow();
        startSlideShow();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopSlideShow();
        startSlideShow();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopSlideShow();
            startSlideShow();
        });
    });

    // Start the slideshow
    startSlideShow();

    // Optional: Pause on hover
    const heroSection = document.querySelector('#hero');
    heroSection.addEventListener('mouseenter', stopSlideShow);
    heroSection.addEventListener('mouseleave', startSlideShow);

    // Initialize first slide
    showSlide(0);
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileNavToggle.classList.remove('active');
            });
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            console.log('Form submitted:', formObject);
            alert('תודה! הודעתך התקבלה. נחזור אליך בהקדם.');
            this.reset();
        });
    }

    // Exit Intent Popup Logic - Refined
    const exitPopupOverlay = document.getElementById('exitPopupOverlay');
    if (!exitPopupOverlay) return; // Exit if the element doesn't exist

    let popupShownThisSession = false;
    const cookieExists = document.cookie.includes('exitPopupShown=true');

    const showExitPopup = () => {
        if (cookieExists || popupShownThisSession) return;

        exitPopupOverlay.classList.add('visible');
        popupShownThisSession = true;
        // console.log("Showing exit popup");
    };

    window.closeExitPopup = () => {
        exitPopupOverlay.classList.remove('visible');
        if (!cookieExists) {
            const expires = new Date();
            expires.setDate(expires.getDate() + 1); // Cookie expires in 1 day
            document.cookie = `exitPopupShown=true; path=/; expires=${expires.toUTCString()}`;
            // console.log("Closing exit popup and setting cookie");
        }
    };

    // Trigger when mouse leaves the viewport towards the top
    let mouseLeaveTimeout;
    document.addEventListener('mouseleave', (e) => {
        // Check if mouse is near the top edge (e.g., 10px)
        if (e.clientY <= 10) {
            // Use a small delay to prevent accidental triggers
            clearTimeout(mouseLeaveTimeout);
            mouseLeaveTimeout = setTimeout(showExitPopup, 200); // Show after 200ms
        }
    });

    // Clear timeout if mouse re-enters quickly
    document.addEventListener('mouseenter', () => {
        clearTimeout(mouseLeaveTimeout);
    });

    // Close popup on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && exitPopupOverlay.classList.contains('visible')) {
            closeExitPopup();
        }
    });

    // Close popup if user clicks outside the popup content
    exitPopupOverlay.addEventListener('click', (e) => {
        if (e.target === exitPopupOverlay) {
            closeExitPopup();
        }
    });

    // Optional: Handle form submission if using Option 2 (Requires backend)
    /*
    const exitPopupForm = document.getElementById('exitPopupForm');
    if (exitPopupForm) {
        exitPopupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your logic here to send the phone number to your backend
            console.log('Form submitted');
            closeExitPopup();
        });
    }
    */
});

// Initialize AOS
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
    });
} 