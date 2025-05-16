/**
 * UI.js - User Interface management
 * Handles all UI-related operations and animations
 */

const UI = (function() {
    // DOM elements
    let recordButton;
    let processButton;
    let recordingStatus;
    let recordingTime;
    let processingStatus;
    let transcriptContainer;
    let waveformContainer;
    let audioWaveform;
    
    // State variables
    let timerInterval = null;
    let waveformAnimation = null;
    let recordingStartTime = 0;
    
    /**
     * Initialize the UI module
     */
    function initialize() {
    // Cache DOM elements
    recordButton = document.getElementById('recordButton');
    processButton = document.getElementById('processButton');
    recordingStatus = document.getElementById('recordingStatus');
    recordingTime = document.getElementById('recordingTime');
    processingStatus = document.getElementById('processingStatus');
    transcriptContainer = document.getElementById('transcript');
    waveformContainer = document.getElementById('waveformContainer');
    audioWaveform = document.getElementById('audioWaveform');
    
    // Initialize UI components
    animateLogo();
    animateCardsOnLoad();
    addButtonRippleEffects();
    
    // Initialize AudioVisualizer if available
    if (typeof AudioVisualizer !== 'undefined') {
        AudioVisualizer.initialize();
    }
}
    
    /**
     * Create the audio waveform visualization
     */
    function createWaveform() {
        // Clear existing bars
        audioWaveform.innerHTML = '';
        
        // Add waveform bars
        for (let i = 0; i < 50; i++) {
            const bar = document.createElement('div');
            bar.className = 'waveform-bar';
            bar.style.height = '3px';
            audioWaveform.appendChild(bar);
        }
    }
    
    /**
     * Animate the waveform visualization
     * @param {boolean} isActive - Whether to animate the waveform
     */
    function animateWaveform(isActive) {
        const bars = audioWaveform.querySelectorAll('.waveform-bar');
        
        if (isActive) {
            // Cancel any existing animation
            if (waveformAnimation) {
                clearInterval(waveformAnimation);
            }
            
            // Start new animation
            waveformAnimation = setInterval(() => {
                bars.forEach(bar => {
                    const height = Math.floor(Math.random() * 40) + 5;
                    bar.style.height = `${height}px`;
                });
            }, 100);
        } else {
            // Stop animation
            if (waveformAnimation) {
                clearInterval(waveformAnimation);
                waveformAnimation = null;
            }
            
            // Reset bars to minimal height
            bars.forEach(bar => {
                bar.style.height = '3px';
            });
        }
    }
    
    /**
     * Animate the logo on page load
     */
    function animateLogo() {
        const logoSegments = document.querySelectorAll('.logo-segment');
        
        // Initial animation
        gsap.from(logoSegments, {
            scale: 0.5,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "elastic.out(1, 0.3)"
        });
        
        // Add hover effects
        logoSegments.forEach(segment => {
            segment.addEventListener('mouseenter', () => {
                gsap.to(segment, {
                    scale: 1.2,
                    duration: 0.3,
                    ease: "power1.out"
                });
            });
            
            segment.addEventListener('mouseleave', () => {
                gsap.to(segment, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power1.out"
                });
            });
        });
    }
    
    /**
     * Animate cards on page load
     */
    function animateCardsOnLoad() {
        const cards = document.querySelectorAll('.earworm-card');
        
        gsap.from(cards, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out"
        });
    }
    
    /**
     * Add ripple effects to buttons
     */
    function addButtonRippleEffects() {
        document.querySelectorAll('.animated-button').forEach(button => {
            button.addEventListener('click', function(e) {
                let x = e.clientX - e.target.getBoundingClientRect().left;
                let y = e.clientY - e.target.getBoundingClientRect().top;
                
                let ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    /**
     * Update the UI after recording starts
     */
    function updateUIAfterRecordingStarted() {
    // Start timer
    recordingStartTime = Date.now();
    timerInterval = setInterval(updateRecordingTime, 1000);
    
    // Update button text and style
    recordButton.innerHTML = `
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
        </svg>
        Stop Recording
    `;
    
    // Show recording status
    recordingStatus.classList.remove('hidden');
    recordingStatus.classList.add('flex');
    
    // Show waveform
    waveformContainer.classList.remove('hidden');
    waveformContainer.classList.add('flex', 'flex-col');
    
    // Update transcript message
    transcriptContainer.innerHTML = '<p class="text-gray-500">Recording in progress...</p>';
    
    // Change record button color
    gsap.to(recordButton, {
        backgroundColor: '#e83e8c',
        backgroundImage: 'none',
        duration: 0.3
    });
}
    
    /**
     * Update the UI after recording stops
     */
    function updateUIAfterRecordingStopped() {
    // Clear timer
    clearInterval(timerInterval);
    
    // Update button text and style
    recordButton.innerHTML = `
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
        </svg>
        Start New Recording
    `;
    
    // Restore button styling
    gsap.to(recordButton, {
        backgroundImage: 'linear-gradient(135deg, #e83e8c 0%, #6f42c1 100%)',
        duration: 0.3
    });
    
    // Hide recording status
    recordingStatus.classList.add('hidden');
    recordingStatus.classList.remove('flex');
    
    // Update transcript
    transcriptContainer.innerHTML = '<p class="text-gray-500">Recording complete. Click "Analyze Conversation" to process.</p>';
    
    // Enable process button with animation
    processButton.disabled = false;
    processButton.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-gray-400');
    processButton.classList.add('earworm-gradient');
    
    gsap.from(processButton, {
        scale: 0.9,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
        onComplete: () => {
            // Add a subtle pulse animation
            gsap.to(processButton, {
                scale: 1.05,
                repeat: 2,
                yoyo: true,
                duration: 0.4,
                ease: "power1.inOut"
            });
        }
    });
    
    // Show success toast
    showToast('Recording completed successfully!');
}
    
    /**
     * Update the recording time display
     */
    function updateRecordingTime() {
        const elapsedSeconds = Math.floor((Date.now() - recordingStartTime) / 1000);
        const minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
        const seconds = (elapsedSeconds % 60).toString().padStart(2, '0');
        
        // Update display elements
        recordingTime.textContent = `${minutes}:${seconds}`;
        document.getElementById('currentTime').textContent = `${minutes}:${seconds}`;
        document.getElementById('totalTime').textContent = `${minutes}:${seconds}`;
    }
    
    /**
     * Update the UI before processing starts
     */
    function updateUIBeforeProcessing() {
        // Show processing status
        processingStatus.classList.remove('hidden');
        processingStatus.classList.add('flex');
        
        // Disable process button
        processButton.disabled = true;
        processButton.classList.add('opacity-50', 'cursor-not-allowed');
        processButton.classList.remove('earworm-gradient');
        processButton.classList.add('bg-gray-400');
        
        // Update transcript
        transcriptContainer.innerHTML = '<p class="text-gray-500">Processing audio...</p>';
        
        // Apply loading state to cards
        const cards = document.querySelectorAll('.earworm-card');
        cards.forEach(card => {
            card.style.opacity = '0.7';
            card.style.pointerEvents = 'none';
        });
    }
    
    /**
     * Update the UI after processing completes
     */
    function updateUIAfterProcessing() {
        // Hide processing status
        processingStatus.classList.add('hidden');
        processingStatus.classList.remove('flex');
        
        // Re-enable process button
        processButton.disabled = false;
        processButton.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-gray-400');
        processButton.classList.add('earworm-gradient');
        
        // Restore cards
        const cards = document.querySelectorAll('.earworm-card');
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.pointerEvents = 'auto';
        });
    }
    
    /**
     * Update the UI after a processing error
     * @param {string} errorMessage - The error message to display
     */
    function updateUIAfterProcessingError(errorMessage) {
        updateUIAfterProcessing();
        transcriptContainer.innerHTML = `<p class="text-red-500">Error: ${errorMessage}</p>`;
    }
    
    /**
     * Update the transcript with the provided data
     * @param {Array} transcript - The transcript data
     */
    function updateTranscript(transcript) {
        if (!transcript || transcript.length === 0) {
            transcriptContainer.innerHTML = '<p class="text-gray-500">No transcript data available.</p>';
            return;
        }
        
        // Clear container
        transcriptContainer.innerHTML = '';
        
        // Create transcript entries with animation
        transcript.forEach((entry, index) => {
            const entryElement = document.createElement('div');
            entryElement.className = 'mb-4 opacity-0';
            
            const speakerElement = document.createElement('div');
            speakerElement.className = `font-semibold ${entry.speaker === 'Salesperson' ? 'earworm-primary-text' : 'text-green-600'} flex items-center`;
            
            // Format timestamp as MM:SS
            const minutes = Math.floor(entry.timestamp / 1000 / 60);
            const seconds = Math.floor((entry.timestamp / 1000) % 60).toString().padStart(2, '0');
            
            // Add icon based on speaker
            const iconSvg = entry.speaker === 'Salesperson' 
                ? '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>'
                : '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>';
            
            speakerElement.innerHTML = `${iconSvg}${entry.speaker} <span class="ml-2 text-gray-400 text-xs">(${minutes}:${seconds})</span>`;
            
            const textElement = document.createElement('div');
            textElement.className = 'mt-1 text-gray-700';
            textElement.innerHTML = highlightKeywords(entry.text);
            
            // Add sentiment indicator
            const sentimentElement = document.createElement('div');
            sentimentElement.className = 'mt-1 flex items-center';
            
            const sentimentColor = getSentimentColor(entry.sentiment);
            const sentimentLabel = getSentimentLabel(entry.sentiment);
            
            sentimentElement.innerHTML = `
                <div class="text-xs mr-2">Sentiment:</div>
                <div class="w-16 h-2 bg-gray-200 rounded-full">
                    <div class="h-2 rounded-full" style="width: ${(entry.sentiment + 1) * 50}%; background-color: ${sentimentColor};"></div>
                </div>
                <div class="text-xs ml-2" style="color: ${sentimentColor};">${sentimentLabel}</div>
            `;
            
            entryElement.appendChild(speakerElement);
            entryElement.appendChild(textElement);
            entryElement.appendChild(sentimentElement);
            transcriptContainer.appendChild(entryElement);
            
            // Animate entry
            gsap.to(entryElement, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: index * 0.1,
                ease: "power2.out",
                from: { opacity: 0, y: 20 }
            });
        });
        
        // Scroll to top with animation
        gsap.to(transcriptContainer, {
            scrollTop: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    }
    
    /**
     * Update budget estimation display
     * @param {Object} budgetData - The budget estimation data
     */
    function updateBudgetEstimation(budgetData) {
        if (!budgetData) return;
        
        const { min, max, target, current } = budgetData;
        
        // Update DOM elements
        const budgetTarget = document.getElementById('budgetTarget');
        const budgetMin = document.getElementById('budgetMin');
        const budgetMax = document.getElementById('budgetMax');
        const budgetCurrent = document.getElementById('budgetCurrent');
        const budgetProgressBar = document.getElementById('budgetProgressBar');
        
        // Animate the budget target with counter
        gsap.to(budgetTarget, {
            innerText: target,
            duration: 1.5,
            ease: "power2.out",
            snap: { innerText: 1 },
            onUpdate: function() {
                budgetTarget.textContent = '$' + Math.round(budgetTarget.innerText).toLocaleString();
            }
        });
        
        // Update min/max/current values
        budgetMin.textContent = '$' + min.toLocaleString();
        budgetMax.textContent = '$' + max.toLocaleString();
        budgetCurrent.textContent = 'Current: $' + current.toLocaleString();
        
        // Calculate and animate progress bar
        const percentage = max > min ? ((current - min) / (max - min) * 100) : 0;
        gsap.to(budgetProgressBar, {
            width: `${percentage}%`,
            duration: 1,
            ease: "power1.out"
        });
    }
    
    /**
     * Update key insights list
     * @param {Array} insights - The key insights
     */
    function updateKeyInsights(insights) {
        const keyInsightsContainer = document.getElementById('keyInsights');
        keyInsightsContainer.innerHTML = '';
        
        if (insights && insights.length > 0) {
            insights.forEach((insight, index) => {
                const insightElement = document.createElement('li');
                insightElement.className = 'text-gray-700 opacity-0';
                insightElement.textContent = insight;
                keyInsightsContainer.appendChild(insightElement);
                
                // Animate with delay
                gsap.to(insightElement, {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "power1.out",
                    from: { opacity: 0, x: -20 }
                });
            });
        } else {
            const placeholderElement = document.createElement('li');
            placeholderElement.className = 'text-gray-500';
            placeholderElement.textContent = 'No insights available.';
            keyInsightsContainer.appendChild(placeholderElement);
        }
    }
    
    /**
     * Show a toast notification
     * @param {string} message - The message to display
     * @param {string} type - The type of toast (info, error)
     */
    function showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 flex items-center text-white ${type === 'error' ? 'bg-red-500' : 'earworm-gradient'}`;
        
        // Add icon based on type
        const iconSvg = type === 'error' 
            ? '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
            : '<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
        
        toast.innerHTML = iconSvg + message;
        
        // Add to document
        document.body.appendChild(toast);
        
        // Animate in
        gsap.fromTo(toast, 
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.3 }
        );
        
        // Remove after timeout
        setTimeout(() => {
            gsap.to(toast, {
                opacity: 0, 
                y: -20, 
                duration: 0.3,
                onComplete: () => toast.remove()
            });
        }, 5000);
    }
    
    /**
     * Get the color for a sentiment value
     * @param {number} sentiment - The sentiment value (-1 to 1)
     * @returns {string} The color hex code
     */
    function getSentimentColor(sentiment) {
        if (sentiment >= 0.5) return '#10b981'; // Green
        if (sentiment >= 0) return '#60a5fa';  // Blue
        if (sentiment >= -0.5) return '#f59e0b'; // Yellow
        return '#ef4444'; // Red
    }
    
    /**
     * Get a label for a sentiment value
     * @param {number} sentiment - The sentiment value (-1 to 1)
     * @returns {string} The sentiment label
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
        const keywords = ['budget', 'concerned', 'reliability', 'safety', 'features', 'test drive', 'price', 'cost', 'warranty', 'financing', 'payments', 'hybrid', 'fuel', 'efficiency'];
        
        // Create a regular expression to match all keywords (case insensitive)
        const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
        
        // Replace keywords with highlighted version
        return text.replace(regex, '<span class="font-bold earworm-primary-text">$1</span>');
    }
    
    // Public API
    return {
        initialize,
        updateUIAfterRecordingStarted,
        updateUIAfterRecordingStopped,
        updateUIBeforeProcessing,
        updateUIAfterProcessing,
        updateUIAfterProcessingError,
        updateTranscript,
        updateBudgetEstimation,
        updateKeyInsights,
        showToast,
        animateWaveform
    };
})();
// Add this at the end of js/ui.js
window.UI = UI;
