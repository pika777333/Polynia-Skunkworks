/**
 * api.js - API interaction service
 * Handles communication with the Make.com webhook
 */

const ApiService = (function() {
    // Configuration
    const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/pj83qpi1fbz2eo7jhe0x3c317b8vuhta';
    
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
            
            // In production, we would use this fetch request
            // For demo/development, we'll use the mock implementation below
            if (process.env.NODE_ENV === 'production') {
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
                    text: "Yes, I'm looking for something that's good for a family of four with decent cargo space, but I'm really concerned about the safety features and reliability.",
                    timestamp: 8000,
                    sentiment: 0.2
                },
                {
                    speaker: "Salesperson",
                    text: "Safety is definitely a priority for family vehicles. Our SUV line has earned top safety ratings across the board. The XC model in particular has advanced driver assistance, automatic emergency braking, and a 360-degree camera system.",
                    timestamp: 18000,
                    sentiment: 0.8
                },
                {
                    speaker: "Customer",
                    text: "That sounds promising. What about fuel efficiency? Gas prices are really getting high, and I have a pretty long commute to work.",
                    timestamp: 30000,
                    sentiment: 0.4
                },
                {
                    speaker: "Salesperson",
                    text: "Great question. The XC model gets about 28 MPG combined city/highway, which is excellent for its class. We also have a hybrid option that pushes that up to 38 MPG if fuel efficiency is a top priority for you.",
                    timestamp: 40000,
                    sentiment: 0.7
                },
                {
                    speaker: "Customer",
                    text: "The hybrid sounds interesting, but I'm worried about the price. What's the difference in cost between the standard and hybrid models?",
                    timestamp: 52000,
                    sentiment: -0.2
                },
                {
                    speaker: "Salesperson",
                    text: "The hybrid is about $4,000 more than the standard model, but it qualifies for a $2,500 tax credit. Plus, you'll save approximately $800-$1,000 per year on fuel costs based on your commute, so the break-even point is pretty quick.",
                    timestamp: 64000,
                    sentiment: 0.6
                },
                {
                    speaker: "Customer",
                    text: "That's not as bad as I thought. What about warranty coverage? I had issues with my last vehicle that weren't covered.",
                    timestamp: 78000,
                    sentiment: 0.3
                },
                {
                    speaker: "Salesperson",
                    text: "We offer a comprehensive 5-year/60,000-mile bumper-to-bumper warranty, and the hybrid components are covered for 10 years/100,000 miles. We also include 3 years of free maintenance for oil changes and routine service.",
                    timestamp: 88000,
                    sentiment: 0.9
                },
                {
                    speaker: "Customer",
                    text: "That's reassuring. I think I'd like to see the hybrid model. What colors do you have available? And would it be possible to take it for a test drive today?",
                    timestamp: 100000,
                    sentiment: 0.8
                }
            ],
            sentimentTrajectory: [
                { time: 1000, salesperson: 0.7, customer: 0.5 },
                { time: 10000, salesperson: 0.7, customer: 0.2 },
                { time: 20000, salesperson: 0.8, customer: 0.3 },
                { time: 30000, salesperson: 0.8, customer: 0.4 },
                { time: 40000, salesperson: 0.7, customer: 0.4 },
                { time: 50000, salesperson: 0.7, customer: -0.2 },
                { time: 60000, salesperson: 0.6, customer: -0.1 },
                { time: 70000, salesperson: 0.7, customer: 0.2 },
                { time: 80000, salesperson: 0.8, customer: 0.3 },
                { time: 90000, salesperson: 0.9, customer: 0.6 },
                { time: 100000, salesperson: 0.9, customer: 0.8 }
            ],
            topicDistribution: [
                { name: "Safety Features", value: 25 },
                { name: "Fuel Efficiency", value: 20 },
                { name: "Price/Budget", value: 30 },
                { name: "Warranty", value: 15 },
                { name: "Performance", value: 10 }
            ],
            painPoints: [
                { category: "Cost Concerns", score: 8 },
                { category: "Previous Bad Experience", score: 7 },
                { category: "Fuel Economy", score: 6 },
                { category: "Safety Worries", score: 5 }
            ],
            budgetEstimation: {
                min: 35000,
                max: 45000,
                target: 40000,
                current: 38000
            },
            keyInsights: [
                "Customer is budget-conscious but willing to invest in the right vehicle with proper justification",
                "Previous negative warranty experience is a significant concern that was addressed successfully",
                "Safety features are a major priority due to family considerations",
                "Fuel efficiency is important because of customer's long commute",
                "Customer's sentiment improved significantly when warranty details were explained",
                "There's high interest in the hybrid model if the ROI makes sense"
            ]
        };
    }
    
    // Public API
    return {
        processAudio
    };
})();
