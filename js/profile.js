/**
 * simple-profile.js - Simplified user profile without React dependencies
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the simple profile
    initializeSimpleProfile();
});

/**
 * Initialize the simple profile
 */
function initializeSimpleProfile() {
    console.log('Initializing simple profile...');
    
    // Get the user view container
    const userView = document.getElementById('userView');
    if (!userView) {
        console.error('User view container not found');
        return;
    }
    
    // Load profile data
    const profileData = loadProfileData();
    
    // Render the profile form
    renderProfileForm(userView, profileData);
    
    // Set up event listeners
    setupProfileEventListeners();
    
    console.log('Simple profile initialized');
}

/**
 * Load profile data from localStorage
 * @returns {Object} Profile data
 */
function loadProfileData() {
    // Default profile data
    const defaultProfile = {
        // Basic info
        name: 'Sarah Johnson',
        title: 'Sales Manager',
        email: 'sarah.johnson@earworm.com',
        phone: '(555) 123-4567',
        region: 'Midwest',
        specialty: 'Enterprise Solutions',
        
        // Sales context
        industry: 'Software',
        productLines: ['CRM Software', 'Data Analytics', 'Cloud Storage'],
        
        // Customer context
        commonPainPoints: ['Implementation time', 'Cost concerns', 'Technical support'],
        typicalBudget: '$25,000 - $100,000',
        
        // Selling style
        approachStyle: 'Consultative',
        goalPerCall: 'Needs assessment and solution presentation'
    };
    
    try {
        const savedData = localStorage.getItem('earwormProfileData');
        return savedData ? JSON.parse(savedData) : defaultProfile;
    } catch (error) {
        console.error('Error loading profile data:', error);
        return defaultProfile;
    }
}

/**
 * Render the profile form
 * @param {HTMLElement} container - The container element
 * @param {Object} profileData - The profile data
 */
