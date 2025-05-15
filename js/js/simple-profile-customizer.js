import React, { useState, useEffect } from 'react';

const SimpleProfileCustomizer = () => {
  // Initial state with default values
  const [profileData, setProfileData] = useState({
    // Basic info
    name: 'Sarah Johnson',
    title: 'Sales Manager',
    industry: 'Software',
    
    // Product info
    productLines: ['CRM Software', 'Data Analytics', 'Cloud Storage'],
    priceRange: '$25,000 - $100,000',
    
    // Customer context
    painPoints: ['Implementation time', 'Cost concerns', 'Technical support'],
    buyingSignals: ['Asks about implementation', 'Discusses budget', 'Requests demo']
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [activeField, setActiveField] = useState(null);
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('earwormProfileData');
    if (savedData) {
      try {
        setProfileData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading profile data:', error);
      }
    }
  }, []);
  
  // Save data to localStorage when profile is updated
  const saveProfile = () => {
    localStorage.setItem('earwormProfileData', JSON.stringify(profileData));
    setIsEditing(false);
  };
  
  // Add an item to an array field
  const addItem = (field) => {
    if (newItem.trim() !== '') {
      setProfileData({
        ...profileData,
        [field]: [...profileData[field], newItem.trim()]
      });
      setNewItem('');
    }
  };
  
  // Remove item from an array field
  const removeItem = (field, index) => {
    setProfileData({
      ...profileData,
      [field]: profileData[field].filter((_, i) => i !== index)
    });
  };
  
  // Handle changes to text input fields
  const handleChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };
  
  // UI for editing array items
  const renderArrayEditor = (field, title) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{title}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {profileData[field].map((item, index) => (
          <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
            {item}
            {isEditing && (
              <button 
                className="ml-2 text-red-500"
                onClick={() => removeItem(field, index)}
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>
      {isEditing && activeField === field && (
        <div className="flex">
          <input 
            type="text" 
            className="bg-gray-100 p-2 rounded-l w-full"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Add a ${field.slice(0, -1)}...`}
          />
          <button 
            className="bg-indigo-500 text-white px-4 rounded-r"
            onClick={() => addItem(field)}
          >
            Add
          </button>
        </div>
      )}
      {isEditing && activeField !== field && (
        <button 
          className="text-indigo-500 text-sm"
          onClick={() => { setActiveField(field); setNewItem(''); }}
        >
          + Add Item
        </button>
      )}
    </div>
  );
  
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="grid grid-cols-12 gap-6">
        {/* Page Header */}
        <div className="col-span-12 mb-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Sales Profile</h2>
            <p className="text-gray-600">Key context for your sales conversation analysis</p>
          </div>
          <button 
            onClick={() => isEditing ? saveProfile() : setIsEditing(true)}
            className="px-4 py-2 rounded-lg text-white earworm-gradient font-medium shadow-md"
          >
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>
        
        {/* Profile Card */}
        <div className="col-span-12 bg-white rounded-lg shadow-sm p-6">
          {/* Basic Information Section */}
          <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name</label>
              {isEditing ? (
                <input 
                  type="text" 
                  className="bg-gray-100 p-2 rounded w-full"
                  value={profileData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
              ) : (
                <p className="text-sm text-gray-700">{profileData.name}</p>
              )}
            </div>
            
            {/* Title Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Title</label>
              {isEditing ? (
                <input 
                  type="text" 
                  className="bg-gray-100 p-2 rounded w-full"
                  value={profileData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                />
              ) : (
                <p className="text-sm text-gray-700">{profileData.title}</p>
              )}
            </div>
            
            {/* Industry Field */}
            <div className="space-y-2 col-span-2">
              <label className="block text-sm font-medium text-gray-700">Industry Focus</label>
              {isEditing ? (
                <input 
                  type="text" 
                  className="bg-gray-100 p-2 rounded w-full"
                  value={profileData.industry}
                  onChange={(e) => handleChange('industry', e.target.value)}
                />
              ) : (
                <p className="text-sm text-gray-700">{profileData.industry}</p>
              )}
            </div>
          </div>
          
          {/* Sales Context Section */}
          <h3 className="text-lg font-medium text-gray-800 mb-4">Sales Context</h3>
          <div className="mb-6">
            {/* Product Lines */}
            {renderArrayEditor('productLines', 'Products/Services')}
            
            {/* Price Range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Typical Price Range</label>
              {isEditing ? (
                <input 
                  type="text" 
                  className="bg-gray-100 p-2 rounded w-full"
                  value={profileData.priceRange}
                  onChange={(e) => handleChange('priceRange', e.target.value)}
                  placeholder="e.g. $1,000 - $5,000"
                />
              ) : (
                <p className="text-sm text-gray-700">{profileData.priceRange}</p>
              )}
            </div>
          </div>
          
          {/* Customer Context Section */}
          <h3 className="text-lg font-medium text-gray-800 mb-4">Customer Context</h3>
          <div className="mb-6">
            {/* Pain Points */}
            {renderArrayEditor('painPoints', 'Common Pain Points')}
            
            {/* Buying Signals */}
            {renderArrayEditor('buyingSignals', 'Buying Signals to Watch For')}
          </div>
          
          {/* Help Text */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-700 mb-2">How This Helps Your Analysis</h4>
            <p className="text-sm text-blue-600">
              This profile information helps the AI better understand context when analyzing your sales conversations. 
              It can identify when customers mention your products, recognize pain points, and estimate budget more 
              accurately based on your typical price range.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleProfileCustomizer;
