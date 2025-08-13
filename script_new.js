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
            browserWindow.style.transform = 'scale(0.95)';
            setTimeout(() => {
                browserWindow.style.opacity = '1';
                browserWindow.style.transform = 'scale(1)';
            }, 200);
        });
    }

    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', function() {
            browserWindow.style.transform = 'scale(0.8) translateY(50px)';
            browserWindow.style.opacity = '0.8';
            setTimeout(() => {
                browserWindow.style.transform = 'scale(1) translateY(0)';
                browserWindow.style.opacity = '1';
            }, 300);
        });
    }

    if (maximizeBtn) {
        maximizeBtn.addEventListener('click', function() {
            if (browserWindow.classList.contains('maximized')) {
                browserWindow.classList.remove('maximized');
                browserWindow.style.left = '340px';
                browserWindow.style.top = '40px';
                browserWindow.style.right = '40px';
                browserWindow.style.bottom = '120px';
            } else {
                browserWindow.classList.add('maximized');
                browserWindow.style.left = '20px';
                browserWindow.style.top = '20px';
                browserWindow.style.right = '20px';
                browserWindow.style.bottom = '100px';
            }
        });
    }

    // Dock item click functionality
    document.querySelectorAll('.dock-item').forEach(item => {
        item.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Initialize with profile tab
    showTabContent('profile');

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
            if (projectsTab) projectsTab.style.display = 'none';
            if (highlightsTab) highlightsTab.style.display = 'none';
            if (skillsTab) skillsTab.style.display = 'none';
            
            if (tabName === 'projects' && projectsTab) {
                projectsTab.style.display = 'grid';
            } else if (tabName === 'highlights' && highlightsTab) {
                highlightsTab.style.display = 'block';
            } else if (tabName === 'skills' && skillsTab) {
                skillsTab.style.display = 'block';
            }
        });
    });
});
