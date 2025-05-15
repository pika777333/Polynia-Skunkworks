/**
 * app.js - Main application initialization
 */

document.addEventListener('DOMContentLoaded', initializeApp);

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('Initializing Earworm application...');
    
    try {
        // Initialize UI first so we can display loading states
        if (window.UI) {
            window.UI.initialize();
        } else {
            console.error("UI module not found");
            return;
        }
        
        // Check for ApiService and initialize if not already done
        if (!window.ApiService) {
            console.error("ApiService module not found - creating fallback");
            createFallbackApiService();
        }
        
        // Initialize router if available
        if (window.Router) {
            window.Router.initialize();
            
            // Register view callbacks
            window.Router.registerViewCallback('metrics', () => {
                if (typeof window.MetricsView !== 'undefined') {
                    window.MetricsView.initialize();
                }
            });
            
            // Register user view callback
            window.Router.registerViewCallback('user', () => {
                // Initialize the React component for user profile
                if (typeof window.initializeReactComponent === 'function') {
                    window.initializeReactComponent('userView', window.UserProfile);
                }
            });
        } else {
            console.warn("Router module not found - navigation may not work");
        }
        
        // Initialize core components with availability checks
        if (window.ChartManager && typeof window.ChartManager.initialize === 'function') {
            window.ChartManager.initialize();
        } else {
            console.warn("ChartManager not found - charts may not display");
        }
        
        if (!window.AudioRecorder) {
            console.error("AudioRecorder module not found - creating fallback");
            createFallbackAudioRecorder();
        }
        
        if (window.AudioVisualizer && typeof window.AudioVisualizer.initialize === 'function') {
            window.AudioVisualizer.initialize();
        }
        
        // Setup event listeners
        setupEventListeners();
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
        alert('Error initializing application. Check console for details.');
    }
}

/**
 * Set up all event listeners for the application
 */
function setupEventListeners() {
    console.log("Setting up event listeners...");
    
    // Record button click handler
    const recordButton = document.getElementById('recordButton');
    if (recordButton) {
        recordButton.addEventListener('click', handleRecordButtonClick);
        console.log('Record button event listener attached');
    } else {
        console.error('Record button not found');
    }
    
    // Process button click handler
    const processButton = document.getElementById('processButton');
    if (processButton) {
        processButton.addEventListener('click', handleProcessButtonClick);
        console.log('Process button event listener attached');
    } else {
        console.error('Process button not found');
    }
    
    // Nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            if (window.Router && window.Router.navigateTo) {
                window.Router.navigateTo(target);
            }
        });
    });
}

/**
 * Create a fallback API Service if the real one is missing
 */
function createFallbackApiService() {
    window.ApiService = {
        processAudio: function(audioBlob) {
            return new Promise((resolve) => {
                console.log("Using fallback API Service with mock data");
                setTimeout(() => {
                    resolve({
                        transcript: [
                            {
                                speaker: "Salesperson",
                                text: "Hello there! Thanks for stopping by our software solutions center today. I understand you're interested in our new offerings?",
                                timestamp: 1000,
                                sentiment: 0.7
                            },
                            {
                                speaker: "Customer",
                                text: "Yes, I've been looking for software with good reliability. My current system is getting outdated.",
                                timestamp: 8000,
                                sentiment: 0.2
                            }
                        ],
                        sentimentTrajectory: [
                            { time: 1000, salesperson: 0.7, customer: 0.0 },
                            { time: 8000, salesperson: 0.7, customer: 0.2 }
                        ],
                        topicDistribution: [
                            { name: "Premium Solution", value: 32 },
                            { name: "Pricing", value: 26 },
                            { name: "Reliability", value: 20 },
                            { name: "Standard Solution", value: 12 },
                            { name: "Support Options", value: 10 }
                        ],
                        painPoints: [
                            { category: "Budget Constraints", score: 8 },
                            { category: "Reliability Concerns", score: 6 },
                            { category: "Implementation Timeline", score: 5 },
                            { category: "Support Requirements", score: 4 }
                        ],
                        budgetEstimation: {
                            min: 25000,
                            max: 100000,
                            target: 35000,
                            current: 20000
                        },
                        keyInsights: [
                            "Customer is primarily concerned with reliability and has had issues with their current system.",
                            "Budget is a significant constraint, with a maximum of around $100k.",
                            "The standard solution at $20,000 seems to meet the customer's needs and budget constraints.",
                            "Customer responded positively to the service level agreement and became more engaged.",
                            "Customer shows interest in implementation timeline, suggesting they are getting closer to making a decision."
                        ]
                    });
                }, 1500);
            });
        }
    };
    console.log("Fallback ApiService created");
}