function renderProfileForm(container, profileData) {
    // Create the HTML for the profile form
    const html = `
    <div class="flex-1 p-6 overflow-auto">
        <div class="grid grid-cols-12 gap-6">
            <!-- Page Header -->
            <div class="col-span-12 mb-4 flex justify-between items-center">
                <div>
                    <h2 class="text-xl font-bold text-gray-800">My Profile</h2>
                    <p class="text-gray-600">Customize your profile to improve conversation analysis</p>
                </div>
                <button 
                    id="editProfileBtn"
                    class="px-4 py-2 rounded-lg text-white earworm-gradient font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                    Edit Profile
                </button>
                <button 
                    id="saveProfileBtn"
                    class="px-4 py-2 rounded-lg text-white bg-green-500 font-medium shadow-md hover:shadow-lg transition-all duration-200 hidden"
                >
                    Save Profile
                </button>
            </div>
            
            <!-- Profile Card -->
            <div class="col-span-12 bg-white rounded-lg shadow-sm earworm-card overflow-hidden">
                <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-32"></div>
                <div class="px-6 pb-6">
                    <!-- Avatar and name section -->
                    <div class="relative">
                        <div class="absolute -top-16 left-8">
                            <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center p-1 shadow-lg">
                                <div class="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                                    <svg class="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2a8 8 0 00-8 8 1 1 0 001 1h14a1 1 0 001-1 8 8 0 00-8-8z"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="pt-12 pl-32">
                            <div class="text-input-group">
                                <h2 class="text-2xl font-bold text-gray-800 profile-text" data-field="name">${profileData.name}</h2>
                                <input type="text" class="bg-gray-100 p-2 rounded w-full mb-2 profile-input hidden" data-field="name" value="${profileData.name}">
                            </div>
                            <div class="text-input-group">
                                <p class="text-gray-600 profile-text" data-field="title">${profileData.title}</p>
                                <input type="text" class="bg-gray-100 p-2 rounded w-full profile-input hidden" data-field="title" value="${profileData.title}">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Basic Info Section -->
                    <div class="mt-6">
                        <h3 class="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
                        <div class="grid grid-cols-2 gap-6">
                            <!-- Email Field -->
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">Email</label>
                                <div class="text-input-group">
                                    <p class="text-sm text-gray-700 profile-text" data-field="email">${profileData.email}</p>
                                    <input type="email" class="bg-gray-100 p-2 rounded w-full profile-input hidden" data-field="email" value="${profileData.email}">
                                </div>
                            </div>
                            
                            <!-- Phone Field -->
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">Phone</label>
                                <div class="text-input-group">
                                    <p class="text-sm text-gray-700 profile-text" data-field="phone">${profileData.phone}</p>
                                    <input type="tel" class="bg-gray-100 p-2 rounded w-full profile-input hidden" data-field="phone" value="${profileData.phone}">
                                </div>
                            </div>
                            
                            <!-- Region Field -->
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">Region</label>
                                <div class="text-input-group">
                                    <p class="text-sm text-gray-700 profile-text" data-field="region">${profileData.region}</p>
                                    <input type="text" class="bg-gray-100 p-2 rounded w-full profile-input hidden" data-field="region" value="${profileData.region}">
                                </div>
                            </div>
                            
                            <!-- Specialty Field -->
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-700">Specialty</label>
                                <div class="text-input-group">
                                    <p class="text-sm text-gray-700 profile-text" data-field="specialty">${profileData.specialty}</p>
                                    <input type="text" class="bg-gray-100 p-2 rounded w-full profile-input hidden" data-field="specialty" value="${profileData.specialty}">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Sales Context Section -->
                    <div class="mt-8">
                        <h3 class="text-lg font-medium text-gray-800 mb-4">Sales Context</h3>
                        
                        <!-- Industry Field -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                            <div class="text-input-group">
                                <p class="text-sm text-gray-700 profile-text" data-field="industry">${profileData.industry}</p>
                                <input type="text" class="bg-gray-100 p-2 rounded w-full profile-input hidden" data-field="industry" value="${profileData.industry}">
                            </div>
                        </div>
                        
                        <!-- Product Lines -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Product/Service Lines</label>
                            <div class="flex flex-wrap gap-2 mb-2" id="productLinesContainer">
                                ${profileData.productLines.map(product => `
                                    <div class="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center product-item">
                                        ${product}
                                        <button class="ml-2 text-red-500 product-remove-btn hidden">&times;</button>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="flex product-add-container hidden">
                                <input type="text" id="productInput" class="bg-gray-100 p-2 rounded-l w-full" placeholder="Add a product/service...">
                                <button id="addProductBtn" class="bg-indigo-500 text-white px-4 rounded-r">Add</button>
                            </div>
                        </div>
                        
                        <!-- Common Pain Points -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Common Customer Pain Points</label>
                            <div class="flex flex-wrap gap-2 mb-2" id="painPointsContainer">
                                ${profileData.commonPainPoints.map(painPoint => `
                                    <div class="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center pain-point-item">
                                        ${painPoint}
                                        <button class="ml-2 text-red-500 pain-point-remove-btn hidden">&times;</button>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="flex pain-point-add-container hidden">
                                <input type="text" id="painPointInput" class="bg-gray-100 p-2 rounded-l w-full" placeholder="Add a pain point...">
                                <button id="addPainPointBtn" class="bg-indigo-500 text-white px-4 rounded-r">Add</button>
                            </div>
                        </div>
                        
                        <!-- Typical Budget Range -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Typical Budget Range</label>
                            <div class="text-input-group">
                                <p class="text-sm text-gray-700 profile-text" data-field="typicalBudget">${profileData.typicalBudget}</p>
                                <input type="text" class="bg-gray-100 p-2 rounded w-full profile-input hidden" data-field="typicalBudget" value="${profileData.typicalBudget}">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Selling Style Section -->
                    <div class="mt-8">
                        <h3 class="text-lg font-medium text-gray-800 mb-4">Selling Approach</h3>
                        
                        <!-- Approach Style -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Sales Approach Style</label>
                            <div class="text-input-group">
                                <p class="text-sm text-gray-700 profile-text" data-field="approachStyle">${profileData.approachStyle}</p>
                                <div class="profile-input hidden">
                                    <select class="bg-gray-100 p-2 rounded w-full" data-field="approachStyle">
                                        <option value="Consultative" ${profileData.approachStyle === 'Consultative' ? 'selected' : ''}>Consultative</option>
                                        <option value="Solution Selling" ${profileData.approachStyle === 'Solution Selling' ? 'selected' : ''}>Solution Selling</option>
                                        <option value="Challenger" ${profileData.approachStyle === 'Challenger' ? 'selected' : ''}>Challenger</option>
                                        <option value="SPIN Selling" ${profileData.approachStyle === 'SPIN Selling' ? 'selected' : ''}>SPIN Selling</option>
                                        <option value="Value-Based" ${profileData.approachStyle === 'Value-Based' ? 'selected' : ''}>Value-Based</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Goal Per Call -->
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Typical Goal Per Call</label>
                            <div class="text-input-group">
                                <p class="text-sm text-gray-700 profile-text" data-field="goalPerCall">${profileData.goalPerCall}</p>
                                <input type="text" class="bg-gray-100 p-2 rounded w-full profile-input hidden" data-field="goalPerCall" value="${profileData.goalPerCall}">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Help Text -->
                    <div class="mt-8">
                        <div class="p-4 bg-blue-50 rounded-lg">
                            <h4 class="text-sm font-medium text-blue-700 mb-2">How This Helps Your Analysis</h4>
                            <p class="text-sm text-blue-600">
                                This profile information helps the AI better understand context when analyzing your sales conversations. 
                                It can identify when customers mention your products, recognize pain points, and estimate budget more 
                                accurately based on your typical price range.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    
    // Set the HTML
    container.innerHTML = html;
}

/**
 * Set up event listeners for the profile
 */
function setupProfileEventListeners() {
    // Edit profile button
    const editBtn = document.getElementById('editProfileBtn');
    const saveBtn = document.getElementById('saveProfileBtn');
    
    if (editBtn && saveBtn) {
        // Edit button click
        editBtn.addEventListener('click', function() {
            // Show input fields, hide text fields
            document.querySelectorAll('.profile-text').forEach(el => {
                el.classList.add('hidden');
            });
            
            document.querySelectorAll('.profile-input').forEach(el => {
                el.classList.remove('hidden');
            });
            
            // Show product and pain point controls
            document.querySelectorAll('.product-remove-btn').forEach(el => {
                el.classList.remove('hidden');
            });
            
            document.querySelectorAll('.pain-point-remove-btn').forEach(el => {
                el.classList.remove('hidden');
            });
            
            document.querySelector('.product-add-container').classList.remove('hidden');
            document.querySelector('.pain-point-add-container').classList.remove('hidden');
            
            // Hide edit button, show save button
            editBtn.classList.add('hidden');
            saveBtn.classList.remove('hidden');
        });
        
        // Save button click
        saveBtn.addEventListener('click', function() {
            // Get updated profile data
            const profileData = {
                // Basic info
                name: document.querySelector('input[data-field="name"]').value,
                title: document.querySelector('input[data-field="title"]').value,
                email: document.querySelector('input[data-field="email"]').value,
                phone: document.querySelector('input[data-field="phone"]').value,
                region: document.querySelector('input[data-field="region"]').value,
                specialty: document.querySelector('input[data-field="specialty"]').value,
                
                // Sales context
                industry: document.querySelector('input[data-field="industry"]').value,
                productLines: Array.from(document.querySelectorAll('.product-item')).map(el => el.textContent.trim()),
                
                // Customer context
                commonPainPoints: Array.from(document.querySelectorAll('.pain-point-item')).map(el => el.textContent.trim()),
                typicalBudget: document.querySelector('input[data-field="typicalBudget"]').value,
                
                // Selling style
                approachStyle: document.querySelector('select[data-field="approachStyle"]').value,
                goalPerCall: document.querySelector('input[data-field="goalPerCall"]').value
            };
            
            // Save to localStorage
            localStorage.setItem('earwormProfileData', JSON.stringify(profileData));
            
            // Update the UI with new values
            document.querySelectorAll('.profile-text').forEach(el => {
                const field = el.getAttribute('data-field');
                el.textContent = profileData[field] || '';
                el.classList.remove('hidden');
            });
            
            // Hide input fields
            document.querySelectorAll('.profile-input').forEach(el => {
                el.classList.add('hidden');
            });
            
            // Hide product and pain point controls
            document.querySelectorAll('.product-remove-btn').forEach(el => {
                el.classList.add('hidden');
            });
            
            document.querySelectorAll('.pain-point-remove-btn').forEach(el => {
                el.classList.add('hidden');
            });
            
            document.querySelector('.product-add-container').classList.add('hidden');
            document.querySelector('.pain-point-add-container').classList.add('hidden');
            
            // Show edit button, hide save button
            editBtn.classList.remove('hidden');
            saveBtn.classList.add('hidden');
            
            // Update sidebar profile if ProfileSync is available
            if (window.ProfileSync && typeof window.ProfileSync.updateSidebarProfile === 'function') {
                window.ProfileSync.updateSidebarProfile();
            }
            
            // Show success message
            if (window.UI && window.UI.showToast) {
                window.UI.showToast('Profile saved successfully!');
            } else {
                alert('Profile saved successfully!');
            }
        });
    }
    
    // Add product button
    const addProductBtn = document.getElementById('addProductBtn');
    const productInput = document.getElementById('productInput');
    const productLinesContainer = document.getElementById('productLinesContainer');
    
    if (addProductBtn && productInput && productLinesContainer) {
        addProductBtn.addEventListener('click', function() {
            const product = productInput.value.trim();
            if (product) {
                // Create new product item
                const productItem = document.createElement('div');
                productItem.className = 'bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center product-item';
                productItem.innerHTML = `
                    ${product}
                    <button class="ml-2 text-red-500 product-remove-btn">&times;</button>
                `;
                
                // Add to container
                productLinesContainer.appendChild(productItem);
                
                // Clear input
                productInput.value = '';
                
                // Add event listener to remove button
                productItem.querySelector('.product-remove-btn').addEventListener('click', function() {
                    productItem.remove();
                });
            }
        });
    }
    
    // Add pain point button
    const addPainPointBtn = document.getElementById('addPainPointBtn');
    const painPointInput = document.getElementById('painPointInput');
    const painPointsContainer = document.getElementById('painPointsContainer');
    
    if (addPainPointBtn && painPointInput && painPointsContainer) {
        addPainPointBtn.addEventListener('click', function() {
            const painPoint = painPointInput.value.trim();
            if (painPoint) {
                // Create new pain point item
                const painPointItem = document.createElement('div');
                painPointItem.className = 'bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center pain-point-item';
                painPointItem.innerHTML = `
                    ${painPoint}
                    <button class="ml-2 text-red-500 pain-point-remove-btn">&times;</button>
                `;
                
                // Add to container
                painPointsContainer.appendChild(painPointItem);
                
                // Clear input
                painPointInput.value = '';
                
                // Add event listener to remove button
                painPointItem.querySelector('.pain-point-remove-btn').addEventListener('click', function() {
                    painPointItem.remove();
                });
            }
        });
    }
    
    // Add event listeners to existing product remove buttons
    document.querySelectorAll('.product-remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.product-item').remove();
        });
    });
    
    // Add event listeners to existing pain point remove buttons
    document.querySelectorAll('.pain-point-remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.pain-point-item').remove();
        });
    });
}

// Make functions globally accessible
window.initializeSimpleProfile = initializeSimpleP
