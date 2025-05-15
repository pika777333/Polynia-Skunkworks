// visualizer.js
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
export function initialize() {
    waveformContainer = document.getElementById('audioWaveform');
    createWaveformBars();
    
    // Create audio context when needed
    try {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
    } catch (e) {
        console.warn('Web Audio API is not supported in this browser');
    }
    
    console.log('Audio visualizer initialized');
}

/**
 * Check if browser supports visualization
 * @returns {boolean} Whether visualization is supported
 */
export function isSupported() {
    return !!(window.AudioContext || window.webkitAudioContext);
}

/**
 * Create the waveform visualization bars
 */
function createWaveformBars() {
    // Clear existing bars
    if (!waveformContainer) return;
    
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
}

/**
 * Start visualization with a given audio stream
 * @param {MediaStream} stream - The microphone media stream
 */
export function startVisualization(stream) {
    if (!stream || !waveformContainer) {
        console.error('No audio stream or container provided for visualization');
        return;
    }
    
    try {
        // Stop any existing visualization
        stopVisualization();
        
        // Create audio context if needed
        if (!audioContext) {
            audioContext = new AudioContext();
        }
        
        // Resume audio context if it's suspended (autoplay policy)
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        
        // Create analyzer node
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; // Must be power of 2
        analyser.smoothingTimeConstant = 0.8; // Smooth transitions
        
        // Connect the stream to the analyzer
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        
        // Create data array for analyzer
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        
        // Show the waveform container
        const container = document.getElementById('waveformContainer');
        if (container) {
            container.classList.remove('hidden');
            container.classList.add('flex', 'flex-col');
        }
        
        // Start visualization loop
        visualizationActive = true;
        visualize();
        
        console.log('Audio visualization started');
    } catch (e) {
        console.error('Error starting audio visualization:', e);
    }
}

/**
 * The visualization loop function
 */
function visualize() {
    if (!visualizationActive || !analyser || !dataArray || waveformBars.length === 0) {
        return;
    }
    
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
        
        // Set bar height with slight randomization
        const jitter = Math.random() * 2 - 1; // -1 to +1
        waveformBars[i].style.height = `${scaledHeight + jitter}px`;
        
        // Adjust bar color based on frequency
        const hue = (i / barCount) * 240; // Blue-magenta spectrum
        waveformBars[i].style.backgroundColor = `hsla(${hue + 120}, 70%, 60%, 0.7)`;
    }
    
    // Continue the visualization loop
    animationFrame = requestAnimationFrame(visualize);
}

/**
 * Stop the audio visualization
 */
export function stopVisualization() {
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
export function cleanup() {
    stopVisualization();
    
    // Close audio context if it exists
    if (audioContext && audioContext.state !== 'closed') {
        audioContext.close().then(() => {
            console.log('Audio context closed');
            audioContext = null;
        });
    }
}

// For backward compatibility
window.AudioVisualizer = {
    initialize,
    isSupported,
    startVisualization,
    stopVisualization,
    cleanup
};
document.addEventListener('DOMContentLoaded', function() {
    // Initialize on DOM load
    if (typeof window.AudioVisualizer !== 'undefined' && 
        typeof window.AudioVisualizer.initialize === 'function') {
        window.AudioVisualizer.initialize();
    }
});
