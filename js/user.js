/**
 * user.js - User profile functionality
 * Handles user profile management, techniques, and settings
 */

const UserProfile = (function() {
    // DOM elements
    let userContainer;
    let tabButtons;
    let activeTab = 'profile';
    
    // User data for demonstration
    const userData = {
        name: 'Sarah Johnson',
        title: 'Sales Manager',
        email: 'sarah.j@company.com',
        phone: '(555) 123-4567',
        region: 'Midwest',
        specialty: 'Enterprise Solutions',
        joined: '2022-03-15',
        avatarUrl: '',
        bio: 'Experienced sales professional with over 8 years in the technology sector. Specializing in enterprise solutions and SaaS offerings.',
        techniques: [
            { id: 1, name: 'SPIN Selling', proficiency: 85, favorite: true },
            { id: 2, name: 'Solution Selling', proficiency: 92, favorite: true },
            { id: 3, name: 'Consultative Selling', proficiency: 78, favorite: false },
            { id: 4, name: 'Challenger Sale', proficiency: 65, favorite: false },
            { id: 5, name: 'Value Selling', proficiency: 88, favorite: true },
        ],
        preferences: {
            notifications: true,
            emailReports: true,
            darkMode: false,
            dataSharing: true,
            autoAnalysis: true
        }
    };
    
    /**
     * Initialize the user profile view
     */
    function initialize() {
        // Cache the user container
        userContainer = document.getElementById('userView');
        
        // If first time loading, create the content
        if (!userContainer.hasChildNodes()) {
            createUserContent();
        }
        
        // Cache tab buttons and set up event listeners
        tabButtons = userContainer.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                setActiveTab(this.getAttribute('data-tab'));
            });
        });
        
        // Default to profile tab
        setActiveTab('profile');
        
        console.log('User profile view initialized');
    }
    
    /**
     * Create the initial user profile content structure
     */
    function createUserContent() {
        // Create the base container
        const content = document.createElement('div');
        content.className = 'p-6';
        
        // Create tab navigation
        const tabNav = document.createElement('div');
        tabNav.className = 'flex mb-6 bg-white rounded-lg shadow-sm p-1';
        
        // Add tab buttons
        const tabs = [
            { id: 'profile', text: 'Profile' },
            { id: 'techniques', text: 'Sales Techniques' },
            { id: 'settings', text: 'Settings' }
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
            tabContent.id = `user-${tab.id}-tab`;
            tabContent.className = 'tab-content hidden';
            
            // Add placeholder text (will be populated later)
            tabContent.innerHTML = `<div class="bg-white rounded-lg p-6 shadow-sm">
                <h2 class="text-xl font-bold text-gray-800 mb-4">${tab.text}</h2>
                <p class="text-gray-500">Loading ${tab.text.toLowerCase()} data...</p>
            </div>`;
            
            content.appendChild(tabContent);
        });
        
        // Add the content to the user container
        userContainer.appendChild(content);
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
        const activeContent = document.getElementById(`user-${tabId}-tab`);
        activeContent.classList.remove('hidden');
        
        // Load tab content if needed
        loadTabContent(tabId);
    }
    
    /**
     * Load content for a specific tab
     * @param {string} tabId - The ID of the tab to load content for
     */
    function loadTabContent(tabId) {
        const tabContent = document.getElementById(`user-${tabId}-tab`);
        
        // Only load content if not already loaded
        if (tabContent.dataset.loaded === 'true') {
            return;
        }
        
        // Mark as loaded to prevent duplicate loading
        tabContent.dataset.loaded = 'true';
        
        if (tabId === 'profile') {
            loadProfileTab(tabContent);
        } else if (tabId === 'techniques') {
            loadTechniquesTab(tabContent);
        } else if (tabId === 'settings') {
            loadSettingsTab(tabContent);
        }
    }
    
    /**
     * Load profile tab content
     * @param {HTMLElement} container - The container to load content into
     */
    function loadProfileTab(container) {
        // Clear container
        container.innerHTML = '';
        
        // Create grid layout
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-12 gap-6';
        
        // Profile Card
        const profileCard = document.createElement('div');
        profileCard.className = 'col-span-4 bg-white rounded-lg shadow-sm earworm-card overflow-hidden';
        profileCard.innerHTML = `
            <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-32"></div>
            <div class="px-6 pb-6">
                <div class="relative">
                    <div class="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center p-1">
                            <div class="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                                <svg class="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2a8 8 0 00-8 8 1 1 0 001 1h14a1 1 0 001-1 8 8 0 00-8-8z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="mt-16 text-center">
                        <h2 class="text-xl font-bold text-gray-800">${userData.name}</h2>
                        <p class="text-sm text-gray-500">${userData.title}</p>
                    </div>
                </div>
                
                <div class="mt-6 space-y-4">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span class="text-sm text-gray-700">${userData.email}</span>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span class="text-sm text-gray-700">${userData.phone}</span>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span class="text-sm text-gray-700">${userData.region} Region</span>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span class="text-sm text-gray-700">Specialty: ${userData.specialty}</span>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span class="text-sm text-gray-700">Joined ${new Date(userData.joined).toLocaleDateString()}</span>
                    </div>
                </div>
                
                <div class="mt-6">
                    <button 
                        id="edit-profile-button"
                        class="w-full py-2.5 rounded-lg text-white earworm-gradient font-medium"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        `;
        
        // Profile Details
        const detailsCard = document.createElement('div');
        detailsCard.className = 'col-span-8 bg-white rounded-lg shadow-sm earworm-card';
        detailsCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Profile Details</h2>
            </div>
            <div class="p-6">
                <div id="profile-view">
                    <h3 class="text-lg font-medium text-gray-800 mb-4">About Me</h3>
                    <p class="text-gray-700 mb-6">${userData.bio}</p>
                    
                    <h3 class="text-lg font-medium text-gray-800 mb-4">Top Sales Techniques</h3>
                    <div class="space-y-4">
                        ${userData.techniques
                            .filter(technique => technique.favorite)
                            .map(technique => `
                                <div class="flex items-center">
                                    <svg class="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                    <div class="flex-1">
                                        <div class="flex justify-between items-center mb-1">
                                            <span class="text-sm font-medium text-gray-700">${technique.name}</span>
                                            <span class="text-sm font-medium text-gray-700">${technique.proficiency}%</span>
                                        </div>
                                        <div class="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                class="earworm-gradient h-2 rounded-full" 
                                                style="width: ${technique.proficiency}%"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')
                        }
                    </div>
                    
                    <h3 class="text-lg font-medium text-gray-800 mt-6 mb-4">Recent Activity</h3>
                    <div class="space-y-4">
                        <div class="flex items-start">
                            <div class="flex-shrink-0">
                                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-3">
                                <p class="text-sm text-gray-700">Completed sales training: "Advanced Negotiation Tactics"</p>
                                <p class="text-xs text-gray-500">2 days ago</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <div class="flex-shrink-0">
                                <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-3">
                                <p class="text-sm text-gray-700">Closed deal with Acme Corp worth $12,500</p>
                                <p class="text-xs text-gray-500">4 days ago</p>
                            </div>
                        </div>
                        
                        <div class="flex items-start">
                            <div class="flex-shrink-0">
                                <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                                    <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="ml-3">
                                <p class="text-sm text-gray-700">Analyzed 5 sales conversations with EARWORM</p>
                                <p class="text-xs text-gray-500">1 week ago</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="profile-edit" class="hidden">
                    <form id="profile-edit-form">
                        <div class="grid grid-cols-2 gap-6">
                            <div class="col-span-2 sm:col-span-1">
                                <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value="${userData.name}"
                                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                />
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value="${userData.title}"
                                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                />
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value="${userData.email}"
                                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                />
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    value="${userData.phone}"
                                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                />
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="region" class="block text-sm font-medium text-gray-700 mb-1">Region</label>
                                <select
                                    name="region"
                                    id="region"
                                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                >
                                    <option value="Northeast" ${userData.region === 'Northeast' ? 'selected' : ''}>Northeast</option>
                                    <option value="Southeast" ${userData.region === 'Southeast' ? 'selected' : ''}>Southeast</option>
                                    <option value="Midwest" ${userData.region === 'Midwest' ? 'selected' : ''}>Midwest</option>
                                    <option value="Southwest" ${userData.region === 'Southwest' ? 'selected' : ''}>Southwest</option>
                                    <option value="West" ${userData.region === 'West' ? 'selected' : ''}>West</option>
                                    <option value="Northwest" ${userData.region === 'Northwest' ? 'selected' : ''}>Northwest</option>
                                </select>
                            </div>
                            <div class="col-span-2 sm:col-span-1">
                                <label for="specialty" class="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                                <select
                                    name="specialty"
                                    id="specialty"
                                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                >
                                    <option value="Enterprise Solutions" ${userData.specialty === 'Enterprise Solutions' ? 'selected' : ''}>Enterprise Solutions</option>
                                    <option value="SMB" ${userData.specialty === 'SMB' ? 'selected' : ''}>Small/Medium Business</option>
                                    <option value="Government" ${userData.specialty === 'Government' ? 'selected' : ''}>Government</option>
                                    <option value="Healthcare" ${userData.specialty === 'Healthcare' ? 'selected' : ''}>Healthcare</option>
                                    <option value="Education" ${userData.specialty === 'Education' ? 'selected' : ''}>Education</option>
                                    <option value="Retail" ${userData.specialty === 'Retail' ? 'selected' : ''}>Retail</option>
                                </select>
                            </div>
                            <div class="col-span-2">
                                <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                    name="bio"
                                    id="bio"
                                    rows="4"
                                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                >${userData.bio}</textarea>
                            </div>
                        </div>
                        <div class="mt-6 flex justify-end space-x-3">
                            <button
                                type="button"
                                id="cancel-edit-button"
                                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                class="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white earworm-gradient"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        // Add all elements to the grid
        grid.appendChild(profileCard);
        grid.appendChild(detailsCard);
        
        // Add grid to the container
        container.appendChild(grid);
        
        // Set up event listeners
        setTimeout(() => {
            document.getElementById('edit-profile-button').addEventListener('click', function() {
                document.getElementById('profile-view').classList.add('hidden');
                document.getElementById('profile-edit').classList.remove('hidden');
            });
            
            document.getElementById('cancel-edit-button').addEventListener('click', function() {
                document.getElementById('profile-edit').classList.add('hidden');
                document.getElementById('profile-view').classList.remove('hidden');
            });
            
            document.getElementById('profile-edit-form').addEventListener('submit', function(e) {
                e.preventDefault();
                // Would save data here in a real implementation
                document.getElementById('profile-edit').classList.add('hidden');
                document.getElementById('profile-view').classList.remove('hidden');
                
                // Show success toast
                showToast('Profile updated successfully!');
            });
        }, 0);
    }
    
    /**
     * Load sales techniques tab content
     * @param {HTMLElement} container - The container to load content into
     */
    function loadTechniquesTab(container) {
        // Clear container
        container.innerHTML = '';
        
        // Create grid layout
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-12 gap-6';
        
        // Techniques Card
        const techniquesCard = document.createElement('div');
        techniquesCard.className = 'col-span-12 bg-white rounded-lg shadow-sm earworm-card';
        techniquesCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">My Sales Techniques</h2>
            </div>
            <div class="p-6">
                <div class="space-y-6" id="techniques-container">
                    ${userData.techniques.map(technique => `
                        <div class="p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div class="flex justify-between items-center mb-4">
                                <div class="flex items-center">
                                    <h3 class="text-lg font-medium text-gray-800">${technique.name}</h3>
                                    <button 
                                        class="ml-2 focus:outline-none favorite-toggle" 
                                        data-id="${technique.id}"
                                    >
                                        <svg 
                                            class="w-5 h-5 ${technique.favorite ? 'text-yellow-500' : 'text-gray-300'}" 
                                            fill="currentColor" 
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    </button>
                                </div>
                                <span class="text-sm font-medium px-3 py-1 bg-gray-200 rounded-full text-gray-700">
                                    ${technique.proficiency}% Proficiency
                                </span>
                            </div>
                            
                            <div class="mb-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value="${technique.proficiency}"
                                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer proficiency-slider"
                                    data-id="${technique.id}"
                                />
                            </div>
                            
                            ${getTechniqueDescription(technique.name)}
                        </div>
                    `).join('')}
                </div>
                
                <div class="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
                    <h3 class="font-medium text-purple-800 mb-2">Recommended Resources</h3>
                    <ul class="space-y-2">
                        <li class="flex items-center">
                            <svg class="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                            <span class="text-sm text-purple-700">
                                <a href="#" class="hover:underline">SPIN Selling by Neil Rackham</a>
                            </span>
                        </li>
                        <li class="flex items-center">
                            <svg class="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                            <span class="text-sm text-purple-700">
                                <a href="#" class="hover:underline">Value Selling Workshop (June 12)</a>
                            </span>
                        </li>
                        <li class="flex items-center">
                            <svg class="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                            </svg>
                            <span class="text-sm text-purple-700">
                                <a href="#" class="hover:underline">ROI Calculator Templates</a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        `;
        
        // Add the card to the grid
        grid.appendChild(techniquesCard);
        
        // Add grid to the container
        container.appendChild(grid);
        
        // Set up event listeners
        setTimeout(() => {
            // Favorite toggle buttons
            document.querySelectorAll('.favorite-toggle').forEach(button => {
                button.addEventListener('click', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    const technique = userData.techniques.find(t => t.id === id);
                    
                    if (technique) {
                        technique.favorite = !technique.favorite;
                        this.querySelector('svg').classList.toggle('text-yellow-500');
                        this.querySelector('svg').classList.toggle('text-gray-300');
                    }
                });
            });
            
            // Proficiency sliders
            document.querySelectorAll('.proficiency-slider').forEach(slider => {
                slider.addEventListener('input', function() {
                    const id = parseInt(this.getAttribute('data-id'));
                    const technique = userData.techniques.find(t => t.id === id);
                    const value = parseInt(this.value);
                    
                    if (technique) {
                        technique.proficiency = value;
                        this.closest('.p-4').querySelector('.px-3.py-1').textContent = `${value}% Proficiency`;
                    }
                });
            });
        }, 0);
    }
    
    /**
     * Load settings tab content
     * @param {HTMLElement} container - The container to load content into
     */
    function loadSettingsTab(container) {
        // Clear container
        container.innerHTML = '';
        
        // Create grid layout
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-12 gap-6';
        
        // Settings Card
        const settingsCard = document.createElement('div');
        settingsCard.className = 'col-span-12 bg-white rounded-lg shadow-sm earworm-card';
        settingsCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Application Settings</h2>
            </div>
            <div class="p-6">
                <div class="space-y-6">
                    <div class="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                            <h3 class="text-base font-medium text-gray-800">Notifications</h3>
                            <p class="text-sm text-gray-500 mt-1">Receive real-time updates and alerts</p>
                        </div>
                        <div class="relative inline-block w-12 align-middle select-none">
                            <input 
                                type="checkbox" 
                                name="notifications" 
                                id="notifications" 
                                ${userData.preferences.notifications ? 'checked' : ''}
                                class="sr-only settings-toggle"
                                data-preference="notifications"
                            />
                            <div class="block bg-gray-300 w-12 h-6 rounded-full"></div>
                            <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${userData.preferences.notifications ? 'transform translate-x-6 bg-pink-500' : ''}"></div>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                            <h3 class="text-base font-medium text-gray-800">Email Reports</h3>
                            <p class="text-sm text-gray-500 mt-1">Receive weekly performance reports via email</p>
                        </div>
                        <div class="relative inline-block w-12 align-middle select-none">
                            <input 
                                type="checkbox" 
                                name="emailReports" 
                                id="emailReports" 
                                ${userData.preferences.emailReports ? 'checked' : ''}
                                class="sr-only settings-toggle"
                                data-preference="emailReports"
                            />
                            <div class="block bg-gray-300 w-12 h-6 rounded-full"></div>
                            <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${userData.preferences.emailReports ? 'transform translate-x-6 bg-pink-500' : ''}"></div>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                            <h3 class="text-base font-medium text-gray-800">Dark Mode</h3>
                            <p class="text-sm text-gray-500 mt-1">Switch to dark theme for better visibility</p>
                        </div>
                        <div class="relative inline-block w-12 align-middle select-none">
                            <input 
                                type="checkbox" 
                                name="darkMode" 
                                id="darkMode" 
                                ${userData.preferences.darkMode ? 'checked' : ''}
                                class="sr-only settings-toggle"
                                data-preference="darkMode"
                            />
                            <div class="block bg-gray-300 w-12 h-6 rounded-full"></div>
                            <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${userData.preferences.darkMode ? 'transform translate-x-6 bg-pink-500' : ''}"></div>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between py-4 border-b border-gray-100">
                        <div>
                            <h3 class="text-base font-medium text-gray-800">Data Sharing</h3>
                            <p class="text-sm text-gray-500 mt-1">Share anonymized data to improve analysis</p>
                        </div>
                        <div class="relative inline-block w-12 align-middle select-none">
                            <input 
                                type="checkbox" 
                                name="dataSharing" 
                                id="dataSharing" 
                                ${userData.preferences.dataSharing ? 'checked' : ''}
                                class="sr-only settings-toggle"
                                data-preference="dataSharing"
                            />
                            <div class="block bg-gray-300 w-12 h-6 rounded-full"></div>
                            <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${userData.preferences.dataSharing ? 'transform translate-x-6 bg-pink-500' : ''}"></div>
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between py-4">
                        <div>
                            <h3 class="text-base font-medium text-gray-800">Auto Analysis</h3>
                            <p class="text-sm text-gray-500 mt-1">Automatically analyze recordings when complete</p>
                        </div>
                        <div class="relative inline-block w-12 align-middle select-none">
                            <input 
                                type="checkbox" 
                                name="autoAnalysis" 
                                id="autoAnalysis" 
                                ${userData.preferences.autoAnalysis ? 'checked' : ''}
                                class="sr-only settings-toggle"
                                data-preference="autoAnalysis"
                            />
                            <div class="block bg-gray-300 w-12 h-6 rounded-full"></div>
                            <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${userData.preferences.autoAnalysis ? 'transform translate-x-6 bg-pink-500' : ''}"></div>
                        </div>
                    </div>
                </div>
                
                <div class="mt-8">
                    <h3 class="text-base font-medium text-gray-800 mb-4">Security</h3>
                    <div class="space-y-4">
                        <button class="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <span>Change Password</span>
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                        <button class="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <span>Two-Factor Authentication</span>
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                        <button class="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <span>Session Management</span>
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="mt-8 pt-6 border-t border-gray-100">
                    <h3 class="text-base font-medium text-gray-800 mb-4">Account</h3>
                    <div class="space-y-4">
                        <button class="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            <span>Export My Data</span>
                            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                            </svg>
                        </button>
                        <button class="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50">
                            <span>Delete Account</span>
                            <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Add the card to the grid
        grid.appendChild(settingsCard);
        
        // Add grid to the container
        container.appendChild(grid);
        
        // Set up event listeners
        setTimeout(() => {
            document.querySelectorAll('.settings-toggle').forEach(toggle => {
                toggle.addEventListener('change', function() {
                    const preference = this.getAttribute('data-preference');
                    const isChecked = this.checked;
                    
                    // Update userData
                    if (userData.preferences.hasOwnProperty(preference)) {
                        userData.preferences[preference] = isChecked;
                    }
                    
                    // Update UI
                    const slider = this.nextElementSibling.nextElementSibling;
                    if (isChecked) {
                        slider.classList.add('transform', 'translate-x-6', 'bg-pink-500');
                    } else {
                        slider.classList.remove('transform', 'translate-x-6', 'bg-pink-500');
                    }
                    
                    // Show toast
                    showToast(`${preference} ${isChecked ? 'enabled' : 'disabled'}`);
                });
            });
        }, 0);
    }
    
    /**
     * Get description for a specific sales technique
     * @param {string} technique - The name of the technique
     * @returns {string} HTML description
     */
    function getTechniqueDescription(technique) {
        switch (technique) {
            case 'SPIN Selling':
                return `
                    <div>
                        <p class="text-sm text-gray-700 mb-3">
                            SPIN Selling focuses on four types of questions: Situation, Problem, Implication, and Need-payoff.
                        </p>
                        <div class="grid grid-cols-2 gap-4 mt-4">
                            <div class="col-span-1 bg-white p-3 rounded border border-gray-200">
                                <h4 class="font-medium text-gray-800 mb-1">Situation Questions</h4>
                                <p class="text-xs text-gray-600">Gather facts, background information about the current situation</p>
                            </div>
                            <div class="col-span-1 bg-white p-3 rounded border border-gray-200">
                                <h4 class="font-medium text-gray-800 mb-1">Problem Questions</h4>
                                <p class="text-xs text-gray-600">Identify problems, difficulties, and dissatisfactions</p>
                            </div>
                            <div class="col-span-1 bg-white p-3 rounded border border-gray-200">
                                <h4 class="font-medium text-gray-800 mb-1">Implication Questions</h4>
                                <p class="text-xs text-gray-600">Discuss consequences of problems to create urgency</p>
                            </div>
                            <div class="col-span-1 bg-white p-3 rounded border border-gray-200">
                                <h4 class="font-medium text-gray-800 mb-1">Need-Payoff Questions</h4>
                                <p class="text-xs text-gray-600">Focus on solution value and get the prospect to explain benefits</p>
                            </div>
                        </div>
                    </div>
                `;
            case 'Solution Selling':
                return `
                    <div>
                        <p class="text-sm text-gray-700 mb-3">
                            Solution Selling focuses on addressing specific customer pain points with tailored solutions rather than pushing products.
                        </p>
                        <div class="mt-4 space-y-2">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-sm text-gray-700">Pain-point identification</span>
                            </div>
                            <div class="flex items-center">
                                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-sm text-gray-700">Customized solution development</span>
                            </div>
                            <div class="flex items-center">
                                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span class="text-sm text-gray-700">Value articulation and ROI calculation</span>
                            </div>
                        </div>
                    </div>
                `;
            case 'Consultative Selling':
                return `
                    <p class="text-sm text-gray-700">
                        Consultative Selling positions you as a trusted advisor rather than a salesperson, focusing on building relationships and understanding customer needs before proposing solutions.
                    </p>
                `;
            case 'Challenger Sale':
                return `
                    <p class="text-sm text-gray-700">
                        The Challenger Sale approach is about teaching, tailoring, and taking control of the sales conversation. It involves challenging customer perspectives and offering unique insights.
                    </p>
                `;
            case 'Value Selling':
                return `
                    <p class="text-sm text-gray-700">
                        Value Selling focuses on communicating the monetary worth of benefits your solution provides, highlighting ROI and total cost of ownership rather than price points.
                    </p>
                `;
            default:
                return `
                    <p class="text-sm text-gray-700">
                        A proven sales methodology to help close more deals effectively.
                    </p>
                `;
        }
    }
    
    /**
     * Show a toast notification
     * @param {string} message - The message to display
     * @param {string} type - The type of toast (info, error)
     */
    function showToast(message, type = 'info') {
        // Check if UI module exists and use its toast function
        if (typeof UI !== 'undefined' && typeof UI.showToast === 'function') {
            UI.showToast(message, type);
            return;
        }
        
        // Otherwise create a simple toast
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center text-white ${type === 'error' ? 'bg-red-500' : 'earworm-gradient'}`;
        
        toast.innerHTML = message;
        
        document.body.appendChild(toast);
        
        // Remove after timeout
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
    
    // Public API
    return {
        initialize
    };
})();
