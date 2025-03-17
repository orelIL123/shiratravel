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
    const dots = document.querySelector('.slide-dots');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let currentSlide = 0;
    let isAnimating = false;

    // Check if slides exist
    if (slides.length === 0) {
        console.error('No slides found!');
        return;
    }

    // Create navigation dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dots.appendChild(dot);
    });

    // Update slide function
    function updateSlide() {
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.visibility = 'hidden';
            slide.style.opacity = '0';
        });
        
        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.visibility = 'visible';
        slides[currentSlide].style.opacity = '1';

        // Update navigation dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        console.log('Changed to slide:', currentSlide);
        const currentImage = slides[currentSlide].querySelector('img');
        console.log('Current slide image:', currentImage ? currentImage.src : 'No image found');
    }

    // Navigation functions
    function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    function prevSlide() {
        if (isAnimating) return;
        isAnimating = true;
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    function goToSlide(index) {
        if (isAnimating || index === currentSlide) return;
        isAnimating = true;
        currentSlide = index;
        updateSlide();
        setTimeout(() => {
            isAnimating = false;
        }, 800);
    }

    // Event listeners
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Auto-slide every 3 seconds
    let autoSlideInterval = setInterval(nextSlide, 3000);

    // Pause auto-slide on hover
    const sliderContainer = document.querySelector('.hero-slider');
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    sliderContainer.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(nextSlide, 3000);
    });

    // Mobile touch events
    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(autoSlideInterval);
    });

    sliderContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        autoSlideInterval = setInterval(nextSlide, 3000);
    });

    // Initialize first slide
    updateSlide();
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