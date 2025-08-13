document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const currentUrl = document.getElementById('current-url');
    
    // Profile URLs for different sections
    const profileUrls = {
        'profile': 'https://alireza-mahdavi.dev',
        'projects': 'https://alireza-mahdavi.dev/projects',
        'contact': 'https://alireza-mahdavi.dev/contact'
    };

    // Tab click functionality
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            // Don't trigger if clicking on close button
            if (e.target.classList.contains('tab-close')) {
                return;
            }

            const page = this.getAttribute('data-page');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update URL
            if (profileUrls[page]) {
                currentUrl.textContent = profileUrls[page];
            }

            // Show/hide content based on selected tab
            showTabContent(page);
        });
    });

    // Tab close functionality
    document.querySelectorAll('.tab-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const tab = this.parentElement;
            const page = tab.getAttribute('data-page');
            
            // Don't close the profile tab
            if (page === 'profile') {
                return;
            }
            
            // Check if this was the active tab
            const wasActive = tab.classList.contains('active');
            
            // Remove the tab
            tab.remove();
            
            // Switch to profile tab if the closed tab was active
            if (wasActive) {
                const profileTab = document.querySelector('.tab[data-page="profile"]');
                if (profileTab) {
                    profileTab.classList.add('active');
                    currentUrl.textContent = profileUrls['profile'];
                    showTabContent('profile');
                }
            }
        });
    });

    // Function to show/hide content based on tab
    function showTabContent(page) {
        // Hide all content sections
        const allSections = document.querySelectorAll('.tab-content');
        allSections.forEach(section => {
            section.style.display = 'none';
        });

        // Show the selected content
        const targetContent = document.querySelector(`.${page}-content`);
        if (targetContent) {
            targetContent.style.display = 'block';
        } else {
            // If no specific content exists, show the profile by default
            const profileContent = document.querySelector('.profile-content') || document.querySelector('.social-profile');
            if (profileContent) {
                profileContent.style.display = 'block';
            }
        }
    }

    // Browser controls functionality
    const closeBtn = document.querySelector('.control.close');
    const minimizeBtn = document.querySelector('.control.minimize');
    const maximizeBtn = document.querySelector('.control.maximize');
    const browserWindow = document.querySelector('.browser-window');

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            browserWindow.style.opacity = '0.5';
            setTimeout(() => {
                browserWindow.style.opacity = '1';
            }, 200);
        });
    }

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', function() {
            browserWindow.style.transform = 'scale(0.8)';
            browserWindow.style.opacity = '0.8';
            setTimeout(() => {
                browserWindow.style.transform = 'scale(1)';
                browserWindow.style.opacity = '1';
            }, 300);
        });
    }

    if (maximizeBtn) {
        maximizeBtn.addEventListener('click', function() {
            browserWindow.classList.toggle('maximized');
        });
    }

    // Initialize with profile tab
    showTabContent('profile');
            if (tab.classList.contains('active')) {
                const profileTab = document.querySelector('[data-page="profile"]');
                if (profileTab) {
                    profileTab.classList.add('active');
                    currentUrl.textContent = profileUrls['profile'];
                }
            }
        });
    });

    // Profile Navigation Tabs
    const navTabs = document.querySelectorAll('.nav-tab');
    const projectsTab = document.getElementById('projects-tab');
    const highlightsTab = document.getElementById('highlights-tab');
    const skillsTab = document.getElementById('skills-tab');

    navTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Update active nav tab
            navTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide content
            projectsTab.style.display = 'none';
            highlightsTab.style.display = 'none';
            skillsTab.style.display = 'none';
            
            if (tabName === 'projects') {
                projectsTab.style.display = 'grid';
            } else if (tabName === 'highlights') {
                highlightsTab.style.display = 'block';
            } else if (tabName === 'skills') {
                skillsTab.style.display = 'block';
            }
        });
    });

    // Project Post Interactions
    const postItems = document.querySelectorAll('.post-item');
    
    postItems.forEach(post => {
        post.addEventListener('click', function() {
            const project = this.getAttribute('data-project');
            
            // For the first project (Presidio), open a fake demo in a new tab
            if (project === 'presidio') {
                openFakeDemo();
            } else {
                showProjectDetails(project);
            }
        });
    });

    function showProjectDetails(project) {
        const projectInfo = {
            'presidio': {
                title: 'Presidio PII Detection System',
                description: 'Advanced NLP system for automated PII detection and anonymization using Microsoft Presidio.',
                features: ['Multi-language support', 'Real-time API', 'Customizable rules', 'Confidence scoring'],
                technologies: ['Python', 'Presidio', 'React', 'FastAPI'],
                demoLink: 'https://alireza-mahdavi-portfolio.vercel.app/',
                githubLink: 'https://github.com/alirezamahdavi'
            },
            'roberta': {
                title: 'RoBERTa Body Injury Classification',
                description: 'Fine-tuned RoBERTa model for automated detection and classification of body injuries.',
                features: ['Multi-label classification', 'Injury severity assessment', 'Transportation safety focus'],
                technologies: ['RoBERTa', 'PyTorch', 'NLP', 'Research'],
                demoLink: 'https://alireza-mahdavi-portfolio.vercel.app/',
                githubLink: 'https://github.com/alirezamahdavi'
            },
            'goalvault': {
                title: 'GoalVault - Financial Goal Tracker',
                description: 'Gamified financial goal tracking application with XP, levels, and achievements.',
                features: ['XP system', 'Achievement unlocking', 'Progress tracking', 'Financial analytics'],
                technologies: ['React', 'Gamification', 'FinTech', 'UX/UI'],
                demoLink: 'https://alireza-mahdavi-portfolio.vercel.app/',
                githubLink: 'https://github.com/alirezamahdavi'
            },
            'shiftflow': {
                title: 'ShiftFlow - Staff Scheduling App',
                description: 'Full-stack web application for managing staff schedules with real-time features.',
                features: ['Real-time scheduling', 'Role-based permissions', 'Mobile-responsive', 'Staff coordination'],
                technologies: ['Next.js', 'PostgreSQL', 'Clerk', 'Full-Stack'],
                demoLink: 'https://alireza-mahdavi-portfolio.vercel.app/',
                githubLink: 'https://github.com/alirezamahdavi'
            },
            'smart': {
                title: 'Smart Building Automation Dashboard',
                description: 'Interactive dashboard for monitoring building systems with real-time data visualization.',
                features: ['Real-time monitoring', 'IoT integration', 'Energy optimization', 'Automated controls'],
                technologies: ['React', 'D3.js', 'WebSockets', 'IoT'],
                demoLink: 'https://alireza-mahdavi-portfolio.vercel.app/',
                githubLink: 'https://github.com/alirezamahdavi'
            },
            'pushpal': {
                title: 'PushPal Ticket System',
                description: 'Mobile-friendly ticket management system with QR code scanning capabilities.',
                features: ['QR code scanning', 'Real-time notifications', 'Mobile-first design', 'Ticket tracking'],
                technologies: ['React', 'Node.js', 'Firebase', 'Mobile-First'],
                demoLink: 'https://alireza-mahdavi-portfolio.vercel.app/',
                githubLink: 'https://github.com/alirezamahdavi'
            }
        };

        const info = projectInfo[project];
        if (!info) return;

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${info.title}</h2>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p class="modal-description">${info.description}</p>
                        <div class="modal-features">
                            <h3>Key Features:</h3>
                            <ul>
                                ${info.features.map(feature => `<li>${feature}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="modal-tech">
                            <h3>Technologies:</h3>
                            <div class="tech-tags">
                                ${info.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                            </div>
                        </div>
                        <div class="modal-actions">
                            <a href="${info.demoLink}" target="_blank" class="btn btn-primary">
                                <i class="fas fa-external-link-alt"></i> View Demo
                            </a>
                            <a href="${info.githubLink}" target="_blank" class="btn btn-secondary">
                                <i class="fab fa-github"></i> View Code
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === modal.querySelector('.modal-overlay')) {
                modal.remove();
            }
        });

        // Add modal styles
        if (!document.querySelector('#modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = `
                .project-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                
                .modal-content {
                    background: white;
                    border-radius: 12px;
                    max-width: 500px;
                    width: 100%;
                    max-height: 80vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 20px;
                    border-bottom: 1px solid #dbdbdb;
                }
                
                .modal-header h2 {
                    margin: 0;
                    color: #262626;
                    font-size: 20px;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #8e8e8e;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-close:hover {
                    color: #262626;
                }
                
                .modal-body {
                    padding: 20px;
                }
                
                .modal-description {
                    color: #262626;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
                
                .modal-features h3,
                .modal-tech h3 {
                    color: #262626;
                    font-size: 16px;
                    margin-bottom: 12px;
                }
                
                .modal-features ul {
                    list-style: none;
                    padding: 0;
                    margin-bottom: 20px;
                }
                
                .modal-features li {
                    color: #262626;
                    padding: 4px 0;
                    position: relative;
                    padding-left: 20px;
                }
                
                .modal-features li:before {
                    content: "✓";
                    position: absolute;
                    left: 0;
                    color: #4ade80;
                    font-weight: bold;
                }
                
                .tech-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-bottom: 20px;
                }
                
                .tech-tag {
                    background: #f8f9fa;
                    color: #262626;
                    padding: 6px 12px;
                    border-radius: 16px;
                    font-size: 12px;
                    font-weight: 500;
                    border: 1px solid #dbdbdb;
                }
                
                .modal-actions {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }
                
                .modal-actions .btn {
                    padding: 10px 20px;
                    border: none;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                }
                
                .modal-actions .btn-primary {
                    background: linear-gradient(45deg, #4ade80, #22c55e);
                    color: white;
                }
                
                .modal-actions .btn-secondary {
                    background: #f8f9fa;
                    color: #262626;
                    border: 1px solid #dbdbdb;
                }
                
                .modal-actions .btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
            `;
            document.head.appendChild(style);
        }
    }

    function openFakeDemo() {
        // Create a new browser tab with a fake demo
        const newTab = document.createElement('div');
        newTab.className = 'tab';
        newTab.setAttribute('data-page', 'demo');
        newTab.innerHTML = `
            <span>🎮 Presidio Demo</span>
            <div class="tab-close">×</div>
        `;
        
        // Insert the new tab before the last tab
        const tabsContainer = document.querySelector('.browser-tabs');
        const lastTab = tabsContainer.lastElementChild;
        tabsContainer.insertBefore(newTab, lastTab);
        
        // Make the new tab active
        tabs.forEach(t => t.classList.remove('active'));
        newTab.classList.add('active');
        
        // Update URL
        currentUrl.textContent = 'https://alireza-mahdavi.dev/demo/presidio';
        
        // Create demo content
        const demoContent = document.createElement('div');
        demoContent.className = 'demo-content';
        demoContent.innerHTML = `
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100%; display: flex; flex-direction: column; color: white; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <!-- Demo Header -->
                <div style="padding: 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.2);">
                    <h1 style="font-size: 2.5rem; margin-bottom: 10px; font-weight: 300;">🔒 Presidio PII Detection Demo</h1>
                    <p style="font-size: 1.2rem; opacity: 0.9;">Advanced NLP system for automated PII detection and anonymization</p>
                </div>
                
                <!-- Demo Interface -->
                <div style="flex: 1; padding: 40px; display: flex; gap: 40px;">
                    <!-- Input Section -->
                    <div style="flex: 1; background: rgba(255,255,255,0.1); border-radius: 16px; padding: 30px; backdrop-filter: blur(10px);">
                        <h2 style="margin-bottom: 20px; font-size: 1.5rem;">📝 Input Text</h2>
                        <textarea 
                            id="demo-input" 
                            placeholder="Enter text containing personal information to test the PII detection system..."
                            style="width: 100%; height: 200px; padding: 20px; border: none; border-radius: 12px; background: rgba(255,255,255,0.1); color: white; font-size: 16px; resize: none; margin-bottom: 20px;"
                        >Hi, my name is John Smith and my email is john.smith@email.com. I live at 123 Main Street, New York, NY 10001. My phone number is (555) 123-4567 and my SSN is 123-45-6789.</textarea>
                        
                        <div style="display: flex; gap: 15px; margin-bottom: 20px;">
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" checked style="width: 18px; height: 18px;">
                                <span>Names</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" checked style="width: 18px; height: 18px;">
                                <span>Emails</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" checked style="width: 18px; height: 18px;">
                                <span>Phone Numbers</span>
                            </label>
                            <label style="display: flex; align-items: center; gap: 8px;">
                                <input type="checkbox" checked style="width: 18px; height: 18px;">
                                <span>SSN</span>
                            </label>
                        </div>
                        
                        <button 
                            onclick="analyzePII()" 
                            style="background: linear-gradient(45deg, #4ade80, #22c55e); color: white; border: none; padding: 15px 30px; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;"
                        >
                            🔍 Analyze PII
                        </button>
                    </div>
                    
                    <!-- Results Section -->
                    <div style="flex: 1; background: rgba(255,255,255,0.1); border-radius: 16px; padding: 30px; backdrop-filter: blur(10px);">
                        <h2 style="margin-bottom: 20px; font-size: 1.5rem;">📊 Detection Results</h2>
                        <div id="demo-results" style="min-height: 200px;">
                            <div style="text-align: center; opacity: 0.7; margin-top: 80px;">
                                <div style="font-size: 3rem; margin-bottom: 20px;">🔍</div>
                                <p>Click "Analyze PII" to see detection results</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Stats Section -->
                <div style="padding: 30px; border-top: 1px solid rgba(255,255,255,0.2); display: flex; justify-content: space-around; text-align: center;">
                    <div>
                        <div style="font-size: 2rem; font-weight: 700;">5+</div>
                        <div style="opacity: 0.8;">Languages Supported</div>
                    </div>
                    <div>
                        <div style="font-size: 2rem; font-weight: 700;">&lt;100ms</div>
                        <div style="opacity: 0.8;">Response Time</div>
                    </div>
                    <div>
                        <div style="font-size: 2rem; font-weight: 700;">95%</div>
                        <div style="opacity: 0.8;">Accuracy Rate</div>
                    </div>
                    <div>
                        <div style="font-size: 2rem; font-weight: 700;">15+</div>
                        <div style="opacity: 0.8;">Entity Types</div>
                    </div>
                </div>
            </div>
        `;
        
        // Replace browser content
        const browserContent = document.querySelector('.browser-content');
        browserContent.innerHTML = '';
        browserContent.appendChild(demoContent);
        
        // Add demo functionality
        window.analyzePII = function() {
            const input = document.getElementById('demo-input').value;
            const results = document.getElementById('demo-results');
            
            if (!input.trim()) {
                results.innerHTML = '<div style="color: #ff6b6b; text-align: center;">Please enter some text to analyze.</div>';
                return;
            }
            
            // Simulate analysis
            results.innerHTML = '<div style="text-align: center; opacity: 0.7;"><div style="font-size: 2rem; margin-bottom: 20px;">⏳</div><p>Analyzing text...</p></div>';
            
            setTimeout(() => {
                const detectedEntities = [
                    { type: 'PERSON', value: 'John Smith', confidence: 0.98, start: 15, end: 25 },
                    { type: 'EMAIL_ADDRESS', value: 'john.smith@email.com', confidence: 0.99, start: 45, end: 68 },
                    { type: 'LOCATION', value: '123 Main Street, New York, NY 10001', confidence: 0.95, start: 85, end: 120 },
                    { type: 'PHONE_NUMBER', value: '(555) 123-4567', confidence: 0.97, start: 130, end: 145 },
                    { type: 'US_SSN', value: '123-45-6789', confidence: 0.99, start: 165, end: 176 }
                ];
                
                let resultsHTML = '<div style="margin-bottom: 20px;"><h3 style="margin-bottom: 15px;">✅ Detected Entities:</h3>';
                
                detectedEntities.forEach(entity => {
                    const confidenceColor = entity.confidence > 0.95 ? '#4ade80' : entity.confidence > 0.9 ? '#fbbf24' : '#ef4444';
                    resultsHTML += `
                        <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid ${confidenceColor};">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                                <strong>${entity.type}</strong>
                                <span style="color: ${confidenceColor}; font-weight: 600;">${Math.round(entity.confidence * 100)}%</span>
                            </div>
                            <div style="opacity: 0.9;">"${entity.value}"</div>
                        </div>
                    `;
                });
                
                resultsHTML += '</div>';
                resultsHTML += '<div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px;"><h3 style="margin-bottom: 10px;">🔒 Anonymized Text:</h3><p style="opacity: 0.9;">Hi, my name is <span style="background: #4ade80; padding: 2px 6px; border-radius: 4px;">[PERSON]</span> and my email is <span style="background: #4ade80; padding: 2px 6px; border-radius: 4px;">[EMAIL]</span>. I live at <span style="background: #4ade80; padding: 2px 6px; border-radius: 4px;">[LOCATION]</span>. My phone number is <span style="background: #4ade80; padding: 2px 6px; border-radius: 4px;">[PHONE]</span> and my SSN is <span style="background: #4ade80; padding: 2px 6px; border-radius: 4px;">[SSN]</span>.</p></div>';
                
                results.innerHTML = resultsHTML;
            }, 1500);
        };
        
        // Add tab close functionality
        newTab.querySelector('.tab-close').addEventListener('click', function() {
            newTab.remove();
            // Switch back to profile tab
            const profileTab = document.querySelector('[data-page="profile"]');
            if (profileTab) {
                profileTab.classList.add('active');
                currentUrl.textContent = 'https://alireza-mahdavi.dev';
                // Restore original content
                browserContent.innerHTML = document.querySelector('.social-profile').outerHTML;
            }
        });
    }

    // Dock item click functionality
    document.querySelectorAll('.dock-item').forEach(item => {
        item.addEventListener('click', function() {
            const skill = this.getAttribute('data-skill');
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show skill info
            showSkillInfo(skill);
        });
    });

    // Browser controls functionality
    document.querySelector('.control.close').addEventListener('click', function() {
        // Add close animation
        document.querySelector('.browser-window').style.transform = 'scale(0.95)';
        document.querySelector('.browser-window').style.opacity = '0';
        
        setTimeout(() => {
            document.querySelector('.browser-window').style.transform = '';
            document.querySelector('.browser-window').style.opacity = '';
        }, 300);
    });

    document.querySelector('.control.minimize').addEventListener('click', function() {
        // Add minimize animation
        document.querySelector('.browser-window').style.transform = 'scale(0.8) translateY(100px)';
        document.querySelector('.browser-window').style.opacity = '0.5';
        
        setTimeout(() => {
            document.querySelector('.browser-window').style.transform = '';
            document.querySelector('.browser-window').style.opacity = '';
        }, 300);
    });

    document.querySelector('.control.maximize').addEventListener('click', function() {
        const browserWindow = document.querySelector('.browser-window');
        
        if (browserWindow.classList.contains('maximized')) {
            browserWindow.classList.remove('maximized');
            browserWindow.style.left = '340px';
            browserWindow.style.top = '20px';
            browserWindow.style.right = '20px';
            browserWindow.style.bottom = '100px';
        } else {
            browserWindow.classList.add('maximized');
            browserWindow.style.left = '20px';
            browserWindow.style.top = '20px';
            browserWindow.style.right = '20px';
            browserWindow.style.bottom = '100px';
        }
    });

    // Function to show skill information
    function showSkillInfo(skill) {
        const skillInfo = {
            'python': 'Python - 95% proficiency\nAI/ML, Data Science, Backend Development',
            'react': 'React/Next.js - 85% proficiency\nFrontend Development, UI/UX, Full-Stack',
            'js': 'JavaScript - 80% proficiency\nWeb Development, Node.js, Frontend',
            'node': 'Node.js - 75% proficiency\nBackend Development, APIs, Server-side',
            'git': 'Git/GitHub - 90% proficiency\nVersion Control, Collaboration, CI/CD',
            'aws': 'AWS - 70% proficiency\nCloud Services, Deployment, Infrastructure',
            'docker': 'Docker - 75% proficiency\nContainerization, DevOps, Deployment',
            'database': 'Database - 85% proficiency\nSQL, PostgreSQL, MongoDB, Redis',
            'ai': 'AI/ML - 90% proficiency\nNLP, LLMs, PyTorch, TensorFlow',
            'code': 'Programming - 95% proficiency\nMultiple Languages, Problem Solving',
            'terminal': 'Terminal - 80% proficiency\nLinux, Command Line, Automation',
            'settings': 'Configuration - 75% proficiency\nSystem Setup, Optimization'
        };

        // Create temporary notification
        const notification = document.createElement('div');
        notification.className = 'skill-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <h4>${skillInfo[skill].split(' - ')[0]}</h4>
                <p>${skillInfo[skill].split(' - ')[1]}</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Add CSS for skill notification
    const style = document.createElement('style');
    style.textContent = `
        .skill-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 16px;
            border-radius: 8px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        }
        
        .notification-content h4 {
            margin: 0 0 8px 0;
            color: #4ade80;
        }
        
        .notification-content p {
            margin: 0;
            font-size: 12px;
            line-height: 1.4;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);

    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
}); 