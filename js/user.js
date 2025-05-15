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
        name: 'Mr. Junior',
        title: 'President of Earworm',
        email: 'junior@earworm.com',
        phone: '(555) 123-4567',
        region: 'Midwest',
        specialty: 'Enterprise Solutions',
        joined: '2022-03-15',
        avatarUrl: '',
        bio: 'Intelligent young man with exceptional leadership skills. Pioneer in sales conversation analytics technology. Driving innovation in the AI-powered sales enablement sector.',
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
            <div class="absolute -top-24 left-1/2 transform -translate-x-1/2">
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
        
        <!-- Rest of the profile card content -->
                
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

        // Add all elements to the grid
        grid.appendChild(profileCard);
        
        // Add the Recent Activities and Settings Card sections (unchanged)
        // ...
        
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
