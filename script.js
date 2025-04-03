// Add fade-in effect on load - REMOVED as new animation handles entry
/*
document.addEventListener('DOMContentLoaded', () => {
    // Slight delay to ensure CSS is loaded
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
*/

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

// Hero Slider - REMOVE THIS ENTIRE BLOCK
/*
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
*/

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Hero Scroll Animation
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP and ScrollTrigger are loaded
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        
        const heroSection = document.querySelector('#hero');
        const planeContainer = document.querySelector('.plane-container');
        const planeFront = document.querySelector('.plane-front');
        const heroContent = document.querySelector('.hero-content');

        if (heroSection && planeContainer && planeFront && heroContent) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                    pin: planeContainer,
                    pinSpacing: false,
                    anticipatePin: 1,
                    markers: true // Add markers for debugging
                }
            })
            .to(planeFront, { 
                opacity: 1,
                ease: "none"
            }, 0)
            .to(heroContent, { 
                opacity: 0,
                ease: "power1.in" 
            }, 0.7);

        }

    } else {
        console.error("GSAP or ScrollTrigger not loaded.");
    }
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

    // Exit Intent Popup Logic - Refined -- REMOVE THIS ENTIRE BLOCK (lines 167-217)
    /* 
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
    */

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

// Accessibility Functions
function toggleTextSize() {
    const body = document.body;
    const currentSize = parseFloat(getComputedStyle(body).fontSize);
    const newSize = currentSize === 16 ? 18 : 16;
    body.style.fontSize = `${newSize}px`;
    localStorage.setItem('fontSize', newSize);
}

// Check for saved font size preference
document.addEventListener('DOMContentLoaded', () => {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        document.body.style.fontSize = `${savedFontSize}px`;
    }
});

// Terms Modal Functions
function showTermsModal() {
    const modal = document.getElementById('termsModal');
    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeTermsModal() {
    const modal = document.getElementById('termsModal');
    modal.classList.remove('visible');
    document.body.style.overflow = '';
}

// Close modal when clicking outside
document.getElementById('termsModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeTermsModal();
    }
});

// Hot Deals Management - REMOVE THIS SECTION
/*
let hotDeals = [];

function addHotDeal(deal) {
    hotDeals.push(deal);
    updateHotDealsDisplay();
}

function updateHotDealsDisplay() {
    const container = document.querySelector('.hot-deals-container');
    container.innerHTML = hotDeals.map(deal => `
        <div class="hot-deal-card">
            <div class="hot-deal-header">
                <h3 class="hot-deal-title">${deal.title}</h3>
                <div class="hot-deal-price">${deal.price}</div>
            </div>
            <div class="hot-deal-details">
                <p>${deal.description}</p>
                <p>${deal.dates}</p>
            </div>
            <div class="hot-deal-flight">
                <p><strong>טיסה:</strong> ${deal.flight}</p>
                <p><strong>הלוך:</strong> ${deal.departure}</p>
                <p><strong>חזור:</strong> ${deal.return}</p>
            </div>
            <div class="hot-deal-features">
                ${deal.features.map(feature => `
                    <span class="hot-deal-feature">${feature}</span>
                `).join('')}
            </div>
            <a href="#" class="hot-deal-cta">לפרטים נוספים</a>
        </div>
    `).join('');
}

// Example usage:
// addHotDeal({
//     title: "הילטון אל האבטור דובאי",
//     price: "2,500 ₪ לאדם",
//     description: "5 ימים בדובאי במלון מדהים 5 כוכבים על שפת הים כולל ארוחת בוקר",
//     dates: "18/06 עד 22/06 ראשון עד חמישי",
//     flight: "חברת תעופה: אלעל✈️",
//     departure: "06:30 בבוקר יום ראשון *18/06*",
//     return: "19:30 המראה מדובאי יום חמישי *22/06*",
//     features: [
//         "כבודה מלאה- טרולי 5 קילו + מזוודה 20 קילו לכל נוסע",
//         "ליווי בכל המצטרך",
//         "אטרקציות",
//         "העברות במידה ויש צורך",
//         "אפשרות לארוחות כשרות למהדרין"
//     ]
// });
*/

// --- Exit Intent Popup Logic ---
const exitPopup = document.getElementById('exitPopup');
const closePopupButton = document.getElementById('closePopup');
let popupShownThisSession = false; // Track if shown in this specific visit

// Function to show the popup
function showExitPopup() {
    // Check if the popup element exists, if it was already shown this session, or if the cookie exists
    const cookieExists = document.cookie.split(';').some((item) => item.trim().startsWith('exitPopupShown='));

    if (exitPopup && !popupShownThisSession && !cookieExists) {
        exitPopup.style.display = 'flex'; // Use flex to center content
        // Add class for potential fade-in animation (add CSS for .exit-popup.visible { opacity: 1; } if needed)
        setTimeout(() => exitPopup.classList.add('visible'), 10); 
        document.body.style.overflow = 'hidden'; // Prevent scrolling while popup is open
        popupShownThisSession = true; // Mark as shown for this session

        // Set a cookie to prevent showing for 1 day
        let expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1); // Expires in 1 day
        document.cookie = `exitPopupShown=true; expires=${expiryDate.toUTCString()}; path=/`;
    }
}

// Function to close the popup
function closeExitPopup() {
    if (exitPopup) {
        exitPopup.classList.remove('visible');
        // Wait for fade-out animation before hiding completely
        setTimeout(() => {
             exitPopup.style.display = 'none';
             document.body.style.overflow = ''; // Restore scrolling
        }, 300); // Match this duration to CSS transition if any
       
    }
}

// Event listener for mouse leaving the viewport towards the top
document.addEventListener('mouseleave', (e) => {
    // Check if mouse Y position is near the top edge
    if (e.clientY <= 15) { // Trigger when mouse is within 15px of the top
         // Optional: Add a small delay to prevent accidental triggers
        setTimeout(showExitPopup, 200); // Delay of 200ms
    }
});

// Event listener for the close button inside the popup
if (closePopupButton) {
    closePopupButton.addEventListener('click', closeExitPopup);
}

// Optional: Close popup if user clicks outside the popup content
if (exitPopup) {
    exitPopup.addEventListener('click', (e) => {
        // Check if the click is on the overlay itself, not the content
        if (e.target === exitPopup) {
            closeExitPopup();
        }
    });
}
// --- End Exit Intent Popup Logic ---

// ... rest of the code ... 