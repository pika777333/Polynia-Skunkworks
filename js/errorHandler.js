// errorHandler.js
// Error severity levels
export const ErrorSeverity = {
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical'
};

// Error categories for grouping
export const ErrorCategory = {
    AUDIO: 'audio',
    NETWORK: 'network',
    PROFILE: 'profile',
    CHART: 'chart',
    UI: 'ui',
    ROUTER: 'router',
    UNKNOWN: 'unknown'
};

// Map common errors to user-friendly messages
const errorMessages = {
    // Audio errors
    'NotAllowedError': 'Microphone access was denied. Please allow microphone access to use this feature.',
    'NotFoundError': 'No microphone found. Please connect a microphone and try again.',
    'NotReadableError': 'Could not access your microphone. It may be in use by another application.',
    
    // Network errors
    'NetworkError': 'Network connection issue. Please check your internet connection.',
    'TimeoutError': 'Request timed out. Server may be busy, please try again.',
    'ServerError': 'Server error occurred. Our team has been notified.',
    
    // Profile errors
    'ProfileLoadError': 'Could not load your profile data.',
    'ProfileSaveError': 'Failed to save profile changes.'
};

/**
 * Get appropriate category for an error
 * @param {Error} error - The error object
 * @param {string} context - Optional context hint
 * @returns {string} Error category
 */
function categorizeError(error, context = '') {
    // Audio-related errors
    if (error.name === 'NotAllowedError' || 
        error.name === 'NotFoundError' || 
        error.name === 'NotReadableError' ||
        context.includes('audio') || 
        context.includes('microphone') ||
        context.includes('recording')) {
        return ErrorCategory.AUDIO;
    }
    
    // Network-related errors
    if (error.name === 'NetworkError' || 
        error.message.includes('network') ||
        error.message.includes('fetch') ||
        error.message.includes('http') ||
        context.includes('api') ||
        context.includes('request')) {
        return ErrorCategory.NETWORK;
    }
    
    // Profile-related errors
    if (context.includes('profile') || 
        error.message.includes('profile')) {
        return ErrorCategory.PROFILE;
    }
    
    // Chart-related errors
    if (context.includes('chart') || 
        error.message.includes('chart')) {
        return ErrorCategory.CHART;
    }
    
    // UI-related errors
    if (context.includes('ui') || 
        context.includes('dom') ||
        context.includes('element')) {
        return ErrorCategory.UI;
    }
    
    // Router-related errors
    if (context.includes('router') || 
        context.includes('navigation')) {
        return ErrorCategory.ROUTER;
    }
    
    return ErrorCategory.UNKNOWN;
}

/**
 * Get user-friendly message for an error
 * @param {Error} error - The error object
 * @param {string} category - Error category
 * @returns {string} User-friendly message
 */
function getUserMessage(error, category) {
    // Check for known error types first
    if (errorMessages[error.name]) {
        return errorMessages[error.name];
    }
    
    // Generic messages based on category
    const categoryMessages = {
        [ErrorCategory.AUDIO]: 'There was an issue with your microphone.',
        [ErrorCategory.NETWORK]: 'There was a connection issue.',
        [ErrorCategory.PROFILE]: 'There was an issue with your profile data.',
        [ErrorCategory.CHART]: 'There was an issue displaying the chart.',
        [ErrorCategory.UI]: 'There was an issue with the user interface.',
        [ErrorCategory.ROUTER]: 'There was an issue navigating to the page.',
        [ErrorCategory.UNKNOWN]: 'An unexpected error occurred.'
    };
    
    return categoryMessages[category];
}

/**
 * Handle an error and display user-friendly message
 * @param {Error} error - The error object
 * @param {Object} options - Handler options
 * @returns {Object} Processed error info
 */
export function handleError(error, options = {}) {
    const { 
        context = '',
        severity = ErrorSeverity.ERROR,
        silent = false,
        userId = ''
    } = options;
    
    // Categorize the error
    const category = categorizeError(error, context);
    
    // Get user-friendly message
    const userMessage = getUserMessage(error, category);
    
    // Log the error (always)
    console.error(`[${severity.toUpperCase()}][${category}] ${context}:`, error);
    
    // Format error for return
    const errorInfo = {
        originalError: error,
        message: userMessage,
        technical: error.message,
        category,
        severity,
        context,
        timestamp: new Date().toISOString(),
        userId
    };
    
    // Display to user if UI.showToast is available and not silent
    if (!silent && typeof UI !== 'undefined' && UI.showToast) {
        UI.showToast(userMessage, severity === ErrorSeverity.INFO ? 'info' : 'error');
    }
    
    // In a real app, you might send this to a logging service
    // logErrorToService(errorInfo);
    
    return errorInfo;
}

// For backward compatibility
window.ErrorHandler = { handleError, ErrorSeverity, ErrorCategory };
