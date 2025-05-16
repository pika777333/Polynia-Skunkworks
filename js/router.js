// router.js - FIXED VERSION
// State variables
let currentView = 'dashboard';
let isTransitioning = false;
const validViews = ['dashboard', 'metrics', 'user'];
const viewCallbacks = new Map();

/**
 * Initialize the router
 */
function initialize() {
    console.log('Initializing Router...');
    
    // Add click event listeners to all navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            navigateTo(target);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        const view = event.state?.view || 'dashboard';
        if (validViews.includes(view)) {
            navigateTo(view, true); // Skip pushing state when handling popstate
        }
    });
    
    // Initialize the view specified in the URL hash if present
    const hashView = window.location.hash.substring(1);
    if (hashView && validViews.includes(hashView)) {
        navigateTo(hashView);
    } else {
        // Set initial state
        window.history.replaceState({ view: currentView }, '', `#${currentView}`);
    }
    
    console.log('Router initialized');
}

/**
 * Register a callback for a specific view
 * @param {string} view - The view name
 * @param {Function} callback - Function to call when view is activated
 */
function registerViewCallback(view, callback) {
    if (validViews.includes(view) && typeof callback === 'function') {
        viewCallbacks.set(view, callback);
    }
}

/**
 * Navigate to a specific view
 * @param {string} view - The view to navigate to
 * @param {boolean} skipHistory - Skip updating browser history (for popstate)
 * @returns {Promise<boolean>} Success indicator
 */
async function navigateTo(view, skipHistory = false) {
    console.log(`Navigating to: ${view}`);
    
    // Validate view name
    if (!validViews.includes(view)) {
        console.error(`Invalid view name: ${view}`);
        return false;
    }
    
    // Don't navigate if already on this view or during transition
    if (view === currentView || isTransitioning) {
        console.log(`Navigation skipped - ${view === currentView ? 'already on view' : 'transition in progress'}`);
        return false;
    }
    
    // Set transitioning flag
    isTransitioning = true;
    
    try {
        // Update navigation UI
        updateNavigation(view);
        
        // Update page title
        updatePageTitle(view);
        
        // Hide all views
        document.querySelectorAll('#dashboardView, #metricsView, #userView').forEach(el => {
            el.classList.add('hidden');
        });
        
        // Show target view
        const viewElement = document.getElementById(`${view}View`);
        if (!viewElement) {
            throw new Error(`View element #${view}View not found`);
        }
        
        viewElement.classList.remove('hidden');
        
        // Run view callback if registered
        if (viewCallbacks.has(view)) {
            await viewCallbacks.get(view)();
        }
        
        // Update browser history (unless skipped)
        if (!skipHistory) {
            window.history.pushState({ view }, '', `#${view}`);
        }
        
        // Update state
        currentView = view;
        
        console.log(`Navigation to ${view} completed`);
        return true;
    } catch (error) {
        console.error('Navigation error:', error);
        return false;
    } finally {
        isTransitioning = false;
    }
}

/**
 * Update the active state in navigation
 * @param {string} activeView - The active view
 */
function updateNavigation(activeView) {
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkTarget = link.getAttribute('data-target');
        
        if (linkTarget === activeView) {
            link.classList.remove('text-gray-700', 'hover:bg-gray-100');
            link.classList.add('earworm-gradient', 'text-white', 'active');
        } else {
            link.classList.remove('earworm-gradient', 'text-white', 'active');
            link.classList.add('text-gray-700', 'hover:bg-gray-100');
        }
    });
}

/**
 * Update the page title based on current view
 * @param {string} view - The current view
 */
function updatePageTitle(view) {
    const pageTitle = document.querySelector('header h1');
    if (!pageTitle) return;
    
    const titles = {
        dashboard: 'Sales Conversation Analyzer',
        metrics: 'Sales History',
        user: 'User Profile'
    };
    
    if (titles[view]) {
        // Use GSAP if available for smooth transition
        if (typeof gsap !== 'undefined') {
            gsap.to(pageTitle, {
                opacity: 0,
                y: -10,
                duration: 0.2,
                onComplete: () => {
                    pageTitle.textContent = titles[view];
                    gsap.to(pageTitle, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3
                    });
                }
            });
        } else {
            pageTitle.textContent = titles[view];
        }
    }
}

/**
 * Get the current view name
 * @returns {string} Current view name
 */
function getCurrentView() {
    return currentView;
}

// IMPORTANT: Make global before DOMContentLoaded
window.Router = {
    initialize,
    navigateTo,
    registerViewCallback,
    getCurrentView
};
