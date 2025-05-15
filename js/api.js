/**
 * api.js - API interaction service
 * Handles communication with the Make.com webhook
 */

const ApiService = (function() {
    // Configuration
    const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/pj83qpi1fbz2eo7jhe0x3c317b8vuhta';
    
    // Set to false for development (use mock data) or true for production
    const USE_PRODUCTION_API = true;
    
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
                {
                    speaker: "Customer",
                    text: "Yes, I've been looking for a mid-size SUV with good fuel efficiency. My current car is getting old and I need something reliable for my family.",
                    timestamp: 8000,
                    sentiment: 0.2
                },
                {
                    speaker: "Salesperson",
                    text: "I completely understand. Reliability is definitely important, especially when it comes to family vehicles. We have several models that would be perfect for you. Can I ask what features are most important to you?",
                    timestamp: 15000,
                    sentiment: 0.8
                },
                {
                    speaker: "Customer",
                    text: "Safety is my top priority. I also need good cargo space, and I'm concerned about the fuel costs. My budget is somewhat limited.",
                    timestamp: 24000,
                    sentiment: -0.1
                },
                {
                    speaker: "Salesperson",
                    text: "Those are all great considerations. Our XC model has a 5-star safety rating and excellent fuel economy for its class. It also comes with advanced driver assistance features standard. Would you like to look at that one first?",
                    timestamp: 32000,
                    sentiment: 0.9
                },
                {
                    speaker: "Customer",
                    text: "That sounds promising. What's the price range on that model? I'm trying to keep it under $35,000 if possible.",
                    timestamp: 42000,
                    sentiment: 0.3
                },
                {
                    speaker: "Salesperson",
                    text: "The XC starts at $32,500 for the base model, which includes all those safety features I mentioned. With a few upgrades, like the premium sound system or leather seats, it would be around $36,000. We do have some financing options that can help keep the monthly payments within your budget.",
                    timestamp: 50000,
                    sentiment: 0.6
                },
                {
                    speaker: "Customer",
                    text: "That's a bit more than I wanted to spend. Are there any current promotions or less expensive models that still have good safety ratings?",
                    timestamp: 62000,
                    sentiment: -0.4
                },
                {
                    speaker: "Salesperson",
                    text: "I understand your concern about the price. We actually have a promotional offer this month that includes 0.9% financing and $1,500 cash back on the XC model. Also, the LX model is priced at $29,800 and has many of the same safety features, just with a slightly smaller engine.",
                    timestamp: 72000,
                    sentiment: 0.7
                },
                {
                    speaker: "Customer",
                    text: "The LX might be more in my range. How's the reliability on that one? My current car has been having a lot of issues and I can't afford constant repairs.",
                    timestamp: 84000,
                    sentiment: -0.2
                },
                {
                    speaker: "Salesperson",
                    text: "The LX has excellent reliability ratings. According to consumer reports, it's actually ranked in the top three for mid-size SUVs in terms of dependability. It comes with a 5-year/60,000-mile warranty, and our service department has special maintenance packages that can save you money long-term.",
                    timestamp: 94000,
                    sentiment: 0.8
                },
                {
                    speaker: "Customer",
                    text: "That warranty sounds good. I think I'd like to take a look at the LX then, and maybe test drive it if you have one available?",
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
                { name: "Safety Features", value: 32 },
                { name: "Pricing", value: 26 },
                { name: "Reliability", value: 18 },
                { name: "Fuel Economy", value: 14 },
                { name: "Financing", value: 10 }
            ],
            painPoints: [
                { category: "Budget Constraints", score: 8 },
                { category: "Reliability Concerns", score: 6 },
                { category: "Fuel Costs", score: 5 },
                { category: "Safety Requirements", score: 4 }
            ],
            budgetEstimation: {
                min: 28000,
                max: 36000,
                target: 32000,
                current: 29800
            },
            keyInsights: [
                "Customer is primarily concerned with vehicle reliability and has had issues with current car.",
                "Budget is a significant constraint, with a maximum of around $35,000.",
                "Safety features are the highest priority for the customer's family needs.",
                "Customer responded positively to the warranty information and became more engaged.",
                "The LX model at $29,800 seems to meet the customer's needs and budget constraints.",
                "Fuel efficiency is important but secondary to reliability and safety.",
                "Customer is receptive to a test drive, showing increased interest and engagement."
            ]
        };
    }
    
    // Public API
    return {
        processAudio
    };
})();
