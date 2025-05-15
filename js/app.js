/**
 * app.js - PRODUCTION VERSION
 * Main application initialization and control
 */

document.addEventListener('DOMContentLoaded', initializeApp);

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('Initializing Earworm application in PRODUCTION mode...');
    
    try {
        // Initialize UI first so we can display loading states
        if (window.UI) {
            window.UI.initialize();
            console.log('UI module initialized');
        } else {
            console.error("UI module not found");
            alert("Critical error: UI module not found. Please refresh the page.");
            return;
        }
        
        // Initialize API Service
        if (window.ApiService) {
            window.ApiService.initialize();
            console.log('API Service initialized');
        } else {
            console.error("ApiService module not found - creating emergency fallback");
            createEmergencyApiService();
        }
        
        // Initialize router if available
        if (window.Router) {
            window.Router.initialize();
            console.log('Router initialized');
            
            // Register view callbacks
            window.Router.registerViewCallback('metrics', () => {
                if (typeof window.MetricsView !== 'undefined') {
                    window.MetricsView.initialize();
                }
            });
            
            // Register user view callback
            window.Router.registerViewCallback('user', () => {
                if (typeof window.initializeReactComponent === 'function') {
                    window.initializeReactComponent('userView', window.UserProfile);
                }
            });
        } else {
            console.warn("Router module not found - navigation may not work");
        }
        
        // Initialize core components with availability checks
        if (window.ChartManager) {
            window.ChartManager.initialize();
            console.log('Chart manager initialized');
        } else {
            console.error("ChartManager not found - charts will not display");
        }
        
        if (window.AudioRecorder) {
            window.AudioRecorder.initialize();
            console.log('Audio recorder initialized');
        } else {
            console.error("AudioRecorder module not found - creating emergency fallback");
            createEmergencyAudioRecorder();
        }
        
        if (window.AudioVisualizer) {
            window.AudioVisualizer.initialize();
            console.log('Audio visualizer initialized');
        } else {
            console.warn("AudioVisualizer not found - visualization will not be available");
        }
        
        // Setup event listeners
        setupEventListeners();
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Critical error during initialization:', error);
        alert('Error initializing application. Please refresh the page and try again.');
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
        // Remove any existing listeners to avoid duplicates
        const newButton = recordButton.cloneNode(true);
        recordButton.parentNode.replaceChild(newButton, recordButton);
        
        // Add new listener
        newButton.addEventListener('click', handleRecordButtonClick);
        console.log('Record button event listener attached');
    } else {
        console.error('Record button not found');
    }
    
    // Process button click handler
    const processButton = document.getElementById('processButton');
    if (processButton) {
        // Remove any existing listeners to avoid duplicates
        const newButton = processButton.cloneNode(true);
        processButton.parentNode.replaceChild(newButton, processButton);
        
        // Add new listener
        newButton.addEventListener('click', handleProcessButtonClick);
        console.log('Process button event listener attached');
    } else {
        console.error('Process button not found');
    }
    
    // Nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        // Remove any existing listeners to avoid duplicates
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Add new listener
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            if (window.Router && window.Router.navigateTo) {
                window.Router.navigateTo(target);
            }
        });
    });
    
    console.log("All event listeners set up successfully");
}

/**
 * Create an emergency API Service if the real one is missing
 */
