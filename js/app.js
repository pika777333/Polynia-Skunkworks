/**
 * app.js - Simplified version without authentication
 */

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
        if (window.ChartManager) window.ChartManager.initialize();
        if (window.AudioRecorder) window.AudioRecorder.initialize();
        if (window.AudioVisualizer) window.AudioVisualizer.initialize();
        if (window.ProfileSync) window.ProfileSync.initialize();
        
        // Router should be initialized last after registering callbacks
        setupEventListeners();
        
        // Register view callbacks for navigation
        registerViewCallbacks();
        
        // Initialize Router after callbacks are registered
        if (window.Router) window.Router.initialize();
        
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Error during initialization:', error);
        
        // Use ErrorHandler if available
        if (window.ErrorHandler) {
            window.ErrorHandler.handleError(error, {
                context: 'App Initialization',
                severity: window.ErrorHandler.ErrorSeverity.ERROR
            });
        }
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
    
    // Add window resize handler for charts
    window.addEventListener('resize', handleWindowResize);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

/**
 * Register callbacks for different views
 */
function registerViewCallbacks() {
    // Check if Router is available
    if (!window.Router || !window.Router.registerViewCallback) {
        console.warn('Router not available for registering view callbacks');
        return;
    }
    
    // Dashboard view callback
    window.Router.registerViewCallback('dashboard', function() {
        console.log('Dashboard view activated');
        
        // Reinitialize charts if needed
        if (window.ChartManager) {
            setTimeout(() => {
                window.ChartManager.initialize();
            }, 100);
        }
        
        return Promise.resolve();
    });
    
    // Metrics view callback
    window.Router.registerViewCallback('metrics', function() {
        console.log('Metrics view activated');
        
        // Initialize metrics view if available
        if (typeof window.initializeMetricsView === 'function') {
            window.initializeMetricsView();
        } else if (typeof MetricsView !== 'undefined' && MetricsView.initialize) {
            MetricsView.initialize();
        }
        
        return Promise.resolve();
    });
    
    // User profile view callback
    window.Router.registerViewCallback('user', function() {
        console.log('User profile view activated');
        
        // Create a simple loading indicator while the React component initializes
        const userView = document.getElementById('userView');
        if (userView && userView.innerHTML.trim() === '') {
            userView.innerHTML = `
                <div class="flex-1 p-6 flex items-center justify-center">
                    <div class="spinner"></div>
                    <span class="ml-3">Loading profile...</span>
                </div>
            `;
        }
        
        // Try multiple initialization methods for redundancy
        return new Promise((resolve) => {
            try {
                // Try direct initialization first if available
                if (typeof window.initializeUserProfile === 'function') {
                    window.initializeUserProfile();
                    resolve();
                    return;
                }
                
                // Try React component initialization next
                if (typeof window.initializeReactComponent === 'function') {
                    const UserProfile = window.UserProfile || 
                                      (window.ProfileContext ? window.ProfileContext.Provider : null);
                    
                    if (UserProfile) {
                        window.initializeReactComponent('userView', UserProfile);
                        resolve();
                        return;
                    }
                }
                
                // Fallback for simple profile content if all else fails
                if (userView && (userView.innerHTML.trim() === '' || userView.innerHTML.includes('Loading profile'))) {
                    console.warn('No profile component available, using fallback');
                    userView.innerHTML = `
                        <div class="flex-1 p-6">
                            <div class="grid grid-cols-12 gap-6">
                                <div class="col-span-12 mb-4">
                                    <h2 class="text-xl font-bold text-gray-800">Sales Profile</h2>
                                    <p class="text-gray-600">Customize your profile to improve conversation analysis</p>
                                </div>
                                <div class="col-span-12 bg-white rounded-lg shadow-sm p-6">
                                    <p>Profile customization is currently unavailable. Please reload the page to try again.</p>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                resolve();
            } catch (error) {
                console.error('Error initializing user profile:', error);
                resolve(); // Resolve anyway to prevent hanging
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
        showErrorMessage('Audio recording functionality is not available');
        return;
    }
    
    if (window.AudioRecorder.isRecording()) {
        // Stop recording
        window.AudioRecorder.stopRecording().then(() => {
            // Stop audio visualization
            if (window.AudioVisualizer) {
                window.AudioVisualizer.stopVisualization();
            }
            
            // Update UI after recording stopped
            if (window.UI) {
                window.UI.updateUIAfterRecordingStopped();
            }
        }).catch(error => {
            console.error('Error stopping recording:', error);
            showErrorMessage('Error stopping recording');
        });
    } else {
        // Start recording
        window.AudioRecorder.startRecording().then(() => {
            // Start audio visualization
            if (window.AudioVisualizer && window.AudioRecorder.getStream()) {
                window.AudioVisualizer.startVisualization(window.AudioRecorder.getStream());
            }
            
            // Update UI after recording started
            if (window.UI) {
                window.UI.updateUIAfterRecordingStarted();
            }
        }).catch(error => {
            console.error('Error starting recording:', error);
            
            // Provide more helpful error message based on specific error type
            if (error.name === 'NotAllowedError') {
                showErrorMessage('Microphone access denied. Please allow microphone access in your browser settings.');
            } else if (error.name === 'NotFoundError') {
                showErrorMessage('No microphone found. Please connect a microphone and try again.');
            } else {
                showErrorMessage('Error starting recording: ' + error.message);
            }
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
        showErrorMessage('API service is not available');
        return;
    }
    
    // Reset charts before new analysis
    if (window.ChartManager) {
        window.ChartManager.resetCharts();
    }
    
    // Check if there's audio to process
    const audioBlob = window.AudioRecorder ? window.AudioRecorder.getAudioBlob() : null;
    
    if (!audioBlob) {
        showErrorMessage('No recording available. Please record a conversation first.');
        return;
    }
    
    // Update UI to show processing state
    if (window.UI) {
        window.UI.updateUIBeforeProcessing();
    }
    
    // Process the audio
    window.ApiService.processAudio(audioBlob)
        .then(data => {
            console.log('Audio processing successful', data);
            
            // Update UI with analysis results
            updateAnalysisResults(data);
            
            // Update UI to show completed state
            if (window.UI) {
                window.UI.updateUIAfterProcessing();
            }
            
            // Show success message
            if (window.UI && window.UI.showToast) {
                window.UI.showToast('Analysis completed successfully!');
            }
        })
        .catch(error => {
            console.error('Error processing audio:', error);
            
            // Update UI to show error state
            if (window.UI && window.UI.updateUIAfterProcessingError) {
                window.UI.updateUIAfterProcessingError(error.message || 'Error processing audio');
            } else {
                showErrorMessage('Error processing audio: ' + (error.message || 'Unknown error'));
            }
        });
}

/**
 * Update all charts and UI elements with analysis results
 * @param {Object} data - The analysis data
 */
function updateAnalysisResults(data) {
    if (!data) {
        console.error('No analysis data provided');
        return;
    }
    
    try {
        console.log('Updating analysis results with data:', data);
        
        // Update transcript
        if (data.transcript) {
            if (window.UI && window.UI.updateTranscript) {
                window.UI.updateTranscript(data.transcript);
            } else {
                updateTranscript(data.transcript);
            }
        }
        
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
        if (data.budgetEstimation) {
            if (window.UI && window.UI.updateBudgetEstimation) {
                window.UI.updateBudgetEstimation(data.budgetEstimation);
            } else {
                updateBudgetEstimation(data.budgetEstimation);
            }
        }
        
        // Update key insights
        if (data.keyInsights) {
            if (window.UI && window.UI.updateKeyInsights) {
                window.UI.updateKeyInsights(data.keyInsights);
            } else {
                updateKeyInsights(data.keyInsights);
            }
        }
        
        // Animate in the results if GSAP is available
        animateResults();
        
    } catch (error) {
        console.error('Error updating analysis results:', error);
        
        // Use ErrorHandler if available
        if (window.ErrorHandler) {
            window.ErrorHandler.handleError(error, {
                context: 'Analysis Results',
                severity: window.ErrorHandler.ErrorSeverity.ERROR
            });
        }
    }
}

/**
 * Update the transcript display when UI module is not available
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
                <div class="mt-1 text-gray-700">${highlightKeywords(entry.text)}</div>
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
 * Update budget estimation display when UI module is not available
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
        const percentage = data.max > data.min ? ((data.current - data.min) / (data.max - data.min)) * 100 : 0;
        bar.style.width = `${Math.max(0, Math.min(100, percentage))}%`;
    }
}

/**
 * Update key insights when UI module is not available
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
 * Show an error message using UI toast or alert fallback
 * @param {string} message - Error message to display
 */
function showErrorMessage(message) {
    if (window.UI && window.UI.showToast) {
        window.UI.showToast(message, 'error');
    } else {
        alert(message);
    }
}

/**
 * Handle window resize event, updating charts if needed
 */
function handleWindowResize() {
    if (window.ChartManager) {
        // Debounce the resize handler
        clearTimeout(window.resizeTimeout);
        window.resizeTimeout = setTimeout(() => {
            window.ChartManager.initialize();
        }, 250);
    }
}

/**
 * Handle keyboard shortcuts
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeyboardShortcuts(event) {
    // Only handle shortcuts if no input is focused
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
    }
    
    // Ctrl+R or R: Record toggle
    if ((event.ctrlKey && event.key === 'r') || (!event.ctrlKey && !event.shiftKey && event.key === 'r')) {
        event.preventDefault();
        handleRecordButtonClick();
    }
    
    // Ctrl+A or A: Analyze
    if ((event.ctrlKey && event.key === 'a') || (!event.ctrlKey && !event.shiftKey && event.key === 'a')) {
        event.preventDefault();
        
        // Only trigger if button is enabled
        const processButton = document.getElementById('processButton');
        if (processButton && !processButton.disabled) {
            handleProcessButtonClick();
        }
    }
    
    // Number keys for navigation
    if (!event.ctrlKey && !event.shiftKey && !event.altKey) {
        if (event.key === '1' && window.Router) {
            event.preventDefault();
            window.Router.navigateTo('dashboard');
        } else if (event.key === '2' && window.Router) {
            event.preventDefault();
            window.Router.navigateTo('metrics');
        } else if (event.key === '3' && window.Router) {
            event.preventDefault();
            window.Router.navigateTo('user');
        }
    }
}

/**
 * Animate results after analysis using GSAP
 */
function animateResults() {
    if (typeof gsap === 'undefined') return;
    
    // Animate charts container
    const chartContainers = document.querySelectorAll('.earworm-card');
    gsap.fromTo(chartContainers, 
        { opacity: 0.7, y: 20 },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.5, 
            stagger: 0.1,
            ease: "power2.out"
        }
    );
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

/**
 * Highlight keywords in text
 * @param {string} text - The text to highlight
 * @returns {string} The text with highlighted keywords
 */
function highlightKeywords(text) {
    if (!text) return '';
    
    const keywords = [
        'budget', 'concerned', 'reliability', 'safety', 'features', 
        'test drive', 'price', 'cost', 'warranty', 'financing', 
        'payments', 'hybrid', 'fuel', 'efficiency', 'implementation',
        'support', 'training', 'integration', 'security', 'compliance'
    ];
    
    // Create a regular expression to match all keywords (case insensitive)
    const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
    
    // Replace keywords with highlighted version
    return text.replace(regex, '<span class="font-bold earworm-primary-text">$1</span>');
}

// Make functions globally accessible for HTML event handlers
window.handleRecordButtonClick = handleRecordButtonClick;
window.handleProcessButtonClick = handlePr
