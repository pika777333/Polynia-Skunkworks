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
        
        // Hide all views
        document.getElementById('dashboardView').classList.add('hidden');
        document.getElementById('metricsView').classList.add('hidden');
        document.getElementById('userView').classList.add('hidden');
        
        // Show the selected view
        document.getElementById(`${view}View`).classList.remove('hidden');
        
        // Update current view
        currentView = view;
        
        // Initialize the specific view if needed
        if (view === 'metrics' && typeof MetricsView !== 'undefined') {
            MetricsView.initialize();
        } else if (view === 'user' && typeof UserProfile !== 'undefined') {
            UserProfile.initialize();
        }
        
        // Update main title based on view
        const pageTitle = document.querySelector('header h1');
        if (pageTitle) {
            if (view === 'dashboard') {
                pageTitle.textContent = 'Sales Conversation Analyzer';
            } else if (view === 'metrics') {
                pageTitle.textContent = 'Sales Performance Metrics';
            } else if (view === 'user') {
                pageTitle.textContent = 'User Profile';
            }
        }
    }
    
    // Public API
    return {
        initialize,
        navigateTo
    };
})();
