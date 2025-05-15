/**
 * api.js - API interaction service
 * Handles communication with the Make.com webhook
 */

const ApiService = (function() {
    // Configuration
    const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/pj83qpi1fbz2eo7jhe0x3c317b8vuhta';
    
    // Set to true to use real API calls instead of mock data
    const USE_PRODUCTION_API = true; // Change this to true for production
    
    /**
     * Process audio data through the Make.com webhook
     * @param {Blob} audioBlob - The recorded audio blob
     * @returns {Promise} A promise that resolves with the analysis data
     */
    function processAudio(audioBlob) {
        return new Promise((resolve, reject) => {
            if (!audioBlob) {
                reject(new Error('No recording available. Please record a conversation first.'));
                return;
            }
            
            // Create form data with the audio blob
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.webm');
            
            // Use real API in production mode, mock data in development
            if (USE_PRODUCTION_API) {
                console.log('Making real API call to Make.com webhook');
                fetch(MAKE_WEBHOOK_URL, {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => reject(error));
            } else {
                // For demo purposes, simulate API delay and return mock data
                console.log('Using mock API response for development');
                setTimeout(() => {
                    resolve(getMockAnalysisData());
                }, 3000);
            }
        });
    }
    
    /**
     * Generate mock analysis data for development/demo
     * @returns {Object} Mock analysis data
     */
    function getMockAnalysisData() {
        return {
            transcript: [
                {
                    speaker: "Salesperson",
                    text: "Hello there! Thanks for stopping by our dealership today. I understand you're interested in our new SUV models?",
                    timestamp: 1000,
                    sentiment: 0.7
                },
                // Rest of the mock data...
            ],
            // Other data properties...
        };
    }
    
    // Public API
    return {
        processAudio
    };
})();
