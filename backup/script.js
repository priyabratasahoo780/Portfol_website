// 1. Typing Animation Effect for Hero Title
const typingText = document.querySelector('.typing-text');
const textToType = "Full-Stack Developer";
let charIndex = 0;

function type() {
    if (charIndex < textToType.length) {
        typingText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(type, 100); // Adjust typing speed here (lower is faster)
    }
}
// Start typing after a short delay so page loads first
setTimeout(type, 500);


// 2. "Realistic" Scroll Reveal Animation using Intersection Observer
// This watches for elements with the class '.hidden' entering the screen.
const observerOptions = {
    root: null, // viewport
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the '.show' class to trigger CSS transition
            entry.target.classList.add('show');
            // Stop watching once it's revealed
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Target all elements with the 'hidden' class
document.querySelectorAll('.hidden').forEach((el) => {
    observer.observe(el);
});


// 3. Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Offset by nav height (70px) to activate link right when section hits navbar
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


// 4. Mobile Navigation Toggle (Simple Implementation)
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // In a real app, you'd slide this out or toggle a class. 
        // For simplicity here, we just toggle display.
        if (navLinksContainer.style.display === 'flex') {
            navLinksContainer.style.display = 'none';
        } else {
            navLinksContainer.style.display = 'flex';
            navLinksContainer.style.flexDirection = 'column';
            navLinksContainer.style.position = 'absolute';
            navLinksContainer.style.top = '70px';
            navLinksContainer.style.left = '0';
            navLinksContainer.style.width = '100%';
            navLinksContainer.style.background = 'var(--bg-alt)';
            navLinksContainer.style.padding = '20px';
        }
    });
}

// Select the image
const image = document.getElementById('circleImage');

// Add a click event listener
image.addEventListener('click', () => {
    // Toggle the 'paused' class defined in CSS
    image.classList.toggle('paused');
    
    // Log status to console
    if (image.classList.contains('paused')) {
        console.log("Animation Paused");
    } else {
        console.log("Animation Resumed");
    }
});