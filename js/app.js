// app.js
// app.js - Updated imports
// Import modules that support ES modules
import * as Router from './router.js';
import * as ErrorHandlerModule from './errorHandler.js';
import { ProfileManager } from './profile.js';

// Access global objects for non-module scripts
const AudioRecorder = window.AudioRecorder;
const AudioVisualizer = window.AudioVisualizer;
const ChartManager = window.ChartManager;
const UI = window.UI;
const ErrorHandler = window.ErrorHandler || ErrorHandlerModule;

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('Initializing Earworm application...');
    
    try {
        // Initialize UI first so we can display loading states
        UI.initialize();
        
        // Initialize router
        Router.initialize();
        
        // Register view callbacks
        Router.registerViewCallback('metrics', () => {
            if (typeof window.MetricsView !== 'undefined') {
                window.MetricsView.initialize();
            }
        });
        
        // Register user view callback
        Router.registerViewCallback('user', () => {
            // Initialize the React component for user profile
            if (typeof window.initializeReactComponent === 'function') {
                window.initializeReactComponent('userView', window.UserProfile);
            }
        });
        
        // Initialize core components
        if (ChartManager && ChartManager.initialize) {
            ChartManager.initialize();
        }
        
        if (AudioRecorder && AudioRecorder.initialize) {
            AudioRecorder.initialize();
        }
        
        if (AudioVisualizer && AudioVisualizer.initialize) {
            AudioVisualizer.initialize();
        }
        
        // Setup event listeners
        setupEventListeners();
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
        if (ErrorHandler && ErrorHandler.handleError) {
            ErrorHandler.handleError(error, {
                context: 'app:initialization',
                severity: ErrorHandler.ErrorSeverity ? ErrorHandler.ErrorSeverity.CRITICAL : 'critical'
            });
        }
    }
}

// Rest of the app.js code...

/**
 * Set up all event listeners for the application
 */
function setupEventListeners() {
    // Record button click handler
    const recordButton = document.getElementById('recordButton');
    if (recordButton) {
        recordButton.addEventListener('click', handleRecordButtonClick);
    }
    
    // Process button click handler
    const processButton = document.getElementById('processButton');
    if (processButton) {
        processButton.addEventListener('click', handleProcessButtonClick);
    }
}

/**
 * Handle record button click
 */
async function handleRecordButtonClick() {
    // Check if currently recording
    if (AudioRecorder.isRecording()) {
        try {
            // Stop recording
            await AudioRecorder.stopRecording();
            
            // Update UI
            UI.updateUIAfterRecordingStopped();
            
            console.log('Recording stopped');
        } catch (error) {
            ErrorHandler.handleError(error, {
                context: 'recorder:stop',
                severity: ErrorHandler.ErrorSeverity.ERROR
            });
        }
    } else {
        try {
            // Start recording
            await AudioRecorder.startRecording();
            
            // Update UI
            UI.updateUIAfterRecordingStarted();
            
            console.log('Recording started');
        } catch (error) {
            ErrorHandler.handleError(error, {
                context: 'recorder:start',
                severity: ErrorHandler.ErrorSeverity.ERROR
            });
        }
    }
}

/**
 * Handle process button click
 */
async function handleProcessButtonClick() {
    // Check if there's audio to process
    const audioBlob = AudioRecorder.getAudioBlob();
    
    if (!audioBlob) {
        UI.showToast('No recording available. Please record a conversation first.', 'error');
        return;
    }
    
    // Update UI to show processing state
    UI.updateUIBeforeProcessing();
    
    try {
        // Get profile data for enriched analysis
        const profileData = ProfileManager.getProfile();
        
        // Process the audio through the API
        const analysisData = await window.ApiService.processAudio(audioBlob, profileData);
        
        // Update charts and UI with the analysis data
        updateAnalysisResults(analysisData);
        
        // Update UI to show completed state
        UI.updateUIAfterProcessing();
        
        // Show success message
        UI.showToast('Analysis complete!');
        
        console.log('Analysis completed');
    } catch (error) {
        ErrorHandler.handleError(error, {
            context: 'api:processAudio',
            severity: ErrorHandler.ErrorSeverity.ERROR
        });
        
        UI.updateUIAfterProcessingError(error.message);
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
        UI.updateTranscript(data.transcript);
        
        // Update sentiment chart
        if (data.sentimentTrajectory) {
            ChartManager.updateSentimentChart(data.sentimentTrajectory);
        }
        
        // Update topic distribution chart
        if (data.topicDistribution) {
            ChartManager.updateTopicChart(data.topicDistribution);
        }
        
        // Update pain points chart
        if (data.painPoints) {
            ChartManager.updatePainPointsChart(data.painPoints);
        }
        
        // Update budget estimation
        if (data.budgetEstimation) {
            UI.updateBudgetEstimation(data.budgetEstimation);
        }
        
        // Update key insights
        if (data.keyInsights) {
            UI.updateKeyInsights(data.keyInsights);
        }
    } catch (error) {
        ErrorHandler.handleError(error, {
            context: 'updateAnalysisResults',
            severity: ErrorHandler.ErrorSeverity.WARNING,
            silent: true
        });
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// For backward compatibility
window.handleRecordButtonClick = handleRecordButtonClick;
window.handleProcessButtonClick = handleProcessButtonClick;