/**
 * Create a fallback Audio Recorder if the real one is missing
 */
function createFallbackAudioRecorder() {
    window.AudioRecorder = {
        isRecording: () => false,
        startRecording: function() {
            console.log("Using fallback recording (mock)");
            return Promise.resolve();
        },
        stopRecording: function() {
            console.log("Using fallback stop recording (mock)");
            return Promise.resolve();
        },
        getAudioBlob: function() {
            return new Blob([], { type: 'audio/webm' });
        }
    };
    console.log("Fallback AudioRecorder created");
}

/**
 * Handle record button click
 */
async function handleRecordButtonClick() {
    console.log('Record button clicked');
    
    if (!window.AudioRecorder) {
        console.error('AudioRecorder not available');
        alert('Audio recording is not available in your browser.');
        return;
    }
    
    // Check if currently recording
    if (window.AudioRecorder.isRecording()) {
        try {
            // Stop recording
            await window.AudioRecorder.stopRecording();
            
            // Update UI
            if (window.UI && window.UI.updateUIAfterRecordingStopped) {
                window.UI.updateUIAfterRecordingStopped();
            } else {
                // Basic fallback UI update
                const recordButton = document.getElementById('recordButton');
                if (recordButton) {
                    recordButton.innerHTML = `
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                        </svg>
                        Start New Recording
                    `;
                }
                
                // Enable process button
                const processButton = document.getElementById('processButton');
                if (processButton) {
                    processButton.disabled = false;
                    processButton.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-gray-400');
                    processButton.classList.add('earworm-gradient');
                }
            }
            
            console.log('Recording stopped');
        } catch (error) {
            console.error('Error stopping recording:', error);
            alert('Error stopping recording: ' + (error.message || 'Unknown error'));
        }
    } else {
        try {
            // Start recording
            await window.AudioRecorder.startRecording();
            
            // Update UI
            if (window.UI && window.UI.updateUIAfterRecordingStarted) {
                window.UI.updateUIAfterRecordingStarted();
            } else {
                // Basic fallback UI update
                const recordButton = document.getElementById('recordButton');
                if (recordButton) {
                    recordButton.innerHTML = `
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
                        </svg>
                        Stop Recording
                    `;
                }
                
                // Show recording status
                const recordingStatus = document.getElementById('recordingStatus');
                if (recordingStatus) {
                    recordingStatus.classList.remove('hidden');
                    recordingStatus.classList.add('flex');
                }
            }
            
            console.log('Recording started');
        } catch (error) {
            console.error('Error starting recording:', error);
            alert('Error starting recording: ' + (error.message || 'Microphone access may be blocked'));
        }
    }
}

/**
 * Handle process button click
 */
