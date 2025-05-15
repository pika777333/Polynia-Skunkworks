/**
 * app.js - Main application initialization
 * Connects all components and handles the application lifecycle
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI
    UI.initialize();
    
    // Initialize router
    Router.initialize();
    
    // Initialize charts
    ChartManager.initialize();
    
    // Initialize audio components
    AudioRecorder.initialize();
    AudioVisualizer.initialize();
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('Application initialized');
});

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
            console.error('Error stopping recording:', error);
            UI.showToast('Error stopping recording: ' + error.message, 'error');
        }
    } else {
        try {
            // Start recording
            await AudioRecorder.startRecording();
            
            // Update UI
            UI.updateUIAfterRecordingStarted();
            
            console.log('Recording started');
        } catch (error) {
            console.error('Error starting recording:', error);
            UI.showToast('Error starting recording: ' + error.message, 'error');
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
        // Process the audio through the API
        const analysisData = await ApiService.processAudio(audioBlob);
        
        // Update charts and UI with the analysis data
        updateAnalysisResults(analysisData);
        
        // Update UI to show completed state
        UI.updateUIAfterProcessing();
        
        // Show success message
        UI.showToast('Analysis complete!');
        
        console.log('Analysis completed:', analysisData);
    } catch (error) {
        console.error('Error processing audio:', error);
        UI.updateUIAfterProcessingError(error.message);
        UI.showToast('Error processing audio: ' + error.message, 'error');
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
}
