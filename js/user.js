import React, { useState, useEffect } from 'react';

const ProfileCustomizer = () => {
  // Initial state with default values
  const [profileData, setProfileData] = useState({
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
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [productInput, setProductInput] = useState('');
  const [painPointInput, setPainPointInput] = useState('');
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('earwormProfileData');
    if (savedData) {
      setProfileData(JSON.parse(savedData));
    }
  }, []);
  
  // Save data to localStorage when profile is updated
  const saveProfile = () => {
    localStorage.setItem('earwormProfileData', JSON.stringify(profileData));
    setIsEditing(false);
  };
  
  // Add a product to the list
  const addProduct = () => {
    if (productInput.trim() !== '') {
      setProfileData({
        ...profileData,
        productLines: [...profileData.productLines, productInput.trim()]
      });
      setProductInput('');
    }
  };
  
  // Add a pain point to the list
  const addPainPoint = () => {
    if (painPointInput.trim() !== '') {
      setProfileData({
        ...profileData,
        commonPainPoints: [...profileData.commonPainPoints, painPointInput.trim()]
      });
      setPainPointInput('');
    }
  };
  
  // Remove item from an array field
  const removeItem = (field, index) => {
    setProfileData({
      ...profileData,
      [field]: profileData[field].filter((_, i) => i !== index)
    });
  };
  
  // Add a custom field
  const addCustomField = () => {
    setProfileData({
      ...profileData,
      customFields: [...profileData.customFields, { name: '', value: '' }]
    });
  };
  
  // Update a custom field
  const updateCustomField = (index, key, value) => {
    const updatedFields = [...profileData.customFields];
    updatedFields[index][key] = value;
    setProfileData({
      ...profileData,
      customFields: updatedFields
    });
  };
  
  // Remove a custom field
  const removeCustomField = (index) => {
    setProfileData({
      ...profileData,
      customFields: profileData.customFields.filter((_, i) => i !== index)
    });
  };
  
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="grid grid-cols-12 gap-6">
        {/* Page Header */}
        <div className="col-span-12 mb-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
            <p className="text-gray-600">Customize your profile to improve conversation analysis</p>
          </div>
          <button 
            onClick={() => isEditing ? saveProfile() : setIsEditing(true)}
            className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-purple-500 to-pink-500 font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>
        
        {/* Profile Card */}
        <div className="col-span-12 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-32"></div>
          <div className="px-6 pb-6">
            {/* Avatar and name section */}
            <div className="relative">
              <div className="absolute -top-16 left-8">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center p-1 shadow-lg">
                  <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
                    <svg className="w-full h-full text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2a8 8 0 00-8 8 1 1 0 001 1h14a1 1 0 001-1 8 8 0 00-8-8z"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="pt-12 pl-32">
                {isEditing ? (
                  <input 
                    type="text" 
                    className="text-2xl font-bold text-gray-800 bg-gray-100 p-2 rounded w-full mb-2"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
                )}
                {isEditing ? (
                  <input 
                    type="text" 
                    className="text-gray-600 bg-gray-100 p-2 rounded w-full"
                    value={profileData.title}
                    onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-600">{profileData.title}</p>
                )}
              </div>
            </div>
            
            {/* Basic Info Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
              <div className="grid grid-cols-2 gap-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  {isEditing ? (
                    <input 
                      type="email" 
                      className="bg-gray-100 p-2 rounded w-full"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-gray-700">{profileData.email}</p>
                  )}
                </div>
                
                {/* Phone Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  {isEditing ? (
                    <input 
                      type="tel" 
                      className="bg-gray-100 p-2 rounded w-full"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-gray-700">{profileData.phone}</p>
                  )}
                </div>
                
                {/* Region Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Region</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      className="bg-gray-100 p-2 rounded w-full"
                      value={profileData.region}
                      onChange={(e) => setProfileData({...profileData, region: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-gray-700">{profileData.region}</p>
                  )}
                </div>
                
                {/* Specialty Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Specialty</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      className="bg-gray-100 p-2 rounded w-full"
                      value={profileData.specialty}
                      onChange={(e) => setProfileData({...profileData, specialty: e.target.value})}
                    />
                  ) : (
                    <p className="text-sm text-gray-700">{profileData.specialty}</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Sales Context Section */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Sales Context</h3>
              
              {/* Industry Field */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    className="bg-gray-100 p-2 rounded w-full"
                    value={profileData.industry}
                    onChange={(e) => setProfileData({...profileData, industry: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-gray-700">{profileData.industry}</p>
                )}
              </div>
              
              {/* Product Lines */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Product/Service Lines</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profileData.productLines.map((product, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                      {product}
                      {isEditing && (
                        <button 
                          className="ml-2 text-red-500"
                          onClick={() => removeItem('productLines', index)}
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex">
                    <input 
                      type="text" 
                      className="bg-gray-100 p-2 rounded-l w-full"
                      value={productInput}
                      onChange={(e) => setProductInput(e.target.value)}
                      placeholder="Add a product/service..."
                    />
                    <button 
                      className="bg-indigo-500 text-white px-4 rounded-r"
                      onClick={addProduct}
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
              
              {/* Common Pain Points */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Common Customer Pain Points</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profileData.commonPainPoints.map((painPoint, index) => (
                    <div key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                      {painPoint}
                      {isEditing && (
                        <button 
                          className="ml-2 text-red-500"
                          onClick={() => removeItem('commonPainPoints', index)}
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex">
                    <input 
                      type="text" 
                      className="bg-gray-100 p-2 rounded-l w-full"
                      value={painPointInput}
                      onChange={(e) => setPainPointInput(e.target.value)}
                      placeholder="Add a pain point..."
                    />
                    <button 
                      className="bg-indigo-500 text-white px-4 rounded-r"
                      onClick={addPainPoint}
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
              
              {/* Typical Budget Range */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Typical Budget Range</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    className="bg-gray-100 p-2 rounded w-full"
                    value={profileData.typicalBudget}
                    onChange={(e) => setProfileData({...profileData, typicalBudget: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-gray-700">{profileData.typicalBudget}</p>
                )}
              </div>
            </div>
            
            {/* Selling Style Section */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Selling Approach</h3>
              
              {/* Approach Style */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sales Approach Style</label>
                {isEditing ? (
                  <select 
                    className="bg-gray-100 p-2 rounded w-full"
                    value={profileData.approachStyle}
                    onChange={(e) => setProfileData({...profileData, approachStyle: e.target.value})}
                  >
                    <option value="Consultative">Consultative</option>
                    <option value="Solution Selling">Solution Selling</option>
                    <option value="Challenger">Challenger</option>
                    <option value="SPIN Selling">SPIN Selling</option>
                    <option value="Value-Based">Value-Based</option>
                  </select>
                ) : (
                  <p className="text-sm text-gray-700">{profileData.approachStyle}</p>
                )}
              </div>
              
              {/* Goal Per Call */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Typical Goal Per Call</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    className="bg-gray-100 p-2 rounded w-full"
                    value={profileData.goalPerCall}
                    onChange={(e) => setProfileData({...profileData, goalPerCall: e.target.value})}
                  />
                ) : (
                  <p className="text-sm text-gray-700">{profileData.goalPerCall}</p>
                )}
              </div>
            </div>
            
            {/* Custom Fields Section */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">Custom Fields</h3>
                {isEditing && (
                  <button 
                    className="text-indigo-500 text-sm"
                    onClick={addCustomField}
                  >
                    + Add Field
                  </button>
                )}
              </div>
              
              {profileData.customFields.length > 0 ? (
                <div className="space-y-4">
                  {profileData.customFields.map((field, index) => (
                    <div key={index} className="flex items-center gap-4">
                      {isEditing ? (
                        <>
                          <input 
                            type="text" 
                            className="bg-gray-100 p-2 rounded w-1/3"
                            value={field.name}
                            onChange={(e) => updateCustomField(index, 'name', e.target.value)}
                            placeholder="Field name"
                          />
                          <input 
                            type="text" 
                            className="bg-gray-100 p-2 rounded w-2/3"
                            value={field.value}
                            onChange={(e) => updateCustomField(index, 'value', e.target.value)}
                            placeholder="Field value"
                          />
                          <button 
                            className="text-red-500"
                            onClick={() => removeCustomField(index)}
                          >
                            &times;
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-sm font-medium text-gray-700 w-1/3">{field.name}:</span>
                          <span className="text-sm text-gray-700 w-2/3">{field.value}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No custom fields added yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCustomizer;
