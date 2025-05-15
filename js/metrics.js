/**
 * metrics.js - Sales history and metrics visualization
 * Handles displaying sales performance data and history
 */

const MetricsView = (function() {
    // DOM element
    let metricsContainer;
    
    // Mock data for the sales history
    const recentSales = [
        { id: 1, customer: 'Acme Corp', amount: 12500, status: 'Closed', date: '2025-05-10' },
        { id: 2, customer: 'TechGiant Inc', amount: 28750, status: 'Pending', date: '2025-05-08' },
        { id: 3, customer: 'Global Services', amount: 8200, status: 'Closed', date: '2025-05-06' },
        { id: 4, customer: 'Innovative Solutions', amount: 17300, status: 'Lost', date: '2025-05-04' },
        { id: 5, customer: 'Premier Products', amount: 21500, status: 'Closed', date: '2025-05-01' },
        { id: 6, customer: 'NextGen Technologies', amount: 19800, status: 'Closed', date: '2025-04-28' },
        { id: 7, customer: 'Urban Retailers', amount: 14200, status: 'Pending', date: '2025-04-25' },
        { id: 8, customer: 'Healthcare Partners', amount: 32400, status: 'Closed', date: '2025-04-22' },
        { id: 9, customer: 'Educational Systems', amount: 9600, status: 'Lost', date: '2025-04-18' },
        { id: 10, customer: 'Transportation Group', amount: 18700, status: 'Closed', date: '2025-04-15' },
    ];

    const salesByCategory = [
        { name: 'Enterprise Solutions', value: 185000 },
        { name: 'Consulting Services', value: 124000 },
        { name: 'Software Licenses', value: 98000 },
        { name: 'Support Packages', value: 68000 },
        { name: 'Hardware', value: 12350 },
    ];
    
    // Recent activity data (moved from user.js)
    const recentActivity = [
        {
            type: 'deal',
            icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
            title: 'Deal closed with Premier Products',
            time: 'May 12, 2025 at 3:24 PM',
            value: '$21,500',
            iconBg: 'bg-green-100',
            iconColor: 'text-green-600'
        },
        {
            type: 'meeting',
            icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
            title: 'Meeting scheduled with TechGiant Inc',
            time: 'May 11, 2025 at 10:15 AM',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600'
        },
        {
            type: 'call',
            icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>',
            title: 'New call analyzed with Acme Corp',
            time: 'May 10, 2025 at 2:30 PM',
            badge: 'High potential',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            badgeBg: 'bg-indigo-100',
            badgeColor: 'text-indigo-800'
        },
        {
            type: 'proposal',
            icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>',
            title: 'Updated proposal for Global Services',
            time: 'May 9, 2025 at 11:45 AM',
            iconBg: 'bg-yellow-100',
            iconColor: 'text-yellow-600'
        },
        {
            type: 'call',
            icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>',
            title: 'Sales call with Educational Systems',
            time: 'May 8, 2025 at 9:30 AM',
            badge: 'Analyzed',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            badgeBg: 'bg-green-100',
            badgeColor: 'text-green-800'
        }
    ];

    /**
     * Initialize the metrics view
     */
    function initialize() {
        metricsContainer = document.getElementById('metricsView');
        
        // Create content
        createMetricsContent();
        
        // Initialize sales chart
        setTimeout(() => {
            initializeSalesChart();
        }, 100);
        
        console.log('Metrics view initialized');
    }
    
    /**
     * Create the metrics view content
     */
    function createMetricsContent() {
        // Clear existing content
        metricsContainer.innerHTML = '';
        
        // Create container
        const container = document.createElement('div');
        container.className = 'flex-1 p-6 overflow-auto';
        
        // Create grid layout
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-12 gap-6';
        
        // Add title
        const titleSection = document.createElement('div');
        titleSection.className = 'col-span-12 mb-4';
        titleSection.innerHTML = `
            <h2 class="text-xl font-bold text-gray-800">Sales History</h2>
            <p class="text-gray-600">Review your recent sales transactions and performance</p>
        `;
        grid.appendChild(titleSection);
        
        // Sales Statistics Cards
        const statsCards = document.createElement('div');
        statsCards.className = 'col-span-12 grid grid-cols-4 gap-6';
        
        // Total Sales Card
        const totalCard = document.createElement('div');
        totalCard.className = 'bg-white rounded-lg shadow-sm earworm-card p-4';
        totalCard.innerHTML = `
            <div class="text-center">
                <h3 class="text-gray-500 mb-2">Total Sales (YTD)</h3>
                <div class="text-3xl font-bold earworm-primary-text">$487,350</div>
                <div class="text-sm text-green-500 mt-1 flex items-center justify-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    +12% vs last year
                </div>
            </div>
        `;
        statsCards.appendChild(totalCard);
        
        // Monthly Average Card
        const monthlyCard = document.createElement('div');
        monthlyCard.className = 'bg-white rounded-lg shadow-sm earworm-card p-4';
        monthlyCard.innerHTML = `
            <div class="text-center">
                <h3 class="text-gray-500 mb-2">Monthly Average</h3>
                <div class="text-3xl font-bold earworm-primary-text">$78,250</div>
                <div class="text-sm text-green-500 mt-1 flex items-center justify-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    +8% vs last month
                </div>
            </div>
        `;
        statsCards.appendChild(monthlyCard);
        
        // Conversion Rate Card
        const conversionCard = document.createElement('div');
        conversionCard.className = 'bg-white rounded-lg shadow-sm earworm-card p-4';
        conversionCard.innerHTML = `
            <div class="text-center">
                <h3 class="text-gray-500 mb-2">Conversion Rate</h3>
                <div class="text-3xl font-bold earworm-primary-text">68%</div>
                <div class="text-sm text-red-500 mt-1 flex items-center justify-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                    </svg>
                    -2% vs last month
                </div>
            </div>
        `;
        statsCards.appendChild(conversionCard);
        
        // Avg Deal Size Card
        const dealSizeCard = document.createElement('div');
        dealSizeCard.className = 'bg-white rounded-lg shadow-sm earworm-card p-4';
        dealSizeCard.innerHTML = `
            <div class="text-center">
                <h3 class="text-gray-500 mb-2">Avg Deal Size</h3>
                <div class="text-3xl font-bold earworm-primary-text">$18.4k</div>
                <div class="text-sm text-green-500 mt-1 flex items-center justify-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                    +4% vs last month
                </div>
            </div>
        `;
        statsCards.appendChild(dealSizeCard);
        
        grid.appendChild(statsCards);
        
        // Sales by Category Chart
        const categoryChartCard = document.createElement('div');
        categoryChartCard.className = 'col-span-8 bg-white rounded-lg shadow-sm earworm-card';
        categoryChartCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Sales by Product Category</h2>
            </div>
            <div class="p-4" style="height: 320px;">
                <canvas id="salesByCategoryChart"></canvas>
            </div>
        `;
        grid.appendChild(categoryChartCard);
        
        // Performance Breakdown
        const performanceCard = document.createElement('div');
        performanceCard.className = 'col-span-4 bg-white rounded-lg shadow-sm earworm-card';
        performanceCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Performance Breakdown</h2>
            </div>
            <div class="p-4">
                <div class="space-y-4">
                    <div>
                        <div class="flex justify-between mb-1">
                            <span class="text-sm font-medium">Closed Deals</span>
                            <span class="text-sm font-medium">72%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-green-500 h-2 rounded-full" style="width: 72%"></div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between mb-1">
                            <span class="text-sm font-medium">Pending</span>
                            <span class="text-sm font-medium">18%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-yellow-500 h-2 rounded-full" style="width: 18%"></div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="flex justify-between mb-1">
                            <span class="text-sm font-medium">Lost Opportunities</span>
                            <span class="text-sm font-medium">10%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-red-500 h-2 rounded-full" style="width: 10%"></div>
                        </div>
                    </div>
                    
                    <div class="pt-4 border-t border-gray-100 mt-4">
                        <h3 class="font-medium text-gray-800 mb-3">Monthly Targets</h3>
                        <div class="flex justify-between mb-1">
                            <span class="text-sm font-medium">Current Progress</span>
                            <span class="text-sm font-medium">85%</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="earworm-gradient h-2 rounded-full" style="width: 85%"></div>
                        </div>
                        <div class="text-xs text-gray-500 mt-2">
                            $78,250 of $92,000 monthly target
                        </div>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(performanceCard);
        
        // Recent Activity - MOVED FROM PROFILE TO HERE
        const activityCard = document.createElement('div');
        activityCard.className = 'col-span-4 bg-white rounded-lg shadow-sm earworm-card';
        activityCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Recent Activity</h2>
            </div>
            <div class="p-4">
                <div class="space-y-4">
                    ${recentActivity.map(activity => `
                        <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center ${activity.iconBg} ${activity.iconColor}">
                                ${activity.icon}
                            </div>
                            <div class="ml-4">
                                <p class="text-sm font-medium">${activity.title}</p>
                                <p class="text-xs text-gray-500">${activity.time}</p>
                            </div>
                            ${activity.value ? `
                                <div class="ml-auto">
                                    <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">${activity.value}</span>
                                </div>
                            ` : ''}
                            ${activity.badge ? `
                                <div class="ml-auto">
                                    <span class="px-2 py-1 text-xs font-medium ${activity.badgeBg} ${activity.badgeColor} rounded-full">${activity.badge}</span>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
                <div class="mt-4 text-center">
                    <button class="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800">
                        View All Activity
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(activityCard);
        
        // Weekly Sales Trend
        const weeklyTrendCard = document.createElement('div');
        weeklyTrendCard.className = 'col-span-8 bg-white rounded-lg shadow-sm earworm-card';
        weeklyTrendCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Weekly Sales Trend</h2>
            </div>
            <div class="p-4" style="height: 320px;">
                <canvas id="weeklySalesChart"></canvas>
            </div>
        `;
        grid.appendChild(weeklyTrendCard);
        
        // Recent Sales List
        const recentSalesCard = document.createElement('div');
        recentSalesCard.className = 'col-span-12 bg-white rounded-lg shadow-sm earworm-card';
        recentSalesCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Recent Sales</h2>
            </div>
            <div class="p-4 overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        ${recentSales.map(sale => `
                            <tr>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">${sale.customer}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">$${sale.amount.toLocaleString()}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-500">${sale.date}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 py-1 text-xs font-medium rounded-full ${
                                        sale.status === 'Closed' ? 'bg-green-100 text-green-800' :
                                        sale.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }">
                                        ${sale.status}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <button class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                                    <button class="text-indigo-600 hover:text-indigo-900">Analyze</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            <div class="px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-gray-700">
                        Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of <span class="font-medium">42</span> results
                    </div>
                    <div class="flex space-x-2">
                        <button class="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 hover:bg-gray-50">Previous</button>
                        <button class="px-3 py-1 border border-indigo-500 rounded-md text-sm bg-indigo-500 text-white hover:bg-indigo-600">Next</button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(recentSalesCard);
        
        container.appendChild(grid);
        metricsContainer.appendChild(container);
    }
    
    /**
     * Initialize the sales charts
     */
    function initializeSalesChart() {
        try {
            // Set Chart.js defaults
            Chart.defaults.color = '#64748b';
            Chart.defaults.font.family = "'Poppins', sans-serif";
            
            // Weekly sales data
            const weeklySalesData = {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [{
                    label: 'This Week',
                    data: [12500, 19200, 15800, 28900, 18300, 7800, 11200],
                    borderColor: '#e83e8c',
                    backgroundColor: 'rgba(232, 62, 140, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Last Week',
                    data: [9800, 16500, 14200, 21500, 16800, 9200, 8400],
                    borderColor: '#6f42c1',
                    backgroundColor: 'rgba(111, 66, 193, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            };
            
            // Get the chart canvas
            const weeklySalesCanvas = document.getElementById('weeklySalesChart');
            if (weeklySalesCanvas) {
                new Chart(weeklySalesCanvas, {
                    type: 'line',
                    data: weeklySalesData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'top',
                                labels: {
                                    usePointStyle: true,
                                    pointStyle: 'circle',
                                    boxWidth: 8
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
                                callbacks: {
                                    label: function(context) {
                                        return context.dataset.label + ': $' + context.raw.toLocaleString();
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.05)'
                                },
                                ticks: {
                                    callback: function(value) {
                                        return '$' + (value / 1000) + 'k';
                                    }
                                }
                            },
                            x: {
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                });
            }
            
            // Sales by category chart
            const categoryCanvas = document.getElementById('salesByCategoryChart');
            if (categoryCanvas) {
                new Chart(categoryCanvas, {
                    type: 'bar',
                    data: {
                        labels: salesByCategory.map(item => item.name),
                        datasets: [{
                            label: 'Revenue',
                            data: salesByCategory.map(item => item.value),
                            backgroundColor: [
                                '#e83e8c',
                                '#6f42c1',
                                '#20c997',
                                '#fd7e14',
                                '#6610f2'
                            ],
                            borderRadius: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
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
                                callbacks: {
                                    label: function(context) {
                                        return 'Revenue: $' + context.raw.toLocaleString();
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.05)'
                                },
                                ticks: {
                                    callback: function(value) {
                                        return '$' + (value / 1000) + 'k';
                                    }
                                }
                            },
                            x: {
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Error initializing charts:', error);
        }
    }
    
    // Public API
    return {
        initialize
    };
})();
