/**
 * recorder.js - Audio recording with real-time visualization
 * Handles microphone access, recording, and audio processing
 */

const AudioRecorder = (function() {
    // State variables
    let mediaRecorder = null;
    let audioChunks = [];
    let recording = false;
    let audioBlob = null;
    let stream = null;
    
    /**
     * Initialize the audio recorder
     */
    function initialize() {
        console.log('Audio recorder initialized');
    }
    
    /**
     * Start recording audio
     * @returns {Promise} A promise that resolves when recording starts
     */
    function startRecording() {
        return new Promise(async (resolve, reject) => {
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
                    if (typeof AudioVisualizer !== 'undefined') {
                        AudioVisualizer.stopVisualization();
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
                if (typeof AudioVisualizer !== 'undefined') {
                    AudioVisualizer.startVisualization(stream);
                }
                
                // Update state
                recording = true;
                
                // Resolve the promise
                resolve();
                
            } catch (err) {
                console.error('Error accessing microphone:', err);
                reject(err);
            }
        });
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
    
    // Public API
    return {
        initialize,
        startRecording,
        stopRecording,
        isRecording,
        getAudioBlob,
        getAudioURL,
        getStream
    };
})();
