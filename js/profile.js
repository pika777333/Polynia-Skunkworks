// profile.js - FIXED VERSION
// Remove React imports and create a browser-compatible version

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
    goalPerCall: 'Needs assessment and solution presentation',
    
    // Custom fields
    customFields: [
        { name: 'Vertical Focus', value: 'Healthcare, Financial Services' }
    ]
};

// Create a self-executing function to set up profile functionality
(function() {
    // Non-React compatibility layer
    const ProfileManager = {
        getProfile() {
            try {
                const savedData = localStorage.getItem('earwormProfileData');
                return savedData ? JSON.parse(savedData) : defaultProfile;
            } catch (error) {
                console.error('Error retrieving profile:', error);
                return defaultProfile;
            }
        },
        
        updateProfile(newData) {
            try {
                localStorage.setItem('earwormProfileData', JSON.stringify(newData));
                return true;
            } catch (error) {
                console.error('Error saving profile:', error);
                return false;
            }
        }
    };
    
    // Expose to window for backward compatibility
    window.ProfileManager = ProfileManager;
    
    // Setup React context if React is available
    if (typeof React !== 'undefined') {
        // Create context
        const ProfileContext = React.createContext(null);
        
        // Define useProfile hook
        function useProfile() {
            return React.useContext(ProfileContext);
        }
        
        // Define ProfileProvider component
        function ProfileProvider({ children }) {
            const [profileData, setProfileData] = React.useState(defaultProfile);
            const [loading, setLoading] = React.useState(true);
            const [error, setError] = React.useState(null);
            
            // Load profile data from localStorage on mount
            React.useEffect(() => {
                try {
                    const savedData = localStorage.getItem('earwormProfileData');
                    if (savedData) {
                        setProfileData(JSON.parse(savedData));
                    }
                } catch (error) {
                    console.error('Error loading profile data:', error);
                    setError('Failed to load profile data');
                } finally {
                    setLoading(false);
                }
            }, []);
            
            // Update profile and save to localStorage
            const updateProfile = (newData) => {
                try {
                    setProfileData(newData);
                    localStorage.setItem('earwormProfileData', JSON.stringify(newData));
                    return true;
                } catch (error) {
                    console.error('Error saving profile data:', error);
                    setError('Failed to save profile data');
                    return false;
                }
            };
            
            // Updates a specific field in the profile
            const updateProfileField = (field, value) => {
                const updatedProfile = { ...profileData, [field]: value };
                return updateProfile(updatedProfile);
            };
            
            // Reset profile to defaults
            const resetProfile = () => {
                return updateProfile(defaultProfile);
            };
            
            return React.createElement(
                ProfileContext.Provider,
                {
                    value: { 
                        profileData, 
                        updateProfile, 
                        updateProfileField,
                        resetProfile,
                        loading,
                        error
                    }
                },
                children
            );
        }
        
        // Expose React components and hooks to window
        window.ProfileContext = {
            Provider: ProfileProvider,
            useProfile: useProfile
        };
    }
    
    console.log('Profile module initialized');
})();
