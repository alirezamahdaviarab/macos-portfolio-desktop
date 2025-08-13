document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen first
    initializeLoadingScreen();
    
    // Initialize other components after login
    const tabs = document.querySelectorAll('.tab');
    const currentUrl = document.getElementById('current-url');
    let nextTabId = 1;
    
    // Project data with demo links
    const projectsData = {
        'roberta-injury': {
            title: 'RoBERTa Injury Classification',
            tech: 'PyTorch • NLP • Research',
            description: 'Advanced NLP model for automated injury classification using RoBERTa transformer architecture. Achieved 94% accuracy on multi-class injury detection with custom training pipeline.',
            features: [
                'Custom RoBERTa fine-tuning for injury text classification',
                'Multi-class prediction with confidence scoring',
                'Real-time inference API with FastAPI',
                'Data preprocessing pipeline for medical text'
            ],
            demoUrl: 'https://huggingface.co/spaces/alireza-injury-classifier',
            githubUrl: 'https://github.com/alireza/roberta-injury-classifier'
        },
        'pushpal-tickets': {
            title: 'PushPal Ticket System',
            tech: 'React • Node.js • MongoDB',
            description: 'Full-stack ticket management system with real-time notifications, user role management, and advanced filtering capabilities.',
            features: [
                'Real-time ticket updates with Socket.io',
                'Role-based access control (Admin, Manager, Agent)',
                'Advanced search and filtering system',
                'Email notifications and escalation workflows'
            ],
            demoUrl: 'https://pushpal-demo.vercel.app',
            githubUrl: 'https://github.com/alireza/pushpal-tickets'
        },
        'shiftflow-app': {
            title: 'ShiftFlow Scheduler',
            tech: 'React Native • Firebase • Analytics',
            description: 'Mobile-first employee scheduling app with automated shift generation, availability tracking, and performance analytics.',
            features: [
                'Intelligent shift scheduling with AI optimization',
                'Employee availability management',
                'Real-time shift swapping and coverage',
                'Performance analytics and reporting dashboard'
            ],
            demoUrl: 'https://shiftflow-demo.netlify.app',
            githubUrl: 'https://github.com/alireza/shiftflow-app'
        },
        'goalvault-app': {
            title: 'GoalVault Financial Tracker',
            tech: 'React • Gamification • FinTech',
            description: 'Gamified financial goal tracking application with XP system, achievements, and progress visualization.',
            features: [
                'Gamification with XP points and levels',
                'Achievement system and badges',
                'Visual progress tracking with charts',
                'Social sharing and challenges'
            ],
            demoUrl: 'https://goalvault-demo.vercel.app',
            githubUrl: 'https://github.com/alireza/goalvault-app'
        },
        'smart-building': {
            title: 'Smart Building Dashboard',
            tech: 'React • IoT • WebSockets • D3.js',
            description: 'Real-time IoT dashboard for monitoring building systems with advanced data visualization and automated controls.',
            features: [
                'Real-time sensor data monitoring',
                'Interactive D3.js data visualizations',
                'Automated building controls and alerts',
                'Energy consumption optimization'
            ],
            demoUrl: 'https://smart-building-demo.netlify.app',
            githubUrl: 'https://github.com/alireza/smart-building'
        },
        'presidio-pii': {
            title: 'Presidio PII Detection',
            tech: 'Python • FastAPI • NLP • Security',
            description: 'Advanced PII detection and anonymization system using Microsoft Presidio with custom entity recognition.',
            features: [
                'Multi-language PII detection',
                'Custom entity recognition models',
                'Real-time API with confidence scoring',
                'Data anonymization and masking'
            ],
            demoUrl: 'https://presidio-demo.herokuapp.com',
            githubUrl: 'https://github.com/alireza/presidio-pii'
        }
    };
    
    // Profile URLs for different sections
    const profileUrls = {
        'profile': 'https://alireza-mahdavi.dev',
        'projects': 'https://alireza-mahdavi.dev/projects',
        'contact': 'https://alireza-mahdavi.dev/contact'
    };

    // Loading Screen & Login Functionality
    function initializeLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const loginForm = document.getElementById('login-form');
        const getStartedBtn = document.getElementById('get-started-btn');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const btnText = document.querySelector('.btn-text');
        const btnLoader = document.querySelector('.btn-loader');
        const desktop = document.getElementById('desktop');
        
        // Handle login form submission
        getStartedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            // Simple validation
            if (!username || !password) {
                shakeLoginCard();
                return;
            }
            
            // Check credentials (demo: demo/portfolio)
            if (username === 'demo' && password === 'portfolio') {
                performLogin();
            } else {
                shakeLoginCard();
                showLoginError();
            }
        });
        
        // Handle Enter key press in input fields
        [usernameInput, passwordInput].forEach(input => {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    getStartedBtn.click();
                }
            });
        });
        
        function performLogin() {
            // Show loading state
            btnText.style.display = 'none';
            btnLoader.style.display = 'flex';
            getStartedBtn.disabled = true;
            
            // Simulate login process
            setTimeout(() => {
                // Prepare desktop for slide animation
                desktop.style.display = 'flex';
                
                // Small delay to ensure DOM is ready
                setTimeout(() => {
                    // Start Apple-style slide up animation
                    loadingScreen.classList.add('hide');
                    desktop.classList.add('show');
                    
                    // Initialize desktop components after transition starts
                    setTimeout(() => {
                        initializeDesktop();
                    }, 300);
                    
                    // Hide loading screen completely after animation
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 1200);
                }, 50);
            }, 2000); // 2 second loading simulation
        }
        
        function shakeLoginCard() {
            const loginCard = document.querySelector('.login-card');
            loginCard.style.animation = 'shake 0.6s ease-in-out';
            setTimeout(() => {
                loginCard.style.animation = '';
            }, 600);
        }
        
        function showLoginError() {
            const hint = document.querySelector('.login-hint p');
            const originalText = hint.innerHTML;
            hint.innerHTML = '<span style="color: #ff6b6b;">❌ Invalid credentials! Try: demo/portfolio</span>';
            hint.style.color = '#ff6b6b';
            
            setTimeout(() => {
                hint.innerHTML = originalText;
                hint.style.color = '';
            }, 3000);
        }
    }
    
    
    function initializeDesktop() {
        setupTabListeners();
        setupProjectListeners();
        setupBrowserControls();
        showTabContent('profile');
    }

    // Setup browser controls
    function setupBrowserControls() {
        const browserWindow = document.querySelector('.browser-window');
        const closeBtn = document.querySelector('.control.close');
        const minimizeBtn = document.querySelector('.control.minimize');
        const maximizeBtn = document.querySelector('.control.maximize');

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                browserWindow.style.opacity = '0.5';
                browserWindow.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    browserWindow.style.opacity = '1';
                    browserWindow.style.transform = 'scale(1)';
                }, 200);
            });
        }

        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', function() {
                browserWindow.style.transform = 'scale(0.1) translateY(300px)';
                browserWindow.style.opacity = '0.3';
                setTimeout(() => {
                    browserWindow.style.transform = 'scale(1) translateY(0)';
                    browserWindow.style.opacity = '1';
                }, 500);
            });
        }

        if (maximizeBtn) {
            maximizeBtn.addEventListener('click', function() {
                browserWindow.classList.toggle('maximized');
            });
        }
    }

    // Setup tab click and close listeners
    function setupTabListeners() {
        tabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                if (e.target.classList.contains('tab-close')) {
                    return;
                }
                switchToTab(this);
            });
        });

        // Tab close functionality
        document.querySelectorAll('.tab-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const tab = this.parentElement;
                const page = tab.getAttribute('data-page');
                
                if (page === 'profile') return; // Can't close profile tab
                
                const wasActive = tab.classList.contains('active');
                tab.remove();
                
                if (wasActive) {
                    const firstTab = document.querySelector('.tab');
                    if (firstTab) switchToTab(firstTab);
                }
            });
        });
    }

    // Setup project click listeners
    function setupProjectListeners() {
        document.addEventListener('click', function(e) {
            const postItem = e.target.closest('.post-item');
            if (postItem) {
                const projectId = postItem.getAttribute('data-project');
                if (projectId && projectsData[projectId]) {
                    openProjectDetail(projectsData[projectId]);
                }
            }
        });
    }

    // Switch to a specific tab
    function switchToTab(tab) {
        const page = tab.getAttribute('data-page');
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update URL
        if (profileUrls[page]) {
            currentUrl.textContent = profileUrls[page];
        }

        showTabContent(page);
    }

    // Show content based on selected tab
    function showTabContent(page) {
        // Hide all content sections
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });

        // Show selected content
        switch(page) {
            case 'profile':
                showProfileContent();
                break;
            case 'projects':
                showProjectsContent();
                break;
            case 'contact':
                showContactContent();
                break;
            default:
                if (page.startsWith('project-')) {
                    showProjectDetailContent(page);
                }
                break;
        }
    }

    // Show profile content
    function showProfileContent() {
        const profileContent = document.querySelector('.social-profile');
        if (profileContent) {
            profileContent.style.display = 'block';
            // Show profile sections, hide projects grid
            document.querySelector('#projects-tab').style.display = 'none';
            document.querySelector('.profile-header').style.display = 'flex';
            document.querySelector('.profile-nav').style.display = 'flex';
            
            // Show profile navigation content
            showProfileSection('projects');
        }
    }

    // Show projects content
    function showProjectsContent() {
        const profileContent = document.querySelector('.social-profile');
        if (profileContent) {
            profileContent.style.display = 'block';
            // Hide profile sections, show projects grid
            document.querySelector('.profile-header').style.display = 'none';
            document.querySelector('.profile-nav').style.display = 'none';
            document.querySelector('#projects-tab').style.display = 'grid';
        }
    }

    // Show contact content
    function showContactContent() {
        const browserContent = document.querySelector('.browser-content');
        browserContent.innerHTML = `
            <div class="contact-page">
                <div class="contact-header">
                    <h1>Get In Touch</h1>
                    <p>Let's discuss your next project or collaboration opportunity.</p>
                </div>
                <div class="contact-grid">
                    <div class="contact-method">
                        <div class="contact-icon">📧</div>
                        <h3>Email</h3>
                        <p>alireza.mahdavi@example.com</p>
                        <a href="mailto:alireza.mahdavi@example.com" class="contact-btn">Send Email</a>
                    </div>
                    <div class="contact-method">
                        <div class="contact-icon">💼</div>
                        <h3>LinkedIn</h3>
                        <p>Connect professionally</p>
                        <a href="https://linkedin.com/in/alireza-mahdavi" class="contact-btn">Connect</a>
                    </div>
                    <div class="contact-method">
                        <div class="contact-icon">💻</div>
                        <h3>GitHub</h3>
                        <p>Check out my repositories</p>
                        <a href="https://github.com/alireza-mahdavi" class="contact-btn">View Profile</a>
                    </div>
                    <div class="contact-method">
                        <div class="contact-icon">🌐</div>
                        <h3>Portfolio</h3>
                        <p>My complete portfolio website</p>
                        <a href="https://alireza-mahdavi-portfolio.vercel.app" class="contact-btn">Visit Site</a>
                    </div>
                </div>
            </div>
        `;
    }

    // Show profile navigation sections
    function showProfileSection(section) {
        document.querySelectorAll('.profile-nav .nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        document.querySelector(`[data-section="${section}"]`).classList.add('active');
        
        // Hide all section content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // Show selected section
        document.querySelector(`#${section}-tab`).style.display = 'grid';
    }

    // Open project detail in new tab
    function openProjectDetail(project) {
        const tabsContainer = document.querySelector('.browser-tabs');
        const newTabId = `project-${nextTabId++}`;
        
        // Create new tab
        const newTab = document.createElement('div');
        newTab.className = 'tab active';
        newTab.setAttribute('data-page', newTabId);
        newTab.innerHTML = `
            <span>🚀 ${project.title}</span>
            <div class="tab-close">×</div>
        `;
        
        // Remove active from other tabs
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        
        // Add new tab
        tabsContainer.appendChild(newTab);
        
        // Setup click listener for new tab
        newTab.addEventListener('click', function(e) {
            if (e.target.classList.contains('tab-close')) return;
            switchToTab(this);
        });
        
        // Setup close listener for new tab
        newTab.querySelector('.tab-close').addEventListener('click', function(e) {
            e.stopPropagation();
            const wasActive = newTab.classList.contains('active');
            newTab.remove();
            
            if (wasActive) {
                const firstTab = document.querySelector('.tab');
                if (firstTab) switchToTab(firstTab);
            }
        });
        
        // Update URL
        currentUrl.textContent = `https://alireza-mahdavi.dev/projects/${project.title.toLowerCase().replace(/\\s+/g, '-')}`;
        
        // Show project detail content
        showProjectDetail(project);
    }

    // Show project detail content
    function showProjectDetail(project) {
        const browserContent = document.querySelector('.browser-content');
        browserContent.innerHTML = `
            <div class="project-detail">
                <div class="project-header">
                    <div class="project-back">
                        <button onclick="history.back()" class="back-btn">← Back to Projects</button>
                    </div>
                    <h1 class="project-title">${project.title}</h1>
                    <p class="project-tech">${project.tech}</p>
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-actions">
                        <a href="${project.demoUrl}" target="_blank" class="demo-btn">🚀 Try Live Demo</a>
                        <a href="${project.githubUrl}" target="_blank" class="github-btn">💻 View Code</a>
                    </div>
                </div>
                
                <div class="project-features">
                    <h2>Key Features</h2>
                    <ul class="features-list">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-preview">
                    <h2>Preview</h2>
                    <div class="preview-container">
                        <iframe src="${project.demoUrl}" class="demo-iframe"></iframe>
                    </div>
                </div>
            </div>
        `;
    }

    // Profile navigation listeners
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-tab')) {
            const section = e.target.getAttribute('data-section');
            if (section) {
                showProfileSection(section);
            }
        }
    });

    // Initialize everything
    // init();
});
