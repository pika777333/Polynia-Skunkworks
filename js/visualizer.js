/**
 * visualizer.js - PRODUCTION VERSION with robust error handling
 */

// State variables
let audioContext = null;
let analyser = null;
let dataArray = null;
let animationFrame = null;
let visualizationActive = false;
let waveformContainer = null;
let waveformBars = [];

/**
 * Initialize the audio visualizer
 */
function initialize() {
    try {
        waveformContainer = document.getElementById('audioWaveform');
        if (!waveformContainer) {
            console.error('Audio waveform container not found');
            return;
        }
        
        createWaveformBars();
        
        // Set up audio context
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
            
            // Create analyzer node
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.8;
            
            // Create data array for analyzer
            dataArray = new Uint8Array(analyser.frequencyBinCount);
            
            console.log('Audio visualizer fully initialized');
        } catch (e) {
            console.error('Web Audio API setup failed:', e);
        }
    } catch (error) {
        console.error('Error initializing audio visualizer:', error);
    }
}

/**
 * Check if browser supports visualization
 * @returns {boolean} Whether visualization is supported
 */
function isSupported() {
    return !!(window.AudioContext || window.webkitAudioContext);
}

/**
 * Create the waveform visualization bars
 */
function createWaveformBars() {
    try {
        if (!waveformContainer) return;
        
        // Clear existing bars
        waveformContainer.innerHTML = '';
        waveformBars = [];
        
        // Number of bars to display
        const numBars = 50;
        
        // Create bars
        for (let i = 0; i < numBars; i++) {
            const bar = document.createElement('div');
            bar.className = 'waveform-bar';
            bar.style.height = '3px';
            waveformContainer.appendChild(bar);
            waveformBars.push(bar);
        }
    } catch (error) {
        console.error('Error creating waveform bars:', error);
    }
}

/**
 * Start visualization with a given audio stream
 * @param {MediaStream} stream - The microphone media stream
 */
function startVisualization(stream) {
    try {
        if (!stream) {
            console.error('No audio stream provided for visualization');
            return;
        }
        
        if (!waveformContainer) {
            console.error('Waveform container not found');
            return;
        }
        
        // Stop any existing visualization
        stopVisualization();
        
        // Make sure we have waveform bars
        if (waveformBars.length === 0) {
            createWaveformBars();
        }
        
        // Create or resume audio context
        if (!audioContext) {
            try {
                audioContext = new AudioContext();
            } catch (e) {
                console.error('Could not create AudioContext:', e);
                return;
            }
        } else if (audioContext.state === 'suspended') {
            audioContext.resume().catch(err => console.error('Error resuming AudioContext:', err));
        }
        
        // Create analyzer if needed
        if (!analyser) {
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.8;
        }
        
        // Connect the stream to the analyzer
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        
        // Create data array for analyzer
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        
        // Show the waveform container
        const container = document.getElementById('waveformContainer');
        if (container) {
            container.classList.remove('hidden');
            container.classList.add('flex', 'flex-col');
        }
        
        // Start visualization loop
        visualizationActive = true;
        visualize();
        
        console.log('Audio visualization started successfully');
    } catch (e) {
        console.error('Error starting audio visualization:', e);
        // Attempt to animate waveform anyway using random data
        if (waveformBars.length > 0) {
            visualizationActive = true;
            animateRandomWaveform();
        }
    }
}

/**
 * Animate waveform with random data (fallback when audio analysis fails)
 */
function animateRandomWaveform() {
    if (!visualizationActive || waveformBars.length === 0) {
        return;
    }
    
    // Update bars with random heights
    waveformBars.forEach(bar => {
        const height = Math.floor(Math.random() * 40) + 5;
        bar.style.height = `${height}px`;
        
        // Add some color variation
        const hue = Math.floor(Math.random() * 60) + 300; // Purple-ish range
        bar.style.backgroundColor = `hsla(${hue}, 70%, 60%, 0.7)`;
    });
    
    // Continue the animation loop
    animationFrame = requestAnimationFrame(animateRandomWaveform);
}

/**
 * The visualization loop function
 */
function visualize() {
    if (!visualizationActive || !analyser || !dataArray || waveformBars.length === 0) {
        return;
    }
    
    try {
        // Get data from analyzer
        analyser.getByteFrequencyData(dataArray);
        
        // Calculate the number of data points to use per bar
        const barCount = waveformBars.length;
        const step = Math.floor(dataArray.length / barCount);
        
        // Update each bar
        for (let i = 0; i < barCount; i++) {
            // Get average value for this frequency range
            let sum = 0;
            for (let j = 0; j < step; j++) {
                const dataIndex = i * step + j;
                if (dataIndex < dataArray.length) {
                    sum += dataArray[dataIndex];
                }
            }
            const average = sum / step;
            
            // Scale the value (data is between 0-255)
            const scaledHeight = Math.max(3, (average / 255) * 50);
            
            // Set bar height with slight randomization for a more natural look
            const jitter = Math.random() * 2 - 1; // -1 to +1
            waveformBars[i].style.height = `${scaledHeight + jitter}px`;
            
            // Adjust bar color based on frequency
            const hue = (i / barCount) * 240; // Blue-magenta spectrum
            waveformBars[i].style.backgroundColor = `hsla(${hue + 120}, 70%, 60%, 0.7)`;
        }
    } catch (error) {
        console.error('Error during visualization:', error);
        // Fall back to random animation
        animateRandomWaveform();
        return;
    }
    
    // Continue the visualization loop
    animationFrame = requestAnimationFrame(visualize);
}

/**
 * Stop the audio visualization
 */
function stopVisualization() {
    visualizationActive = false;
    
    // Cancel animation frame if active
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
    
    // Reset bars to minimal height
    if (waveformBars.length > 0) {
        waveformBars.forEach(bar => {
            bar.style.height = '3px';
            bar.style.backgroundColor = 'rgba(232, 62, 140, 0.7)'; // Reset color
        });
    }
    
    console.log('Audio visualization stopped');
}

/**
 * Clean up resources when finished
 */
function cleanup() {
    stopVisualization();
    
    // Close audio context if it exists
    if (audioContext && audioContext.state !== 'closed') {
        audioContext.close().then(() => {
            console.log('Audio context closed');
            audioContext = null;
        }).catch(err => {
            console.error('Error closing audio context:', err);
        });
    }
}

// Make API available globally
window.AudioVisualizer = {
    initialize,
    isSupported,
    startVisualization,
    stopVisualization,
    cleanup
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    try {
        initialize();
        console.log('AudioVisualizer globally available');
    } catch (error) {
        console.error('Error initializing AudioVisualizer:', error);
    }
});
