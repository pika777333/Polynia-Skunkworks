/**
 * recorder.js - PRODUCTION VERSION with fixed timer
 */

// State variables
let mediaRecorder = null;
let audioChunks = [];
let recording = false;
let audioBlob = null;
let stream = null;
let timerInterval = null;
let recordingStartTime = 0;

/**
 * Initialize the audio recorder
 */
function initialize() {
    console.log('Audio recorder initialized in PRODUCTION mode');
    
    // Make sure timers are cleared if page unloads
    window.addEventListener('beforeunload', () => {
        clearAllTimers();
    });
}

/**
 * Start recording audio
 * @returns {Promise} A promise that resolves when recording starts
 */
async function startRecording() {
    try {
        // Clear any previous recordings
        audioChunks = [];
        audioBlob = null;
        clearAllTimers();
        
        // Request microphone access
        stream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }
        });
        
        console.log("Microphone access granted");
        
        // Set up media recorder
        mediaRecorder = new MediaRecorder(stream);
        
        // Handle data available event
        mediaRecorder.ondataavailable = function(event) {
            audioChunks.push(event.data);
        };
        
        // Handle recording stop
        mediaRecorder.onstop = function() {
            // Create audio blob
            audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            
            // Stop visualization
            if (window.AudioVisualizer) {
                window.AudioVisualizer.stopVisualization();
            }
            
            // Stop all tracks
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            
            // Clear recording timer
            clearAllTimers();
            
            // Set recording state
            recording = false;
        };
        
        // Start recording
        mediaRecorder.start(1000); // Collect data every second
        
        // Start recording timer
        recordingStartTime = Date.now();
        startTimer();
        
        // Start visualization with the stream
        if (window.AudioVisualizer) {
            window.AudioVisualizer.startVisualization(stream);
        }
        
        // Update state
        recording = true;
        
    } catch (err) {
        console.error('Error accessing microphone:', err);
        throw err;
    }
}

/**
 * Start the recording timer
 */
function startTimer() {
    // Clear any existing interval first
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    // Update time display immediately
    updateRecordingTime();
    
    // Then set up the interval timer (update every 1000ms)
    timerInterval = setInterval(updateRecordingTime, 1000);
}

/**
 * Update the recording time display
 */
function updateRecordingTime() {
    if (!recordingStartTime) return;
    
    const timeElements = [
        document.getElementById('recordingTime'),
        document.getElementById('currentTime'),
        document.getElementById('totalTime')
    ];
    
    // Calculate elapsed time
    const elapsedSeconds = Math.floor((Date.now() - recordingStartTime) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
    const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');
    const timeString = `${minutes}:${seconds}`;
    
    // Update all time elements
    timeElements.forEach(element => {
        if (element) {
            element.textContent = timeString;
        }
    });
}

/**
 * Clear all timers
 */
function clearAllTimers() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

/**
 * Stop recording audio
 * @returns {Promise} A promise that resolves when recording stops
 */
function stopRecording() {
    return new Promise((resolve, reject) => {
        if (mediaRecorder && recording) {
            try {
                // Add event listener for when recording actually stops
                mediaRecorder.addEventListener('stop', () => {
                    resolve();
                }, { once: true });
                
                // Stop media recorder
                mediaRecorder.stop();
            } catch (err) {
                console.error('Error stopping recording:', err);
                
                // Clean up anyway to avoid stuck state
                clearAllTimers();
                recording = false;
                
                reject(err);
            }
        } else {
            reject(new Error('No active recording to stop'));
        }
    });
}

/**
 * Check if currently recording
 * @returns {boolean} Whether recording is in progress
 */
function isRecording() {
    return recording;
}

/**
 * Get the recorded audio blob
 * @returns {Blob} The recorded audio blob
 */
function getAudioBlob() {
    return audioBlob;
}

/**
 * Create an audio URL for the recorded audio
 * @returns {string} The audio URL
 */
function getAudioURL() {
    if (!audioBlob) {
        return null;
    }
    return URL.createObjectURL(audioBlob);
}

/**
 * Get the active media stream
 * @returns {MediaStream} The current media stream
 */
function getStream() {
    return stream;
}

// IMPORTANT: Make sure these are available globally
window.AudioRecorder = {
    initialize,
    startRecording,
    stopRecording,
    isRecording,
    getAudioBlob,
    getAudioURL,
    getStream
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    try {
        initialize();
        console.log('AudioRecorder globally available');
    } catch (error) {
        console.error('Error initializing AudioRecorder:', error);
    }
});
