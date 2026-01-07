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

// Newsletter form handler
function handleNewsletter(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const messageElement = document.getElementById('newsletter-message');
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        messageElement.textContent = 'Por favor, insira um email válido.';
        messageElement.className = 'error';
        return;
    }
    
    // Simulate form submission
    messageElement.textContent = 'Enviando...';
    messageElement.className = '';
    
    setTimeout(() => {
        messageElement.textContent = '✓ Obrigado! Você foi inscrito com sucesso. Verifique seu email.';
        messageElement.className = 'success';
        form.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            messageElement.textContent = '';
        }, 5000);
    }, 1000);
}

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards and blog posts
document.querySelectorAll('.produto-card, .blog-post').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    if (nav.style.display === 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
    }
}

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active state styling
const style = document.createElement('style');
style.textContent = `
    .nav a.active {
        opacity: 1;
        border-bottom: 2px solid white;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Track clicks on affiliate links (for analytics)
document.querySelectorAll('.btn-comprar').forEach(button => {
    button.addEventListener('click', function(e) {
        const productName = this.closest('.produto-card').querySelector('h3').textContent;
        console.log('Clique no produto:', productName);
        
        // You can send this data to your analytics service
        if (window.gtag) {
            gtag('event', 'click', {
                'event_category': 'affiliate',
                'event_label': productName
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';

// Prevent multiple form submissions
let isSubmitting = false;

function handleNewsletter(event) {
    event.preventDefault();
    
    if (isSubmitting) return;
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const messageElement = document.getElementById('newsletter-message');
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        messageElement.textContent = 'Por favor, insira um email válido.';
        messageElement.className = 'error';
        return;
    }
    
    isSubmitting = true;
    messageElement.textContent = 'Enviando...';
    messageElement.className = '';
    
    setTimeout(() => {
        messageElement.textContent = '✓ Obrigado! Você foi inscrito com sucesso. Verifique seu email.';
        messageElement.className = 'success';
        form.reset();
        isSubmitting = false;
        
        setTimeout(() => {
            messageElement.textContent = '';
        }, 5000);
    }, 1000);
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or menus if needed
    }
});

// Performance optimization: debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Your scroll event logic here
    });
});

// Add print styles
const printStyle = document.createElement('style');
printStyle.media = 'print';
printStyle.textContent = `
    .header, .footer, .newsletter, .nav {
        display: none;
    }
    .produto-card {
        page-break-inside: avoid;
    }
`;
document.head.appendChild(printStyle);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('Site carregado com sucesso!');
    
    // Add any additional initialization code here
    const productCards = document.querySelectorAll('.produto-card');
    console.log(`${productCards.length} produtos carregados`);
});
