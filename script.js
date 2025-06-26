// Global Variables
let currentProject = null;

// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
const projectModal = document.getElementById('project-modal');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeContactForm();
    initializeAnimations();
});

// Navigation Functions
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

function initializeScrollEffects() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-card, .experience-card, .project-card, .contact-item');
    animateElements.forEach(el => observer.observe(el));
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = header.offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

// Contact Form Functions
function initializeContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;

    // Validate name
    if (!name.value.trim()) {
        showFieldError(name, 'Name is required');
        isValid = false;
    }

    // Validate email
    if (!email.value.trim()) {
        showFieldError(email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    if (!subject.value.trim()) {
        showFieldError(subject, 'Subject is required');
        isValid = false;
    }

    // Validate message
    if (!message.value.trim()) {
        showFieldError(message, 'Message is required');
        isValid = false;
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    
    switch(field.id) {
        case 'name':
            if (!value) {
                showFieldError(field, 'Name is required');
                return false;
            }
            break;
        case 'email':
            if (!value) {
                showFieldError(field, 'Email is required');
                return false;
            } else if (!isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'subject':
            if (!value) {
                showFieldError(field, 'Subject is required');
                return false;
            }
            break;
        case 'message':
            if (!value) {
                showFieldError(field, 'Message is required');
                return false;
            }
            break;
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function submitForm() {
    // Simulate form submission
    const submitButton = contactForm.querySelector('.form-submit');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;

    setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.classList.add('show');
        
        // Reset form
        contactForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
}

function resetContactForm() {
    formSuccess.classList.remove('show');
    contactForm.style.display = 'flex';
    
    // Clear any existing errors
    const errorElements = contactForm.querySelectorAll('.form-error');
    errorElements.forEach(error => {
        error.classList.remove('show');
        error.textContent = '';
    });
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Project Modal Functions
function openProject(projectType) {
    currentProject = projectType;
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    switch(projectType) {
        case 'todo':
            modalTitle.textContent = 'Task Management App';
            modalBody.innerHTML = '<iframe src="todo.html" style="width: 100%; height: 600px; border: none; border-radius: 8px;"></iframe>';
            break;
        case 'products':
            modalTitle.textContent = 'E-commerce Product Catalog';
            modalBody.innerHTML = '<iframe src="products.html" style="width: 100%; height: 600px; border: none; border-radius: 8px;"></iframe>';
            break;
    }
    
    projectModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeProject() {
    projectModal.classList.remove('show');
    document.body.style.overflow = 'auto';
    currentProject = null;
}

// Close modal when clicking outside
projectModal.addEventListener('click', function(e) {
    if (e.target === projectModal) {
        closeProject();
    }
});

// Animation Functions
function initializeAnimations() {
    // Add stagger animation to cards
    const cards = document.querySelectorAll('.skill-card, .experience-card, .project-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && projectModal.classList.contains('show')) {
        closeProject();
    }
});