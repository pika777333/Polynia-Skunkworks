/**
 * charts.js - Chart initialization and management
 * Handles all chart-related operations
 */

const ChartManager = (function() {
    // Chart instances
    let sentimentChart = null;
    let topicChart = null;
    let painPointsChart = null;
    
    /**
     * Initialize all charts
     */
    function initialize() {
        initializeSentimentChart();
        initializeTopicChart();
        initializePainPointsChart();
    }
    
    /**
     * Initialize the sentiment chart
     */
    function initializeSentimentChart() {
        // Set Chart.js defaults
        Chart.defaults.color = '#64748b';
        Chart.defaults.font.family = "'Poppins', sans-serif";
        
        const sentimentCtx = document.getElementById('sentimentChart').getContext('2d');
        sentimentChart = new Chart(sentimentCtx, {
            type: 'line',
            data: {
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
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
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
                        displayColors: true,
                        mode: 'index',
                        intersect: false
                    }
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                }
            }
        });
    }
    
    /**
     * Initialize the topic distribution chart
     */
    function initializeTopicChart() {
        const topicCtx = document.getElementById('topicChart').getContext('2d');
        topicChart = new Chart(topicCtx, {
            type: 'doughnut',
            data: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: ['#e83e8c', '#6f42c1', '#20c997', '#fd7e14', '#6610f2'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            padding: 15
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
                },
                cutout: '65%'
            }
        });
    }
    
    /**
     * Initialize the pain points chart
     */
    function initializePainPointsChart() {
        const painPointsCtx = document.getElementById('painPointsChart').getContext('2d');
        painPointsChart = new Chart(painPointsCtx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Score',
                    data: [],
                    backgroundColor: '#fd7e14'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                },
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
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#333',
                        bodyColor: '#333',
                        borderColor: '#e1e1e1',
                        borderWidth: 1,
                        padding: 10,
                        displayColors: false
                    }
                }
            }
        });
    }
    
    /**
     * Reset all charts to their initial empty state
     */
    function resetCharts() {
        // Reset Sentiment Chart
        sentimentChart.data.labels = [];
        sentimentChart.data.datasets[0].data = [];
        sentimentChart.data.datasets[1].data = [];
        sentimentChart.update();
        
        // Reset Topic Chart
        topicChart.data.labels = [];
        topicChart.data.datasets[0].data = [];
        topicChart.update();
        
        // Reset Pain Points Chart
        painPointsChart.data.labels = [];
        painPointsChart.data.datasets[0].data = [];
        painPointsChart.update();
    }
    
    /**
     * Update the sentiment chart with new data
     * @param {Array} sentimentData - The sentiment trajectory data
     */
    function updateSentimentChart(sentimentData) {
        if (!sentimentData || sentimentData.length === 0) return;
        
        // Format time values to seconds
        const labels = sentimentData.map(entry => Math.floor(entry.time / 1000));
        
        // Get sentiment values
        const salespersonData = sentimentData.map(entry => entry.salesperson);
        const customerData = sentimentData.map(entry => entry.customer);
        
        // Update chart data
        sentimentChart.data.labels = labels;
        sentimentChart.data.datasets[0].data = salespersonData;
        sentimentChart.data.datasets[1].data = customerData;
        
        // Animate update with GSAP
        gsap.from(sentimentChart.canvas, {
            opacity: 0.5,
            duration: 1,
            ease: "power2.out",
            onComplete: () => sentimentChart.update()
        });
    }
    
    /**
     * Update the topic distribution chart with new data
     * @param {Array} topicData - The topic distribution data
     */
    function updateTopicChart(topicData) {
        if (!topicData || topicData.length === 0) return;
        
        // Get labels and values
        const labels = topicData.map(entry => entry.name);
        const values = topicData.map(entry => entry.value);
        
        // Update chart data
        topicChart.data.labels = labels;
        topicChart.data.datasets[0].data = values;
        
        // Animate update with GSAP
        gsap.from(topicChart.canvas, {
            opacity: 0.5,
            scale: 0.95,
            duration: 1,
            ease: "elastic.out(1, 0.5)",
            onComplete: () => topicChart.update()
        });
    }
    
    /**
     * Update the pain points chart with new data
     * @param {Array} painPointsData - The pain points data
     */
    function updatePainPointsChart(painPointsData) {
        if (!painPointsData || painPointsData.length === 0) return;
        
        // Get categories and scores
        const categories = painPointsData.map(entry => entry.category);
        const scores = painPointsData.map(entry => entry.score);
        
        // Update chart data
        painPointsChart.data.labels = categories;
        painPointsChart.data.datasets[0].data = scores;
        
        // Use a color gradient based on score
        const colors = scores.map(score => {
            const hue = Math.max(0, Math.min(120, (10 - score) * 12)); // Red (0) to Green (120)
            return `hsl(${hue}, 80%, 60%)`;
        });
        
        painPointsChart.data.datasets[0].backgroundColor = colors;
        
        // Animate update with GSAP
        gsap.from(painPointsChart.canvas, {
            opacity: 0.5,
            x: 20,
            duration: 1,
            ease: "power2.out",
            onComplete: () => painPointsChart.update()
        });
    }
    
    // Public API
    return {
        initialize,
        resetCharts,
        updateSentimentChart,
        updateTopicChart,
        updatePainPointsChart
    };
})();
