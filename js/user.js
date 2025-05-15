/**
 * user.js - User profile functionality
 * Handles user profile management and settings
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
        achievements: [
            { title: 'Top Sales Q1 2025', description: 'Exceeded quarterly target by 28%', date: '2025-03-30' },
            { title: 'Customer Excellence Award', description: '98% client satisfaction rating', date: '2024-12-15' },
            { title: 'Deal of the Year', description: '$1.2M enterprise contract with GlobalTech', date: '2024-06-22' }
        ],
        stats: {
            deals: 78,
            closedValue: 1250000,
            winRate: 72,
            avgDealSize: 42000
        }
    };
    
    /**
     * Initialize the user profile view
     */
    function initialize() {
        // Cache the user container
        userContainer = document.getElementById('userView');
        
        // Create content if not already there
        if (!userContainer.querySelector('.user-profile-container')) {
            createUserProfileContent();
        }
        
        console.log('User profile initialized');
    }
    
    /**
     * Create the user profile content
     */
    function createUserProfileContent() {
        // Clear existing content
        userContainer.innerHTML = '';
        
        // Create container
        const container = document.createElement('div');
        container.className = 'user-profile-container p-6 overflow-auto';
        
        // Create grid layout
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-12 gap-6';
        
        // Add title
        const titleSection = document.createElement('div');
        titleSection.className = 'col-span-12 mb-4';
        titleSection.innerHTML = `
            <h2 class="text-xl font-bold text-gray-800">My Profile</h2>
            <p class="text-gray-600">View and manage your profile information</p>
        `;
        grid.appendChild(titleSection);
        
       const profileCard = document.createElement('div');
profileCard.className = 'col-span-12 bg-white rounded-lg shadow-sm earworm-card overflow-hidden';
profileCard.innerHTML = `
    <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-32"></div>
    <div class="px-6 pb-6">
        <div class="relative">
            <div class="absolute -top-100 left-1/2 transform -translate-x-1/2">
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
        
        <!-- Rest of the profile card content
                
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
                
                <div class="mt-6">
                    <h3 class="text-lg font-medium text-gray-800 mb-2">About Me</h3>
                    <p class="text-gray-700">${userData.bio}</p>
                </div>
                
                <div class="mt-6">
                    <h3 class="text-lg font-medium text-gray-800 mb-2">Achievements</h3>
                    <div class="space-y-4">
                        ${userData.achievements.map(achievement => `
                            <div class="flex items-start border-l-4 border-green-500 pl-4 py-1">
                                <div>
                                    <div class="font-medium text-gray-800">${achievement.title}</div>
                                    <div class="text-sm text-gray-600">${achievement.description}</div>
                                    <div class="text-xs text-gray-500 mt-1">${new Date(achievement.date).toLocaleDateString()}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        // Recent Activities
        const activitiesCard = document.createElement('div');
        activitiesCard.className = 'col-span-12 bg-white rounded-lg shadow-sm earworm-card';
        activitiesCard.innerHTML = `
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
                    
                    <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium">Updated proposal for Global Services</p>
                            <p class="text-xs text-gray-500">May 9, 2025 at 11:45 AM</p>
                        </div>
                    </div>
                </div>
                
                <div class="mt-4 text-center">
                    <button class="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800">
                        View All Activity
                    </button>
                </div>
            </div>
        `;
        
        // Settings Card
        const settingsCard = document.createElement('div');
        settingsCard.className = 'col-span-12 bg-white rounded-lg shadow-sm earworm-card';
        settingsCard.innerHTML = `
            <div class="p-4 border-b border-gray-100">
                <h2 class="text-lg font-semibold text-gray-800">Account Settings</h2>
            </div>
            <div class="p-4">
                <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-1">
                        <h3 class="font-medium text-gray-800 mb-4">Notification Preferences</h3>
                        
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <label for="email_notifications" class="text-sm text-gray-700">Email Notifications</label>
                                <div class="relative inline-block w-10 align-middle select-none">
                                    <input type="checkbox" id="email_notifications" class="sr-only" checked />
                                    <div class="block bg-gray-300 w-10 h-6 rounded-full"></div>
                                    <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-4 bg-pink-500"></div>
                                </div>
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <label for="mobile_notifications" class="text-sm text-gray-700">Mobile Notifications</label>
                                <div class="relative inline-block w-10 align-middle select-none">
                                    <input type="checkbox" id="mobile_notifications" class="sr-only" checked />
                                    <div class="block bg-gray-300 w-10 h-6 rounded-full"></div>
                                    <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-4 bg-pink-500"></div>
                                </div>
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <label for="meeting_reminders" class="text-sm text-gray-700">Meeting Reminders</label>
                                <div class="relative inline-block w-10 align-middle select-none">
                                    <input type="checkbox" id="meeting_reminders" class="sr-only" checked />
                                    <div class="block bg-gray-300 w-10 h-6 rounded-full"></div>
                                    <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-4 bg-pink-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-span-1">
                        <h3 class="font-medium text-gray-800 mb-4">Privacy Settings</h3>
                        
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <label for="profile_visibility" class="text-sm text-gray-700">Profile Visibility</label>
                                <div class="relative inline-block w-10 align-middle select-none">
                                    <input type="checkbox" id="profile_visibility" class="sr-only" checked />
                                    <div class="block bg-gray-300 w-10 h-6 rounded-full"></div>
                                    <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-4 bg-pink-500"></div>
                                </div>
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <label for="analytics_sharing" class="text-sm text-gray-700">Share Analytics Data</label>
                                <div class="relative inline-block w-10 align-middle select-none">
                                    <input type="checkbox" id="analytics_sharing" class="sr-only" checked />
                                    <div class="block bg-gray-300 w-10 h-6 rounded-full"></div>
                                    <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-4 bg-pink-500"></div>
                                </div>
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <label for="call_recordings" class="text-sm text-gray-700">Store Call Recordings</label>
                                <div class="relative inline-block w-10 align-middle select-none">
                                    <input type="checkbox" id="call_recordings" class="sr-only" checked />
                                    <div class="block bg-gray-300 w-10 h-6 rounded-full"></div>
                                    <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform translate-x-4 bg-pink-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-span-1">
                        <h3 class="font-medium text-gray-800 mb-4">Security</h3>
                        
                        <div class="space-y-4">
                            <button class="w-full text-left px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                Change Password
                            </button>
                            
                            <button class="w-full text-left px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                Two-Factor Authentication
                            </button>
                            
                            <button class="w-full text-left px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                Manage Connected Apps
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="mt-6 pt-6 border-t border-gray-100 flex justify-end">
                    <button class="px-6 py-2.5 rounded-lg text-white earworm-gradient font-medium">
                        Save Changes
                    </button>
                </div>
            </div>
        `;
        
        // Add all elements to the grid
        grid.appendChild(profileCard);
        grid.appendChild(activitiesCard);
        grid.appendChild(settingsCard);
        
        // Add the grid to the container
        container.appendChild(grid);
        userContainer.appendChild(container);
        
        // Add event listener for edit button
        setTimeout(() => {
            const editButton = document.getElementById('edit-profile-button');
            if (editButton) {
                editButton.addEventListener('click', function() {
                    alert('Edit profile functionality coming soon!');
                });
            }
        }, 0);
    }
    
    // Public API
    return {
        initialize
    };
})();
