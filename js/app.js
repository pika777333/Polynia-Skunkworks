// app.js - FIXED VERSION
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
            console.error("Router module not found");
        }
        
        // Initialize core components with availability checks
        if (window.ChartManager && typeof window.ChartManager.initialize === 'function') {
            window.ChartManager.initialize();
        }
        
        if (window.AudioRecorder && typeof window.AudioRecorder.initialize === 'function') {
            window.AudioRecorder.initialize();
        }
        
        if (window.AudioVisualizer && typeof window.AudioVisualizer.initialize === 'function') {
            window.AudioVisualizer.initialize();
        }
        
        // Setup event listeners
        setupEventListeners();
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
        if (window.ErrorHandler && window.ErrorHandler.handleError) {
            window.ErrorHandler.handleError(error, {
                context: 'app:initialization',
                severity: window.ErrorHandler.ErrorSeverity ? window.ErrorHandler.ErrorSeverity.CRITICAL : 'critical'
            });
        }
    }
}

/**
 * Set up all event listeners for the application
 */
function setupEventListeners() {
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
 * Handle record button click
 */
async function handleRecordButtonClick() {
    console.log('Record button clicked');
    
    if (!window.AudioRecorder) {
        console.error('AudioRecorder not available');
        window.UI.showToast('Audio recording not available', 'error');
        return;
    }
    
    // Check if currently recording
    if (window.AudioRecorder.isRecording()) {
        try {
            // Stop recording
            await window.AudioRecorder.stopRecording();
            
            // Update UI
            window.UI.updateUIAfterRecordingStopped();
            
            console.log('Recording stopped');
        } catch (error) {
            console.error('Error stopping recording:', error);
            window.UI.showToast('Error stopping recording', 'error');
        }
    } else {
        try {
            // Start recording
            await window.AudioRecorder.startRecording();
            
            // Update UI
            window.UI.updateUIAfterRecordingStarted();
            
            console.log('Recording started');
        } catch (error) {
            console.error('Error starting recording:', error);
            window.UI.showToast('Error starting recording: ' + (error.message || 'Microphone access may be blocked'), 'error');
        }
    }
}

/**
 * Handle process button click
 */
async function handleProcessButtonClick() {
    console.log('Process button clicked');
    
    if (!window.AudioRecorder) {
        console.error('AudioRecorder not available');
        window.UI.showToast('Audio processing not available', 'error');
        return;
    }
    
    // Check if there's audio to process
    const audioBlob = window.AudioRecorder.getAudioBlob();
    
    if (!audioBlob) {
        window.UI.showToast('No recording available. Please record a conversation first.', 'error');
        return;
    }
    
    // Update UI to show processing state
    window.UI.updateUIBeforeProcessing();
    
    try {
        // Get profile data for enriched analysis
        const profileData = window.ProfileManager ? window.ProfileManager.getProfile() : {};
        
        // Process the audio through the API
        const analysisData = await window.ApiService.processAudio(audioBlob, profileData);
        
        // Update charts and UI with the analysis data
        updateAnalysisResults(analysisData);
        
        // Update UI to show completed state
        window.UI.updateUIAfterProcessing();
        
        // Show success message
        window.UI.showToast('Analysis complete!');
        
        console.log('Analysis completed');
    } catch (error) {
        console.error('Error processing audio:', error);
        
        window.UI.updateUIAfterProcessingError(error.message || 'Error processing audio');
        window.UI.showToast('Error analyzing recording', 'error');
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
        window.UI.updateTranscript(data.transcript);
        
        // Update sentiment chart
        if (data.sentimentTrajectory && window.ChartManager) {
            window.ChartManager.updateSentimentChart(data.sentimentTrajectory);
        }
        
        // Update topic distribution chart
        if (data.topicDistribution && window.ChartManager) {
            window.ChartManager.updateTopicChart(data.topicDistribution);
        }
        
        // Update pain points chart
        if (data.painPoints && window.ChartManager) {
            window.ChartManager.updatePainPointsChart(data.painPoints);
        }
        
        // Update budget estimation
        if (data.budgetEstimation) {
            window.UI.updateBudgetEstimation(data.budgetEstimation);
        }
        
        // Update key insights
        if (data.keyInsights) {
            window.UI.updateKeyInsights(data.keyInsights);
        }
    } catch (error) {
        console.error('Error updating analysis results:', error);
    }
}

// Expose these functions globally for HTML event handlers
window.handleRecordButtonClick = handleRecordButtonClick;
window.handleProcessButtonClick = handleProcessButtonClick;
