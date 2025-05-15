// recorder.js
// State variables
let mediaRecorder = null;
let audioChunks = [];
let recording = false;
let audioBlob = null;
let stream = null;

/**
 * Initialize the audio recorder
 */
export function initialize() {
    console.log('Audio recorder initialized');
}

/**
 * Start recording audio
 * @returns {Promise} A promise that resolves when recording starts
 */
export async function startRecording() {
    try {
        // Request microphone access
        stream = await navigator.mediaDevices.getUserMedia({ 
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true
            }
        });
        
        console.log("Microphone access granted");
        
        // Reset audio chunks
        audioChunks = [];
        audioBlob = null;
        
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
            if (typeof window.AudioVisualizer !== 'undefined') {
                window.AudioVisualizer.stopVisualization();
            }
            
            // Stop all tracks
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            
            // Set recording state
            recording = false;
        };
        
        // Start recording
        mediaRecorder.start(1000); // Collect data every second
        
        // Start visualization with the stream
        if (typeof window.AudioVisualizer !== 'undefined') {
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
 * Stop recording audio
 * @returns {Promise} A promise that resolves when recording stops
 */
export function stopRecording() {
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
export function isRecording() {
    return recording;
}

/**
 * Get the recorded audio blob
 * @returns {Blob} The recorded audio blob
 */
export function getAudioBlob() {
    return audioBlob;
}

/**
 * Create an audio URL for the recorded audio
 * @returns {string} The audio URL
 */
export function getAudioURL() {
    if (!audioBlob) {
        return null;
    }
    return URL.createObjectURL(audioBlob);
}

/**
 * Get the active media stream
 * @returns {MediaStream} The current media stream
 */
export function getStream() {
    return stream;
}

// For backward compatibility with code that expects AudioRecorder global
window.AudioRecorder = {
    initialize,
    startRecording,
    stopRecording,
    isRecording,
    getAudioBlob,
    getAudioURL,
    getStream
};
