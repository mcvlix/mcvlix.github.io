/**
 * Navigation Module
 * Handles smooth scrolling, active section highlighting, and navigation bar behavior
 */

export class Navigation {
    constructor() {
        this.navBar = document.getElementById('navBar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.lastScrollY = window.scrollY;
        this.scrolling = false;
        
        this.init();
    }
    
    init() {
        console.log('Navigation.init called, navLinks:', this.navLinks.length);
        this.setupSmoothScroll();
        this.setupActiveSection();
        this.setupNavBarBehavior();
        this.setupKeyboardNavigation();
        this.setupMobileMenu();
    }
    
    /**
     * Setup smooth scrolling for navigation links
     */
    setupSmoothScroll() {
        console.log('Setting up smooth scroll for', this.navLinks.length, 'links');
        this.navLinks.forEach((link, index) => {
            console.log(`Setting up link ${index}:`, link.getAttribute('href'));
            link.addEventListener('click', (e) => {
                console.log('Nav link clicked:', link.getAttribute('href'));
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        // Special handling for Projects section
                        if (targetId === 'projects') {
                            // Always open projects catalog container when clicking Projects
                            if (typeof window.displayProjectsSlider === 'function') {
                                window.displayProjectsSlider();
                            } else {
                                const projectsSection = document.getElementById('projects');
                                if (projectsSection) {
                                    const catalogContainer = projectsSection.querySelector('.projects-catalog-container');
                                if (catalogContainer) {
                                    catalogContainer.classList.add('show');
                                        const slider = document.getElementById('projectSlider');
                                    const projectControls = document.getElementById('projectControls');
                                    if (slider) slider.classList.add('show');
                                    if (projectControls) projectControls.classList.add('show');
                                    
                                    // Setup filters
                                    setTimeout(() => {
                                        if (typeof window.setupProjectFilters === 'function') {
                                            window.setupProjectFilters();
                                        }
                                    }, 100);
                                    }
                                }
                            }
                            
                            // Update active nav link but don't scroll
                            this.updateActiveNavLink(link);
                        } else if (targetId === 'blogs') {
                            // Always open blogs catalog container when clicking Blogs
                            if (typeof window.displayBlogsSlider === 'function') {
                                window.displayBlogsSlider();
                            } else {
                                const blogsSection = document.getElementById('blogs');
                                if (blogsSection) {
                                    const catalogContainer = blogsSection.querySelector('.projects-catalog-container');
                                    if (catalogContainer) {
                                        catalogContainer.classList.add('show');
                                        const slider = document.getElementById('blogSlider');
                                        const blogControls = document.getElementById('blogControls');
                                        if (slider) slider.classList.add('show');
                                        if (blogControls) blogControls.classList.add('show');
                                        
                                        // Setup filters
                                        setTimeout(() => {
                                            if (typeof window.setupBlogFilters === 'function') {
                                                window.setupBlogFilters();
                                            }
                                        }, 100);
                                    }
                                }
                            }
                            
                            // Update active nav link but don't scroll
                            this.updateActiveNavLink(link);
                        } else if (targetId === 'publications') {
                            // Always open publications catalog container when clicking Publications
                            if (typeof window.displayPublicationsSlider === 'function') {
                                window.displayPublicationsSlider();
                            } else {
                                const publicationsSection = document.getElementById('publications');
                                if (publicationsSection) {
                                    const catalogContainer = publicationsSection.querySelector('.projects-catalog-container');
                                    if (catalogContainer) {
                                        catalogContainer.classList.add('show');
                                        const slider = document.getElementById('publicationSlider');
                                        const publicationControls = document.getElementById('publicationControls');
                                        if (slider) slider.classList.add('show');
                                        if (publicationControls) publicationControls.classList.add('show');
                                        
                                        // Setup filters
                                        setTimeout(() => {
                                            if (typeof window.setupPublicationFilters === 'function') {
                                                window.setupPublicationFilters();
                                            }
                                        }, 100);
                                    }
                                }
                            }
                            
                            // Update active nav link but don't scroll
                            this.updateActiveNavLink(link);
                        } else if (targetId === 'about') {
                            // Special handling for About - revert to front page
                            if (typeof window.revertToFrontPage === 'function') {
                                window.revertToFrontPage();
                            }
                            
                            // Close project, blog, and publication catalogs if open
                            const projectsSection = document.getElementById('projects');
                            const blogsSection = document.getElementById('blogs');
                            const publicationsSection = document.getElementById('publications');
                            
                            if (projectsSection) {
                                const catalogContainer = projectsSection.querySelector('.projects-catalog-container');
                            if (catalogContainer && catalogContainer.classList.contains('show')) {
                                catalogContainer.classList.remove('show');
                                    const slider = document.getElementById('projectSlider');
                                const projectControls = document.getElementById('projectControls');
                                if (slider) slider.classList.remove('show');
                                if (projectControls) projectControls.classList.remove('show');
                                }
                            }
                            
                            if (blogsSection) {
                                const catalogContainer = blogsSection.querySelector('.projects-catalog-container');
                                if (catalogContainer && catalogContainer.classList.contains('show')) {
                                    catalogContainer.classList.remove('show');
                                    const slider = document.getElementById('blogSlider');
                                    const blogControls = document.getElementById('blogControls');
                                    if (slider) slider.classList.remove('show');
                                    if (blogControls) blogControls.classList.remove('show');
                                }
                            }
                            
                            if (publicationsSection) {
                                const catalogContainer = publicationsSection.querySelector('.projects-catalog-container');
                                if (catalogContainer && catalogContainer.classList.contains('show')) {
                                    catalogContainer.classList.remove('show');
                                    const slider = document.getElementById('publicationSlider');
                                    const publicationControls = document.getElementById('publicationControls');
                                    if (slider) slider.classList.remove('show');
                                    if (publicationControls) publicationControls.classList.remove('show');
                                }
                            }
                            
                            // Scroll to target
                            this.scrollToElement(targetElement);
                            
                            // Update active nav link
                            this.updateActiveNavLink(link);
                        } else {
                            // Close project, blog, and publication catalogs if navigating to other sections
                            const projectsSection = document.getElementById('projects');
                            const blogsSection = document.getElementById('blogs');
                            const publicationsSection = document.getElementById('publications');
                            
                            if (projectsSection) {
                                const catalogContainer = projectsSection.querySelector('.projects-catalog-container');
                            if (catalogContainer && catalogContainer.classList.contains('show')) {
                                catalogContainer.classList.remove('show');
                                    const slider = document.getElementById('projectSlider');
                                const projectControls = document.getElementById('projectControls');
                                if (slider) slider.classList.remove('show');
                                if (projectControls) projectControls.classList.remove('show');
                                }
                            }
                            
                            if (blogsSection) {
                                const catalogContainer = blogsSection.querySelector('.projects-catalog-container');
                                if (catalogContainer && catalogContainer.classList.contains('show')) {
                                    catalogContainer.classList.remove('show');
                                    const slider = document.getElementById('blogSlider');
                                    const blogControls = document.getElementById('blogControls');
                                    if (slider) slider.classList.remove('show');
                                    if (blogControls) blogControls.classList.remove('show');
                                }
                            }
                            
                            if (publicationsSection) {
                                const catalogContainer = publicationsSection.querySelector('.projects-catalog-container');
                                if (catalogContainer && catalogContainer.classList.contains('show')) {
                                    catalogContainer.classList.remove('show');
                                    const slider = document.getElementById('publicationSlider');
                                    const publicationControls = document.getElementById('publicationControls');
                                    if (slider) slider.classList.remove('show');
                                    if (publicationControls) publicationControls.classList.remove('show');
                                }
                            }
                            
                            // Scroll to target for other sections
                            this.scrollToElement(targetElement);
                            
                            // Update active nav link
                            this.updateActiveNavLink(link);
                        }
                    }
                }
            });
        });
    }
    
    /**
     * Smooth scroll to element
     */
    scrollToElement(element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - 80; // Account for nav bar
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    /**
     * Update active navigation link based on scroll position
     */
    setupActiveSection() {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.navLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            this.updateActiveNavLink(link);
                        }
                    });
                }
            });
        }, observerOptions);
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    /**
     * Update active navigation link
     */
    updateActiveNavLink(activeLink) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }
    
    /**
     * Setup navigation bar hide/show on scroll
     */
    setupNavBarBehavior() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    
                    if (currentScrollY > 100) {
                        // Show/hide nav bar based on scroll direction
                        if (currentScrollY > this.lastScrollY) {
                            // Scrolling down
                            this.navBar?.classList.add('hidden');
                        } else {
                            // Scrolling up
                            this.navBar?.classList.remove('hidden');
                        }
                    } else {
                        // Always show at top
                        this.navBar?.classList.remove('hidden');
                    }
                    
                    this.lastScrollY = currentScrollY;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        // Arrow key navigation between sections
        document.addEventListener('keydown', (e) => {
            if (e.altKey || e.ctrlKey || e.metaKey) return;
            
            const currentSection = this.getCurrentSection();
            if (!currentSection) return;
            
            const sectionsArray = Array.from(this.sections);
            const currentIndex = sectionsArray.indexOf(currentSection);
            
            if (e.key === 'ArrowDown' && currentIndex < sectionsArray.length - 1) {
                e.preventDefault();
                this.scrollToElement(sectionsArray[currentIndex + 1]);
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                this.scrollToElement(sectionsArray[currentIndex - 1]);
            }
        });
    }
    
    /**
     * Get currently visible section
     */
    getCurrentSection() {
        for (const section of this.sections) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                return section;
            }
        }
        return null;
    }
    
    /**
     * Setup mobile menu toggle
     */
    setupMobileMenu() {
        const navToggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', !isExpanded);
                navLinks.classList.toggle('active');
            });
            
            // Close menu when clicking a link
            const links = navLinks.querySelectorAll('.nav-link');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('active');
                });
            });
            
            // Close menu on outside click
            document.addEventListener('click', (e) => {
                if (!this.navBar.contains(e.target) && navLinks.classList.contains('active')) {
                    navToggle.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('active');
                }
            });
        }
    }
}

