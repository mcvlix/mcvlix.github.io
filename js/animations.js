/**
 * Animations Module
 * Handles entrance animations, scroll animations, and intersection observer setup
 */

export class Animations {
    constructor() {
        this.observers = new Map();
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupProgressIndicator();
    }
    
    /**
     * Setup Intersection Observer for fade-in animations
     */
    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe project items
        const projectItems = document.querySelectorAll('.project-item');
        projectItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            item.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
            observer.observe(item);
        });
        
        // Observe other elements that should fade in
        const fadeElements = document.querySelectorAll('.main-box, .project-display');
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    /**
     * Setup scroll-driven animations
     */
    setupScrollAnimations() {
        // Parallax effect for background elements
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const parallaxElements = document.querySelectorAll('.bg-animation, .grid-overlay');
                    
                    parallaxElements.forEach(element => {
                        const speed = 0.5;
                        element.style.transform = `translateY(${scrolled * speed}px)`;
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    /**
     * Setup reading progress indicator
     */
    setupProgressIndicator() {
        const progressBar = document.getElementById('progressIndicator');
        if (!progressBar) return;
        
        const updateProgress = () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        };
        
        window.addEventListener('scroll', updateProgress);
        updateProgress(); // Initial update
    }
    
    /**
     * Animate element entrance
     */
    animateEntrance(element, delay = 0) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, delay);
    }
    
    /**
     * Stagger animation for multiple elements
     */
    staggerAnimation(elements, baseDelay = 100) {
        elements.forEach((element, index) => {
            this.animateEntrance(element, index * baseDelay);
        });
    }
    
    /**
     * Ripple effect on click
     */
    addRippleEffect(element) {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
}

