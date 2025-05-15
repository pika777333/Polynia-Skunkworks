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
            console.error('ReactDOM is not available');
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
        
        // Fallback to HTML content if React fails
        container.innerHTML = `
            <div class="p-6">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">Sales History</h2>
                    <p class="text-gray-600">View your recent sales transactions and performance metrics.</p>
                    
                    <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-medium text-gray-800">Recent Transactions</h3>
                                <p class="text-sm text-gray-500">Last 30 days</p>
                            </div>
                            <div class="text-xl font-bold text-green-600">$78,250</div>
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <h3 class="font-medium text-gray-800 mb-2">Performance Overview</h3>
                        <div class="space-y-2">
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm">Closed Deals</span>
                                    <span class="text-sm font-medium">72%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="bg-green-500 h-2 rounded-full" style="width: 72%"></div>
                                </div>
                            </div>
                            <div>
                                <div class="flex justify-between mb-1">
                                    <span class="text-sm">Target Progress</span>
                                    <span class="text-sm font-medium">85%</span>
                                </div>
                                <div class="w-full bg-gray-200 rounded-full h-2">
                                    <div class="earworm-gradient h-2 rounded-full" style="width: 85%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize the metrics view with React
function initializeMetricsView() {
    if (typeof MetricsView !== 'undefined') {
        initializeReactComponent('metricsView', MetricsView);
    } else {
        console.error('MetricsView component not found');
    }
}

// Make functions available globally
window.initializeReactComponent = initializeReactComponent;
window.initializeMetricsView = initializeMetricsView;