function createEmergencyApiService() {
    window.ApiService = {
        initialize: function() {
            console.log("Emergency ApiService initialized");
        },
        processAudio: function(audioBlob) {
            return new Promise((resolve) => {
                console.log("Using emergency API Service with mock data");
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
    console.log("Emergency ApiService created");
}

/**
 * Create an emergency Audio Recorder if the real one is missing
 */
function createEmergencyAudioRecorder() {
    let mockRecording = false;
    let mockTimerInterval = null;
    let mockStartTime = 0;
    
    window.AudioRecorder = {
        initialize: function() {
            console.log("Emergency AudioRecorder initialized");
        },
        isRecording: function() {
            return mockRecording;
        },
        startRecording: function() {
            console.log("Using emergency recording (mock)");
            mockRecording = true;
            mockStartTime = Date.now();
            
            // Start mock timer
            mockTimerInterval = setInterval(() => {
                const elapsedSeconds = Math.floor((Date.now() - mockStartTime) / 1000);
                const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
                const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');
                const timeString = `${minutes}:${seconds}`;
                
                // Update time displays
                const timeElements = [
                    document.getElementById('recordingTime'),
                    document.getElementById('currentTime'),
                    document.getElementById('totalTime')
                ];
                
                timeElements.forEach(element => {
                    if (element) element.textContent = timeString;
                });
            }, 1000);
            
            return Promise.resolve();
        },
        stopRecording: function() {
            console.log("Using emergency stop recording (mock)");
            mockRecording = false;
            
            // Clear timer
            if (mockTimerInterval) {
                clearInterval(mockTimerInterval);
                mockTimerInterval = null;
            }
            
            return Promise.resolve();
        },
        getAudioBlob: function() {
            // Create an empty blob
            return new Blob([], { type: 'audio/webm' });
        }
    };
    console.log("Emergency AudioRecorder created");
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
                
                // Hide recording status
                const recordingStatus = document.getElementById('recordingStatus');
                if (recordingStatus) {
                    recordingStatus.classList.add('hidden');
                    recordingStatus.classList.remove('flex');
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
                
                // Show waveform
                const waveformContainer = document.getElementById('waveformContainer');
                if (waveformContainer) {
                    waveformContainer.classList.remove('hidden');
                    waveformContainer.classList.add('flex', 'flex-col');
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
        
        console.log('Analysis completed successfully');
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
        updateTranscript(data.transcript);
        
        // Initialize charts if they don't exist yet
        if (window.ChartManager) {
            // Update sentiment chart
            if (data.sentimentTrajectory) {
                window.ChartManager.updateSentimentChart(data.sentimentTrajectory);
            }
            
            // Update topic distribution chart
            if (data.topicDistribution) {
                window.ChartManager.updateTopicChart(data.topicDistribution);
            }
            
            // Update pain points chart
            if (data.painPoints) {
                window.ChartManager.updatePainPointsChart(data.painPoints);
            }
        } else {
            console.warn('ChartManager not available, skipping chart updates');
        }
        
        // Update budget estimation
        updateBudgetEstimation(data.budgetEstimation);
        
        // Update key insights
        updateKeyInsights(data.keyInsights);
    } catch (error) {
        console.error('Error updating analysis results:', error);
    }
}

/**
 * Update the transcript display
 * @param {Array} transcript - The transcript data
 */
function updateTranscript(transcript) {
    const transcriptContainer = document.getElementById('transcript');
    if (!transcriptContainer || !transcript || transcript.length === 0) return;
    
    try {
        let transcriptHTML = '';
        transcript.forEach(entry => {
            // Format timestamp
            const timestamp = entry.timestamp || 0;
            const seconds = Math.floor(timestamp / 1000);
            const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
            const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
            const timeString = `${minutes}:${remainingSeconds}`;
            
            transcriptHTML += `
                <div class="mb-4">
                    <div class="font-semibold ${entry.speaker === 'Salesperson' ? 'earworm-primary-text' : 'text-green-600'} flex items-center">
                        ${entry.speaker === 'Salesperson' 
                            ? '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>'
                            : '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>'}
                        ${entry.speaker} <span class="ml-2 text-gray-400 text-xs">(${timeString})</span>
                    </div>
                    <div class="mt-1 text-gray-700">${entry.text}</div>
                    <div class="mt-1 flex items-center">
                        <div class="text-xs mr-2">Sentiment:</div>
                        <div class="w-16 h-2 bg-gray-200 rounded-full">
                            <div class="h-2 rounded-full" style="width: ${(entry.sentiment + 1) * 50}%; background-color: ${getSentimentColor(entry.sentiment)};"></div>
                        </div>
                        <div class="text-xs ml-2" style="color: ${getSentimentColor(entry.sentiment)};">${getSentimentLabel(entry.sentiment)}</div>
                    </div>
                </div>
            `;
        });
        
        transcriptContainer.innerHTML = transcriptHTML;
    } catch (error) {
        console.error('Error updating transcript:', error);
    }
}

/**
 * Update the budget estimation display
 * @param {Object} budgetData - The budget estimation data
 */
function updateBudgetEstimation(budgetData) {
    if (!budgetData) return;
    
    try {
        const budgetTarget = document.getElementById('budgetTarget');
        const budgetMin = document.getElementById('budgetMin');
        const budgetMax = document.getElementById('budgetMax');
        const budgetCurrent = document.getElementById('budgetCurrent');
        const budgetProgressBar = document.getElementById('budgetProgressBar');
        
        if (budgetTarget) budgetTarget.textContent = '$' + budgetData.target.toLocaleString();
        if (budgetMin) budgetMin.textContent = '$' + budgetData.min.toLocaleString();
        if (budgetMax) budgetMax.textContent = '$' + budgetData.max.toLocaleString();
        if (budgetCurrent) budgetCurrent.textContent = 'Current: $' + budgetData.current.toLocaleString();
        
        if (budgetProgressBar) {
            const percentage = ((budgetData.current - budgetData.min) / 
                              (budgetData.max - budgetData.min)) * 100;
            budgetProgressBar.style.width = `${percentage}%`;
        }
    } catch (error) {
        console.error('Error updating budget estimation:', error);
    }
}

/**
 * Update key insights list
 * @param {Array} insights - The key insights
 */
function updateKeyInsights(insights) {
    if (!insights || insights.length === 0) return;
    
    try {
        const keyInsights = document.getElementById('keyInsights');
        if (!keyInsights) return;
        
        let insightsHTML = '';
        insights.forEach(insight => {
            insightsHTML += `<li class="text-gray-700">${insight}</li>`;
        });
        keyInsights.innerHTML = insightsHTML;
    } catch (error) {
        console.error('Error updating key insights:', error);
    }
}

/**
 * Get color for a sentiment value
 * @param {number} sentiment - The sentiment value (-1 to 1)
 * @returns {string} The color hex code
 */
function getSentimentColor(sentiment) {
    if (sentiment >= 0.5) return '#10b981'; // Green
    if (sentiment >= 0) return '#60a5fa';  // Blue
    if (sentiment >= -0.5) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
}

/**
 * Get a label for a sentiment value
 * @param {number} sentiment - The sentiment value (-1 to 1)
 * @returns {string} The sentiment label
 */
function getSentimentLabel(sentiment) {
    if (sentiment >= 0.5) return 'Positive';
    if (sentiment >= 0) return 'Neutral+';
    if (sentiment >= -0.5) return 'Neutral-';
    return 'Negative';
}

// Expose these functions globally for HTML event handlers
window.handleRecordButtonClick = handleRecordButtonClick;
window.handleProcessButtonClick = handleProcessButtonClick;
