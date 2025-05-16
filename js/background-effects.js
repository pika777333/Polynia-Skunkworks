/**
 * background-effects.js - Dynamic background effects for modern UI
 */

const BackgroundEffects = (function() {
    // Configuration
    const config = {
        floatingElements: {
            count: 6,
            colors: ['#e83e8c', '#6f42c1', '#20c997', '#3b82f6'],
            minSize: 80,
            maxSize: 300,
            minBlur: 30,
            maxBlur: 80,
            minOpacity: 0.03,
            maxOpacity: 0.08
        },
        gradientBackground: {
            enabled: true,
            colors: [
                'rgba(232, 62, 140, 0.08)', 
                'rgba(111, 66, 193, 0.08)', 
                'rgba(32, 201, 151, 0.08)'
            ]
        },
        interactivity: {
            enabled: true,
            magnetStrength: 0.3,
            mouseRadius: 200
        }
    };
    
    // Track floating elements
    let floatingElements = [];
    let mousePosition = { x: 0, y: 0 };
    let animationFrame = null;
    
    /**
     * Initialize the background effects
     */
    function initialize() {
        console.log('Initializing background effects...');
        
        // Create container
        createBackgroundContainer();
        
        // Add gradient background if enabled
        if (config.gradientBackground.enabled) {
            createGradientBackground();
        }
        
        // Add floating elements
        createFloatingElements();
        
        // Set up mouse interactivity
        setupInteractivity();
        
        console.log('Background effects initialized');
    }
    
    /**
     * Create the background container
     */
    function createBackgroundContainer() {
        // Check if container already exists
        let container = document.getElementById('background-effects-container');
        if (container) return container;
        
        // Create container
        container = document.createElement('div');
        container.id = 'background-effects-container';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -100;
            overflow: hidden;
            pointer-events: none;
        `;
        
        // Add to body
        document.body.appendChild(container);
        
        return container;
    }
    
    /**
     * Create the gradient background
     */
    function createGradientBackground() {
        const container = document.getElementById('background-effects-container');
        if (!container) return;
        
        // Create gradient layer
        const gradientLayer = document.createElement('div');
        gradientLayer.className = 'gradient-background-layer';
        gradientLayer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 20% 20%, ${config.gradientBackground.colors[0]} 0%, transparent 40%),
                        radial-gradient(circle at 80% 30%, ${config.gradientBackground.colors[1]} 0%, transparent 40%),
                        radial-gradient(circle at 40% 80%, ${config.gradientBackground.colors[2]} 0%, transparent 40%);
            opacity: 0.8;
        `;
        
        // Add to container
        container.appendChild(gradientLayer);
    }
    
    /**
     * Create floating elements
     */
    function createFloatingElements() {
        const container = document.getElementById('background-effects-container');
        if (!container) return;
        
        // Create elements
        for (let i = 0; i < config.floatingElements.count; i++) {
            // Random properties
            const size = Math.random() * (config.floatingElements.maxSize - config.floatingElements.minSize) + config.floatingElements.minSize;
            const blur = Math.random() * (config.floatingElements.maxBlur - config.floatingElements.minBlur) + config.floatingElements.minBlur;
            const opacity = Math.random() * (config.floatingElements.maxOpacity - config.floatingElements.minOpacity) + config.floatingElements.minOpacity;
            const color = config.floatingElements.colors[Math.floor(Math.random() * config.floatingElements.colors.length)];
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Create element
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background-color: ${color};
                filter: blur(${blur}px);
                opacity: ${opacity};
                top: ${posY}%;
                left: ${posX}%;
                transform: translate(-50%, -50%);
                will-change: transform;
                transition: transform 5s cubic-bezier(0.215, 0.610, 0.355, 1.000);
            `;
            
            // Add to container
            container.appendChild(element);
            
            // Store element with animation data
            floatingElements.push({
                element,
                baseX: posX,
                baseY: posY,
                speedX: Math.random() * 0.05 - 0.025,
                speedY: Math.random() * 0.05 - 0.025,
                amplitude: Math.random() * 15 + 5,
                phase: Math.random() * Math.PI * 2
            });
        }
        
        // Start animation loop
        animateFloatingElements();
    }
    
    /**
     * Animate floating elements
     */
    function animateFloatingElements() {
        // Check if there are elements to animate
        if (floatingElements.length === 0) return;
        
        // Update position of each element
        const time = Date.now() / 1000;
        
        floatingElements.forEach(item => {
            // Calculate new position based on time
            let newX = item.baseX + Math.sin(time * item.speedX + item.phase) * item.amplitude;
            let newY = item.baseY + Math.cos(time * item.speedY + item.phase) * item.amplitude;
            
            // Apply magnetic effect if interactivity is enabled
            if (config.interactivity.enabled) {
                // Calculate distance from mouse
                const rect = item.element.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const dx = mousePosition.x - centerX;
                const dy = mousePosition.y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Apply magnetic force if within radius
                if (distance < config.interactivity.mouseRadius) {
                    const force = (1 - distance / config.interactivity.mouseRadius) * config.interactivity.magnetStrength;
                    newX -= (dx / window.innerWidth) * 100 * force;
                    newY -= (dy / window.innerHeight) * 100 * force;
                }
            }
            
            // Update element position
            item.element.style.left = `${newX}%`;
            item.element.style.top = `${newY}%`;
        });
        
        // Continue animation loop
        animationFrame = requestAnimationFrame(animateFloatingElements);
    }
    
    /**
     * Set up interactivity
     */
    function setupInteractivity() {
        if (!config.interactivity.enabled) return;
        
        // Track mouse movement
        document.addEventListener('mousemove', function(e) {
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
        });
        
        // Reset on mouse leave
        document.addEventListener('mouseleave', function() {
            mousePosition.x = 0;
            mousePosition.y = 0;
        });
    }
    
    /**
     * Stop all animations
     */
    function stop() {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    }
    
    /**
     * Clean up resources
     */
    function cleanup() {
        // Stop animations
        stop();
        
        // Clear floating elements
        floatingElements = [];
        
        // Remove container
        const container = document.getElementById('background-effects-container');
        if (container) {
            container.remove();
        }
    }
    
    /**
     * Update configuration
     * @param {Object} newConfig - New configuration options
     */
    function updateConfig(newConfig) {
        // Deep merge config
        config.floatingElements = { ...config.floatingElements, ...(newConfig.floatingElements || {}) };
        config.gradientBackground = { ...config.gradientBackground, ...(newConfig.gradientBackground || {}) };
        config.interactivity = { ...config.interactivity, ...(newConfig.interactivity || {}) };
        
        // Restart for changes to take effect
        cleanup();
        initialize();
    }
    
    // Public API
    return {
        initialize,
        stop,
        cleanup,
        updateConfig
    };
})();

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a bit of delay to ensure the DOM is fully loaded
    setTimeout(() => {
        BackgroundEffects.initialize();
    }, 800);
});
