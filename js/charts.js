/**
 * charts.js - PRODUCTION VERSION with robust chart initialization
 */

// Store chart instances for easy access
const chartInstances = new Map();

// Default options for all charts
const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 1000,
        easing: 'easeOutQuart'
    },
    plugins: {
        legend: {
            position: 'top',
            labels: {
                boxWidth: 12,
                usePointStyle: true,
                pointStyle: 'circle'
            }
        },
        tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#333',
            bodyColor: '#333',
            borderColor: '#e1e1e1',
            borderWidth: 1,
            padding: 10,
            displayColors: true
        }
    }
};

/**
 * Initialize all charts
 */
function initialize() {
    console.log('Initializing charts in PRODUCTION mode');
    
    try {
        // Set global Chart.js defaults
        if (typeof Chart !== 'undefined') {
            Chart.defaults.color = '#64748b';
            Chart.defaults.font.family = "'Poppins', sans-serif";
        } else {
            console.error('Chart.js library not available');
            return;
        }
        
        // Clear any existing charts
        destroyAllCharts();
        
        // Initialize individual charts
        initializeSentimentChart();
        initializeTopicChart();
        initializePainPointsChart();
        
        console.log('Charts initialized successfully');
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
}

/**
 * Destroy all existing charts
 */
function destroyAllCharts() {
    try {
        // Destroy each chart instance
        chartInstances.forEach((chart, id) => {
            try {
                chart.destroy();
            } catch (e) {
                console.warn(`Error destroying chart ${id}:`, e);
            }
        });
        
        // Clear the map
        chartInstances.clear();
        
        console.log('All existing charts cleared');
    } catch (error) {
        console.error('Error destroying charts:', error);
    }
}

/**
 * Create a chart with proper error handling
 * @param {string} id - Chart canvas element ID
 * @param {string} type - Chart type
 * @param {Object} data - Chart data
 * @param {Object} options - Chart options
 * @returns {Chart|null} Chart instance or null if error
 */
function createChart(id, type, data, options = {}) {
    try {
        const canvas = document.getElementById(id);
        if (!canvas) {
            console.error(`Canvas element with ID "${id}" not found`);
            return null;
        }
        
        // Check if chart already exists, destroy it first
        if (chartInstances.has(id)) {
            try {
                chartInstances.get(id).destroy();
            } catch (e) {
                console.warn(`Error destroying existing chart ${id}:`, e);
            }
        }
        
        // Get context and check it's valid
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error(`Could not get 2D context for canvas "${id}"`);
            return null;
        }
        
        // Merge with default options
        const chartOptions = {
            ...defaultOptions,
            ...options
        };
        
        // Create chart instance
        const chart = new Chart(ctx, { 
            type, 
            data, 
            options: chartOptions
        });
        
        // Store for later reference
        chartInstances.set(id, chart);
        
        return chart;
    } catch (error) {
        console.error(`Error creating ${type} chart "${id}":`, error);
        
        // Try to render a fallback
        renderFallbackChart(id, type);
        
        return null;
    }
}

/**
 * Render a fallback for a chart that failed to initialize
 * @param {string} id - Chart canvas element ID
 * @param {string} type - The chart type that was attempted
 */
function renderFallbackChart(id, type) {
    try {
        const canvas = document.getElementById(id);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw fallback content
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = '14px Arial';
        ctx.fillStyle = '#666666';
        ctx.textAlign = 'center';
        ctx.fillText(`${type} chart will appear here after analysis`, canvas.width / 2, canvas.height / 2);
        
        console.log(`Fallback rendered for ${id}`);
    } catch (e) {
        console.error(`Error rendering fallback for ${id}:`, e);
    }
}

/**
 * Get a chart instance by ID
 * @param {string} id - Chart canvas element ID
 * @returns {Chart|null} Chart instance or null if not found
 */
function getChart(id) {
    return chartInstances.get(id) || null;
}

/**
 * Initialize the sentiment chart
 */
function initializeSentimentChart() {
    return createChart('sentimentChart', 'line', {
        labels: [],
        datasets: [
            {
                label: 'Salesperson',
                data: [],
                borderColor: '#e83e8c',
                backgroundColor: 'rgba(232, 62, 140, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#e83e8c',
                pointRadius: 4,
                pointHoverRadius: 6
            },
            {
                label: 'Customer',
                data: [],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#10b981',
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    }, {
        scales: {
            y: {
                min: -1,
                max: 1,
                title: {
                    display: true,
                    text: 'Sentiment'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Time (seconds)'
                },
                grid: {
                    display: false
                }
            }
        }
    });
}

/**
 * Initialize the topic distribution chart
 */
function initializeTopicChart() {
    return createChart('topicChart', 'doughnut', {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ['#e83e8c', '#6f42c1', '#20c997', '#fd7e14', '#6610f2'],
            borderColor: '#fff',
            borderWidth: 2
        }]
    }, {
        cutout: '65%',
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    padding: 15
                }
            }
        }
    });
}

/**
 * Initialize the pain points chart
 */
