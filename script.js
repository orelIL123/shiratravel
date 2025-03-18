// Reviews Navigation
let currentReview = 0;
const reviews = document.querySelectorAll('.review');

function showReview(index) {
    reviews.forEach(review => review.classList.remove('active'));
    reviews[index].classList.add('active');
}

function nextReview() {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
}

function prevReview() {
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    showReview(currentReview);
}

// Initialize first review
showReview(0);

// Hero Slider
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let isTransitioning = false;
    let slideInterval;
    const intervalTime = 5000;

    function showSlide(n) {
        if (isTransitioning) return;
        isTransitioning = true;

        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Calculate new slide index
        currentSlide = (n + slides.length) % slides.length;
        
        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Reset transition lock after animation completes
        setTimeout(() => {
            isTransitioning = false;
        }, 1000);
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Initialize first slide
    slides[0].classList.add('active');
    dots[0].classList.add('active');

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentSlide) {
                showSlide(index);
                resetInterval();
            }
        });
    });

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Start automatic slideshow
    slideInterval = setInterval(nextSlide, intervalTime);

    // Optional: Pause on hover
    const heroSection = document.querySelector('#hero');
    heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSection.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, intervalTime);
    });
});

// Mobile Navigation
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');

mobileNavToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !e.target.closest('.nav-links') && 
        !e.target.closest('.mobile-nav-toggle')) {
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
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

    // Exit Popup Functionality
    const exitPopup = document.querySelector('.exit-popup-overlay');
    const closePopupBtn = document.querySelector('.close-popup');
    const exitPopupForm = document.querySelector('.exit-popup-form');
    let hasShownPopup = false;

    if (exitPopup && closePopupBtn && exitPopupForm) {
        // Show popup when mouse leaves the window
        document.addEventListener('mouseleave', function(e) {
            if (e.clientY <= 0 && !hasShownPopup) {
                showExitPopup();
            }
        });

        // Close popup when clicking close button
        closePopupBtn.addEventListener('click', function() {
            hideExitPopup();
        });

        // Close popup when clicking outside
        exitPopup.addEventListener('click', function(e) {
            if (e.target === exitPopup) {
                hideExitPopup();
            }
        });

        // Handle form submission
        exitPopupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            console.log('Email submitted:', email);
            alert('תודה! נשלח אליך עדכונים על הדילים הכי שווים!');
            hideExitPopup();
            hasShownPopup = true;
        });
    }

    function showExitPopup() {
        exitPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function hideExitPopup() {
        exitPopup.style.display = 'none';
        document.body.style.overflow = '';
    }
}); 