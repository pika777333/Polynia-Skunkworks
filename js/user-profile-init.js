/**
 * user-profile-init.js - Improved Profile React component initialization
 */

// Register the UserProfile component globally when this script loads
(function() {
  // Check if React and ReactDOM are available
  if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
    console.error('React or ReactDOM not available. User Profile component may not work correctly.');
    // Create fallback content if React is not available
    document.addEventListener('DOMContentLoaded', function() {
      const userView = document.getElementById('userView');
      if (userView) {
        userView.innerHTML = `
          <div class="flex-1 p-6">
            <div class="grid grid-cols-12 gap-6">
              <div class="col-span-12 mb-4">
                <h2 class="text-xl font-bold text-gray-800">Sales Profile</h2>
                <p class="text-gray-600">Customize your profile to improve conversation analysis</p>
              </div>
              <div class="col-span-12 bg-white rounded-lg shadow-sm p-6">
                <p>Profile customization requires JavaScript. Please make sure JavaScript is enabled in your browser.</p>
              </div>
            </div>
          </div>
        `;
      }
    });
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
    const [isLoading, setIsLoading] = useState(true);
    
    // Load data from localStorage on component mount
    useEffect(() => {
      try {
        const savedData = localStorage.getItem('earwormProfileData');
        if (savedData) {
          setProfileData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Error loading profile data:', error);
      } finally {
        setIsLoading(false);
      }
    }, []);
    
    // Save data to localStorage when profile is updated
    const saveProfile = () => {
      try {
        localStorage.setItem('earwormProfileData', JSON.stringify(profileData));
        setIsEditing(false);
        if (window.UI && window.UI.showToast) {
          window.UI.showToast('Profile saved successfully!');
        }
      } catch (error) {
        console.error('Error saving profile:', error);
        if (window.UI && window.UI.showToast) {
          window.UI.showToast('Error saving profile.', 'error');
        }
      }
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
    
    // Loading state
    if (isLoading) {
      return React.createElement('div', { className: 'flex-1 p-6 flex items-center justify-center' },
        React.createElement('div', { className: 'spinner' }), 
        React.createElement('span', { className: 'ml-3' }, 'Loading profile...')
      );
    }
    
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
  
  // Direct DOM initialization function
  function initializeUserProfile() {
    console.log('Initializing User Profile directly...');
    const userView = document.getElementById('userView');
    
    if (!userView) {
      console.error('User View container not found');
      return;
    }
    
    try {
      if (typeof ReactDOM.createRoot === 'function') {
        // React 18+
        const root = ReactDOM.createRoot(userView);
        root.render(React.createElement(window.UserProfile));
      } else {
        // React 17 and earlier
        ReactDOM.render(React.createElement(window.UserProfile), userView);
      }
      console.log('User Profile rendered successfully');
    } catch (error) {
      console.error('Failed to render UserProfile component:', error);
      
      // Fallback content
      userView.innerHTML = `
        <div class="flex-1 p-6">
          <div class="grid grid-cols-12 gap-6">
            <div class="col-span-12 mb-4">
              <h2 class="text-xl font-bold text-gray-800">Sales Profile</h2>
              <p class="text-gray-600">Customize your profile to improve conversation analysis</p>
            </div>
            <div class="col-span-12 bg-white rounded-lg shadow-sm p-6">
              <p>There was a problem loading the profile editor. Please refresh the page to try again.</p>
            </div>
          </div>
        </div>
      `;
    }
  }
  
  // Make initialization function available globally
  window.initializeUserProfile = initializeUserProfile;
  
  // Auto-initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    // Register profile initialization with Router if available
    if (window.Router && typeof window.Router.registerViewCallback === 'function') {
      window.Router.registerViewCallback('user', function() {
        // Return a promise that resolves when the profile is initialized
        return new Promise((resolve) => {
          console.log('User profile view callback triggered');
          
          // Initialize the profile or use the existing initialization method
          if (typeof window.initializeReactComponent === 'function') {
            window.initializeReactComponent('userView', window.UserProfile);
          } else {
            initializeUserProfile();
          }
          
          // Resolve after a short delay to ensure the component has time to render
          setTimeout(resolve, 100);
        });
      });
    } else {
      console.log('Router not available, will initialize profile directly');
      
      // Get the user profile link
      const userProfileLink = document.querySelector('.nav-link[data-target="user"]');
      
      if (userProfileLink) {
        // Add click handler as a backup
        userProfileLink.addEventListener('click', function() {
          const userView = document.getElementById('userView');
          if (userView) {
            // Show the view first
            userView.classList.remove('hidden');
            
            // Then initialize the component
            if (typeof window.initializeReactComponent === 'function') {
              window.initializeReactComponent('userView', window.UserProfile);
            } else {
              initializeUserProfile();
            }
          }
        });
      }
    }
    
    // Pre-initialize if we're already on the user view
    if (window.location.hash === '#user') {
      const userView = document.getElementById('userView');
      if (userView && !userView.classList.contains('hidden')) {
        if (typeof window.initializeReactComponent === 'function') {
          window.initializeReactComponent('userView', window.UserProfile);
        } else {
          initializeUserProfile();
        }
      }
    }
  });
  
  console.log('Enhanced User Profile component initialization script loaded');
})();
