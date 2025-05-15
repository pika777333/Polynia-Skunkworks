/**
 * transitions.js - Enhanced page transitions and animations
 * Provides additional animation utilities using GSAP
 */

const PageTransitions = (function() {
    // Cache DOM elements
    let transitionLoader;
    let viewContainers = [];
    
    /**
     * Initialize the transitions system
     */
    function initialize() {
        // Create the transition loader element if it doesn't exist
        if (!document.querySelector('.page-transition-loader')) {
            transitionLoader = document.createElement('div');
            transitionLoader.className = 'page-transition-loader';
            document.body.appendChild(transitionLoader);
        } else {
            transitionLoader = document.querySelector('.page-transition-loader');
        }
        
        // Cache view containers
        viewContainers = [
            document.getElementById('dashboardView'),
            document.getElementById('metricsView'),
            document.getElementById('userView')
        ];
        
        // Setup any additional event listeners
        setupAnimationHooks();
        
        console.log('Page transitions initialized');
    }
    
    /**
     * Set up hooks for triggering animations
     */
    function setupAnimationHooks() {
        // Add animated class to stagger items when they enter viewport
        if (typeof IntersectionObserver !== 'undefined') {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, { threshold: 0.1 });
            
            // Observe all stagger items
            document.querySelectorAll('.stagger-item').forEach(item => {
                observer.observe(item);
            });
            
            // Observe cascade containers
            document.querySelectorAll('.cascade-container').forEach(container => {
                observer.observe(container);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            console.log('IntersectionObserver not supported. Using fallback animation.');
            document.querySelectorAll('.stagger-item').forEach(item => {
                item.classList.add('animate');
            });
            document.querySelectorAll('.cascade-container').forEach(container => {
                container.classList.add('animate');
            });
        }
    }
    
    /**
     * Show the transition loader
     */
    function showLoader() {
        if (!transitionLoader) return;
        
        transitionLoader.classList.add('loading');
    }
    
    /**
     * Hide the transition loader
     */
    function hideLoader() {
        if (!transitionLoader) return;
        
        transitionLoader.classList.remove('loading');
    }
    
    /**
     * Transition out a view with GSAP animation
     * @param {HTMLElement} element - The element to transition out
     * @param {Object} options - Animation options
     * @returns {Promise} A promise that resolves when animation completes
     */
    function transitionOut(element, options = {}) {
        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }
            
            const defaults = {
                y: -30,
                opacity: 0,
                duration: 0.4,
                ease: "power2.in",
                stagger: 0.05
            };
            
            const config = { ...defaults, ...options };
            
            if (typeof gsap !== 'undefined') {
                // Show the loader animation
                showLoader();
                
                // Get any staggered children if they exist
                const staggerItems = element.querySelectorAll('.cascade-item, .stagger-item');
                
                if (staggerItems.length > 0) {
                    // First animate out the children
                    gsap.to(staggerItems, {
                        y: -20,
                        opacity: 0,
                        duration: 0.3,
                        stagger: 0.03,
                        ease: "power1.in",
                        onComplete: () => {
                            // Then animate out the parent
                            gsap.to(element, {
                                opacity: 0,
                                y: config.y,
                                duration: config.duration,
                                ease: config.ease,
                                onComplete: resolve
                            });
                        }
                    });
                } else {
                    // Just animate the element itself
                    gsap.to(element, {
                        opacity: 0,
                        y: config.y,
                        duration: config.duration,
                        ease: config.ease,
                        onComplete: resolve
                    });
                }
            } else {
                // CSS fallback
                element.classList.add('view-exiting');
                element.classList.remove('view-visible');
                
                setTimeout(resolve, config.duration * 1000);
            }
        });
    }
    
    /**
     * Transition in a view with GSAP animation
     * @param {HTMLElement} element - The element to transition in
     * @param {Object} options - Animation options
     * @returns {Promise} A promise that resolves when animation completes
     */
    function transitionIn(element, options = {}) {
        return new Promise((resolve) => {
            if (!element) {
                hideLoader();
                resolve();
                return;
            }
            
            const defaults = {
                y: 30,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                stagger: 0.08
            };
            
            const config = { ...defaults, ...options };
            
            // Ensure element is visible but at starting animation state
            element.style.opacity = '0';
            element.style.transform = `translateY(${config.y}px)`;
            
            // Force browser reflow
            void element.offsetWidth;
            
            if (typeof gsap !== 'undefined') {
                // Get any staggered children if they exist
                const staggerItems = element.querySelectorAll('.cascade-item, .stagger-item');
                const cards = element.querySelectorAll('.earworm-card');
                
                // First animate in the parent container
                gsap.fromTo(element,
                    { opacity: 0, y: config.y },
                    { 
                        opacity: 1,
                        y: 0,
                        duration: config.duration,
                        ease: config.ease,
                        onComplete: () => {
                            hideLoader();
                            
                            // Then stagger in the children
                            if (staggerItems.length > 0) {
                                gsap.fromTo(staggerItems,
                                    { opacity: 0, y: 15 },
                                    {
                                        opacity: 1,
                                        y: 0,
                                        duration: 0.4,
                                        stagger: config.stagger,
                                        ease: "back.out(1.2)",
                                        onComplete: resolve
                                    }
                                );
                            } else if (cards.length > 0) {
                                // If no stagger items but we have cards, animate those
                                gsap.fromTo(cards,
                                    { opacity: 0, y: 20, scale: 0.95 },
                                    {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        duration: 0.5,
                                        stagger: 0.08,
                                        ease: "back.out(1.2)",
                                        onComplete: resolve
                                    }
                                );
                            } else {
                                resolve();
                            }
                        }
                    }
                );
            } else {
                // CSS fallback
                element.classList.add('view-entering');
                
                setTimeout(() => {
                    element.classList.remove('view-entering');
                    element.classList.add('view-visible');
                    hideLoader();
                    
                    setTimeout(resolve, config.duration * 500);
                }, 50);
            }
        });
    }
    
    /**
     * Create staggered entrance for a list of items
     * @param {NodeList|Array} elements - The elements to animate
     * @param {Object} options - Animation options
     * @returns {Promise} A promise that resolves when animations complete
     */
    function staggerItems(elements, options = {}) {
        return new Promise((resolve) => {
            if (!elements || elements.length === 0) {
                resolve();
                return;
            }
            
            const defaults = {
                y: 20,
                opacity: 0,
                duration: 0.4,
                stagger: 0.08,
                ease: "power2.out"
            };
            
            const config = { ...defaults, ...options };
            
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(elements,
                    { opacity: 0, y: config.y },
                    {
                        opacity: 1,
                        y: 0,
                        duration: config.duration,
                        stagger: config.stagger,
                        ease: config.ease,
                        onComplete: resolve
                    }
                );
            } else {
                // CSS fallback
                Array.from(elements).forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * (config.stagger * 1000));
                });
                
                // Resolve after all items would have animated
                setTimeout(resolve, (elements.length * config.stagger + config.duration) * 1000);
            }
        });
    }
    
    /**
     * Add animation classes to appropriate elements in a view
     * @param {HTMLElement} viewElement - The view container
     */
    function prepareViewForAnimation(viewElement) {
        if (!viewElement) return;
        
        // Find all cards that should be animated
        const cards = viewElement.querySelectorAll('.earworm-card');
        cards.forEach(card => {
            card.classList.add('stagger-item');
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });
        
        // Find all content sections that should cascade
        const contentSections = viewElement.querySelectorAll('section, .content-section');
        contentSections.forEach(section => {
            section.classList.add('cascade-container');
            
            // Add cascade item class to children
            const children = section.children;
            Array.from(children).forEach(child => {
                child.classList.add('cascade-item');
            });
        });
    }
    
    /**
     * Perform a smooth scroll to an element
     * @param {HTMLElement|string} target - Element or selector to scroll to
     * @param {Object} options - Scroll options
     */
    function scrollTo(target, options = {}) {
        const element = typeof target === 'string' 
            ? document.querySelector(target) 
            : target;
            
        if (!element) return;
        
        const defaults = {
            offset: 0,
            duration: 0.8,
            ease: "power2.inOut"
        };
        
        const config = { ...defaults, ...options };
        
        if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
            gsap.to(window, {
                duration: config.duration,
                scrollTo: {
                    y: element,
                    offsetY: config.offset
                },
                ease: config.ease
            });
        } else {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition + config.offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    /**
     * Animate the page title change
     * @param {string} newTitle - The new title to display
     * @param {HTMLElement} titleElement - The title element to update
     */
    function animatePageTitle(newTitle, titleElement) {
        if (!titleElement) return;
        
        if (typeof gsap !== 'undefined') {
            gsap.to(titleElement, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                onComplete: () => {
                    titleElement.textContent = newTitle;
                    gsap.to(titleElement, {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: "back.out(1.7)"
                    });
                }
            });
        } else {
            // CSS fallback
            titleElement.style.opacity = '0';
            titleElement.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                titleElement.textContent = newTitle;
                titleElement.style.opacity = '1';
                titleElement.style.transform = 'translateY(0)';
            }, 300);
        }
    }
    
    // Public API
    return {
        initialize,
        transitionOut,
        transitionIn,
        staggerItems,
        prepareViewForAnimation,
        scrollTo,
        animatePageTitle,
        showLoader,
        hideLoader
    };
})();

// Auto-initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    PageTransitions.initialize();
});
