// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize functions that need to run when page loads
    animateCards();
    initAOS();
    startTypingEffect();
    setupNavbarLinks();
});

// ===== SCROLL & RESIZE EVENT HANDLERS =====
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', animateCards);

// ===== VIEWPORT UTILITY FUNCTIONS =====
/**
 * 
 * @param {HTMLElement} element 
 * @returns {boolean} 
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top < window.innerHeight && rect.bottom > 0 &&
        rect.left < window.innerWidth && rect.right > 0
    );
}

// ===== ANIMATION FUNCTIONS =====

function animateCards() {
    document.querySelectorAll('.card').forEach(card => {
        if (isInViewport(card)) card.classList.add('visible');
    });
}


function handleFitnessImageScroll() {
    const fitnessImage = document.querySelector('.fitness-section img');
    if (fitnessImage) {
        const scrollY = window.scrollY;
        fitnessImage.style.transform = `translateY(-${scrollY * 0.1}px)`;
    }
}


function handleScroll() {
    animateCards();
    handleFitnessImageScroll();
}

// ===== AOS ANIMATION INITIALIZATION =====

function initAOS() {
    AOS.init({
        duration: 1000,
        easing: 'ease',
        once: true
    });
}

// ===== TYPING EFFECT FUNCTIONS =====
const texts = ["Your Body!", "Your Biceps!", "Your Abs!"];
let index = 0,
  currentText = "",
  charIndex = 0;

const typingSpeed = 100,
  deletingSpeed = 75,
  pauseTime = 1000;

function typeEffect() {
  if (charIndex < texts[index].length) {
    // Add next character
    currentText += texts[index][charIndex];
    document.getElementById("typing-text").textContent = currentText;
    charIndex++;
    setTimeout(typeEffect, typingSpeed);
  } else {
    // Wait, then start deleting
    setTimeout(deleteEffect, pauseTime);
  }
}

function deleteEffect() {
  if (charIndex > 0) {
    // Remove last character
    currentText = texts[index].substring(0, charIndex - 1);
    document.getElementById("typing-text").textContent = currentText;
    charIndex--;
    setTimeout(deleteEffect, deletingSpeed);
  } else {
    // Move to next text
    index = (index + 1) % texts.length; // Loop back to first text
    setTimeout(typeEffect, typingSpeed);
  }
}

// Start typing effect
typeEffect();


// ===== NAVBAR FUNCTIONS =====

function setupNavbarLinks() {
    $(document).ready(function() {
        $('.navbar-nav .nav-link').on('click', function() {
            $('.navbar-nav .nav-link').removeClass('active');
            $(this).addClass('active');
        });
    });
}