// ProfileContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const ProfileContext = createContext();

// Custom hook to use the profile context
export const useProfile = () => useContext(ProfileContext);

// Provider component
export const ProfileProvider = ({ children }) => {
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

  // State to hold profile data
  const [profileData, setProfileData] = useState(defaultProfile);
  
  // Load profile data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('earwormProfileData');
    if (savedData) {
      try {
        setProfileData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error parsing profile data:', error);
      }
    }
  }, []);
  
  // Function to update profile data
  const updateProfile = (newProfileData) => {
    setProfileData(newProfileData);
    localStorage.setItem('earwormProfileData', JSON.stringify(newProfileData));
  };
  
  // Value object to be provided to consumers
  const value = {
    profileData,
    updateProfile
  };
  
  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};
