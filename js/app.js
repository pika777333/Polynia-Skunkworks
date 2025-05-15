/**
 * app.js - Updated main application file
 * Including AudioVisualizer initialization
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize modules
    UI.initialize();
    ChartManager.initialize();
    AudioRecorder.initialize();
    
    // Initialize AudioVisualizer if available
    if (typeof AudioVisualizer !== 'undefined') {
        AudioVisualizer.initialize();
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Welcome message
    console.log('EARWORM Sales Conversation Analyzer initialized');
});

/**
 * Set up the main event listeners for the application
 */
function setupEventListeners() {
    // Recording button
    const recordButton = document.getElementById('recordButton');
    recordButton.addEventListener('click', function() {
        if (AudioRecorder.isRecording()) {
            AudioRecorder.stopRecording()
                .then(() => {
                    UI.updateUIAfterRecordingStopped();
                    
                    // Stop visualization if AudioVisualizer is available
                    if (typeof AudioVisualizer !== 'undefined') {
                        AudioVisualizer.stopVisualization();
                    }
                })
                .catch(error => {
                    UI.showToast('Error stopping recording: ' + error.message, 'error');
                });
        } else {
            AudioRecorder.startRecording()
                .then(() => {
                    UI.updateUIAfterRecordingStarted();
                    ChartManager.resetCharts();
                })
                .catch(error => {
                    UI.showToast('Error accessing microphone: ' + error.message, 'error');
                });
        }
    });
    
    // Process button
    const processButton = document.getElementById('processButton');
    processButton.addEventListener('click', function() {
        UI.updateUIBeforeProcessing();
        
        ApiService.processAudio(AudioRecorder.getAudioBlob())
            .then(data => {
                console.log('Analysis response:', data);
                UI.updateUIAfterProcessing();
                updateDashboardWithData(data);
            })
            .catch(error => {
                console.error('Error processing audio:', error);
                UI.showToast('Error processing audio: ' + error.message, 'error');
                UI.updateUIAfterProcessingError(error.message);
            });
    });
}

/**
 * Update all dashboard components with the analysis data
 * @param {Object} data - The analysis data from the API
 */
function updateDashboardWithData(data) {
    // Update transcript
    UI.updateTranscript(data.transcript || []);
    
    // Update charts
    ChartManager.updateSentimentChart(data.sentimentTrajectory || []);
    ChartManager.updateTopicChart(data.topicDistribution || []);
    ChartManager.updatePainPointsChart(data.painPoints || []);
    
    // Update budget estimation
    UI.updateBudgetEstimation(data.budgetEstimation || {
        min: 0,
        max: 0,
        target: 0,
        current: 0
    });
    
    // Update key insights
    UI.updateKeyInsights(data.keyInsights || []);
    
    // Show success message
    UI.showToast('Analysis completed successfully!');
}
