/**
 * Accessibility Module
 * Handles keyboard navigation, focus management, ARIA attributes, and screen reader support
 */

export class Accessibility {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupSkipLinks();
        this.setupFocusManagement();
        this.setupARIA();
        this.setupKeyboardShortcuts();
        this.setupReducedMotion();
    }
    
    /**
     * Setup skip links
     */
    setupSkipLinks() {
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    }
    
    /**
     * Setup focus management
     */
    setupFocusManagement() {
        // Trap focus in modals
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach(modal => {
            const focusableElements = modal.querySelectorAll(
                'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
                
                if (e.key === 'Escape') {
                    modal.setAttribute('aria-hidden', 'true');
                    modal.classList.remove('active');
                }
            });
        });
        
        // Focus visible styles
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    /**
     * Setup ARIA attributes
     */
    setupARIA() {
        // Add ARIA labels to interactive elements
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (!button.getAttribute('aria-label') && button.textContent.trim()) {
                button.setAttribute('aria-label', button.textContent.trim());
            }
        });
        
        // Add ARIA labels to icons
        const icons = document.querySelectorAll('.contact-icon, .fab');
        icons.forEach(icon => {
            if (!icon.getAttribute('aria-label')) {
                const title = icon.getAttribute('title');
                if (title) {
                    icon.setAttribute('aria-label', title);
                }
            }
        });
        
        // Announce dynamic content changes
        const liveRegions = document.querySelectorAll('[aria-live]');
        liveRegions.forEach(region => {
            // Ensure proper role
            if (!region.getAttribute('role')) {
                region.setAttribute('role', region.getAttribute('aria-live') === 'polite' ? 'status' : 'alert');
            }
        });
    }
    
    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        // Command palette (Cmd+K or Ctrl+K)
        document.addEventListener('keydown', (e) => {
            const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
            const isCommandK = (isMac && e.metaKey && e.key === 'k') || (!isMac && e.ctrlKey && e.key === 'k');
            
            if (isCommandK) {
                e.preventDefault();
                this.toggleCommandPalette();
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }
    
    /**
     * Toggle command palette
     */
    toggleCommandPalette() {
        const palette = document.getElementById('commandPalette');
        if (!palette) return;
        
        const isActive = palette.classList.contains('active');
        
        if (isActive) {
            palette.classList.remove('active');
            palette.setAttribute('aria-hidden', 'true');
        } else {
            palette.classList.add('active');
            palette.setAttribute('aria-hidden', 'false');
            const input = document.getElementById('commandInput');
            if (input) {
                input.focus();
            }
        }
    }
    
    /**
     * Close all modals
     */
    closeAllModals() {
        const modals = document.querySelectorAll('[role="dialog"].active');
        modals.forEach(modal => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        });
    }
    
    /**
     * Setup reduced motion support
     */
    setupReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleReducedMotion = (matches) => {
            if (matches) {
                document.documentElement.style.setProperty('--transition-fast', '0s');
                document.documentElement.style.setProperty('--transition-base', '0s');
                document.documentElement.style.setProperty('--transition-slow', '0s');
                document.documentElement.style.setProperty('--transition-slower', '0s');
            }
        };
        
        handleReducedMotion(prefersReducedMotion.matches);
        prefersReducedMotion.addEventListener('change', (e) => handleReducedMotion(e.matches));
    }
    
    /**
     * Announce to screen readers
     */
    announce(message, priority = 'polite') {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', priority === 'assertive' ? 'alert' : 'status');
        announcement.setAttribute('aria-live', priority);
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            announcement.remove();
        }, 1000);
    }
}

// Add screen reader only class
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid var(--color-link);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

