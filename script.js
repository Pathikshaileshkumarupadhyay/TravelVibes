
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.querySelector('.contact-form');
const newsletterForm = document.querySelector('.newsletter-form');


menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navLinks.classList.remove('active');
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.classList.remove('active');
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);


document.querySelectorAll('.image-card, .experience-card, .deal-card').forEach(el => {
    observer.observe(el);
});


function calculateTripCost() {
    
    const destination = document.getElementById('destination').value;
    const days = parseInt(document.getElementById('days').value);
    const people = parseInt(document.getElementById('people').value);
    const accommodation = document.getElementById('accommodation').value;

    
    if (!destination || !days || !people || !accommodation) {
        alert('Please fill in all fields');
        return;
    }

    
    const basePrices = {
        'paris': 999,
        'dubai': 1299,
        'bali': 899,
        'newyork': 1199
    };

    
    const accommodationMultipliers = {
        'budget': 1,
        'standard': 1.5,
        'luxury': 2
    };

    
    let basePrice = basePrices[destination];
    let accommodationMultiplier = accommodationMultipliers[accommodation];
    let totalCost = (basePrice + (days * 100)) * people * accommodationMultiplier;

    
    const resultBox = document.getElementById('calculation-result');
    resultBox.innerHTML = `
        <h3>Trip Cost Estimate</h3>
        <p>Destination: ${destination.charAt(0).toUpperCase() + destination.slice(1)}</p>
        <p>Duration: ${days} days</p>
        <p>Number of People: ${people}</p>
        <p>Accommodation: ${accommodation.charAt(0).toUpperCase() + accommodation.slice(1)}</p>
        <p style="font-size: 24px; color: orange; margin-top: 10px;">
            Total Cost: $${totalCost.toLocaleString()}
        </p>
    `;
    resultBox.style.display = 'block';
}


if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        
        const formData = new FormData(this);
        const formObject = Object.fromEntries(formData);
        
        
        if (!formObject.name || !formObject.email) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        
        showNotification('Thank you! We will contact you soon.', 'success');
        this.reset();
    });
}


if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        if (validateEmail(email)) {
            showNotification('Thank you for subscribing!', 'success');
            this.reset();
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    });
}


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    
    setTimeout(() => notification.classList.add('visible'), 10);

    
    setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}


document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});


let lastScroll = 0;
const header = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});


const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        transform: translateY(100px);
        transition: transform 0.3s ease;
        z-index: 1000;
    }

    .notification.success {
        background-color: #4CAF50;
    }

    .notification.error {
        background-color: #f44336;
    }

    .notification.visible {
        transform: translateY(0);
    }

    .scroll-down {
        transform: translateY(-100%);
    }

    .scroll-up {
        transform: translateY(0);
    }

    nav {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', function() {
    
    const calculatorForm = document.getElementById('calculatorForm');
    if (calculatorForm) {
        calculatorForm.style.display = 'none';
    }
});


function selectDestination(destination) {
    
    const calculatorForm = document.getElementById('calculatorForm');
    const destinationInput = document.getElementById('destination');
    
        destinationInput.value = destination;  
    calculatorForm.style.display = 'block';
    
    
    calculatorForm.scrollIntoView({ behavior: 'smooth' });
}