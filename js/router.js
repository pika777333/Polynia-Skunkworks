/**
 * simplified-router.js - A streamlined router for Earworm app
 * Replace or enhance your existing router.js with this approach
 */

const EarwormRouter = (function() {
  // State variables
  let currentView = 'dashboard';
  let isTransitioning = false;
  
  /**
   * Initialize the router
   */
  function initialize() {
    console.log('Initializing EarwormRouter...');
    
    // Add click event listeners to all navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('data-target');
        console.log('Navigation clicked:', target);
        navigateTo(target);
      });
    });
    
    // Initialize the view specified in the URL hash if present
    const hashView = window.location.hash.substring(1);
    if (hashView && ['dashboard', 'metrics', 'user'].includes(hashView)) {
      navigateTo(hashView);
    }
    
    console.log('EarwormRouter initialized');
  }
  
  /**
   * Navigate to a specific view
   * @param {string} view - The view to navigate to ('dashboard', 'metrics', 'user')
   */
  function navigateTo(view) {
    console.log(`Attempting to navigate to: ${view}`);
    
    // Validate view name
    if (!['dashboard', 'metrics', 'user'].includes(view)) {
      console.error(`Invalid view name: ${view}`);
      return;
    }
    
    // Don't navigate if already on this view or during transition
    if (view === currentView || isTransitioning) {
      console.log(`Navigation skipped - ${view === currentView ? 'already on view' : 'transition in progress'}`);
      return;
    }
    
    // Set transitioning flag
    isTransitioning = true;
    console.log(`Navigating to view: ${view}`);
    
    try {
      // Update navigation UI
      updateNavigation(view);
      
      // Update page title
      updatePageTitle(view);
      
      // Hide all views
      document.querySelectorAll('#dashboardView, #metricsView, #userView').forEach(el => {
        el.classList.add('hidden');
      });
      
      // Show and initialize target view
      const viewElement = document.getElementById(`${view}View`);
      viewElement.classList.remove('hidden');
      
      // Initialize view content
      initializeView(view).then(() => {
        // Update state
        currentView = view;
        isTransitioning = false;
        
        // Update URL hash for bookmarking
        window.location.hash = view;
        
        console.log(`Navigation to ${view} completed`);
      }).catch(error => {
        console.error(`Error initializing view ${view}:`, error);
        isTransitioning = false;
      });
    } catch (error) {
      console.error('Navigation error:', error);
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
        link.classList.add('earworm-gradient', 'text-white');
      } else {
        link.classList.remove('earworm-gradient', 'text-white');
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
   * Initialize a specific view
   * @param {string} view - The view to initialize
   * @returns {Promise} A promise that resolves when initialization is complete
   */
  function initializeView(view) {
    return new Promise((resolve, reject) => {
      try {
        if (view === 'dashboard') {
          // Dashboard is typically already initialized
          resolve();
        } 
        else if (view === 'metrics') {
          if (typeof MetricsView !== 'undefined' && typeof MetricsView.initialize === 'function') {
            MetricsView.initialize();
            resolve();
          } else {
            console.warn('MetricsView not available, using fallback');
            const metricsView = document.getElementById('metricsView');
            if (metricsView && metricsView.innerHTML.trim() === '') {
              metricsView.innerHTML = '<div class="p-6"><p>Sales metrics loading...</p></div>';
            }
            resolve();
          }
        }
        else if (view === 'user') {
          if (typeof window.ReactDOM !== 'undefined' && typeof React !== 'undefined') {
            // Try to load the profile component
            try {
              if (typeof window.SimpleProfileCustomizer === 'function') {
                const container = document.getElementById('userView');
                const root = ReactDOM.createRoot(container);
                root.render(React.createElement(window.SimpleProfileCustomizer));
                resolve();
              } else {
                throw new Error('SimpleProfileCustomizer not available');
              }
            } catch (error) {
              console.warn('Error initializing React component:', error);
              // Fallback to basic HTML
              document.getElementById('userView').innerHTML = `
                <div class="p-6">
                  <h2 class="text-xl font-bold mb-4">User Profile</h2>
                  <div class="bg-white rounded-lg shadow-sm p-4">
                    <p>Profile information will appear here.</p>
                  </div>
                </div>
              `;
              resolve();
            }
          } else {
            document.getElementById('userView').innerHTML = `
              <div class="p-6">
                <h2 class="text-xl font-bold mb-4">User Profile</h2>
                <div class="bg-white rounded-lg shadow-sm p-4">
                  <p>React is not available. Profile cannot be loaded.</p>
                </div>
              </div>
            `;
            resolve();
          }
        }
      } catch (error) {
        console.error(`Error in initializeView(${view}):`, error);
        reject(error);
      }
    });
  }
  
  // Public API
  return {
    initialize,
    navigateTo
  };
})();

// Auto-initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - initializing router');
  EarwormRouter.initialize();
});
