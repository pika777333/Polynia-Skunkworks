/**
 * router.js - Simple view router
 * Handles navigation between different views in the application
 */

const Router = (function() {
    // State variables
    let currentView = 'dashboard';
    let navLinks = [];
    
    /**
     * Initialize the router
     */
    function initialize() {
        // Cache all navigation links
        navLinks = document.querySelectorAll('.nav-link');
        
        // Add click handlers to all navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.getAttribute('data-target');
                navigateTo(target);
            });
        });
        
        console.log('Router initialized');
    }
    
    /**
     * Navigate to a specific view
     * @param {string} view - The view to navigate to
     */
    function navigateTo(view) {
        // Don't do anything if this is already the current view
        if (view === currentView) return;
        
        console.log(`Navigating to view: ${view}`);
        
        // Update active state in navigation
        navLinks.forEach(link => {
            const linkTarget = link.getAttribute('data-target');
            
            if (linkTarget === view) {
                link.classList.remove('text-gray-700', 'hover:bg-gray-100');
                link.classList.add('earworm-gradient', 'text-white');
            } else {
                link.classList.remove('earworm-gradient', 'text-white');
                link.classList.add('text-gray-700', 'hover:bg-gray-100');
            }
        });
        
        // Hide all views with a fade-out effect
        const currentViewElement = document.getElementById(`${currentView}View`);
        
        // Apply transition
        fadeOut(currentViewElement, () => {
            // Hide all views
            document.getElementById('dashboardView').classList.add('hidden');
            document.getElementById('metricsView').classList.add('hidden');
            document.getElementById('userView').classList.add('hidden');
            
            // Show the selected view with fade-in effect
            const newViewElement = document.getElementById(`${view}View`);
            newViewElement.classList.remove('hidden');
            fadeIn(newViewElement);
            
            // Initialize the specific view if needed
            if (view === 'metrics') {
                // First check if native JS module exists
                if (typeof MetricsView !== 'undefined' && typeof MetricsView.initialize === 'function') {
                    MetricsView.initialize();
                }
                // Then try window functions 
                else if (typeof window.initializeMetricsView === 'function') {
                    window.initializeMetricsView();
                }
            } else if (view === 'user' && typeof UserProfile !== 'undefined') {
                UserProfile.initialize();
            }
            
            // Update current view
            currentView = view;
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Update main title based on view
            updatePageTitle(view);
        });
    }
    
    /**
     * Update the page title based on current view
     * @param {string} view - The current view
     */
    function updatePageTitle(view) {
        const pageTitle = document.querySelector('header h1');
        if (pageTitle) {
            if (view === 'dashboard') {
                pageTitle.textContent = 'Sales Conversation Analyzer';
            } else if (view === 'metrics') {
                pageTitle.textContent = 'Sales History';
            } else if (view === 'user') {
                pageTitle.textContent = 'User Profile';
            }
        }
    }
    
    /**
     * Fade out an element
     * @param {HTMLElement} element - The element to fade out
     * @param {Function} callback - Callback to run after animation
     */
    function fadeOut(element, callback) {
        if (typeof gsap !== 'undefined') {
            gsap.to(element, {
                opacity: 0,
                duration: 0.2,
                onComplete: callback
            });
        } else {
            // Fallback if GSAP not available
            element.style.opacity = '0';
            setTimeout(callback, 200);
        }
    }
    
    /**
     * Fade in an element
     * @param {HTMLElement} element - The element to fade in
     */
    function fadeIn(element) {
        if (typeof gsap !== 'undefined') {
            gsap.fromTo(element, 
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );
        } else {
            // Fallback if GSAP not available
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.opacity = '1';
            }, 10);
        }
    }
    
    // Public API
    return {
        initialize,
        navigateTo
    };
})();
