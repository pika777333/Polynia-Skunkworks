/**
 * ApiService.js - Updated version with proper initialization and globally exposed interface
 */
const ApiService = (function() {
    // Configuration
    const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/pj83qpi1fbz2eo7jhe0x3c317b8vuhta';
    
    // Set to false for development (use mock data) or true for production
    const USE_PRODUCTION_API = false; // Using mock data for testing
    
    /**
     * Initialize the API service
     */
    function initialize() {
        console.log('API Service initialized');
    }
    
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
            
            // Get profile data from localStorage
            let profileData = {};
            try {
                const savedData = localStorage.getItem('earwormProfileData');
                if (savedData) {
                    profileData = JSON.parse(savedData);
                }
            } catch (error) {
                console.warn('Error loading profile data:', error);
                // Continue with empty profile data if there's an error
            }
            
            // Create form data with the audio blob and profile data
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.webm');
            
            // Add profile data as JSON string
            formData.append('profileData', JSON.stringify(profileData));
            
            // Use real API in production mode, mock data in development
            if (USE_PRODUCTION_API) {
                console.log('Making real API call to Make.com webhook with profile data');
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
                console.log('Using mock API response for development (with profile data)');
                
                // Simulate API delay
                setTimeout(() => {
                    resolve(getMockAnalysisData(profileData));
                }, 1500);
            }
        });
    }
    
    /**
     * Generate mock analysis data for development/demo
     * @param {Object} profileData - The user's profile data
     * @returns {Object} Mock analysis data
     */
    function getMockAnalysisData(profileData = {}) {
        // Use profile data to enhance the mock analysis
        
        // Extract product lines for use in topic distribution
        const productLines = profileData.productLines || ['CRM Software', 'Data Analytics', 'Cloud Storage'];
        
        // Extract pain points for pain point analysis
        const painPoints = profileData.commonPainPoints || ['Implementation time', 'Cost concerns', 'Technical support'];
        
        // Parse budget range for budget estimation
        let budgetMin = 25000;
        let budgetMax = 100000;
        let budgetTarget = 35000;
        
        // Try to parse budget range from profile
        if (profileData.typicalBudget) {
            const budgetMatch = profileData.typicalBudget.match(/\$(\d+,?\d*)\s*-\s*\$(\d+,?\d*)/);
            if (budgetMatch) {
                budgetMin = parseInt(budgetMatch[1].replace(/,/g, ''), 10);
                budgetMax = parseInt(budgetMatch[2].replace(/,/g, ''), 10);
                budgetTarget = Math.round((budgetMin + budgetMax) / 2);
            }
        }
        
        // Generate industry-specific transcript based on profile
        const industry = profileData.industry || 'Software';
        
        return {
            transcript: [
                {
                    speaker: "Salesperson",
                    text: `Hello there! Thanks for stopping by our ${industry} solutions center today. I understand you're interested in our new offerings?`,
                    timestamp: 1000,
                    sentiment: 0.7
                },
                {
                    speaker: "Customer",
                    text: `Yes, I've been looking for ${productLines[0] || 'software'} with good reliability. My current system is getting outdated and I need something better for my team.`,
                    timestamp: 8000,
                    sentiment: 0.2
                },
                {
                    speaker: "Salesperson",
                    text: "I completely understand. Reliability is definitely important, especially when it comes to business-critical systems. We have several solutions that would be perfect for you. Can I ask what features are most important to you?",
                    timestamp: 15000,
                    sentiment: 0.8
                },
                {
                    speaker: "Customer",
                    text: `${painPoints[0] || 'Performance'} is my top priority. I also need good scalability, and I'm concerned about the ${painPoints[1] || 'costs'}. My budget is somewhat limited.`,
                    timestamp: 24000,
                    sentiment: -0.1
                },
                {
                    speaker: "Salesperson",
                    text: `Those are all great considerations. Our ${productLines[0] || 'premium solution'} has excellent reliability and performance metrics. It also comes with advanced features standard. Would you like to look at that one first?`,
                    timestamp: 32000,
                    sentiment: 0.9
                },
                {
                    speaker: "Customer",
                    text: `That sounds promising. What's the price range on that model? I'm trying to keep it under ${budgetMax / 1000}k if possible.`,
                    timestamp: 42000,
                    sentiment: 0.3
                },
                {
                    speaker: "Salesperson",
                    text: `The ${productLines[0] || 'premium solution'} starts at $${Math.round(budgetMin * 0.9).toLocaleString()} for the base package, which includes all those features I mentioned. With a few upgrades, like the advanced analytics or premium support, it would be around $${Math.round(budgetTarget).toLocaleString()}. We do have some financing options that can help keep the monthly payments within your budget.`,
                    timestamp: 50000,
                    sentiment: 0.6
                },
                {
                    speaker: "Customer",
                    text: "That's a bit more than I wanted to spend. Are there any current promotions or less expensive options that still have good reliability?",
                    timestamp: 62000,
                    sentiment: -0.4
                },
                {
                    speaker: "Salesperson",
                    text: `I understand your concern about the price. We actually have a promotional offer this month that includes discounted implementation and $${Math.round(budgetMin * 0.1).toLocaleString()} in service credits on the ${productLines[0] || 'premium solution'}. Also, the ${productLines[1] || 'standard solution'} is priced at $${Math.round(budgetMin * 0.8).toLocaleString()} and has many of the same features, just with slightly fewer advanced capabilities.`,
                    timestamp: 72000,
                    sentiment: 0.7
                },
                {
                    speaker: "Customer",
                    text: `The ${productLines[1] || 'standard solution'} might be more in my range. How's the reliability on that one? My current system has been having a lot of issues with ${painPoints[2] || 'downtime'} and I can't afford constant problems.`,
                    timestamp: 84000,
                    sentiment: -0.2
                },
                {
                    speaker: "Salesperson",
                    text: `The ${productLines[1] || 'standard solution'} has excellent reliability ratings. According to our customer satisfaction surveys, it's actually ranked in the top three for ${industry} solutions in terms of uptime and stability. It comes with a comprehensive service level agreement, and our support team has special maintenance packages that can save you money long-term.`,
                    timestamp: 94000,
                    sentiment: 0.8
                },
                {
                    speaker: "Customer",
                    text: "That warranty sounds good. I think I'd like to see a demo of the standard solution then, and maybe discuss implementation timelines if you have that information available?",
                    timestamp: 106000,
                    sentiment: 0.5
                }
            ],
            sentimentTrajectory: [
                { time: 1000, salesperson: 0.7, customer: 0.0 },
                { time: 8000, salesperson: 0.7, customer: 0.2 },
                { time: 15000, salesperson: 0.8, customer: 0.2 },
                { time: 24000, salesperson: 0.8, customer: -0.1 },
                { time: 32000, salesperson: 0.9, customer: -0.1 },
                { time: 42000, salesperson: 0.9, customer: 0.3 },
                { time: 50000, salesperson: 0.6, customer: 0.3 },
                { time: 62000, salesperson: 0.6, customer: -0.4 },
                { time: 72000, salesperson: 0.7, customer: -0.4 },
                { time: 84000, salesperson: 0.7, customer: -0.2 },
                { time: 94000, salesperson: 0.8, customer: -0.2 },
                { time: 106000, salesperson: 0.8, customer: 0.5 }
            ],
            topicDistribution: [
                { name: productLines[0] || "Premium Solution", value: 32 },
                { name: "Pricing", value: 26 },
                { name: "Reliability", value: 20 },
                { name: productLines[1] || "Standard Solution", value: 12 },
                { name: "Support Options", value: 10 }
            ],
            painPoints: [
                { category: painPoints[0] || "Budget Constraints", score: 8 },
                { category: painPoints[1] || "Reliability Concerns", score: 6 },
                { category: "Implementation Timeline", score: 5 },
                { category: painPoints[2] || "Support Requirements", score: 4 }
            ],
            budgetEstimation: {
                min: budgetMin,
                max: budgetMax,
                target: budgetTarget,
                current: Math.round(budgetMin * 0.8)
            },
            keyInsights: [
                `Customer is primarily concerned with ${painPoints[0] || 'reliability'} and has had issues with their current system.`,
                `Budget is a significant constraint, with a maximum of around $${(budgetMax / 1000).toFixed(0)}k.`,
                `The ${productLines[1] || 'standard solution'} at $${Math.round(budgetMin * 0.8).toLocaleString()} seems to meet the customer's needs and budget constraints.`,
                `Customer responded positively to the service level agreement and became more engaged.`,
                `Customer shows interest in implementation timeline, suggesting they are getting closer to making a decision.`,
                `${industry} specifics appear to be important to the customer's decision-making process.`,
                `Customer is receptive to a demo, showing increased interest and engagement.`
            ]
        };
    }
    
    // Public API
    return {
        initialize,
        processAudio
    };
})();

// Make sure ApiService is globally accessible
window.ApiService = ApiService;

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    if (ApiService && typeof ApiService.initialize === 'function') {
        ApiService.initialize();
        console.log('ApiService globally available');
    }
});
