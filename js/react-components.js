/**
 * react-components.js - Helper script for initializing React components
 */

// Root DOM nodes for React components
const reactRoots = {};

/**
 * Initialize a React component in a container
 * @param {string} containerId - The ID of the container element
 * @param {ReactComponent} Component - The React component to render
 */
function initializeReactComponent(containerId, Component) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container with ID "${containerId}" not found`);
        return;
    }
    
    // Import necessary React libraries if not already available
    try {
        if (typeof ReactDOM === 'undefined') {
            console.error('ReactDOM is not available, using fallback initialization');
            // For metrics view, initialize using standard JS
            if (containerId === 'metricsView' && typeof MetricsView !== 'undefined') {
                MetricsView.initialize();
            }
            return;
        }
        
        // Clear previous content
        container.innerHTML = '';
        
        // Create a root if it doesn't exist
        if (!reactRoots[containerId]) {
            reactRoots[containerId] = ReactDOM.createRoot(container);
        }
        
        // Render the component
        reactRoots[containerId].render(React.createElement(Component));
        
        console.log(`React component initialized in ${containerId}`);
    } catch (error) {
        console.error('Error initializing React component:', error);
        
        // Fallback initialization for metrics view
        if (containerId === 'metricsView' && typeof MetricsView !== 'undefined') {
            MetricsView.initialize();
        } else {
            // Generic fallback content
            container.innerHTML = `
                <div class="p-6">
                    <div class="bg-white rounded-lg shadow-sm p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">Content Unavailable</h2>
                        <p class="text-gray-600">There was an issue loading this content.</p>
                    </div>
                </div>
            `;
        }
    }
}

// Initialize the metrics view
function initializeMetricsView() {
    // Try to use the MetricsView standard JS module
    if (typeof MetricsView !== 'undefined' && typeof MetricsView.initialize === 'function') {
        MetricsView.initialize();
    } else if (typeof window.MetricsView !== 'undefined') {
        // Try React version as fallback
        initializeReactComponent('metricsView', window.MetricsView);
    } else {
        console.error('No valid MetricsView component found');
        // Create basic fallback content
        const container = document.getElementById('metricsView');
        if (container) {
            container.innerHTML = `
                <div class="p-6">
                    <div class="bg-white rounded-lg shadow-sm p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">Sales History</h2>
                        <p class="text-gray-600">Unable to load sales history data. Please try again later.</p>
                    </div>
                </div>
            `;
        }
    }
}

// Make functions available globally
window.initializeReactComponent = initializeReactComponent;
window.initializeMetricsView = initializeMetricsView;
