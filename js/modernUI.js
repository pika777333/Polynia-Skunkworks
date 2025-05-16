/**
 * modernUI.js - Modern UI enhancement library for Earworm
 * 
 * This library adds modern UI enhancements without disrupting the existing structure.
 * It applies modern styling, animations, and interaction patterns to the existing UI.
 */

const ModernUI = (function() {
    // Configuration
    const config = {
        // Color palette
        colors: {
            primary: '#e83e8c',
            secondary: '#6f42c1',
            accent: '#20c997',
            dark: '#343a40',
            light: '#f8f9fa',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            info: '#3b82f6'
        },
        // Animation durations
        animations: {
            fast: 200,
            normal: 300,
            slow: 500
        },
        // Blur effects
        blur: {
            light: '5px',
            medium: '10px',
            heavy: '20px'
        },
        // Transition timing functions
        easing: {
            bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
            inOut: 'cubic-bezier(0.42, 0, 0.58, 1)'
        }
    };

    // Cache DOM elements
    let rootElement;
    let dashboardView;
    let metricsView;
    let userView;
    let sidebar;
    let chartElements = [];
    
    /**
     * Initialize the modern UI enhancements
     */
    function initialize() {
        console.log('Initializing Modern UI...');
        
        // Cache DOM elements
        rootElement = document.documentElement;
        dashboardView = document.getElementById('dashboardView');
        metricsView = document.getElementById('metricsView');
        userView = document.getElementById('userView');
        sidebar = document.querySelector('.sidebar') || document.querySelector('.w-64');
        
        // Cache chart elements for later animation
        chartElements = document.querySelectorAll('canvas');
        
        // Apply modern styles
        applyModernStyles();
        
        // Add CSS variables for dynamic theming
        injectColorVariables();
        
        // Apply UI enhancements
        enhanceCards();
        enhanceButtons();
        enhanceCharts();
        enhanceSidebar();
        enhanceHeader();
        enhanceTransitions();
        
        // Add glass morphism elements
        addGlassMorphism();
        
        // Initialize animations
        initializeAnimations();
        
        // Add event listeners
        setupEventListeners();
        
        // Add responsive adjustments
        applyResponsiveImprovements();
        
        console.log('Modern UI initialized');
    }
    
    /**
     * Apply modern base styles
     */
    function applyModernStyles() {
        // Create a style element
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            /* Modern base styles */
            body {
                transition: background-color 0.3s ease;
                background-color: #f9fafb;
                color: #1f2937;
            }
            
            /* Modern card styling */
            .earworm-card {
                border-radius: 1rem !important;
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05),
                            0 8px 10px -6px rgba(0, 0, 0, 0.01) !important;
                transition: all 0.3s ${config.easing.smooth} !important;
                border: 1px solid rgba(255, 255, 255, 0.18) !important;
                overflow: hidden;
            }
            
            .earworm-card:hover {
                transform: translateY(-5px) !important;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                            0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
            }
            
            /* Modern interface elements */
            input, select, textarea {
                border-radius: 0.75rem !important;
                border: 1px solid rgba(229, 231, 235, 1) !important;
                padding: 0.75rem 1rem !important;
                transition: all 0.2s ease !important;
            }
            
            input:focus, select:focus, textarea:focus {
                box-shadow: 0 0 0 3px rgba(232, 62, 140, 0.2) !important;
                border-color: var(--primary-color) !important;
                outline: none !important;
            }
            
            /* Modern button styles */
            button, .btn {
                border-radius: 0.75rem !important;
                transition: all 0.2s ${config.easing.bounce} !important;
            }
            
            button:active, .btn:active {
                transform: scale(0.97) !important;
            }
            
            /* Modern scrollbar */
            ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            
            ::-webkit-scrollbar-track {
                background: transparent; 
            }
            
            ::-webkit-scrollbar-thumb {
                background: rgba(232, 62, 140, 0.3);
                border-radius: 10px;
            }
            
            ::-webkit-scrollbar-thumb:hover {
                background: rgba(232, 62, 140, 0.5);
            }
            
            /* Modern gradient text */
            .gradient-text {
                background: linear-gradient(135deg, #e83e8c 0%, #6f42c1 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
            }
            
            /* Glass panels */
            .glass-panel {
                background: rgba(255, 255, 255, 0.7) !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
                border: 1px solid rgba(255, 255, 255, 0.18) !important;
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15) !important;
            }
        `;
        
        // Add to head
        document.head.appendChild(styleEl);
    }
    
    /**
     * Inject CSS color variables for easy theming
     */
    function injectColorVariables() {
        // Create CSS variables for all colors
        const colorVars = Object.entries(config.colors)
            .map(([name, value]) => `--${name}-color: ${value};`)
            .join('\n');
            
        // Create style element
        const styleEl = document.createElement('style');
        styleEl.textContent = `:root {\n${colorVars}\n}`;
        
        // Add to head
        document.head.appendChild(styleEl);
    }
    
    /**
     * Enhance card elements with modern styling
     */
    function enhanceCards() {
        // Get all card elements
        const cards = document.querySelectorAll('.earworm-card');
        
        // Add modern card enhancements
        cards.forEach((card, index) => {
            // Add subtle hover effect
            card.addEventListener('mouseenter', function() {
                // Only apply if GSAP is available
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        y: -5,
                        duration: 0.3,
                        ease: config.easing.smooth
                    });
                }
            });
            
            card.addEventListener('mouseleave', function() {
                // Only apply if GSAP is available
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.01)',
                        y: 0,
                        duration: 0.3,
                        ease: config.easing.smooth
                    });
                }
            });
            
            // Add card header styling
            const cardHeader = card.querySelector('.border-b');
            if (cardHeader) {
                cardHeader.style.background = 'linear-gradient(to right, rgba(232, 62, 140, 0.05), rgba(111, 66, 193, 0.05))';
            }
        });
    }
    
    /**
     * Enhance buttons with modern styling and interactions
     */
    function enhanceButtons() {
        // Get all buttons
        const buttons = document.querySelectorAll('button');
        
        // Enhance each button
        buttons.forEach(button => {
            // Skip buttons that already have specific classes
            if (button.classList.contains('nav-link') || button.classList.contains('hidden')) {
                return;
            }
            
            // Add modern button effect
            button.addEventListener('mouseenter', function() {
                // Only apply if GSAP is available
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        scale: 1.03,
                        duration: 0.2,
                        ease: config.easing.bounce
                    });
                }
            });
            
            button.addEventListener('mouseleave', function() {
                // Only apply if GSAP is available
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        scale: 1,
                        duration: 0.2,
                        ease: config.easing.bounce
                    });
                }
            });
        });
        
        // Special styling for record button
        const recordButton = document.getElementById('recordButton');
        if (recordButton) {
            recordButton.classList.add('main-action-btn');
        }
        
        // Special styling for process button
        const processButton = document.getElementById('processButton');
        if (processButton) {
            processButton.classList.add('secondary-action-btn');
        }
    }
    
    /**
     * Enhance chart displays with modern styling
     */
    function enhanceCharts() {
        // Apply style overrides if Chart.js is available
        if (typeof Chart !== 'undefined') {
            Chart.defaults.color = '#64748b';
            Chart.defaults.font.family = "'Poppins', sans-serif";
            
            // Add custom animation on hover for chart canvases
            chartElements.forEach(canvas => {
                canvas.parentElement.addEventListener('mouseenter', function() {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(canvas, {
                            scale: 1.02,
                            duration: 0.3,
                            ease: config.easing.smooth
                        });
                    }
                });
                
                canvas.parentElement.addEventListener('mouseleave', function() {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(canvas, {
                            scale: 1,
                            duration: 0.3,
                            ease: config.easing.smooth
                        });
                    }
                });
            });
        }
    }
    
    /**
     * Enhance sidebar with modern styling and interactions
     */
    function enhanceSidebar() {
        if (!sidebar) return;
        
        // Add glass effect to sidebar
        sidebar.classList.add('glass-panel');
        
        // Get all navigation links
        const navLinks = sidebar.querySelectorAll('.nav-link');
        
        // Enhance navigation links
        navLinks.forEach(link => {
            // Add modern hover effect
            link.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active') && typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        backgroundColor: 'rgba(229, 231, 235, 0.5)',
                        scale: 1.03,
                        duration: 0.2,
                        ease: config.easing.smooth
                    });
                }
            });
            
            link.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active') && typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        backgroundColor: 'transparent',
                        scale: 1,
                        duration: 0.2,
                        ease: config.easing.smooth
                    });
                }
            });
        });
        
        // Add subtle animation to logo
        const logo = sidebar.querySelector('#default-logo');
        if (logo) {
            // Add subtle hover animation
            const logoContainer = logo.closest('#logo-container');
            if (logoContainer) {
                logoContainer.addEventListener('mouseenter', function() {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(logo, {
                            scale: 1.05,
                            duration: 0.3,
                            ease: config.easing.bounce
                        });
                    }
                });
                
                logoContainer.addEventListener('mouseleave', function() {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(logo, {
                            scale: 1,
                            duration: 0.3,
                            ease: config.easing.bounce
                        });
                    }
                });
            }
        }
    }
    
    /**
     * Enhance header with modern styling
     */
    function enhanceHeader() {
        // Get header element
        const header = document.querySelector('header');
        if (!header) return;
        
        // Add glass effect
        header.classList.add('glass-panel');
        
        // Make page title gradient
        const title = header.querySelector('h1');
        if (title) {
            title.classList.add('gradient-text');
        }
    }
    
    /**
     * Enhance page transitions with modern effects
     */
    function enhanceTransitions() {
        // If the PageTransitions object exists, we can enhance it
        if (window.PageTransitions) {
            // Store original methods
            const originalTransitionIn = window.PageTransitions.transitionIn;
            const originalTransitionOut = window.PageTransitions.transitionOut;
            
            // Override with enhanced versions
            window.PageTransitions.transitionIn = function(element, options = {}) {
                // Set modern defaults
                const enhancedOptions = {
                    y: 30,
                    opacity: 0,
                    duration: 0.4,
                    ease: config.easing.bounce,
                    stagger: 0.05,
                    ...options
                };
                
                // Call original with enhanced options
                return originalTransitionIn.call(this, element, enhancedOptions);
            };
            
            window.PageTransitions.transitionOut = function(element, options = {}) {
                // Set modern defaults
                const enhancedOptions = {
                    y: -30,
                    opacity: 0,
                    duration: 0.3,
                    ease: config.easing.smooth,
                    stagger: 0.03,
                    ...options
                };
                
                // Call original with enhanced options
                return originalTransitionOut.call(this, element, enhancedOptions);
            };
        }
    }
    
    /**
     * Add glass morphism effects to UI elements
     */
    function addGlassMorphism() {
        // Add subtle pattern background to main content
        const mainContent = document.querySelector('.flex.h-screen');
        if (mainContent) {
            // Create and add a background pattern div
            const patternBg = document.createElement('div');
            patternBg.className = 'pattern-background';
            patternBg.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-image: 
                    radial-gradient(circle at 20% 20%, rgba(232, 62, 140, 0.1) 0%, transparent 8%),
                    radial-gradient(circle at 80% 50%, rgba(111, 66, 193, 0.1) 0%, transparent 10%),
                    radial-gradient(circle at 40% 80%, rgba(32, 201, 151, 0.1) 0%, transparent 15%);
                z-index: -1;
                opacity: 0.7;
            `;
            
            mainContent.style.position = 'relative';
            mainContent.prepend(patternBg);
        }
        
        // Add glass effect to key UI components
        const glassElements = [
            document.getElementById('waveformContainer'),
            ...document.querySelectorAll('.earworm-card')
        ].filter(el => el); // Filter out null elements
        
        glassElements.forEach(el => {
            el.classList.add('glass-panel');
        });
    }
    
    /**
     * Initialize modern animations
     */
    function initializeAnimations() {
        // Add animation to main dashboard cards if GSAP is available
        if (typeof gsap !== 'undefined' && dashboardView) {
            const cards = dashboardView.querySelectorAll('.earworm-card');
            
            // Create staggered entrance animation
            gsap.fromTo(cards, 
                { y: 50, opacity: 0 },
                { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.5,
                    stagger: 0.1,
                    ease: config.easing.bounce,
                    clearProps: 'transform'
                }
            );
        }
    }
    
    /**
     * Setup additional event listeners
     */
    function setupEventListeners() {
        // Add active card highlighting
        document.addEventListener('click', function(e) {
            // Find closest card ancestor
            const card = e.target.closest('.earworm-card');
            
            if (card) {
                // Remove active class from all cards
                document.querySelectorAll('.earworm-card.active-card').forEach(el => {
                    el.classList.remove('active-card');
                    el.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                });
                
                // Add active class to current card
                card.classList.add('active-card');
                card.style.borderColor = config.colors.primary;
                
                // Add highlight animation
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(card, 
                        { boxShadow: '0 0 0 3px rgba(232, 62, 140, 0.3)' },
                        { 
                            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                            duration: 1.5,
                            ease: 'elastic.out(1, 0.3)'
                        }
                    );
                }
            }
        });
        
        // Add chart animation triggers
        window.addEventListener('scroll', function() {
            animateChartsInView();
        });
    }
    
    /**
     * Animate charts when they come into view
     */
    function animateChartsInView() {
        if (typeof gsap === 'undefined' || typeof IntersectionObserver === 'undefined') return;
        
        // Use Intersection Observer to detect when charts are visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const canvas = entry.target;
                    
                    // Play animation
                    gsap.fromTo(canvas,
                        { opacity: 0.5, scale: 0.95 },
                        { 
                            opacity: 1, 
                            scale: 1, 
                            duration: 0.8, 
                            ease: 'elastic.out(1, 0.3)'
                        }
                    );
                    
                    // Stop observing after animation
                    observer.unobserve(canvas);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe all chart canvases
        chartElements.forEach(canvas => {
            observer.observe(canvas);
        });
    }
    
    /**
     * Apply responsive design improvements
     */
    function applyResponsiveImprovements() {
        // Add responsive CSS
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            @media (max-width: 1024px) {
                .earworm-card {
                    transition: all 0.3s ease !important;
                }
                
                .grid-cols-12 > * {
                    margin-bottom: 1rem;
                }
            }
            
            /* Modern button states */
            .main-action-btn {
                background: linear-gradient(135deg, #e83e8c 0%, #6f42c1 100%);
                position: relative;
                z-index: 1;
                overflow: hidden;
            }
            
            .main-action-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #6f42c1 0%, #e83e8c 100%);
                z-index: -1;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .main-action-btn:hover::before {
                opacity: 1;
            }
            
            /* Animated labels */
            .animated-label input {
                border: 1px solid #e5e7eb;
                transition: border 0.3s, box-shadow 0.3s;
            }
            
            .animated-label input:focus {
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(232, 62, 140, 0.2);
            }
            
            /* Dynamic accent borders */
            .accent-border {
                position: relative;
                overflow: hidden;
            }
            
            .accent-border::after {
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                height: 3px;
                width: 100%;
                background: linear-gradient(90deg, #e83e8c, #6f42c1);
                transform: scaleX(0);
                transform-origin: bottom right;
                transition: transform 0.3s ease;
            }
            
            .accent-border:hover::after {
                transform: scaleX(1);
                transform-origin: bottom left;
            }
        `;
        
        // Add to head
        document.head.appendChild(styleEl);
    }
    
    /**
     * Apply interactive background animations
     */
    function applyInteractiveBackground() {
        // Add interactive floating elements to background
        const mainContent = document.querySelector('.flex-1.flex.flex-col');
        if (!mainContent) return;
        
        // Create floating elements container
        const floatingElements = document.createElement('div');
        floatingElements.className = 'floating-elements';
        floatingElements.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: -1;
        `;
        
        // Add floating elements
        for (let i = 0; i < 10; i++) {
            const element = document.createElement('div');
            const size = Math.random() * 80 + 20;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const hue = Math.random() * 60 + 300; // Purple-pink range
            
            element.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                top: ${posY}%;
                left: ${posX}%;
                background: rgba(${Math.random() * 255}, ${Math.random() * 100}, ${Math.random() * 255}, 0.05);
                border-radius: 50%;
                filter: blur(${Math.random() * 10 + 5}px);
            `;
            
            floatingElements.appendChild(element);
            
            // Animate with GSAP if available
            if (typeof gsap !== 'undefined') {
                gsap.to(element, {
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    duration: Math.random() * 20 + 10,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        }
        
        mainContent.style.position = 'relative';
        mainContent.appendChild(floatingElements);
    }
    
    /**
     * Set up focus state for cards
     */
    function setupCardFocusState() {
        const cards = document.querySelectorAll('.earworm-card');
        
        cards.forEach(card => {
            card.addEventListener('click', function() {
                // Remove focus from all cards
                cards.forEach(c => c.classList.remove('card-focus'));
                
                // Add focus to this card
                this.classList.add('card-focus');
                
                // Apply focus animation if GSAP is available
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        boxShadow: '0 0 0 3px rgba(232, 62, 140, 0.3), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        duration: 0.2
                    });
                    
                    // Reset other cards
                    cards.forEach(c => {
                        if (c !== this) {
                            gsap.to(c, {
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                                duration: 0.2
                            });
                        }
                    });
                }
            });
        });
    }
    
    // Public API
    return {
        initialize,
        config
    };
})();

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize ModernUI after a short delay to ensure all other components are loaded
    setTimeout(() => {
        ModernUI.initialize();
    }, 500);
});
