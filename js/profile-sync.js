/**
 * profile-sync.js - Synchronize profile data across the application
 */

// Initialize the ProfileSync module
const ProfileSync = (function() {
    // Default profile data
    const defaultProfile = {
        name: 'Sarah Johnson',
        title: 'Sales Manager',
        email: 'sarah.johnson@earworm.com',
        phone: '(555) 123-4567',
        profilePicture: null // Default is no profile picture
    };
    
    // DOM elements for sidebar profile
    let sidebarNameElement;
    let sidebarTitleElement;
    let sidebarProfileImageElement;
    
    /**
     * Initialize the profile sync
     */
    function initialize() {
        console.log('Initializing ProfileSync...');
        
        // Cache DOM elements
        sidebarNameElement = document.querySelector('.sidebar-profile-name');
        sidebarTitleElement = document.querySelector('.sidebar-profile-title');
        sidebarProfileImageElement = document.querySelector('.sidebar-profile-image');
        
        // Add event listener for storage changes (in case of multiple tabs)
        window.addEventListener('storage', function(e) {
            if (e.key === 'earwormProfileData') {
                updateSidebarProfile();
            }
        });
        
        // Initial sync
        updateSidebarProfile();
        
        // Set up a custom event listener for profile updates
        document.addEventListener('profileUpdated', updateSidebarProfile);
        
        console.log('ProfileSync initialized');
    }
    
    /**
     * Update the sidebar profile from localStorage
     */
    function updateSidebarProfile() {
        try {
            // Get profile data from localStorage
            let profileData = defaultProfile;
            
            try {
                const savedData = localStorage.getItem('earwormProfileData');
                if (savedData) {
                    profileData = { ...profileData, ...JSON.parse(savedData) };
                }
            } catch (error) {
                console.error('Error reading profile data:', error);
            }
            
            // Update sidebar DOM elements if they exist
            if (sidebarNameElement) {
                sidebarNameElement.textContent = profileData.name || defaultProfile.name;
            }
            
            if (sidebarTitleElement) {
                sidebarTitleElement.textContent = profileData.title || defaultProfile.title;
            }
            
            // Update profile picture if present
            if (sidebarProfileImageElement) {
                if (profileData.profilePicture) {
                    // If we have a profile picture, replace the SVG with an image
                    sidebarProfileImageElement.innerHTML = `
                        <img src="${profileData.profilePicture}" alt="Profile" class="w-full h-full object-cover rounded-full" />
                    `;
                } else {
                    // Restore the default avatar SVG if no profile picture
                    sidebarProfileImageElement.innerHTML = `
                        <svg class="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2a8 8 0 00-8 8 1 1 0 001 1h14a1 1 0 001-1 8 8 0 00-8-8z"></path>
                        </svg>
                    `;
                }
            }
            
            console.log('Sidebar profile updated');
        } catch (error) {
            console.error('Error updating sidebar profile:', error);
        }
    }
    
    /**
     * Save profile data and update UI
     * @param {Object} profileData - Profile data to save
     */
    function saveProfile(profileData) {
        try {
            // Save to localStorage
            localStorage.setItem('earwormProfileData', JSON.stringify(profileData));
            
            // Update sidebar
            updateSidebarProfile();
            
            // Dispatch custom event
            document.dispatchEvent(new CustomEvent('profileUpdated'));
            
            console.log('Profile saved and synchronized');
            return true;
        } catch (error) {
            console.error('Error saving profile:', error);
            return false;
        }
    }
    
    /**
     * Get current profile data
     * @returns {Object} The current profile data
     */
    function getProfileData() {
        try {
            const savedData = localStorage.getItem('earwormProfileData');
            return savedData ? JSON.parse(savedData) : defaultProfile;
        } catch (error) {
            console.error('Error getting profile data:', error);
            return defaultProfile;
        }
    }
    
    /**
     * Read and convert an image file to base64
     * @param {File} file - The image file
     * @returns {Promise<string>} A promise that resolves with the base64 string
     */
    function readImageAsBase64(file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error('No file provided'));
                return;
            }
            
            // Check file size, limit to 1MB
            if (file.size > 1024 * 1024) {
                reject(new Error('File size exceeds 1MB limit'));
                return;
            }
            
            // Check file type
            if (!file.type.match('image.*')) {
                reject(new Error('Only image files are allowed'));
                return;
            }
            
            const reader = new FileReader();
            
            reader.onload = function(event) {
                resolve(event.target.result);
            };
            
            reader.onerror = function(error) {
                reject(error);
            };
            
            reader.readAsDataURL(file);
        });
    }
    
    // Public API
    return {
        initialize,
        updateSidebarProfile,
        saveProfile,
        getProfileData,
        readImageAsBase64
    };
})();

// Make available globally
window.ProfileSync = ProfileSync;

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add class names to sidebar profile elements for easier selection
    const sidebarProfile = document.querySelector('.p-4.border-t .flex.items-center');
    if (sidebarProfile) {
        const profileImageContainer = sidebarProfile.querySelector('.w-10.h-10.bg-gray-200.rounded-full');
        if (profileImageContainer) {
            profileImageContainer.classList.add('sidebar-profile-image');
        }
        
        const nameElement = sidebarProfile.querySelector('.text-sm.font-medium.text-gray-900');
        if (nameElement) {
            nameElement.classList.add('sidebar-profile-name');
        }
        
        const titleElement = sidebarProfile.querySelector('.text-xs.text-gray-500');
        if (titleElement) {
            titleElement.classList.add('sidebar-profile-title');
        }
    }
    
    // Initialize after a short delay to ensure DOM is ready
    setTimeout(() => {
        if (window.ProfileSync) {
            window.ProfileSync.initialize();
        }
    }, 100);
});