function initializePainPointsChart() {
    return createChart('painPointsChart', 'bar', {
        labels: [],
        datasets: [{
            label: 'Score',
            data: [],
            backgroundColor: '#fd7e14'
        }]
    }, {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true,
                max: 10,
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    });
}

/**
 * Update the sentiment chart with new data
 * @param {Array} sentimentData - The sentiment trajectory data
 * @returns {boolean} Success indicator
 */
function updateSentimentChart(sentimentData) {
    try {
        if (!sentimentData || sentimentData.length === 0) {
            console.warn('No sentiment data provided for chart update');
            return false;
        }
        
        const chart = getChart('sentimentChart');
        if (!chart) {
            console.warn('Sentiment chart not initialized, creating now');
            const newChart = initializeSentimentChart();
            if (!newChart) return false;
            
            // Try again with the new chart
            return updateSentimentChart(sentimentData);
        }
        
        // Format time values to seconds
        const labels = sentimentData.map(entry => Math.floor(entry.time / 1000));
        
        // Get sentiment values
        const salespersonData = sentimentData.map(entry => entry.salesperson);
        const customerData = sentimentData.map(entry => entry.customer);
        
        // Update chart data
        chart.data.labels = labels;
        chart.data.datasets[0].data = salespersonData;
        chart.data.datasets[1].data = customerData;
        
        // Update the chart
        chart.update();
        
        console.log('Sentiment chart updated successfully');
        return true;
    } catch (error) {
        console.error('Error updating sentiment chart:', error);
        return false;
    }
}

/**
 * Update the topic distribution chart with new data
 * @param {Array} topicData - The topic distribution data
 * @returns {boolean} Success indicator
 */
function updateTopicChart(topicData) {
    try {
        if (!topicData || topicData.length === 0) {
            console.warn('No topic data provided for chart update');
            return false;
        }
        
        const chart = getChart('topicChart');
        if (!chart) {
            console.warn('Topic chart not initialized, creating now');
            const newChart = initializeTopicChart();
            if (!newChart) return false;
            
            // Try again with the new chart
            return updateTopicChart(topicData);
        }
        
        // Get labels and values
        const labels = topicData.map(entry => entry.name);
        const values = topicData.map(entry => entry.value);
        
        // Update chart data
        chart.data.labels = labels;
        chart.data.datasets[0].data = values;
        
        // Update the chart
        chart.update();
        
        console.log('Topic chart updated successfully');
        return true;
    } catch (error) {
        console.error('Error updating topic chart:', error);
        return false;
    }
}

/**
 * Update the pain points chart with new data
 * @param {Array} painPointsData - The pain points data
 * @returns {boolean} Success indicator
 */
function updatePainPointsChart(painPointsData) {
    try {
        if (!painPointsData || painPointsData.length === 0) {
            console.warn('No pain points data provided for chart update');
            return false;
        }
        
        const chart = getChart('painPointsChart');
        if (!chart) {
            console.warn('Pain points chart not initialized, creating now');
            const newChart = initializePainPointsChart();
            if (!newChart) return false;
            
            // Try again with the new chart
            return updatePainPointsChart(painPointsData);
        }
        
        // Get categories and scores
        const categories = painPointsData.map(entry => entry.category);
        const scores = painPointsData.map(entry => entry.score);
        
        // Update chart data
        chart.data.labels = categories;
        chart.data.datasets[0].data = scores;
        
        // Use a color gradient based on score
        const colors = scores.map(score => {
            const hue = Math.max(0, Math.min(120, (10 - score) * 12)); // Red (0) to Green (120)
            return `hsl(${hue}, 80%, 60%)`;
        });
        
        chart.data.datasets[0].backgroundColor = colors;
        
        // Update the chart
        chart.update();
        
        console.log('Pain points chart updated successfully');
        return true;
    } catch (error) {
        console.error('Error updating pain points chart:', error);
        return false;
    }
}

/**
 * Reset all charts to their initial empty state
 */
function resetCharts() {
    try {
        // Reset Sentiment Chart
        const sentimentChart = getChart('sentimentChart');
        if (sentimentChart) {
            sentimentChart.data.labels = [];
            sentimentChart.data.datasets[0].data = [];
            sentimentChart.data.datasets[1].data = [];
            sentimentChart.update();
        }
        
        // Reset Topic Chart
        const topicChart = getChart('topicChart');
        if (topicChart) {
            topicChart.data.labels = [];
            topicChart.data.datasets[0].data = [];
            topicChart.update();
        }
        
        // Reset Pain Points Chart
        const painPointsChart = getChart('painPointsChart');
        if (painPointsChart) {
            painPointsChart.data.labels = [];
            painPointsChart.data.datasets[0].data = [];
            painPointsChart.update();
        }
        
        console.log('All charts reset to initial state');
    } catch (error) {
        console.error('Error resetting charts:', error);
    }
}

// Expose functions globally
window.ChartManager = {
    initialize,
    resetCharts,
    updateSentimentChart,
    updateTopicChart,
    updatePainPointsChart
};

// Initialize charts on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Wait a short time to ensure Canvas elements are ready
        setTimeout(() => {
            initialize();
        }, 100);
    } catch (error) {
        console.error('Error during chart initialization:', error);
    }
});
