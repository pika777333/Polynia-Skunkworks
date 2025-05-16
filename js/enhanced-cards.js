/**
 * enhanced-cards.js - Modern dashboard card components
 */

const EnhancedCards = (function() {
    // Configuration for cards
    const config = {
        animation: {
            enabled: true,
            duration: 0.5,
            stagger: 0.1
        },
        hover: {
            enabled: true,
            scale: 1.03,
            duration: 0.3
        },
        glassMorphism: {
            enabled: true,
            blur: 10
        },
        border: {
            enabled: true,
            width: '1px',
            color: 'rgba(255, 255, 255, 0.18)'
        }
    };

    // Track card elements
    let cards = [];
    let initialized = false;

    /**
     * Initialize enhanced cards
     */
    function initialize() {
        console.log('Initializing enhanced cards...');
        
        // Find all cards
        const cardElements = document.querySelectorAll('.earworm-card');
        
        // Process each card
        cards = Array.from(cardElements).map((card, index) => {
            // Store original styles for reset
            const originalStyles = {
                boxShadow: card.style.boxShadow,
                transform: card.style.transform,
                transition: card.style.transition,
                border: card.style.border,
                background: card.style.background,
                backdropFilter: card.style.backdropFilter
            };
            
            // Add modern styling
            applyModernStyling(card);
            
            // Add animations
            if (config.animation.enabled) {
                animateCardEntrance(card, index);
            }
            
            // Add hover effects
            if (config.hover.enabled) {
                addHoverEffects(card);
            }
            
            // Return card data
            return {
                element: card,
                originalStyles,
                index
            };
        });
        
        // Add special effects to various card types
        enhanceSpecificCardTypes();
        
        // Add card interactivity
        addCardInteractivity();
        
        // Set initialized flag
        initialized = true;
        
        console.log(`Enhanced ${cards.length} cards`);
    }

    /**
     * Apply modern styling to a card
     * @param {HTMLElement} card - The card element
     */
    function applyModernStyling(card) {
        // Set base styling
        card.style.borderRadius = '1rem';
        card.style.overflow = 'hidden';
        card.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
        
        // Apply shadow
        card.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)';
        
        // Apply border if enabled
        if (config.border.enabled) {
            card.style.border = `${config.border.width} solid ${config.border.color}`;
        }
        
        // Apply glass morphism if enabled
        if (config.glassMorphism.enabled) {
            card.style.background = 'rgba(255, 255, 255, 0.7)';
            card.style.backdropFilter = `blur(${config.glassMorphism.blur}px)`;
            card.style.webkitBackdropFilter = `blur(${config.glassMorphism.blur}px)`;
        }
        
        // Enhance card header if present
        const header = card.querySelector('div.p-4.border-b, div.border-b');
        if (header) {
            header.style.background = 'linear-gradient(to right, rgba(232, 62, 140, 0.05), rgba(111, 66, 193, 0.05))';
            header.style.borderColor = 'rgba(232, 62, 140, 0.1)';
            
            // Enhance header title if present
            const title = header.querySelector('h2');
            if (title) {
                title.style.fontWeight = '600';
                title.style.letterSpacing = '0.01em';
            }
        }
    }

    /**
     * Add card entrance animation
     * @param {HTMLElement} card - The card element
     * @param {number} index - Card index for staggered animation
     */
    function animateCardEntrance(card, index) {
        // Only apply if GSAP is available
        if (typeof gsap === 'undefined') return;
        
        // Set initial invisible state
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        
        // Animate with GSAP
        setTimeout(() => {
            gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: config.animation.duration,
                delay: index * config.animation.stagger,
                ease: 'back.out(1.4)',
                clearProps: 'opacity,transform'
            });
        }, 200); // Small delay for initial page render
    }

    /**
     * Add hover effects to a card
     * @param {HTMLElement} card - The card element
     */
    function addHoverEffects(card) {
        // Only apply if GSAP is available
        if (typeof gsap === 'undefined') {
            // Fallback with CSS
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
            return;
        }
        
        // Add mouse enter effect
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -5,
                scale: config.hover.scale,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                duration: config.hover.duration,
                ease: 'back.out(1.7)'
            });
        });
        
        // Add mouse leave effect
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                scale: 1,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                duration: config.hover.duration,
                ease: 'back.out(1.7)'
            });
        });
    }

    /**
     * Enhance specific card types with custom styling
     */
    function enhanceSpecificCardTypes() {
        // Enhance budget estimation card
        const budgetCard = document.querySelector('.earworm-card:has(#budgetTarget)');
        if (budgetCard) {
            enhanceBudgetCard(budgetCard);
        }
        
        // Enhance sentiment chart card
        const sentimentCard = document.querySelector('.earworm-card:has(#sentimentChart)');
        if (sentimentCard) {
            enhanceChartCard(sentimentCard, 'sentiment');
        }
        
        // Enhance topic chart card
        const topicCard = document.querySelector('.earworm-card:has(#topicChart)');
        if (topicCard) {
            enhanceChartCard(topicCard, 'topic');
        }
        
        // Enhance pain points chart card
        const painPointsCard = document.querySelector('.earworm-card:has(#painPointsChart)');
        if (painPointsCard) {
            enhanceChartCard(painPointsCard, 'painPoints');
        }
        
        // Enhance transcript card
        const transcriptCard = document.querySelector('.earworm-card:has(#transcript)');
        if (transcriptCard) {
            enhanceTranscriptCard(transcriptCard);
        }
        
        // Enhance insights card
        const insightsCard = document.querySelector('.earworm-card:has(#keyInsights)');
        if (insightsCard) {
            enhanceInsightsCard(insightsCard);
        }
    }

    /**
     * Enhance the budget card with special styling
     * @param {HTMLElement} card - The budget card element
     */
    function enhanceBudgetCard(card) {
        if (!card) return;
        
        // Add special class
        card.classList.add('budget-card');
        
        // Enhance progress bar
        const progressBar = card.querySelector('#budgetProgressBar');
        if (progressBar) {
            progressBar.style.height = '8px';
            progressBar.style.borderRadius = '4px';
            
            // Add glow effect
            const glowEffect = document.createElement('div');
            glowEffect.className = 'progress-glow';
            glowEffect.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(to right, rgba(232, 62, 140, 0.7), rgba(111, 66, 193, 0.7));
                filter: blur(4px);
                border-radius: 4px;
                opacity: 0.6;
                z-index: -1;
            `;
            
            // Make parent relative for positioning
            progressBar.parentElement.style.position = 'relative';
            progressBar.parentElement.appendChild(glowEffect);
            
            // Update glow size and position based on progress
            const updateGlow = () => {
                const width = progressBar.style.width;
                glowEffect.style.width = width;
            };
            
            // Create a MutationObserver to watch for changes
            const observer = new MutationObserver(() => {
                updateGlow();
            });
            
            // Start observing
            observer.observe(progressBar, { 
                attributes: true, 
                attributeFilter: ['style'] 
            });
        }
        
        // Enhance budget target
        const budgetTarget = card.querySelector('#budgetTarget');
        if (budgetTarget) {
            budgetTarget.classList.add('gradient-text');
            budgetTarget.style.fontWeight = '700';
            
            // Add subtle pulse animation
            if (typeof gsap !== 'undefined') {
                gsap.to(budgetTarget, {
                    scale: 1.05,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        }
    }

    /**
     * Enhance chart cards with type-specific styling
     * @param {HTMLElement} card - The chart card element
     * @param {string} type - The chart type
     */
    function enhanceChartCard(card, type) {
        if (!card) return;
        
        // Add type-specific class
        card.classList.add(`${type}-chart-card`);
        
        // Get chart canvas
        const canvas = card.querySelector('canvas');
        if (!canvas) return;
        
        // Add chart container with enhanced styling
        const chartContainer = document.createElement('div');
        chartContainer.className = 'enhanced-chart-container';
        chartContainer.style.cssText = `
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
            border-radius: 0.5rem;
            transition: all 0.3s ease;
        `;
        
        // Move canvas into container
        const canvasParent = canvas.parentElement;
        canvasParent.appendChild(chartContainer);
        chartContainer.appendChild(canvas);
        
        // Add glow effect based on chart type
        let glowColor;
        switch (type) {
            case 'sentiment':
                glowColor = 'rgba(232, 62, 140, 0.2)';
                break;
            case 'topic':
                glowColor = 'rgba(111, 66, 193, 0.2)';
                break;
            case 'painPoints':
                glowColor = 'rgba(253, 126, 20, 0.2)';
                break;
            default:
                glowColor = 'rgba(232, 62, 140, 0.2)';
        }
        
        // Add glow element
        const glow = document.createElement('div');
        glow.className = 'chart-glow';
        glow.style.cssText = `
            position: absolute;
            bottom: -50px;
            left: 50%;
            transform: translateX(-50%);
            width: 70%;
            height: 40px;
            background: ${glowColor};
            filter: blur(25px);
            border-radius: 50%;
            opacity: 0.6;
            z-index: -1;
        `;
        
        chartContainer.appendChild(glow);
        
        // Add hover effect to chart container
        chartContainer.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(glow, {
                    opacity: 1,
                    scale: 1.2,
                    duration: 0.5,
                    ease: 'power2.out'
                });
                
                gsap.to(canvas, {
                    scale: 1.03,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                });
            }
        });
        
        chartContainer.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(glow, {
                    opacity: 0.6,
                    scale: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
                
                gsap.to(canvas, {
                    scale: 1,
                    duration: 0.5,
                    ease: 'back.out(1.7)'
                });
            }
        });
    }

    /**
     * Enhance transcript card with special styling
     * @param {HTMLElement} card - The transcript card element
     */
    function enhanceTranscriptCard(card) {
        if (!card) return;
        
        // Add special class
        card.classList.add('transcript-card');
        
        // Add styling to container
        const container = card.querySelector('#transcript');
        if (!container) return;
        
        container.style.cssText += `
            scroll-behavior: smooth;
            position: relative;
        `;
        
        // Add scroll fade effect
        const scrollFade = document.createElement('div');
        scrollFade.className = 'scroll-fade';
        scrollFade.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 40px;
            background: linear-gradient(to top, rgba(255, 255, 255, 0.9), transparent);
            pointer-events: none;
        `;
        
        container.appendChild(scrollFade);
        
        // Add scroll indicator
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.style.cssText = `
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 4px;
            background: rgba(232, 62, 140, 0.3);
            border-radius: 4px;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        
        container.parentElement.style.position = 'relative';
        container.parentElement.appendChild(scrollIndicator);
        
        // Show indicator when scrollable
        container.addEventListener('scroll', function() {
            // Check if scrollable
            const isScrollable = this.scrollHeight > this.clientHeight;
            
            // Show/hide indicator
            scrollIndicator.style.opacity = isScrollable ? '1' : '0';
            
            // Update fade effect based on scroll position
            const scrollPercentage = this.scrollTop / (this.scrollHeight - this.clientHeight);
            
            scrollFade.style.opacity = (1 - scrollPercentage).toString();
        });
        
        // Add hover effect for subtle interactivity
        container.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                // Animate indicator
                gsap.to(scrollIndicator, {
                    width: 60,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
        
        container.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                // Reset indicator
                gsap.to(scrollIndicator, {
                    width: 40,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    }

    /**
     * Enhance insights card with special styling
     * @param {HTMLElement} card - The insights card element
     */
    function enhanceInsightsCard(card) {
        if (!card) return;
        
        // Add special class
        card.classList.add('insights-card');
        
        // Get insights list
        const insightsList = card.querySelector('#keyInsights');
        if (!insightsList) return;
        
        // Style list items
        const items = insightsList.querySelectorAll('li');
        items.forEach((item, index) => {
            // Skip placeholder items
            if (item.classList.contains('text-gray-500')) return;
            
            // Add styling
            item.style.position = 'relative';
            item.style.paddingLeft = '1.5rem';
            
            // Add custom bullet
            const bullet = document.createElement('span');
            bullet.className = 'custom-bullet';
            bullet.style.cssText = `
                position: absolute;
                left: 0;
                top: 0.3rem;
                width: 8px;
                height: 8px;
                background: linear-gradient(135deg, #e83e8c, #6f42c1);
                border-radius: 50%;
            `;
            
            item.prepend(bullet);
            
            // Add hover effect
            item.addEventListener('mouseenter', function() {
                if (typeof gsap !== 'undefined') {
                    gsap.to(bullet, {
                        scale: 1.5,
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    });
                    
                    gsap.to(item, {
                        x: 5,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (typeof gsap !== 'undefined') {
                    gsap.to(bullet, {
                        scale: 1,
                        duration: 0.3,
                        ease: 'back.out(1.7)'
                    });
                    
                    gsap.to(item, {
                        x: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    /**
     * Add card interactivity for clicked/focused state
     */
    function addCardInteractivity() {
        // Set up click handlers for card focus
        cards.forEach(({ element }) => {
            element.addEventListener('click', function() {
                // Remove focus from all other cards
                cards.forEach(card => {
                    if (card.element !== this) {
                        card.element.classList.remove('card-focus');
                        
                        // Reset styles with animation if GSAP is available
                        if (typeof gsap !== 'undefined') {
                            gsap.to(card.element, {
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                                borderColor: config.border.color,
                                duration: 0.3
                            });
                        }
                    }
                });
                
                // Add focus to this card
                this.classList.add('card-focus');
                
                // Enhance focus state with animation if GSAP is available
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        boxShadow: '0 0 0 3px rgba(232, 62, 140, 0.3), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        borderColor: 'rgba(232, 62, 140, 0.5)',
                        duration: 0.3
                    });
                }
            });
        });
    }

    /**
     * Reset all cards to original styles
     */
    function reset() {
        if (!initialized) return;
        
        // Reset each card
        cards.forEach(({ element, originalStyles }) => {
            // Remove event listeners
            const newElement = element.cloneNode(true);
            element.parentNode.replaceChild(newElement, element);
            
            // Reset styles
            Object.keys(originalStyles).forEach(key => {
                newElement.style[key] = originalStyles[key] || '';
            });
            
            // Remove classes
            newElement.classList.remove('card-focus', 'budget-card', 'transcript-card', 'insights-card');
            newElement.classList.remove('sentiment-chart-card', 'topic-chart-card', 'painPoints-chart-card');
        });
        
        // Clear cards array
        cards = [];
        
        // Reset initialized flag
        initialized = false;
    }

    /**
     * Update configuration
     * @param {Object} newConfig - New configuration options
     */
    function updateConfig(newConfig) {
        // Deep merge config
        Object.keys(newConfig).forEach(key => {
            if (typeof newConfig[key] === 'object' && config[key]) {
                config[key] = { ...config[key], ...newConfig[key] };
            } else {
                config[key] = newConfig[key];
            }
        });
        
        // Reset and reinitialize for changes to take effect
        if (initialized) {
            reset();
            initialize();
        }
    }

    // Public API
    return {
        initialize,
        reset,
        updateConfig
    };
})();

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a short delay to ensure other scripts have run
    setTimeout(() => {
        EnhancedCards.initialize();
    }, 500);
});
