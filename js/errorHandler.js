// errorHandler.js - FIXED VERSION
// Error severity levels
const ErrorSeverity = {
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical'
};

// Error categories for grouping
const ErrorCategory = {
    AUDIO: 'audio',
    NETWORK: 'network',
    PROFILE: 'profile',
    CHART: 'chart',
    UI: 'ui',
    ROUTER: 'router',
    UNKNOWN: 'unknown'
};

/**
 * Handle an error and display user-friendly message
 * @param {Error} error - The error object
 * @param {Object} options - Handler options
 * @returns {Object} Processed error info
 */
function handleError(error, options = {}) {
    const { 
        context = '',
        severity = ErrorSeverity.ERROR,
        silent = false
    } = options;
    
    // Log the error (always)
    console.error(`[${severity.toUpperCase()}][${context}]:`, error);
    
    // Display to user if UI.showToast is available and not silent
    if (!silent && typeof window.UI !== 'undefined' && window.UI.showToast) {
        window.UI.showToast(error.message || 'An error occurred', 'error');
    }
    
    return {
        originalError: error,
        message: error.message,
        context,
        severity,
        timestamp: new Date().toISOString()
    };
}

// Expose to window for non-module scripts - REPLACE THE EXPORT STATEMENT
window.ErrorHandler = { 
    handleError, 
    ErrorSeverity,
    ErrorCategory
};

// Remove the export statement that was causing the error
