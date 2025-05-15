// profile.js
import { createContext, useState, useContext, useEffect } from 'react';

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

// Create the context
const ProfileContext = createContext();

// Custom hook to use the profile context
export function useProfile() {
    return useContext(ProfileContext);
}

// Provider component
export function ProfileProvider({ children }) {
    const [profileData, setProfileData] = useState(defaultProfile);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Load profile data from localStorage on mount
    useEffect(() => {
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
    
    return (
        <ProfileContext.Provider value={{ 
            profileData, 
            updateProfile, 
            updateProfileField,
            resetProfile,
            loading,
            error
        }}>
            {children}
        </ProfileContext.Provider>
    );
}

// Non-React compatibility layer
// Non-React compatibility layer
export const ProfileManager = {
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
