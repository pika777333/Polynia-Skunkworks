/**
 * metrics.js - Metrics view functionality
 * Handles the display of sales performance metrics, history, and insights
 */

const MetricsView = (function() {
    // DOM elements
    let metricsContainer;
    let tabButtons;
    let activeTab = 'performance';
    
    // Mock data for demonstration
    const performanceData = [
        { month: 'Jan', calls: 24, conversions: 8, rate: 33 },
        { month: 'Feb', calls: 31, conversions: 12, rate: 39 },
        { month: 'Mar', calls: 28, conversions: 11, rate: 39 },
        { month: 'Apr', calls: 33, conversions: 15, rate: 45 },
        { month: 'May', calls: 45, conversions: 22, rate: 49 },
        { month: 'Jun', calls: 42, conversions: 18, rate: 43 },
        { month: 'Jul', calls: 38, conversions: 17, rate: 45 },
    ];
      
    const improvementData = [
        { skill: 'Active Listening', before: 6.2, after: 8.4 },
        { skill: 'Pain Point Detection', before: 5.8, after: 8.1 },
        { skill: 'Objection Handling', before: 5.5, after: 7.9 },
        { skill: 'Budget Discussion', before: 4.9, after: 7.6 },
        { skill: 'Closing', before: 5.2, after: 7.8 },
    ];
      
    const recentSales = [
        { id: 1, customer: 'Acme Corp', amount: 12500, status: 'Closed', date: '2025-05-10' },
        { id: 2, customer: 'TechGiant Inc', amount: 28750, status: 'Pending', date: '2025-05-08' },
        { id: 3, customer: 'Global Services', amount: 8200, status: 'Closed', date: '2025-05-06' },
        { id: 4, customer: 'Innovative Solutions', amount: 17300, status: 'Lost', date: '2025-05-04' },
        { id: 5, customer: 'Premier Products', amount: 21500, status: 'Closed', date: '2025-05-01' },
    ];
    
    /**
     * Initialize the metrics view
     */
    function initialize() {
        // Cache the metrics container
        metricsContainer = document.getElementById('metricsView');
        
        // If first time loading, create the content
        if (!metricsContainer.hasChildNodes()) {
            createMetricsContent();
        }
        
        // Cache tab buttons and set up event listeners
        tabButtons = metricsContainer.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                setActiveTab(this.getAttribute('data-tab'));
            });
        });
        
        // Default to performance tab
        setActiveTab('performance');
        
        console.log('Metrics view initialized');
    }
    
    /**
     * Create the initial metrics content structure
     */
    function createMetricsContent() {
        // Create the base container
        const content = document.createElement('div');
        content.className = 'p-6';
        
        // Create tab navigation
        const tabNav = document.createElement('div');
        tabNav.className = 'flex mb-6 bg-white rounded-lg shadow-sm p-1';
        
        // Add tab buttons
        const tabs = [
            { id: 'performance', text: 'Performance' },
            { id: 'history', text: 'Sales History' },
            { id: 'improvement', text: 'Improvement Insights' }
        ];
        
        tabs.forEach(tab => {
            const button = document.createElement('button');
            button.className = 'tab-button flex-1 py-2 px-4 rounded-lg transition-all text-gray-700 hover:bg-gray-100';
            button.setAttribute('data-tab', tab.id);
            button.textContent = tab.text;
            tabNav.appendChild(button);
        });
        
        content.appendChild(tabNav);
        
        // Create tab content containers
        tabs.forEach(tab => {
            const tabContent = document.createElement('div');
            tabContent.id = `metrics-${tab.id}-tab`;
            tabContent.className = 'tab-content hidden';
            
            // Add placeholder text (will be populated later)
            tabContent.innerHTML = `<div class="bg-white rounded-lg p-6 shadow-sm">
                <h2 class="text-xl font-bold text-gray-800 mb-4">${tab.text}</h2>
                <p class="text-gray-500">Loading ${tab.text.toLowerCase()} data...</p>
            </div>`;
            
            content.appendChild(tabContent);
        });
        
        // Add the content to the metrics container
        metricsContainer.appendChild(content);
    }
    
    /**
     * Set the active tab and update the UI
     * @param {string} tabId - The ID of the tab to activate
     */
    function setActiveTab(tabId) {
        // Don't do anything if this tab is already active
        if (activeTab === tabId) return;
        
        // Update active tab
        activeTab = tabId;
        
        // Update tab button styling
        tabButtons.forEach(button => {
            const buttonTabId = button.getAttribute('data-tab');
            
            if (buttonTabId === tabId) {
                button.classList.remove('text-gray-700', 'hover:bg-gray-100');
                button.classList.add('earworm-gradient', 'text-white');
            } else {
                button.classList.remove('earworm-gradient', 'text-white');
                button.classList.add('text-gray-700', 'hover:bg-gray-100');
            }
        });
        
        // Hide all tab content
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => {
            content.classList.add('hidden');
        });
        
        // Show active tab content
        const activeContent = document.getElementById(`metrics-${tabId}-tab`);
        activeContent.classList.remove('hidden');
        
        // Load tab content if needed
        loadTabContent(tabId);
    }
    
    /**
     * Load content for a specific tab
     * @param {string} tabId - The ID of the tab to load content for
     */
    function loadTabContent(tabId) {
        const tabContent = document.getElementById(`metrics-${tabId}-tab`);
        
        // Only load content if not already loaded
        if (tabContent.dataset.loaded === 'true') {
            return;
        }
        
        // Mark as loaded to prevent duplicate loading
        tabContent.dataset.loaded = 'true';
        
        if (tabId === 'performance') {
            loadPerformanceTab(tabContent);
        } else if (tabId === 'history') {
            loadHistoryTab(tabContent);
        } else if (tabId === 'improvement') {
            loadImprovementTab(tabContent);
        }
    }
    
    /**
     * Load performance tab content
     * @param {HTMLElement} container - The container to load content into
     */
    function loadPerformanceTab(container) {
        // Clear container
        container.innerHTML = '';
        
        // Create grid layout
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-12 gap-6';
        
        // Conversion Rate Chart
        const chartCard = document.createElement('div');
        chartCard.className = 'col-span-8 bg-white rounded-lg shadow-sm earworm-card';
        chartCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Conversion Rate Over Time</h2>
            </div>
            <div class="p-4" style="height: 300px;">
                <canvas id="conversion-chart"></canvas>
            </div>
        `;
        
        // Stats Cards
        const statsContainer = document.createElement('div');
        statsContainer.className = 'col-span-4 grid grid-rows-3 gap-6';
        
        // Conversion Rate Stat
        const conversionCard = document.createElement('div');
        conversionCard.className = 'row-span-1 bg-white rounded-lg shadow-sm earworm-card p-4 flex flex-col justify-center items-center';
        conversionCard.innerHTML = `
            <h3 class="text-gray-500 mb-2">Conversion Rate</h3>
            <div class="text-4xl font-bold earworm-primary-text">45%</div>
            <div class="text-sm text-green-500 mt-1 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                12% vs last month
            </div>
        `;
        
        // Deal Size Stat
        const dealSizeCard = document.createElement('div');
        dealSizeCard.className = 'row-span-1 bg-white rounded-lg shadow-sm earworm-card p-4 flex flex-col justify-center items-center';
        dealSizeCard.innerHTML = `
            <h3 class="text-gray-500 mb-2">Avg Deal Size</h3>
            <div class="text-4xl font-bold earworm-primary-text">$18.4k</div>
            <div class="text-sm text-green-500 mt-1 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                8% vs last month
            </div>
        `;
        
        // Calls to Close Stat
        const callsCard = document.createElement('div');
        callsCard.className = 'row-span-1 bg-white rounded-lg shadow-sm earworm-card p-4 flex flex-col justify-center items-center';
        callsCard.innerHTML = `
            <h3 class="text-gray-500 mb-2">Calls to Close</h3>
            <div class="text-4xl font-bold earworm-primary-text">2.8</div>
            <div class="text-sm text-red-500 mt-1 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                </svg>
                0.2 vs last month
            </div>
        `;
        
        // Add stats cards to container
        statsContainer.appendChild(conversionCard);
        statsContainer.appendChild(dealSizeCard);
        statsContainer.appendChild(callsCard);
        
        // Recent Activity
        const activityCard = document.createElement('div');
        activityCard.className = 'col-span-12 bg-white rounded-lg shadow-sm earworm-card';
        activityCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Recent Activity</h2>
            </div>
            <div class="p-4">
                <div class="space-y-4">
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium">Deal closed with Premier Products</p>
                            <p class="text-xs text-gray-500">May 12, 2025 at 3:24 PM</p>
                        </div>
                        <div class="ml-auto">
                            <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">$21,500</span>
                        </div>
                    </div>
                    
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium">Meeting scheduled with TechGiant Inc</p>
                            <p class="text-xs text-gray-500">May 11, 2025 at 10:15 AM</p>
                        </div>
                    </div>
                    
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center bg-purple-100 text-purple-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium">New call analyzed with Acme Corp</p>
                            <p class="text-xs text-gray-500">May 10, 2025 at 2:30 PM</p>
                        </div>
                        <div class="ml-auto">
                            <span class="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">High potential</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add all elements to the grid
        grid.appendChild(chartCard);
        grid.appendChild(statsContainer);
        grid.appendChild(activityCard);
        
        // Add grid to the container
        container.appendChild(grid);
        
        // Initialize chart after DOM is updated
        setTimeout(() => {
            initializeConversionChart();
        }, 0);
    }
    
    /**
     * Load sales history tab content
     * @param {HTMLElement} container - The container to load content into
     */
    function loadHistoryTab(container) {
        // Clear container
        container.innerHTML = '';
        
        // Create grid layout
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-12 gap-6';
        
        // Recent Sales Table
        const salesTable = document.createElement('div');
        salesTable.className = 'col-span-12 bg-white rounded-lg shadow-sm earworm-card';
        salesTable.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Recent Sales</h2>
            </div>
            <div class="p-4">
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
                    <tbody class="bg-white divide-y divide-gray-200" id="sales-table-body">
                        <!-- Sales rows will be added here -->
                    </tbody>
                </table>
            </div>
        `;
        
        // Stats Card
        const statsCard = document.createElement('div');
        statsCard.className = 'col-span-4 bg-white rounded-lg shadow-sm earworm-card';
        statsCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Sales Stats</h2>
            </div>
            <div class="p-4">
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600">Total Sales (YTD)</span>
                        <span class="font-semibold">$487,350</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600">This Month</span>
                        <span class="font-semibold">$78,250</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600">Last Month</span>
                        <span class="font-semibold">$64,100</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-gray-600">Success Rate</span>
                        <span class="font-semibold">68%</span>
                    </div>
                </div>
            </div>
        `;
        
        // Categories Chart
        const categoriesCard = document.createElement('div');
        categoriesCard.className = 'col-span-8 bg-white rounded-lg shadow-sm earworm-card';
        categoriesCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Sales by Product Category</h2>
            </div>
            <div class="p-4" style="height: 300px;">
                <canvas id="categories-chart"></canvas>
            </div>
        `;
        
        // Add all elements to the grid
        grid.appendChild(salesTable);
        grid.appendChild(statsCard);
        grid.appendChild(categoriesCard);
        
        // Add grid to the container
        container.appendChild(grid);
        
        // Populate tables and initialize charts after DOM is updated
        setTimeout(() => {
            populateSalesTable();
            initializeCategoriesChart();
        }, 0);
    }
    
    /**
     * Load improvement insights tab content
     * @param {HTMLElement} container - The container to load content into
     */
    function loadImprovementTab(container) {
        // Clear container
        container.innerHTML = '';
        
        // Create grid layout
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-12 gap-6';
        
        // Skills Development Chart
        const skillsCard = document.createElement('div');
        skillsCard.className = 'col-span-8 bg-white rounded-lg shadow-sm earworm-card';
        skillsCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Skill Development</h2>
            </div>
            <div class="p-4" style="height: 400px;">
                <canvas id="skills-chart"></canvas>
            </div>
        `;
        
        // Overall Improvement
        const overallCard = document.createElement('div');
        overallCard.className = 'col-span-4 bg-white rounded-lg shadow-sm earworm-card overflow-hidden';
        overallCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Overall Improvement</h2>
            </div>
            <div class="p-6">
                <div class="flex flex-col items-center">
                    <div class="relative w-48 h-48 mb-4">
                        <svg class="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#f3f4f6"
                                stroke-width="10"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#e83e8c"
                                stroke-width="10"
                                stroke-dasharray="283"
                                stroke-dashoffset="85"
                                stroke-linecap="round"
                                transform="rotate(-90 50 50)"
                            />
                        </svg>
                        <div class="absolute inset-0 flex items-center justify-center flex-col">
                            <span class="text-4xl font-bold earworm-primary-text">70%</span>
                            <span class="text-gray-500 text-sm">Improvement</span>
                        </div>
                    </div>
                    
                    <div class="space-y-4 w-full">
                        <div>
                            <div class="flex justify-between mb-1">
                                <span class="text-sm font-medium">Overall Technique</span>
                                <span class="text-sm font-medium">8.2/10</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="earworm-gradient h-2 rounded-full" style="width: 82%"></div>
                            </div>
                        </div>
                        
                        <div>
                            <div class="flex justify-between mb-1">
                                <span class="text-sm font-medium">Customer Satisfaction</span>
                                <span class="text-sm font-medium">9.1/10</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="earworm-gradient h-2 rounded-full" style="width: 91%"></div>
                            </div>
                        </div>
                        
                        <div>
                            <div class="flex justify-between mb-1">
                                <span class="text-sm font-medium">Sales Efficiency</span>
                                <span class="text-sm font-medium">7.8/10</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="earworm-gradient h-2 rounded-full" style="width: 78%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insights & Recommendations
        const insightsCard = document.createElement('div');
        insightsCard.className = 'col-span-12 bg-white rounded-lg shadow-sm earworm-card';
        insightsCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Insights & Recommendations</h2>
            </div>
            <div class="p-4">
                <div class="space-y-4">
                    <div class="p-4 bg-purple-50 rounded-lg border border-purple-100">
                        <h3 class="font-medium text-purple-800 mb-2">Key Strengths</h3>
                        <ul class="list-disc pl-5 space-y-1 text-purple-700">
                            <li>Excellent active listening skills, consistently acknowledging customer pain points</li>
                            <li>Strong product knowledge, especially with technical features</li>
                            <li>Effective at building rapport early in conversations</li>
                        </ul>
                    </div>
                    
                    <div class="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h3 class="font-medium text-blue-800 mb-2">Areas for Improvement</h3>
                        <ul class="list-disc pl-5 space-y-1 text-blue-700">
                            <li>Budget discussions could be introduced earlier in the conversation</li>
                            <li>More emphasis on ROI calculations would strengthen value propositions</li>
                            <li>Consider using more customer-specific examples during presentations</li>
                        </ul>
                    </div>
                    
                    <div class="p-4 bg-green-50 rounded-lg border border-green-100">
                        <h3 class="font-medium text-green-800 mb-2">Next Steps</h3>
                        <ul class="list-disc pl-5 space-y-1 text-green-700">
                            <li>Join the "Negotiation Masterclass" workshop on May 25</li>
                            <li>Practice ROI calculators during your next 3 calls</li>
                            <li>Review successful case studies in your industry vertical</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        
        // Add all elements to the grid
        grid.appendChild(skillsCard);
        grid.appendChild(overallCard);
        grid.appendChild(insightsCard);
        
        // Add grid to the container
        container.appendChild(grid);
        
        // Initialize chart after DOM is updated
        setTimeout(() => {
            initializeSkillsChart();
        }, 0);
    }
    
    /**
     * Initialize conversion rate chart
     */
    function initializeConversionChart() {
        const ctx = document.getElementById('conversion-chart').getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: performanceData.map(item => item.month),
                datasets: [
                    {
                        label: 'Calls',
                        data: performanceData.map(item => item.calls),
                        borderColor: '#6f42c1',
                        backgroundColor: 'rgba(111, 66, 193, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Conversions',
                        data: performanceData.map(item => item.conversions),
                        borderColor: '#e83e8c',
                        backgroundColor: 'rgba(232, 62, 140, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Rate (%)',
                        data: performanceData.map(item => item.rate),
                        borderColor: '#20c997',
                        backgroundColor: 'rgba(32, 201, 151, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: false,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Count'
                        }
                    },
                    y1: {
                        position: 'right',
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Rate (%)'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    }
    
    /**
     * Initialize categories chart
     */
    function initializeCategoriesChart() {
        const ctx = document.getElementById('categories-chart').getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Enterprise Solutions', 'Consulting Services', 'Software Licenses', 'Support Packages', 'Hardware'],
                datasets: [{
                    label: 'Revenue',
                    data: [185000, 124000, 98000, 68000, 12350],
                    backgroundColor: '#e83e8c',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '$' + context.raw.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    /**
     * Initialize skills chart
     */
    function initializeSkillsChart() {
        const ctx = document.getElementById('skills-chart').getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: improvementData.map(item => item.skill),
                datasets: [
                    {
                        label: 'Initial Rating',
                        data: improvementData.map(item => item.before),
                        backgroundColor: '#6f42c1',
                        borderRadius: 0
                    },
                    {
                        label: 'Current Rating',
                        data: improvementData.map(item => item.after),
                        backgroundColor: '#e83e8c',
                        borderRadius: 0
                    }
                ]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 10,
                        title: {
                            display: true,
                            text: 'Skill Rating (0-10)'
                        }
                    }
                }
            }
        });
    }
    
    /**
     * Populate sales table with data
     */
    function populateSalesTable() {
        const tableBody = document.getElementById('sales-table-body');
        
        if (!tableBody) return;
        
        recentSales.forEach(sale => {
            const row = document.createElement('tr');
            
            // Determine status class
            let statusClass = '';
            if (sale.status === 'Closed') {
                statusClass = 'bg-green-100 text-green-800';
            } else if (sale.status === 'Pending') {
                statusClass = 'bg-yellow-100 text-yellow-800';
            } else {
                statusClass = 'bg-red-100 text-red-800';
            }
            
            row.innerHTML = `
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
                    <span class="px-2 py-1 text-xs font-medium rounded-full ${statusClass}">
                        ${sale.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                    <button class="text-indigo-600 hover:text-indigo-900">Analyze</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    }
    
    // Public API
    return {
        initialize
    };
})();
