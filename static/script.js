// Smooth scrolling enhancement for nav links
const navLinks = document.querySelectorAll('.nav-link');
const navLinksContainer = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        // Close mobile menu after clicking a link
        navLinksContainer.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    const isOpen = navLinksContainer.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Scroll reveal animation using IntersectionObserver
const revealElements = document.querySelectorAll('.reveal, .skill-card');
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15,
    }
);

revealElements.forEach((element) => {
    if (element.classList.contains('skill-card')) {
        // Add reveal base class so skill cards animate when visible
        element.classList.add('reveal');
    }
    revealObserver.observe(element);
});

// Active menu highlight based on scroll position
const sections = document.querySelectorAll('main section[id]');

const setActiveLink = () => {
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const matchingLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (scrollPosition >= top && scrollPosition < top + height) {
            navLinks.forEach((link) => link.classList.remove('active'));
            if (matchingLink) matchingLink.classList.add('active');
        }
    });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// Basic contact form validation
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    formFeedback.classList.remove('error', 'success');

    if (!name || !email || !message) {
        formFeedback.textContent = 'Please fill in all fields.';
        formFeedback.classList.add('error');
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formFeedback.textContent = 'Please enter a valid email address.';
        formFeedback.classList.add('error');
        return;
    }

    formFeedback.textContent = 'Thanks! Your message has been validated successfully.';
    formFeedback.classList.add('success');
    contactForm.reset();
});
