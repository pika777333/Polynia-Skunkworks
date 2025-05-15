// charts.js
// Default options for charts
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

// Store chart instances for easy access
const chartInstances = new Map();

/**
 * Initialize all charts
 */
export function initialize() {
    // Set Chart.js defaults
    Chart.defaults.color = '#64748b';
    Chart.defaults.font.family = "'Poppins', sans-serif";
    
    // Initialize individual charts
    initializeSentimentChart();
    initializeTopicChart();
    initializePainPointsChart();
    
    console.log('Charts initialized');
}

/**
 * Create a chart with proper error handling
 * @param {string} id - Chart canvas element ID
 * @param {string} type - Chart type
 * @param {Object} data - Chart data
 * @param {Object} options - Chart options
 * @returns {Chart|null} Chart instance or null if error
 */
export function createChart(id, type, data, options = {}) {
    try {
        const canvas = document.getElementById(id);
        if (!canvas) {
            throw new Error(`Canvas element with ID "${id}" not found`);
        }
        
        const ctx = canvas.getContext('2d');
        
        // Merge with default options
        const chartOptions = {
            ...defaultOptions,
            ...options
        };
        
        // Create and store chart instance
        const chart = new Chart(ctx, { type, data, options: chartOptions });
        chartInstances.set(id, chart);
        
        return chart;
    } catch (error) {
        console.error(`Error creating ${type} chart:`, error);
        
        // Use ErrorHandler if available
        if (typeof window.ErrorHandler !== 'undefined') {
            window.ErrorHandler.handleError(error, {
                context: `charts:create:${id}`,
                silent: true
            });
        }
        
        return null;
    }
}

/**
 * Get a chart instance by ID
 * @param {string} id - Chart canvas element ID
 * @returns {Chart|null} Chart instance or null if not found
 */
export function getChart(id) {
    return chartInstances.get(id) || null;
}

/**
 * Initialize the sentiment chart
 */
export function initializeSentimentChart() {
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
export function initializeTopicChart() {
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
export function initializePainPointsChart() {
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
export function updateSentimentChart(sentimentData) {
    try {
        if (!sentimentData || sentimentData.length === 0) return false;
        
        const chart = getChart('sentimentChart');
        if (!chart) return false;
        
        // Format time values to seconds
        const labels = sentimentData.map(entry => Math.floor(entry.time / 1000));
        
        // Get sentiment values
        const salespersonData = sentimentData.map(entry => entry.salesperson);
        const customerData = sentimentData.map(entry => entry.customer);
        
        // Update chart data
        chart.data.labels = labels;
        chart.data.datasets[0].data = salespersonData;
        chart.data.datasets[1].data = customerData;
        
        // Use GSAP for animation if available
        if (typeof gsap !== 'undefined') {
            gsap.from(chart.canvas, {
                opacity: 0.5,
                duration: 1,
                ease: "power2.out",
                onComplete: () => chart.update()
            });
        } else {
            chart.update();
        }
        
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
export function updateTopicChart(topicData) {
    try {
        if (!topicData || topicData.length === 0) return false;
        
        const chart = getChart('topicChart');
        if (!chart) return false;
        
        // Get labels and values
        const labels = topicData.map(entry => entry.name);
        const values = topicData.map(entry => entry.value);
        
        // Update chart data
        chart.data.labels = labels;
        chart.data.datasets[0].data = values;
        
        // Use GSAP for animation if available
        if (typeof gsap !== 'undefined') {
            gsap.from(chart.canvas, {
                opacity: 0.5,
                scale: 0.95,
                duration: 1,
                ease: "elastic.out(1, 0.5)",
                onComplete: () => chart.update()
            });
        } else {
            chart.update();
        }
        
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
export function updatePainPointsChart(painPointsData) {
    try {
        if (!painPointsData || painPointsData.length === 0) return false;
        
        const chart = getChart('painPointsChart');
        if (!chart) return false;
        
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
        
        // Use GSAP for animation if available
        if (typeof gsap !== 'undefined') {
            gsap.from(chart.canvas, {
                opacity: 0.5,
                x: 20,
                duration: 1,
                ease: "power2.out",
                onComplete: () => chart.update()
            });
        } else {
            chart.update();
        }
        
        return true;
    } catch (error) {
        console.error('Error updating pain points chart:', error);
        return false;
    }
}

/**
 * Reset all charts to their initial empty state
 */
export function resetCharts() {
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
    } catch (error) {
        console.error('Error resetting charts:', error);
    }
}

// For backward compatibility
window.ChartManager = {
    initialize,
    resetCharts,
    updateSentimentChart,
    updateTopicChart,
    updatePainPointsChart
};
