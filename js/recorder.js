/**
 * visualizer.js - Real-time audio visualization
 * Displays actual microphone input levels during recording
 */

const AudioVisualizer = (function() {
    // Audio context and analyzer
    let audioContext = null;
    let analyser = null;
    let dataArray = null;
    let animationFrame = null;
    let visualizationActive = false;
    
    // DOM elements
    let waveformContainer = null;
    let waveformBars = [];
    
    /**
     * Initialize the audio visualizer
     */
    function initialize() {
        waveformContainer = document.getElementById('audioWaveform');
        createWaveformBars();
        
        // Create audio context when needed (not immediately to avoid autoplay restrictions)
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
        } catch (e) {
            console.warn('Web Audio API is not supported in this browser');
        }
        
        console.log('Audio visualizer initialized');
    }
    
    /**
     * Create the waveform visualization bars
     */
    function createWaveformBars() {
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
    }
    
    /**
     * Start visualization with a given audio stream
     * @param {MediaStream} stream - The microphone media stream
     */
    function startVisualization(stream) {
        if (!stream) {
            console.error('No audio stream provided for visualization');
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
            analyser.smoothingTimeConstant = 0.8; // Smooth transitions between frames
            
            // Connect the stream to the analyzer
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            
            // Create data array for analyzer
            const bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
            
            // Show the waveform container
            document.getElementById('waveformContainer').classList.remove('hidden');
            document.getElementById('waveformContainer').classList.add('flex', 'flex-col');
            
            // Start visualization loop
            visualizationActive = true;
            visualize();
            
            console.log('Audio visualization started');
        } catch (e) {
            console.error('Error starting audio visualization:', e);
        }
    }
    
    /**
     * The visualization loop function - called recursively with requestAnimationFrame
     */
    function visualize() {
        if (!visualizationActive || !analyser || !dataArray) {
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
            
            // Set bar height with slight randomization for more natural appearance
            const jitter = Math.random() * 2 - 1; // -1 to +1
            waveformBars[i].style.height = `${scaledHeight + jitter}px`;
            
            // Optionally adjust bar color based on frequency (creates a spectrum effect)
            const hue = (i / barCount) * 240; // Blue-magenta spectrum (240-360)
            waveformBars[i].style.backgroundColor = `hsla(${hue + 120}, 70%, 60%, 0.7)`;
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
        waveformBars.forEach(bar => {
            bar.style.height = '3px';
            bar.style.backgroundColor = 'rgba(232, 62, 140, 0.7)'; // Reset to default color
        });
        
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
            });
        }
    }
    
    // Public API
    return {
        initialize,
        startVisualization,
        stopVisualization,
        cleanup
    };
})();