async function handleProcessButtonClick() {
    console.log('Process button clicked');
    
    if (!window.ApiService || typeof window.ApiService.processAudio !== 'function') {
        console.error('ApiService not available');
        alert('Analysis service is not available.');
        return;
    }
    
    // Check if there's audio to process
    const audioBlob = window.AudioRecorder ? window.AudioRecorder.getAudioBlob() : null;
    
    if (!audioBlob) {
        alert('No recording available. Please record a conversation first.');
        return;
    }
    
    // Update UI to show processing state
    if (window.UI && window.UI.updateUIBeforeProcessing) {
        window.UI.updateUIBeforeProcessing();
    } else {
        // Basic fallback UI update
        const processingStatus = document.getElementById('processingStatus');
        if (processingStatus) {
            processingStatus.classList.remove('hidden');
            processingStatus.classList.add('flex');
        }
        
        // Disable process button
        const processButton = document.getElementById('processButton');
        if (processButton) {
            processButton.disabled = true;
            processButton.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
    
    try {
        // Process the audio through the API
        const analysisData = await window.ApiService.processAudio(audioBlob);
        
        // Update charts and UI with the analysis data
        updateAnalysisResults(analysisData);
        
        // Update UI to show completed state
        if (window.UI && window.UI.updateUIAfterProcessing) {
            window.UI.updateUIAfterProcessing();
        } else {
            // Basic fallback UI update
            const processingStatus = document.getElementById('processingStatus');
            if (processingStatus) {
                processingStatus.classList.add('hidden');
                processingStatus.classList.remove('flex');
            }
            
            // Re-enable process button
            const processButton = document.getElementById('processButton');
            if (processButton) {
                processButton.disabled = false;
                processButton.classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }
        
        console.log('Analysis completed');
    } catch (error) {
        console.error('Error processing audio:', error);
        
        if (window.UI && window.UI.updateUIAfterProcessingError) {
            window.UI.updateUIAfterProcessingError(error.message || 'Error processing audio');
        } else {
            // Basic fallback UI update
            const processingStatus = document.getElementById('processingStatus');
            if (processingStatus) {
                processingStatus.classList.add('hidden');
                processingStatus.classList.remove('flex');
            }
            
            // Re-enable process button
            const processButton = document.getElementById('processButton');
            if (processButton) {
                processButton.disabled = false;
                processButton.classList.remove('opacity-50', 'cursor-not-allowed');
            }
            
            // Show error message
            const transcript = document.getElementById('transcript');
            if (transcript) {
                transcript.innerHTML = `<p class="text-red-500">Error: ${error.message || 'Error processing audio'}</p>`;
            }
        }
        
        alert('Error analyzing recording: ' + (error.message || 'Unknown error'));
    }
}

/**
 * Update all charts and UI elements with analysis results
 * @param {Object} data - The analysis data
 */
function updateAnalysisResults(data) {
    if (!data) {
        console.error('No analysis data received');
        return;
    }
    
    try {
        // Update transcript
        const transcriptContainer = document.getElementById('transcript');
        if (transcriptContainer && data.transcript) {
            let transcriptHTML = '';
            data.transcript.forEach(entry => {
                transcriptHTML += `
                    <div class="mb-4">
                        <div class="font-semibold ${entry.speaker === 'Salesperson' ? 'earworm-primary-text' : 'text-green-600'} flex items-center">
                            ${entry.speaker === 'Salesperson' 
                                ? '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>'
                                : '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>'}
                            ${entry.speaker}
                        </div>
                        <div class="mt-1 text-gray-700">${entry.text}</div>
                    </div>
                `;
            });
            transcriptContainer.innerHTML = transcriptHTML;
        }
        
        // Update charts if available
        if (window.ChartManager) {
            // Update sentiment chart
            if (data.sentimentTrajectory && window.ChartManager.updateSentimentChart) {
                window.ChartManager.updateSentimentChart(data.sentimentTrajectory);
            }
            
            // Update topic distribution chart
            if (data.topicDistribution && window.ChartManager.updateTopicChart) {
                window.ChartManager.updateTopicChart(data.topicDistribution);
            }
            
            // Update pain points chart
            if (data.painPoints && window.ChartManager.updatePainPointsChart) {
                window.ChartManager.updatePainPointsChart(data.painPoints);
            }
        }
        
        // Update budget estimation
        if (data.budgetEstimation) {
            const budgetTarget = document.getElementById('budgetTarget');
            const budgetMin = document.getElementById('budgetMin');
            const budgetMax = document.getElementById('budgetMax');
            const budgetCurrent = document.getElementById('budgetCurrent');
            const budgetProgressBar = document.getElementById('budgetProgressBar');
            
            if (budgetTarget) budgetTarget.textContent = '$' + data.budgetEstimation.target.toLocaleString();
            if (budgetMin) budgetMin.textContent = '$' + data.budgetEstimation.min.toLocaleString();
            if (budgetMax) budgetMax.textContent = '$' + data.budgetEstimation.max.toLocaleString();
            if (budgetCurrent) budgetCurrent.textContent = 'Current: $' + data.budgetEstimation.current.toLocaleString();
            
            if (budgetProgressBar) {
                const percentage = ((data.budgetEstimation.current - data.budgetEstimation.min) / 
                                   (data.budgetEstimation.max - data.budgetEstimation.min)) * 100;
                budgetProgressBar.style.width = `${percentage}%`;
            }
        }
        
        // Update key insights
        if (data.keyInsights) {
            const keyInsights = document.getElementById('keyInsights');
            if (keyInsights) {
                let insightsHTML = '';
                data.keyInsights.forEach(insight => {
                    insightsHTML += `<li class="text-gray-700">${insight}</li>`;
                });
                keyInsights.innerHTML = insightsHTML;
            }
        }
    } catch (error) {
        console.error('Error updating analysis results:', error);
    }
}

// Expose these functions globally for HTML event handlers
window.handleRecordButtonClick = handleRecordButtonClick;
window.handleProcessButtonClick = handleProcessButtonClick;
