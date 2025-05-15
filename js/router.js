/**
 * router.js - Enhanced view router
 * Handles navigation between different views in the application with improved transitions
 */

const Router = (function() {
    // State variables
    let currentView = 'dashboard';
    let navLinks = [];
    let isTransitioning = false;
    let viewLoaders = {};
    
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
            
            // Add hover handler for preloading
            link.addEventListener('mouseenter', function() {
                const target = this.getAttribute('data-target');
                preloadView(target);
            });
        });
        
        // Initialize view loaders
        setupViewLoaders();
        
        console.log('Enhanced Router initialized');
    }
    
    /**
     * Set up view loaders for each view
     */
    function setupViewLoaders() {
        // Dashboard view loader
        viewLoaders.dashboard = function() {
            return Promise.resolve(); // Dashboard is always loaded by default
        };
        
        // Metrics view loader
        viewLoaders.metrics = function() {
            return new Promise((resolve, reject) => {
                try {
                    if (typeof MetricsView !== 'undefined' && typeof MetricsView.initialize === 'function') {
                        MetricsView.initialize();
                        resolve();
                    } else if (typeof window.initializeMetricsView === 'function') {
                        window.initializeMetricsView();
                        resolve();
                    } else {
                        console.warn('MetricsView module not found, trying fallback initialization');
                        initializeMetricsFallback();
                        resolve();
                    }
                } catch (error) {
                    console.error('Error initializing Metrics view:', error);
                    initializeMetricsFallback();
                    resolve(); // Resolve even on error to continue navigation
                }
            });
        };
        
        // User profile view loader
        viewLoaders.user = function() {
            return new Promise((resolve, reject) => {
                try {
                    // Clear the container first
                    const userViewElement = document.getElementById('userView');
                    if (userViewElement) {
                        userViewElement.innerHTML = '';
                    }
                    
                    // Try to initialize React component
                    if (typeof window.ReactDOM !== 'undefined' && typeof React !== 'undefined') {
                        if (typeof window.UserProfile !== 'undefined') {
                            renderReactComponent('userView', window.UserProfile);
                            resolve();
                        } else if (typeof window.initializeUserProfile === 'function') {
                            window.initializeUserProfile()
                                .then(() => resolve())
                                .catch(err => {
                                    console.error('Failed to initialize UserProfile:', err);
                                    initializeUserProfileFallback();
                                    resolve();
                                });
                        } else {
                            // Use the simplified version from user-profile-init.js
                            renderReactComponent('userView', window.UserProfile || createDefaultUserProfile());
                            resolve();
                        }
                    } else {
                        // Use non-React fallback
                        initializeUserProfileFallback();
                        resolve();
                    }
                } catch (error) {
                    console.error('Error initializing User Profile view:', error);
                    initializeUserProfileFallback();
                    resolve(); // Resolve even on error to continue navigation
                }
            });
        };
    }
    
    /**
     * Preload a view when hovering over its navigation link
     * @param {string} view - The view to preload
     */
    function preloadView(view) {
        // Skip if this is the current view or we're already transitioning
        if (view === currentView || isTransitioning) return;
        
        // Begin preloading for certain views
        if (view === 'user') {
            // Preload User Profile component
            if (typeof window.UserProfile === 'undefined' && typeof window.initializeUserProfile === 'function') {
                console.log('Preloading User Profile component');
                window.initializeUserProfile().catch(err => {
                    console.warn('Failed to preload UserProfile component:', err);
                });
            }
        } else if (view === 'metrics') {
            // Preload Metrics view data if needed
            console.log('Preloading Metrics view');
            // Could add actual preloading logic here if metrics requires data fetching
        }
    }
    
    /**
     * Navigate to a specific view with enhanced transitions
     * @param {string} view - The view to navigate to
     */
    function navigateTo(view) {
        // Don't do anything if this is already the current view or we're in transition
        if (view === currentView || isTransitioning) return;
        
        // Set transitioning flag
        isTransitioning = true;
        
        console.log(`Navigating to view: ${view}`);
        
        // Update active state in navigation immediately
        updateNavigationState(view);
        
        // Update page title immediately for responsive UI
        updatePageTitle(view);
        
        // Apply transition with staggered animation
        const currentViewElement = document.getElementById(`${currentView}View`);
        
        // First fade out the current view
        transitionOutView(currentViewElement)
            .then(() => {
                // Hide all views
                document.getElementById('dashboardView').classList.add('hidden');
                document.getElementById('metricsView').classList.add('hidden');
                document.getElementById('userView').classList.add('hidden');
                
                // Get the new view element
                const newViewElement = document.getElementById(`${view}View`);
                
                // Show the new view element but keep it invisible
                newViewElement.classList.remove('hidden');
                newViewElement.style.opacity = '0';
                
                // Initialize the view
                return viewLoaders[view]();
            })
            .then(() => {
                // Get the new view element again after initialization
                const newViewElement = document.getElementById(`${view}View`);
                
                // Transition in the new view
                return transitionInView(newViewElement);
            })
            .then(() => {
                // Update current view state
                currentView = view;
                
                // Reset transitioning flag
                isTransitioning = false;
                
                // Scroll to top with smooth animation
                smoothScrollToTop();
                
                console.log(`Navigation to ${view} completed`);
            })
            .catch(error => {
                console.error('Navigation error:', error);
                
                // Reset transitioning flag even on error
                isTransitioning = false;
                
                // Show an error toast if available
                if (typeof UI !== 'undefined' && typeof UI.showToast === 'function') {
                    UI.showToast('Navigation failed. Please try again.', 'error');
                }
            });
    }
    
    /**
     * Update navigation link states
     * @param {string} activeView - The active view
     */
    function updateNavigationState(activeView) {
        navLinks.forEach(link => {
            const linkTarget = link.getAttribute('data-target');
            
            if (linkTarget === activeView) {
                link.classList.remove('text-gray-700', 'hover:bg-gray-100');
                link.classList.add('earworm-gradient', 'text-white');
            } else {
                link.classList.remove('earworm-gradient', 'text-white');
                link.classList.add('text-gray-700', 'hover:bg-gray-100');
            }
        });
    }
    
    /**
     * Smooth scroll to top of page
     */
    function smoothScrollToTop() {
        if (typeof gsap !== 'undefined') {
            gsap.to(window, {
                duration: 0.5,
                scrollTo: { y: 0, autoKill: false },
                ease: "power2.out"
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }
    
    /**
     * Transition out a view with animation
     * @param {HTMLElement} element - The element to transition out
     * @returns {Promise} A promise that resolves when the transition is complete
     */
    function transitionOutView(element) {
        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }
            
            if (typeof gsap !== 'undefined') {
                // Enhanced GSAP animation
                gsap.to(element, {
                    opacity: 0,
                    y: 20,
                    duration: 0.4,
                    ease: "power2.in",
                    onComplete: resolve
                });
            } else {
                // CSS transition fallback
                element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                
                setTimeout(resolve, 300);
            }
        });
    }
    
    /**
     * Transition in a view with animation
     * @param {HTMLElement} element - The element to transition in
     * @returns {Promise} A promise that resolves when the transition is complete
     */
    function transitionInView(element) {
        return new Promise((resolve) => {
            if (!element) {
                resolve();
                return;
            }
            
            // Ensure the element is visible but transparent
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            // Force browser reflow
            void element.offsetWidth;
            
            if (typeof gsap !== 'undefined') {
                // Enhanced GSAP animation
                gsap.fromTo(element,
                    { opacity: 0, y: 20 },
                    { 
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        ease: "power2.out",
                        onComplete: resolve,
                        clearProps: "transform" // Clean up transform property
                    }
                );
            } else {
                // CSS transition fallback
                element.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                // Listen for transition end
                const onTransitionEnd = () => {
                    element.removeEventListener('transitionend', onTransitionEnd);
                    // Clean up styles
                    element.style.transform = '';
                    resolve();
                };
                
                element.addEventListener('transitionend', onTransitionEnd);
                
                // Safety timeout in case the event doesn't fire
                setTimeout(() => {
                    element.removeEventListener('transitionend', onTransitionEnd);
                    element.style.transform = '';
                    resolve();
                }, 500);
            }
        });
    }
    
    /**
     * Render a React component
     * @param {string} containerId - The ID of the container element
     * @param {Function} Component - The React component to render
     */
    function renderReactComponent(containerId, Component) {
        const container = document.getElementById(containerId);
        
        if (!container) {
            console.error(`Container with ID "${containerId}" not found`);
            return;
        }
        
        try {
            // Use the reactRoots store if available
            if (typeof window.reactRoots !== 'undefined') {
                if (!window.reactRoots[containerId]) {
                    window.reactRoots[containerId] = ReactDOM.createRoot(container);
                }
                window.reactRoots[containerId].render(React.createElement(Component));
            } else {
                // Fallback if reactRoots not available
                const root = ReactDOM.createRoot(container);
                root.render(React.createElement(Component));
            }
            
            console.log(`React component rendered in ${containerId}`);
        } catch (error) {
            console.error(`Error rendering React component in ${containerId}:`, error);
            container.innerHTML = `
                <div class="p-6">
                    <div class="bg-white rounded-lg shadow-sm p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">Content Unavailable</h2>
                        <p class="text-gray-600">There was an issue loading this content. Please refresh the page.</p>
                    </div>
                </div>
            `;
        }
    }
    
    /**
     * Create a default user profile component if none is available
     * @returns {Function} A simple React component for user profile
     */
    function createDefaultUserProfile() {
        return function DefaultUserProfile() {
            const userData = {
                name: 'Sarah Johnson',
                title: 'Sales Manager',
                email: 'sarah.johnson@earworm.com',
                phone: '(555) 123-4567',
                region: 'Midwest',
                specialty: 'Enterprise Solutions'
            };
            
            return React.createElement('div', { className: 'p-6' },
                React.createElement('div', { className: 'bg-white rounded-lg shadow-sm p-6' },
                    React.createElement('h2', { className: 'text-xl font-bold text-gray-800 mb-4' }, 'My Profile'),
                    React.createElement('div', { className: 'flex items-center mb-6' },
                        React.createElement('div', { className: 'w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center' },
                            React.createElement('svg', { className: 'w-8 h-8 text-gray-500', fill: 'currentColor', viewBox: '0 0 24 24' },
                                React.createElement('path', { d: 'M12 12a5 5 0 100-10 5 5 0 000 10zm0 2a8 8 0 00-8 8 1 1 0 001 1h14a1 1 0 001-1 8 8 0 00-8-8z' })
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('h3', { className: 'font-medium text-gray-800' }, userData.name),
                            React.createElement('p', { className: 'text-sm text-gray-600' }, userData.title)
                        )
                    ),
                    React.createElement('div', { className: 'space-y-2 mb-6' },
                        React.createElement('p', { className: 'text-sm text-gray-700' }, `Email: ${userData.email}`),
                        React.createElement('p', { className: 'text-sm text-gray-700' }, `Phone: ${userData.phone}`),
                        React.createElement('p', { className: 'text-sm text-gray-700' }, `Region: ${userData.region}`),
                        React.createElement('p', { className: 'text-sm text-gray-700' }, `Specialty: ${userData.specialty}`)
                    ),
                    React.createElement('button', { 
                        className: 'px-4 py-2 rounded-lg text-white earworm-gradient font-medium',
                        onClick: () => console.log('Edit profile clicked')
                    }, 'Edit Profile')
                )
            );
        };
    }
    
    /**
     * Initialize a fallback user profile with basic HTML when React fails
     */
    function initializeUserProfileFallback() {
        console.log('Initializing fallback User Profile view');
        const userViewElement = document.getElementById('userView');
        
        if (!userViewElement) return;
        
        userViewElement.innerHTML = `
            <div class="flex-1 p-6 overflow-auto">
                <div class="grid grid-cols-12 gap-6">
                    <div class="col-span-12 mb-4">
                        <h2 class="text-xl font-bold text-gray-800">My Profile</h2>
                        <p class="text-gray-600">View and manage your profile information</p>
                    </div>
                    
                    <div class="col-span-12 bg-white rounded-lg shadow-sm p-6">
                        <div class="flex items-center mb-6">
                            <div class="w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                                <svg class="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2a8 8 0 00-8 8 1 1 0 001 1h14a1 1 0 001-1 8 8 0 00-8-8z"></path>
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-xl font-medium text-gray-800">Sarah Johnson</h3>
                                <p class="text-gray-600">Sales Manager</p>
                                <p class="text-sm text-gray-500 mt-1">Midwest Region</p>
                            </div>
                            <button class="ml-auto px-4 py-2 rounded-lg text-white earworm-gradient font-medium">
                                Edit Profile
                            </button>
                        </div>
                        
                        <div class="grid grid-cols-2 gap-6 mt-6">
                            <div>
                                <h4 class="font-medium text-gray-800 mb-3">Contact Information</h4>
                                <div class="space-y-2">
                                    <p class="text-sm text-gray-700">Email: sarah.johnson@earworm.com</p>
                                    <p class="text-sm text-gray-700">Phone: (555) 123-4567</p>
                                    <p class="text-sm text-gray-700">Specialty: Enterprise Solutions</p>
                                </div>
                            </div>
                            <div>
                                <h4 class="font-medium text-gray-800 mb-3">Performance</h4>
                                <div class="space-y-2">
                                    <p class="text-sm text-gray-700">Deals Closed: 78</p>
                                    <p class="text-sm text-gray-700">Win Rate: 72%</p>
                                    <p class="text-sm text-gray-700">Avg Deal Size: $42K</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Initialize a fallback metrics view with basic HTML
     */
    function initializeMetricsFallback() {
        console.log('Initializing fallback Metrics view');
        const metricsViewElement = document.getElementById('metricsView');
        
        if (!metricsViewElement) return;
        
        metricsViewElement.innerHTML = `
            <div class="flex-1 p-6 overflow-auto">
                <div class="mb-4">
                    <h2 class="text-xl font-bold text-gray-800">Sales History</h2>
                    <p class="text-gray-600">Review your recent sales transactions and performance</p>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Sales Overview</h3>
                    <p class="text-gray-600 mb-4">Your sales data visualization will appear here.</p>
                    <button class="px-4 py-2 rounded-lg text-white earworm-gradient font-medium">
                        Refresh Data
                    </button>
                </div>
                
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Sales</h3>
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Acme Corp</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$12,500</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-05-10</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Closed</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">TechGiant Inc</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$28,750</td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2025-05-08</td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
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
    
    // Public API
    return {
        initialize,
        navigateTo,
        preloadView
    };
})();
