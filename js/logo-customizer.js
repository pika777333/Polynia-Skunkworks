/**
 * logo-customizer.js - Simple logo customization
 */

// Configure your custom logo here
const CUSTOM_LOGO = {
  // Set to true to use a custom logo
  enabled: true,
  
  // The URL of your logo image - replace with your own image URL
  imageUrl: 'https://mail.google.com/mail/u/0?ui=2&ik=106f86c14a&attid=0.1&permmsgid=msg-f:1832109630333524986&th=196cf600799a1bfa&view=fimg&fur=ip&permmsgid=msg-f:1832109630333524986&sz=s0-l75-ft&attbid=ANGjdJ_4OPCL8ODu2zjf-ZnYO3BrAaOsAkblKJNfzMZSNYDgkuoIdCt-6ngu0FosNZkohEyr6rQhNDNYvp99JithoWmjWg1DZ5ge16044EGtaYv9JthO4lueXgQf3BQ&disp=emb&realattid=ii_mao34p2e0&zw',
  
  // Optional alt text for the logo
  altText: 'Custom Company Logo',
  
  // Optional custom width (leave blank to use default)
  width: '',
  
  // Optional custom height (leave blank to use default)
  height: ''
};

// Initialize the Logo Customizer module
(function() {
  // Run on page load
  document.addEventListener('DOMContentLoaded', function() {
    // Check if custom logo is enabled
    if (CUSTOM_LOGO.enabled && CUSTOM_LOGO.imageUrl) {
      applyCustomLogo();
    }
    
    // Add hover effect to show edit button
    const logoContainer = document.getElementById('logo-container');
    const editButton = document.getElementById('edit-logo-button');
    
    if (logoContainer && editButton) {
      logoContainer.addEventListener('mouseenter', function() {
        editButton.classList.remove('hidden');
      });
      
      logoContainer.addEventListener('mouseleave', function() {
        editButton.classList.add('hidden');
      });
      
      // Add click handler for edit button
      editButton.addEventListener('click', function() {
        // Show a simple prompt to get image URL
        const url = prompt('Enter the URL of your logo image:', CUSTOM_LOGO.imageUrl || '');
        if (url) {
          CUSTOM_LOGO.enabled = true;
          CUSTOM_LOGO.imageUrl = url;
          applyCustomLogo();
        }
      });
    }
  });
  
  /**
   * Apply the custom logo to the page
   */
  function applyCustomLogo() {
    const wrapper = document.getElementById('custom-logo-wrapper');
    const defaultLogo = document.getElementById('default-logo');
    
    if (!wrapper) return;
    
    // Create the image element
    const img = document.createElement('img');
    img.src = CUSTOM_LOGO.imageUrl;
    img.alt = CUSTOM_LOGO.altText || 'Company Logo';
    img.classList.add('custom-logo');
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.objectFit = 'contain';
    
    if (CUSTOM_LOGO.width) img.style.width = CUSTOM_LOGO.width;
    if (CUSTOM_LOGO.height) img.style.height = CUSTOM_LOGO.height;
    
    // Replace default logo with custom image
    if (defaultLogo) {
      defaultLogo.style.display = 'none';
    }
    
    // Clear any existing custom logo
    const existingLogo = wrapper.querySelector('.custom-logo');
    if (existingLogo) {
      wrapper.removeChild(existingLogo);
    }
    
    // Add the new logo
    wrapper.appendChild(img);
    
    // Save to localStorage for persistence
    try {
      localStorage.setItem('earwormCustomLogo', JSON.stringify(CUSTOM_LOGO));
    } catch (error) {
      console.error('Error saving custom logo settings:', error);
    }
  }
  
  /**
   * Load saved logo settings from localStorage
   */
  function loadSavedLogoSettings() {
    try {
      const savedSettings = localStorage.getItem('earwormCustomLogo');
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        // Update the global settings
        CUSTOM_LOGO.enabled = parsedSettings.enabled;
        CUSTOM_LOGO.imageUrl = parsedSettings.imageUrl;
        CUSTOM_LOGO.altText = parsedSettings.altText;
        CUSTOM_LOGO.width = parsedSettings.width;
        CUSTOM_LOGO.height = parsedSettings.height;
        
        // Apply if enabled
        if (CUSTOM_LOGO.enabled && CUSTOM_LOGO.imageUrl) {
          applyCustomLogo();
        }
      }
    } catch (error) {
      console.error('Error loading saved logo settings:', error);
    }
  }
  
  // Load saved settings on init
  loadSavedLogoSettings();
})();
