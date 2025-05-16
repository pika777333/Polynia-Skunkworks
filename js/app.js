/**
 * app.js - Simplified version
 * Main application initialization and control
 */

// Make sure global objects are available
window.handleRecordButtonClick = handleRecordButtonClick;
window.handleProcessButtonClick = handleProcessButtonClick;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('Initializing Earworm application...');
    
    try {
        // Initialize components
        if (window.UI) window.UI.initialize();
        if (window.ApiService) window.ApiService.initialize();
        if (window.Router) window.Router.initialize();
        if (window.ChartManager) window.ChartManager.initialize();
        if (window.AudioRecorder) window.AudioRecorder.initialize();
        if (window.AudioVisualizer) window.AudioVisualizer.initialize();
        
        // Setup event listeners
        setupEventListeners();
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
}

/**
 * Set up all event listeners for the application
 */
function setupEventListeners() {
    // Record button
    const recordButton = document.getElementById('recordButton');
    if (recordButton) {
        recordButton.addEventListener('click', handleRecordButtonClick);
    }
    
    // Process button
    const processButton = document.getElementById('processButton');
    if (processButton) {
        processButton.addEventListener('click', handleProcessButtonClick);
    }
    
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            if (window.Router) {
                window.Router.navigateTo(target);
            }
        });
    });
}

/**
 * Handle record button click
 */
function handleRecordButtonClick() {
    console.log('Record button clicked');
    
    if (!window.AudioRecorder) {
        console.error('AudioRecorder not available');
        return;
    }
    
    if (window.AudioRecorder.isRecording()) {
        // Stop recording
        window.AudioRecorder.stopRecording().then(() => {
            // Update UI after recording stopped
            if (window.UI && window.UI.updateUIAfterRecordingStopped) {
                window.UI.updateUIAfterRecordingStopped();
            }
        }).catch(error => {
            console.error('Error stopping recording:', error);
        });
    } else {
        // Start recording
        window.AudioRecorder.startRecording().then(() => {
            // Update UI after recording started
            if (window.UI && window.UI.updateUIAfterRecordingStarted) {
                window.UI.updateUIAfterRecordingStarted();
            }
        }).catch(error => {
            console.error('Error starting recording:', error);
        });
    }
}

/**
 * Handle process button click
 */
function handleProcessButtonClick() {
    console.log('Process button clicked');
    
    if (!window.ApiService) {
        console.error('ApiService not available');
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
    }
    
    // Process the audio
    window.ApiService.processAudio(audioBlob).then(data => {
        // Update UI with analysis results
        updateAnalysisResults(data);
        
        // Update UI to show completed state
        if (window.UI && window.UI.updateUIAfterProcessing) {
            window.UI.updateUIAfterProcessing();
        }
    }).catch(error => {
        console.error('Error processing audio:', error);
        
        if (window.UI && window.UI.updateUIAfterProcessingError) {
            window.UI.updateUIAfterProcessingError(error.message || 'Error processing audio');
        }
    });
}

/**
 * Update all charts and UI elements with analysis results
 * @param {Object} data - The analysis data
 */
function updateAnalysisResults(data) {
    if (!data) return;
    
    try {
        // Update transcript
        updateTranscript(data.transcript);
        
        // Update charts
        if (window.ChartManager) {
            if (data.sentimentTrajectory) {
                window.ChartManager.updateSentimentChart(data.sentimentTrajectory);
            }
            
            if (data.topicDistribution) {
                window.ChartManager.updateTopicChart(data.topicDistribution);
            }
            
            if (data.painPoints) {
                window.ChartManager.updatePainPointsChart(data.painPoints);
            }
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
    const container = document.getElementById('transcript');
    if (!container || !transcript || transcript.length === 0) return;
    
    let html = '';
    transcript.forEach(entry => {
        // Format timestamp
        const timestamp = entry.timestamp || 0;
        const seconds = Math.floor(timestamp / 1000);
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
        const timeString = `${minutes}:${remainingSeconds}`;
        
        // Determine sentiment color and label
        const sentimentColor = getSentimentColor(entry.sentiment);
        const sentimentLabel = getSentimentLabel(entry.sentiment);
        
        html += `
            <div class="mb-4">
                <div class="font-semibold ${entry.speaker === 'Salesperson' ? 'earworm-primary-text' : 'text-green-600'} flex items-center">
                    ${entry.speaker === 'Salesperson' 
                        ? '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>'
                        : '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>'}
                    ${entry.speaker} <span class="ml-2 text-gray-400 text-xs">(${timeString})</span>
                </div>
                <div class="mt-1 text-gray-700">${entry.text}</div>
                <div class="mt-1 flex items-center">
                    <div class="text-xs mr-2">Sentiment:</div>
                    <div class="w-16 h-2 bg-gray-200 rounded-full">
                        <div class="h-2 rounded-full" style="width: ${(entry.sentiment + 1) * 50}%; background-color: ${sentimentColor};"></div>
                    </div>
                    <div class="text-xs ml-2" style="color: ${sentimentColor};">${sentimentLabel}</div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

/**
 * Update budget estimation display
 * @param {Object} data - Budget estimation data
 */
function updateBudgetEstimation(data) {
    if (!data) return;
    
    const target = document.getElementById('budgetTarget');
    const min = document.getElementById('budgetMin');
    const max = document.getElementById('budgetMax');
    const current = document.getElementById('budgetCurrent');
    const bar = document.getElementById('budgetProgressBar');
    
    if (target) target.textContent = '$' + data.target.toLocaleString();
    if (min) min.textContent = '$' + data.min.toLocaleString();
    if (max) max.textContent = '$' + data.max.toLocaleString();
    if (current) current.textContent = 'Current: $' + data.current.toLocaleString();
    
    if (bar) {
        const percentage = ((data.current - data.min) / (data.max - data.min)) * 100;
        bar.style.width = `${percentage}%`;
    }
}

/**
 * Update key insights
 * @param {Array} insights - Key insights array
 */
function updateKeyInsights(insights) {
    if (!insights || insights.length === 0) return;
    
    const container = document.getElementById('keyInsights');
    if (!container) return;
    
    let html = '';
    insights.forEach(insight => {
        html += `<li class="text-gray-700">${insight}</li>`;
    });
    
    container.innerHTML = html;
}

/**
 * Get color for a sentiment value
 * @param {number} sentiment - Sentiment value (-1 to 1)
 * @returns {string} Color hex code
 */
function getSentimentColor(sentiment) {
    if (sentiment >= 0.5) return '#10b981'; // Green
    if (sentiment >= 0) return '#60a5fa';   // Blue
    if (sentiment >= -0.5) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
}

/**
 * Get label for a sentiment value
 * @param {number} sentiment - Sentiment value (-1 to 1)
 * @returns {string} Sentiment label
 */
function getSentimentLabel(sentiment) {
    if (sentiment >= 0.5) return 'Positive';
    if (sentiment >= 0) return 'Neutral+';
    if (sentiment >= -0.5) return 'Neutral-';
    return 'Negative';
}
