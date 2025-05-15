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
  
  // Define the UserProfile component
  // This component is a simplified version of what's in the React artifact
  // It will be replaced by the full component when loaded
  window.UserProfile = () => {
    const userData = {
      name: 'Sarah Johnson',
      title: 'Sales Manager',
      email: 'sarah.johnson@earworm.com',
      phone: '(555) 123-4567',
      region: 'Midwest',
      specialty: 'Enterprise Solutions'
    };
    
    return React.createElement('div', { className: 'p-6' },
      React.createElement('div', { className: 'bg-white rounded-lg shadow-sm p-6' },
        React.createElement('h2', { className: 'text-xl font-bold text-gray-800 mb-4' }, 'My Profile'),
        React.createElement('div', { className: 'flex items-center mb-6' },
          React.createElement('div', { className: 'w-12 h-12 bg-gray-200 rounded-full mr-4 flex items-center justify-center' },
            React.createElement('svg', { className: 'w-8 h-8 text-gray-500', fill: 'currentColor', viewBox: '0 0 24 24' },
              React.createElement('path', { d: 'M12 12a5 5 0 100-10 5 5 0 000 10zm0 2a8 8 0 00-8 8 1 1 0 001 1h14a1 1 0 001-1 8 8 0 00-8-8z' })
            )
          ),
          React.createElement('div', null,
            React.createElement('h3', { className: 'font-medium text-gray-800' }, userData.name),
            React.createElement('p', { className: 'text-sm text-gray-600' }, userData.title)
          )
        ),
        React.createElement('div', { className: 'space-y-2 mb-6' },
          React.createElement('p', { className: 'text-sm text-gray-700' }, `Email: ${userData.email}`),
          React.createElement('p', { className: 'text-sm text-gray-700' }, `Phone: ${userData.phone}`),
          React.createElement('p', { className: 'text-sm text-gray-700' }, `Region: ${userData.region}`),
          React.createElement('p', { className: 'text-sm text-gray-700' }, `Specialty: ${userData.specialty}`)
        ),
        React.createElement('button', { 
          className: 'px-4 py-2 rounded-lg text-white earworm-gradient font-medium',
          onClick: () => console.log('Edit profile clicked')
        }, 'Edit Profile')
      )
    );
  };
  
  // Add event listener to load the full component when needed
  document.addEventListener('DOMContentLoaded', function() {
    // Find the user profile nav link
    const userProfileLink = document.querySelector('.nav-link[data-target="user"]');
    
    if (userProfileLink) {
      // Preload the full component when hovering over the link
      userProfileLink.addEventListener('mouseenter', function() {
        // This is where you would dynamically load the full component
        // For now, we'll just log that it would be loaded
        console.log('User Profile component would be preloaded here');
      });
    }
  });
  
  console.log('User Profile component initialization script loaded');
})();
// Add this to the end of user-profile-init.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize user profile when DOM is loaded
    const userView = document.getElementById('userView');
    if (userView && typeof window.initializeReactComponent === 'function') {
        window.initializeReactComponent('userView', window.UserProfile);
    }
});
