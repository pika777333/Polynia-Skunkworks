/**
 * router.js - Enhanced view router
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
                if (typeof MetricsView !== 'undefined' && typeof MetricsView.initialize === 'function') {
                    MetricsView.initialize();
                } else if (typeof window.initializeMetricsView === 'function') {
                    window.initializeMetricsView();
                }
            } else if (view === 'user') {
                // First try to initialize UserProfile React component
                if (typeof window.ReactDOM !== 'undefined' && typeof React !== 'undefined') {
                    try {
                        // Import UserProfile component dynamically if possible
                        if (typeof window.UserProfile === 'undefined') {
                            // If not already defined globally, try to define it
                            // You might need to adjust this depending on how your modules are set up
                            console.log('Initializing User Profile React component');
                            initializeUserProfileComponent();
                        } else {
                            // If already defined, just render it
                            renderUserProfileComponent();
                        }
                    } catch (error) {
                        console.error('Error initializing React User Profile:', error);
                        // Fallback to traditional JS initialization
                        initializeUserProfileFallback();
                    }
                } else {
                    // Fallback to traditional JS initialization
                    initializeUserProfileFallback();
                }
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
     * Initialize User Profile component using React
     */
    function initializeUserProfileComponent() {
        const userViewElement = document.getElementById('userView');
        
        // Clear existing content if any
        userViewElement.innerHTML = '';
        
        // Try to load and render the UserProfile component
        if (typeof window.initializeReactComponent === 'function') {
            window.initializeReactComponent('userView', window.UserProfile);
        } else {
            console.error('React initialization function not found');
            initializeUserProfileFallback();
        }
    }
    
    /**
     * Render the UserProfile component directly if it's already loaded
     */
    function renderUserProfileComponent() {
        const userViewElement = document.getElementById('userView');
        
        // Clear existing content if any
        userViewElement.innerHTML = '';
        
        if (typeof window.initializeReactComponent === 'function') {
            window.initializeReactComponent('userView', window.UserProfile);
        } else if (typeof ReactDOM !== 'undefined' && typeof React !== 'undefined' && typeof window.UserProfile !== 'undefined') {
            // Directly render the component if everything is available
            const root = ReactDOM.createRoot(userViewElement);
            root.render(React.createElement(window.UserProfile));
        } else {
            console.error('Failed to render User Profile component');
            initializeUserProfileFallback();
        }
    }
    
    /**
     * Fallback initialization for User Profile using traditional JS
     */
    function initializeUserProfileFallback() {
        console.log('Using fallback User Profile initialization');
        if (typeof UserProfile !== 'undefined' && typeof UserProfile.initialize === 'function') {
            UserProfile.initialize();
        } else {
            // Create a very basic fallback content
            const userViewElement = document.getElementById('userView');
            userViewElement.innerHTML = `
                <div class="p-6">
                    <div class="bg-white rounded-lg shadow-sm p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">User Profile</h2>
                        <p class="text-gray-600 mb-4">Your profile information will appear here.</p>
                        <button class="px-4 py-2 rounded-lg text-white earworm-gradient font-medium">
                            Edit Profile
                        </button>
                    </div>
                </div>
            `;
        }
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
