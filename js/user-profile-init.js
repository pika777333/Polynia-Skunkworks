/**
 * user-profile-init.js - Initialize the User Profile React component
 */

// Register the UserProfile component globally when this script loads
(function() {
  // Check if React and ReactDOM are available
  if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
    console.error('React or ReactDOM not available. User Profile component may not work correctly.');
    return;
  }
  
  // Define the enhanced UserProfile component with comprehensive profile editing
  window.UserProfile = function() {
    const { useState, useEffect } = React;
    
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
      goalPerCall: 'Needs assessment and solution presentation'
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
    
    // Create array editor component (for productLines and commonPainPoints)
    const renderArrayEditor = (field, title) => {
      return React.createElement('div', { className: 'mb-4' },
        React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, title),
        React.createElement('div', { className: 'flex flex-wrap gap-2 mb-2' },
          profileData[field].map((item, index) => 
            React.createElement('div', { key: index, className: 'bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center' },
              item,
              isEditing && React.createElement('button', { 
                className: 'ml-2 text-red-500',
                onClick: () => removeItem(field, index)
              }, '×')
            )
          )
        ),
        isEditing && activeField === field && React.createElement('div', { className: 'flex' },
          React.createElement('input', { 
            type: 'text',
            className: 'bg-gray-100 p-2 rounded-l w-full',
            value: newItem,
            onChange: (e) => setNewItem(e.target.value),
            placeholder: `Add a ${field.slice(0, -1)}...`
          }),
          React.createElement('button', {
            className: 'bg-indigo-500 text-white px-4 rounded-r',
            onClick: () => addItem(field)
          }, 'Add')
        ),
        isEditing && activeField !== field && React.createElement('button', {
          className: 'text-indigo-500 text-sm',
          onClick: () => { setActiveField(field); setNewItem(''); }
        }, '+ Add Item')
      );
    };
    
    // Render a text field
    const renderTextField = (field, label, placeholder = '') => {
      return React.createElement('div', { className: 'space-y-2' },
        React.createElement('label', { className: 'block text-sm font-medium text-gray-700' }, label),
        isEditing ? 
          React.createElement('input', {
            type: 'text',
            className: 'bg-gray-100 p-2 rounded w-full',
            value: profileData[field],
            onChange: (e) => handleChange(field, e.target.value),
            placeholder: placeholder
          })
          :
          React.createElement('p', { className: 'text-sm text-gray-700' }, profileData[field])
      );
    };
    
    // Main component render
    return React.createElement('div', { className: 'flex-1 p-6 overflow-auto' },
      React.createElement('div', { className: 'grid grid-cols-12 gap-6' },
        // Page Header
        React.createElement('div', { className: 'col-span-12 mb-4 flex justify-between items-center' },
          React.createElement('div', null,
            React.createElement('h2', { className: 'text-xl font-bold text-gray-800' }, 'Sales Profile'),
            React.createElement('p', { className: 'text-gray-600' }, 'Customize your profile to improve conversation analysis')
          ),
          React.createElement('button', {
            onClick: () => isEditing ? saveProfile() : setIsEditing(true),
            className: 'px-4 py-2 rounded-lg text-white earworm-gradient font-medium shadow-md'
          }, isEditing ? 'Save Profile' : 'Edit Profile')
        ),
        
        // Profile Card
        React.createElement('div', { className: 'col-span-12 bg-white rounded-lg shadow-sm earworm-card' },
          // Profile header
          React.createElement('div', { className: 'p-6 border-b border-gray-100' },
            React.createElement('div', { className: 'flex items-center' },
              React.createElement('div', { className: 'w-16 h-16 bg-gray-200 rounded-full mr-4 flex items-center justify-center' },
                React.createElement('svg', { className: 'w-10 h-10 text-gray-500', fill: 'currentColor', viewBox: '0 0 24 24' },
                  React.createElement('path', { d: 'M12 12a5 5 0 100-10 5 5 0 000 10zm0 2a8 8 0 00-8 8 1 1 0 001 1h14a1 1 0 001-1 8 8 0 00-8-8z' })
                )
              ),
              React.createElement('div', null,
                isEditing ? 
                  React.createElement('input', {
                    type: 'text',
                    className: 'bg-gray-100 p-2 rounded text-xl font-bold text-gray-800 mb-1 w-full',
                    value: profileData.name,
                    onChange: (e) => handleChange('name', e.target.value)
                  })
                  :
                  React.createElement('h3', { className: 'text-xl font-bold text-gray-800' }, profileData.name),
                isEditing ?
                  React.createElement('input', {
                    type: 'text',
                    className: 'bg-gray-100 p-2 rounded text-gray-600 w-full',
                    value: profileData.title,
                    onChange: (e) => handleChange('title', e.target.value)
                  })
                  :
                  React.createElement('p', { className: 'text-gray-600' }, profileData.title)
              )
            )
          ),
          
          // Basic Information Section
          React.createElement('div', { className: 'p-6 border-b border-gray-100' },
            React.createElement('h3', { className: 'text-lg font-medium text-gray-800 mb-4' }, 'Basic Information'),
            React.createElement('div', { className: 'grid grid-cols-2 gap-6' },
              renderTextField('email', 'Email', 'your.email@example.com'),
              renderTextField('phone', 'Phone', '(555) 123-4567'),
              renderTextField('region', 'Region', 'e.g. Northeast, Midwest'),
              renderTextField('specialty', 'Specialty', 'e.g. Enterprise Solutions')
            )
          ),
          
          // Sales Context Section
          React.createElement('div', { className: 'p-6 border-b border-gray-100' },
            React.createElement('h3', { className: 'text-lg font-medium text-gray-800 mb-4' }, 'Sales Context'),
            React.createElement('div', { className: 'mb-6' },
              renderTextField('industry', 'Industry Focus', 'e.g. Software, Healthcare, Financial Services'),
              renderArrayEditor('productLines', 'Products/Services'),
              
              // Typical Budget
              React.createElement('div', { className: 'space-y-2 mt-4' },
                React.createElement('label', { className: 'block text-sm font-medium text-gray-700' }, 'Typical Budget Range'),
                isEditing ? 
                  React.createElement('input', {
                    type: 'text',
                    className: 'bg-gray-100 p-2 rounded w-full',
                    value: profileData.typicalBudget,
                    onChange: (e) => handleChange('typicalBudget', e.target.value),
                    placeholder: 'e.g. $25,000 - $100,000'
                  })
                  :
                  React.createElement('p', { className: 'text-sm text-gray-700' }, profileData.typicalBudget)
              )
            )
          ),
          
          // Customer Context Section
          React.createElement('div', { className: 'p-6 border-b border-gray-100' },
            React.createElement('h3', { className: 'text-lg font-medium text-gray-800 mb-4' }, 'Customer Context'),
            renderArrayEditor('commonPainPoints', 'Common Customer Pain Points')
          ),
          
          // Selling Style Section
          React.createElement('div', { className: 'p-6 border-b border-gray-100' },
            React.createElement('h3', { className: 'text-lg font-medium text-gray-800 mb-4' }, 'Selling Approach'),
            
            // Approach Style
            React.createElement('div', { className: 'mb-4' },
              React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Sales Approach Style'),
              isEditing ? 
                React.createElement('select', {
                  className: 'bg-gray-100 p-2 rounded w-full',
                  value: profileData.approachStyle,
                  onChange: (e) => handleChange('approachStyle', e.target.value)
                },
                  React.createElement('option', { value: 'Consultative' }, 'Consultative'),
                  React.createElement('option', { value: 'Solution Selling' }, 'Solution Selling'),
                  React.createElement('option', { value: 'Challenger' }, 'Challenger'),
                  React.createElement('option', { value: 'SPIN Selling' }, 'SPIN Selling'),
                  React.createElement('option', { value: 'Value-Based' }, 'Value-Based')
                )
                :
                React.createElement('p', { className: 'text-sm text-gray-700' }, profileData.approachStyle)
            ),
            
            // Goal Per Call
            React.createElement('div', { className: 'mb-4' },
              React.createElement('label', { className: 'block text-sm font-medium text-gray-700 mb-2' }, 'Typical Goal Per Call'),
              isEditing ? 
                React.createElement('input', {
                  type: 'text',
                  className: 'bg-gray-100 p-2 rounded w-full',
                  value: profileData.goalPerCall,
                  onChange: (e) => handleChange('goalPerCall', e.target.value),
                  placeholder: 'e.g. Needs assessment, Solution presentation'
                })
                :
                React.createElement('p', { className: 'text-sm text-gray-700' }, profileData.goalPerCall)
            )
          ),
          
          // Help Text
          React.createElement('div', { className: 'p-6' },
            React.createElement('div', { className: 'p-4 bg-blue-50 rounded-lg' },
              React.createElement('h4', { className: 'text-sm font-medium text-blue-700 mb-2' }, 'How This Helps Your Analysis'),
              React.createElement('p', { className: 'text-sm text-blue-600' },
                'This profile information helps the AI better understand context when analyzing your sales conversations. ' +
                'It can identify when customers mention your products, recognize pain points, and estimate budget more ' +
                'accurately based on your typical price range.'
              )
            )
          )
        )
      )
    );
  };
  
  // Add event listener to load the component when needed
  document.addEventListener('DOMContentLoaded', function() {
    // Find the user profile nav link
    const userProfileLink = document.querySelector('.nav-link[data-target="user"]');
    
    if (userProfileLink) {
      // Preload the component when hovering over the link
      userProfileLink.addEventListener('mouseenter', function() {
        console.log('User Profile component would be preloaded here');
      });
    }
    
    // Initialize user profile when DOM is loaded
    const userView = document.getElementById('userView');
    if (userView && typeof window.initializeReactComponent === 'function') {
      window.initializeReactComponent('userView', window.UserProfile);
    }
  });
  
  console.log('Enhanced User Profile component initialization script loaded');
})();
