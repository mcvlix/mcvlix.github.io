import Experience from './src/Experience/Experience.js'
import { projects } from './.INFO/projects.js'
import { blogs } from './.INFO/blogs.js'
import { publications } from './.INFO/publications.js'
import { Navigation } from './js/navigation.js'
import { Animations } from './js/animations.js'
import { Accessibility } from './js/accessibility.js'

// Initialize modules
let navigation, animations, accessibility;

// Get DOM elements
const projectSlider = document.getElementById('projectSlider');
const blogSlider = document.getElementById('blogSlider');
const publicationSlider = document.getElementById('publicationSlider');
const projectDisplay = document.getElementById('projectDisplay');
const blogDisplay = document.getElementById('blogDisplay');
const publicationDisplay = document.getElementById('publicationDisplay');
const scrollToTopBtn = document.getElementById('scrollToTop');
const commandPalette = document.getElementById('commandPalette');
const commandInput = document.getElementById('commandInput');
const commandResults = document.getElementById('commandResults');
const projectControls = document.getElementById('projectControls');
const blogControls = document.getElementById('blogControls');
const publicationControls = document.getElementById('publicationControls');
const projectSearch = document.getElementById('projectSearch');
const blogSearch = document.getElementById('blogSearch');
const publicationSearch = document.getElementById('publicationSearch');
const projectFilters = document.getElementById('projectFilters');
const blogFilters = document.getElementById('blogFilters');
const publicationFilters = document.getElementById('publicationFilters');

// Current active tab
let activeTab = 'projects'; // 'projects', 'blogs', or 'publications'

// Initialize WebGL experience
const experience = new Experience(document.querySelector('canvas.webgl'))
const mainBox = document.querySelector('.main-box');

// Function to revert to front page (about page)
function revertToFrontPage() {
    // Only affect display boxes - catalog stays completely unchanged
    let hasActiveDisplay = false;
    
    // Handle project display fade-out
    if (projectDisplay && projectDisplay.classList.contains('active')) {
        hasActiveDisplay = true;
        
        // Preserve dimensions during fade-out
        const rect = projectDisplay.getBoundingClientRect();
        projectDisplay.style.setProperty('--fade-out-width', `${rect.width}px`);
        projectDisplay.style.setProperty('--fade-out-height', `${rect.height}px`);
        projectDisplay.style.setProperty('--fade-out-max-width', `${rect.width}px`);
        projectDisplay.style.setProperty('--fade-out-min-height', `${rect.height}px`);
        
        // Start fade-out-down transition
        projectDisplay.classList.add('fade-out-down');
        projectDisplay.classList.remove('active');
        
        // After fade-out completes, clean up and hide
        setTimeout(() => {
            projectDisplay.classList.remove('fade-out-down');
            projectDisplay.style.visibility = 'hidden';
            // Clear dimension styles
            projectDisplay.style.removeProperty('--fade-out-width');
            projectDisplay.style.removeProperty('--fade-out-height');
            projectDisplay.style.removeProperty('--fade-out-max-width');
            projectDisplay.style.removeProperty('--fade-out-min-height');
        }, 400);
    }
    
    // Handle blog display fade-out
    if (blogDisplay && blogDisplay.classList.contains('active')) {
        hasActiveDisplay = true;
        
        // Preserve dimensions during fade-out
        const rect = blogDisplay.getBoundingClientRect();
        blogDisplay.style.setProperty('--fade-out-width', `${rect.width}px`);
        blogDisplay.style.setProperty('--fade-out-height', `${rect.height}px`);
        blogDisplay.style.setProperty('--fade-out-max-width', `${rect.width}px`);
        blogDisplay.style.setProperty('--fade-out-min-height', `${rect.height}px`);
        
        // Start fade-out-down transition
        blogDisplay.classList.add('fade-out-down');
        blogDisplay.classList.remove('active');
        
        // After fade-out completes, clean up and hide
        setTimeout(() => {
            blogDisplay.classList.remove('fade-out-down');
            blogDisplay.style.visibility = 'hidden';
            // Clear dimension styles
            blogDisplay.style.removeProperty('--fade-out-width');
            blogDisplay.style.removeProperty('--fade-out-height');
            blogDisplay.style.removeProperty('--fade-out-max-width');
            blogDisplay.style.removeProperty('--fade-out-min-height');
        }, 400);
    }
    
    // Handle publication display fade-out
    if (publicationDisplay && publicationDisplay.classList.contains('active')) {
        hasActiveDisplay = true;
        
        // Preserve dimensions during fade-out
        const rect = publicationDisplay.getBoundingClientRect();
        publicationDisplay.style.setProperty('--fade-out-width', `${rect.width}px`);
        publicationDisplay.style.setProperty('--fade-out-height', `${rect.height}px`);
        publicationDisplay.style.setProperty('--fade-out-max-width', `${rect.width}px`);
        publicationDisplay.style.setProperty('--fade-out-min-height', `${rect.height}px`);
        
        // Start fade-out-down transition
        publicationDisplay.classList.add('fade-out-down');
        publicationDisplay.classList.remove('active');
        
        // After fade-out completes, clean up and hide
        setTimeout(() => {
            publicationDisplay.classList.remove('fade-out-down');
            publicationDisplay.style.visibility = 'hidden';
            // Clear dimension styles
            publicationDisplay.style.removeProperty('--fade-out-width');
            publicationDisplay.style.removeProperty('--fade-out-height');
            publicationDisplay.style.removeProperty('--fade-out-max-width');
            publicationDisplay.style.removeProperty('--fade-out-min-height');
        }, 400);
    }
    
    // Only remove focused states after fade-out completes to prevent main box from resizing prematurely
    if (hasActiveDisplay) {
        setTimeout(() => {
            document.body.classList.remove('project-focused', 'blog-focused', 'publication-focused');
            // Update main-box bottom position after displays close
            if (window.innerWidth <= 1800) {
                updateMainBoxBottom();
            }
        }, 400);
    } else {
        // If no display was active, remove focused states immediately
        document.body.classList.remove('project-focused', 'blog-focused', 'publication-focused');
        // Update main-box bottom position
        if (window.innerWidth <= 1800) {
            updateMainBoxBottom();
        }
    }
    
    // Note: We intentionally do NOT remove active state from catalog items
    // The catalog should remain completely unchanged - only the display box changes
    // The catalog item can stay highlighted even when the display is closed
    
    // Reset display title underlines
    setTimeout(() => {
        if (projectDisplay && projectDisplay.querySelector('.project-display-title')) {
            const projectDisplayTitle = projectDisplay.querySelector('.project-display-title');
            projectDisplayTitle.style.borderImage = 'radial-gradient(#b0b0b0, #d0d0d0)';
            projectDisplayTitle.style.borderImageSlice = '1';
        }
        if (blogDisplay && blogDisplay.querySelector('.project-display-title')) {
            const blogDisplayTitle = blogDisplay.querySelector('.project-display-title');
            blogDisplayTitle.style.borderImage = 'radial-gradient(#b0b0b0, #d0d0d0)';
            blogDisplayTitle.style.borderImageSlice = '1';
        }
    }, 200);
    
    // Announce to screen readers
    if (accessibility) {
        accessibility.announce('Returned to about page', 'polite');
    }
}

// Main box click handler
if (mainBox) {
    mainBox.addEventListener('click', (e) => {
        // Don't handle clicks on minimize button
        if (e.target.closest('.minimize-btn')) {
            return;
        }
        
        // If minimized in opening mode, just expand it
        if (mainBox.classList.contains('minimized') && 
            !document.body.classList.contains('project-focused') && 
            !document.body.classList.contains('blog-focused') && 
            !document.body.classList.contains('publication-focused')) {
            e.preventDefault();
            toggleMinimizeMainBox();
            return;
        }
        
        // If project/blog/publication is focused, revert to front page
        if (document.body.classList.contains('project-focused') || document.body.classList.contains('blog-focused') || document.body.classList.contains('publication-focused')) {
            e.preventDefault();
            revertToFrontPage();
        } else {
            // Otherwise, open projects slider (default)
            displayProjectsSlider();
        }
    });
}

// Make display functions globally accessible immediately (before DOMContentLoaded)
window.displayProjectsSlider = displayProjectsSlider;
window.displayBlogsSlider = displayBlogsSlider;
window.displayPublicationsSlider = displayPublicationsSlider;
window.revertToFrontPage = revertToFrontPage;

/**
 * Dynamically populate projects slider with data from projects.js
 */
function populateProjectsSlider() {
    if (!projectSlider) return;
    
    const projectsContainer = document.getElementById('projectsContainer');
    if (!projectsContainer) return;
    
    // Clear existing content
    projectsContainer.innerHTML = '';
    
    projects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item';
        projectItem.id = project.id || `project-${index}`; // Add ID
        projectItem.setAttribute('data-id', project.id || `project-${index}`); // Add data-id
        projectItem.setAttribute('data-project', index);
        projectItem.setAttribute('data-category', 'project');
        projectItem.setAttribute('role', 'listitem');
        projectItem.setAttribute('tabindex', '0');
        projectItem.setAttribute('aria-label', `Project: ${project.title}`);
        
        projectItem.innerHTML = `
            <h3 class="project-item-title">${project.title}</h3>
            <p class="project-item-preview">${project.summary}</p>
            <p class="project-item-tags">${project.tags}</p>
            <p class="project-display-date">${project.date}</p>
        `;
        
        // Apply gradient to the title's border
        const projectItemTitle = projectItem.querySelector('.project-item-title');
        if (projectItemTitle && project.gradient) {
        projectItemTitle.style.borderImageSource = project.gradient;
        projectItemTitle.style.borderImageSlice = "1";
        }
        
        // Store gradient for active state border
        projectItem.setAttribute('data-gradient', project.gradient || '');
        
        // Add click handler
        projectItem.addEventListener('click', () => toggleProject(index));
        
        // Add keyboard support
        projectItem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleProject(index);
            }
        });
        
            projectsContainer.appendChild(projectItem);
    });
}

/**
 * Dynamically populate blogs slider with data from blogs.js
 */
function populateBlogsSlider() {
    if (!blogSlider) return;
    
    const blogsContainer = document.getElementById('blogsContainer');
    if (!blogsContainer) return;
    
    // Clear existing content
    blogsContainer.innerHTML = '';
    
    blogs.forEach((blog, index) => {
        const blogItem = document.createElement('div');
        blogItem.className = 'project-item';
        blogItem.id = blog.id || `blog-${index}`; // Add ID
        blogItem.setAttribute('data-id', blog.id || `blog-${index}`); // Add data-id
        blogItem.setAttribute('data-blog', index);
        blogItem.setAttribute('data-category', 'blog');
        blogItem.setAttribute('role', 'listitem');
        blogItem.setAttribute('tabindex', '0');
        blogItem.setAttribute('aria-label', `Blog: ${blog.title}`);
        
        blogItem.innerHTML = `
            <h3 class="project-item-title">${blog.title}</h3>
            <p class="project-item-preview">${blog.summary}</p>
            <p class="project-item-tags">${blog.tags}</p>
            <p class="project-display-date">${blog.date}</p>
        `;
        
        // Apply gradient to the title's border
        const blogItemTitle = blogItem.querySelector('.project-item-title');
        if (blogItemTitle && blog.gradient) {
            blogItemTitle.style.borderImageSource = blog.gradient;
            blogItemTitle.style.borderImageSlice = "1";
        }
        
        // Store gradient for active state border
        blogItem.setAttribute('data-gradient', blog.gradient || '');
        
        // Add click handler
        blogItem.addEventListener('click', () => toggleBlog(index));
        
        // Add keyboard support
        blogItem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleBlog(index);
            }
        });
        
        blogsContainer.appendChild(blogItem);
    });
}

/**
 * Dynamically populate publications slider with data from publications.js
 */
function populatePublicationsSlider() {
    if (!publicationSlider) return;
    
    const publicationsContainer = document.getElementById('publicationsContainer');
    if (!publicationsContainer) return;
    
    // Clear existing content
    publicationsContainer.innerHTML = '';
    
    publications.forEach((publication, index) => {
        const publicationItem = document.createElement('div');
        publicationItem.className = 'project-item';
        publicationItem.id = publication.id || `publication-${index}`; // Add ID
        publicationItem.setAttribute('data-id', publication.id || `publication-${index}`); // Add data-id
        publicationItem.setAttribute('data-publication', index);
        publicationItem.setAttribute('data-category', 'publication');
        publicationItem.setAttribute('role', 'listitem');
        publicationItem.setAttribute('tabindex', '0');
        publicationItem.setAttribute('aria-label', `Publication: ${publication.title}`);
        
        publicationItem.innerHTML = `
            <h3 class="project-item-title">${publication.title}</h3>
            <p class="project-item-preview">${publication.summary}</p>
            <p class="project-item-tags">${publication.tags}</p>
            <p class="project-display-date">${publication.date}</p>
        `;
        
        // Apply gradient to the title's border
        const publicationItemTitle = publicationItem.querySelector('.project-item-title');
        if (publicationItemTitle && publication.gradient) {
            publicationItemTitle.style.borderImageSource = publication.gradient;
            publicationItemTitle.style.borderImageSlice = "1";
        }
        
        // Store gradient for active state border
        publicationItem.setAttribute('data-gradient', publication.gradient || '');
        
        // Add click handler
        publicationItem.addEventListener('click', () => togglePublication(index));
        
        // Add keyboard support
        publicationItem.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                togglePublication(index);
            }
        });
        
        publicationsContainer.appendChild(publicationItem);
    });
}

/**
 * Function to display the projects slider (toggle) - only affects slider visibility
 */
function displayProjectsSlider() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;
    
    const catalogContainer = projectsSection.querySelector('.projects-catalog-container');
    const slider = document.getElementById('projectSlider');
    const controls = document.getElementById('projectControls');
    
    if (!catalogContainer || !slider) {
        console.error('Projects catalog container or slider element not found!');
        return;
    }
    
    const isOpening = !catalogContainer.classList.contains('show');
    
    if (isOpening) {
        // Close all other catalogs if open
        closeBlogsSlider();
        closePublicationsSlider();
        
        // Add show class - CSS will handle the fade-in transition
        catalogContainer.classList.add('show');
        slider.classList.add('show');
        if (controls) {
            controls.classList.add('show');
}

        // Setup filters when opening
        if (controls) {
            setupProjectFilters();
            // Reset to show all projects and clear search
            filterProjects('all');
        }
        
        activeTab = 'projects';
    } else {
        // Remove show class - CSS will handle the fade-out transition
        catalogContainer.classList.remove('show');
        slider.classList.remove('show');
        if (controls) {
            controls.classList.remove('show');
        }
    }
    
    // Announce to screen readers
    if (accessibility) {
        const isOpen = catalogContainer.classList.contains('show');
        accessibility.announce(
            isOpen ? 'Projects panel opened' : 'Projects panel closed',
            'polite'
        );
    }
}

/**
 * Function to display the blogs slider (toggle) - only affects slider visibility
 */
function displayBlogsSlider() {
    const blogsSection = document.getElementById('blogs');
    if (!blogsSection) return;
    
    const catalogContainer = blogsSection.querySelector('.projects-catalog-container');
    const slider = document.getElementById('blogSlider');
    const controls = document.getElementById('blogControls');
    
    if (!catalogContainer || !slider) {
        console.error('Blogs catalog container or slider element not found!');
        return;
    }
    
    const isOpening = !catalogContainer.classList.contains('show');
    
    if (isOpening) {
        // Close all other catalogs if open
        closeProjectsSlider();
        closePublicationsSlider();
        
        // Add show class - CSS will handle the fade-in transition
        catalogContainer.classList.add('show');
        slider.classList.add('show');
        if (controls) {
            controls.classList.add('show');
        }

        // Setup filters when opening
        if (controls) {
            setupBlogFilters();
            // Reset to show all blogs and clear search
            filterBlogs('all');
        }
        
        activeTab = 'blogs';
    } else {
        // Remove show class - CSS will handle the fade-out transition
        catalogContainer.classList.remove('show');
        slider.classList.remove('show');
        if (controls) {
            controls.classList.remove('show');
        }
}

    // Announce to screen readers
    if (accessibility) {
        const isOpen = catalogContainer.classList.contains('show');
        accessibility.announce(
            isOpen ? 'Blogs panel opened' : 'Blogs panel closed',
            'polite'
        );
    }
}

/**
 * Close projects slider
 */
function closeProjectsSlider() {
    const projectsSection = document.getElementById('projects');
    if (!projectsSection) return;
    const catalogContainer = projectsSection.querySelector('.projects-catalog-container');
    const slider = document.getElementById('projectSlider');
    const controls = document.getElementById('projectControls');
    
    if (catalogContainer) catalogContainer.classList.remove('show');
    if (slider) slider.classList.remove('show');
    if (controls) controls.classList.remove('show');
}

/**
 * Close blogs slider
 */
function closeBlogsSlider() {
    const blogsSection = document.getElementById('blogs');
    if (!blogsSection) return;
    const catalogContainer = blogsSection.querySelector('.projects-catalog-container');
    const slider = document.getElementById('blogSlider');
    const controls = document.getElementById('blogControls');
    
    if (catalogContainer) catalogContainer.classList.remove('show');
    if (slider) slider.classList.remove('show');
    if (controls) controls.classList.remove('show');
}

/**
 * Function to display the publications slider (toggle) - only affects slider visibility
 */
function displayPublicationsSlider() {
    const publicationsSection = document.getElementById('publications');
    if (!publicationsSection) return;
    
    const catalogContainer = publicationsSection.querySelector('.projects-catalog-container');
    const slider = document.getElementById('publicationSlider');
    const controls = document.getElementById('publicationControls');
    
    if (!catalogContainer || !slider) {
        console.error('Publications catalog container or slider element not found!');
        return;
    }
    
    const isOpening = !catalogContainer.classList.contains('show');
    
    if (isOpening) {
        // Close projects and blogs if open
        closeProjectsSlider();
        closeBlogsSlider();
        
        // Add show class - CSS will handle the fade-in transition
        catalogContainer.classList.add('show');
        slider.classList.add('show');
        if (controls) {
            controls.classList.add('show');
        }

        // Setup filters when opening
        if (controls) {
            setupPublicationFilters();
            // Reset to show all publications and clear search
            filterPublications('all');
        }
        
        activeTab = 'publications';
    } else {
        // Remove show class - CSS will handle the fade-out transition
        catalogContainer.classList.remove('show');
        slider.classList.remove('show');
        if (controls) {
            controls.classList.remove('show');
        }
    }
    
    // Announce to screen readers
    if (accessibility) {
        const isOpen = catalogContainer.classList.contains('show');
        accessibility.announce(
            isOpen ? 'Publications panel opened' : 'Publications panel closed',
            'polite'
        );
    }
}

/**
 * Close publications slider
 */
function closePublicationsSlider() {
    const publicationsSection = document.getElementById('publications');
    if (!publicationsSection) return;
    const catalogContainer = publicationsSection.querySelector('.projects-catalog-container');
    const slider = document.getElementById('publicationSlider');
    const controls = document.getElementById('publicationControls');
    
    if (catalogContainer) catalogContainer.classList.remove('show');
    if (slider) slider.classList.remove('show');
    if (controls) controls.classList.remove('show');
}

// Make display functions globally accessible for navigation
window.displayProjectsSlider = displayProjectsSlider;
window.displayBlogsSlider = displayBlogsSlider;
window.displayPublicationsSlider = displayPublicationsSlider;

/**
 * Function to toggle project details (display or hide if already active)
 */
function toggleProject(projectIndex) {
    const project = projects[projectIndex];
    if (!project) return;
    
    // Close publications catalog if open
    closePublicationsSlider();
    
    const projectItems = document.querySelectorAll('#projectsContainer .project-item');
    const clickedItem = projectItems[projectIndex];
    
    if (!clickedItem || !projectDisplay) return;

    // Update URL hash
    if (!clickedItem.classList.contains('active')) {
        history.pushState(null, null, `#${project.id || `project-${projectIndex}`}`);
    } else {
        // Remove hash if closing
        history.pushState(null, null, ' ');
    }
    
    // If clicking the already active item, deactivate it
    if (clickedItem.classList.contains('active')) {
        // Fade out project display
        if (projectDisplay.classList.contains('active')) {
            projectDisplay.classList.remove('active');
        }
        
        // Fade out active item
        clickedItem.classList.remove('active');
        clickedItem.style.borderImageSource = '';
        
        document.body.classList.remove('project-focused');
        
        // Reset title underline to original gradient when deactivating
        setTimeout(() => {
            if (projectDisplay.querySelector('.project-display-title')) {
                const projectDisplayTitle = projectDisplay.querySelector('.project-display-title');
                projectDisplayTitle.style.borderImage = 'radial-gradient(#b0b0b0, #d0d0d0)';
                projectDisplayTitle.style.borderImageSlice = '1'; 
            }
        }, 200);
        
        // Announce to screen readers
        if (accessibility) {
            accessibility.announce('Project details closed', 'polite');
        }
        return;
    }
    
    // Close blog display if open - with seamless fade-out transition
    if (blogDisplay && blogDisplay.classList.contains('active')) {
        // Preserve dimensions during fade-out
        const rect = blogDisplay.getBoundingClientRect();
        blogDisplay.style.width = `${rect.width}px`;
        blogDisplay.style.height = `${rect.height}px`;
        blogDisplay.style.minHeight = `${rect.height}px`;
        blogDisplay.style.maxWidth = `${rect.width}px`;
        
        blogDisplay.classList.add('fade-out-down');
        blogDisplay.classList.remove('active');
        // DO NOT remove blog-focused yet - keep main box miniature during transition
        // It will be replaced by project-focused when project appears
        const activeBlogItems = document.querySelectorAll('#blogsContainer .project-item.active');
        activeBlogItems.forEach(item => {
            item.classList.remove('active');
            item.style.borderImageSource = '';
        });
        
        // Wait for fade-out to complete, then show project seamlessly
        setTimeout(() => {
            blogDisplay.classList.remove('fade-out-down');
            blogDisplay.style.visibility = 'hidden';
            blogDisplay.style.removeProperty('width');
            blogDisplay.style.removeProperty('height');
            blogDisplay.style.removeProperty('min-height');
            blogDisplay.style.removeProperty('max-width');
            
            // Remove blog-focused and show project with seamless fade-in
            // The project-focused will be added by displayProject, keeping main box miniature
            document.body.classList.remove('blog-focused');
            displayProject(projectIndex);
        }, 400);
        return; // Exit early to prevent double handling
    }
    
    // Close publication display if open - with seamless fade-out transition
    if (publicationDisplay && publicationDisplay.classList.contains('active')) {
        // Preserve dimensions during fade-out
        const rect = publicationDisplay.getBoundingClientRect();
        publicationDisplay.style.width = `${rect.width}px`;
        publicationDisplay.style.height = `${rect.height}px`;
        publicationDisplay.style.minHeight = `${rect.height}px`;
        publicationDisplay.style.maxWidth = `${rect.width}px`;
        
        publicationDisplay.classList.add('fade-out-down');
        publicationDisplay.classList.remove('active');
        // DO NOT remove publication-focused yet - keep main box miniature during transition
        // It will be replaced by project-focused when project appears
        const activePublicationItems = document.querySelectorAll('#publicationsContainer .project-item.active');
        activePublicationItems.forEach(item => {
            item.classList.remove('active');
            item.style.borderImageSource = '';
        });
        
        setTimeout(() => {
            publicationDisplay.classList.remove('fade-out-down');
            publicationDisplay.style.visibility = 'hidden';
            publicationDisplay.style.removeProperty('width');
            publicationDisplay.style.removeProperty('height');
            publicationDisplay.style.removeProperty('min-height');
            publicationDisplay.style.removeProperty('max-width');
            
            // Remove publication-focused and show project with seamless fade-in
            // The project-focused will be added by displayProject, keeping main box miniature
            document.body.classList.remove('publication-focused');
            displayProject(projectIndex);
        }, 400);
        return; // Exit early to prevent double handling
    }
    
    // If another project is currently active, transition seamlessly
    if (projectDisplay.classList.contains('active')) {
        // Prepare new content
        const project = projects[projectIndex];
        
        // Fade out current active item
        const currentActiveItem = Array.from(projectItems).find(item => item.classList.contains('active'));
        if (currentActiveItem) {
            currentActiveItem.classList.remove('active');
            currentActiveItem.style.borderImageSource = '';
        }
        
        // Store current dimensions to prevent size changes during fade-out
        const rect = projectDisplay.getBoundingClientRect();
        const currentWidth = rect.width;
        const currentHeight = rect.height;
        
        // Preserve dimensions during fade-out
        projectDisplay.style.width = `${currentWidth}px`;
        projectDisplay.style.height = `${currentHeight}px`;
        projectDisplay.style.minHeight = `${currentHeight}px`;
        projectDisplay.style.maxWidth = `${currentWidth}px`;
        
        // Start fade-out-down transition on current content
        projectDisplay.classList.add('fade-out-down');
        projectDisplay.classList.remove('active');
        
        // Wait for fade-out to complete, then show new content
        setTimeout(() => {
            // Clear dimension preservation
            projectDisplay.style.removeProperty('width');
            projectDisplay.style.removeProperty('height');
            projectDisplay.style.removeProperty('min-height');
            projectDisplay.style.removeProperty('max-width');
            
            // Now set new content
            projectDisplay.innerHTML = `
                <div class="project-display-title">${project.title}</div>
                <div class="project-display-description">${project.description}</div>
                <div class="project-display-tags">${project.tags}</div>
                <div class="project-display-date">${project.date}</div>
            `;
            
            // Apply gradients dynamically to the project display box border
            if (project.gradient) {
                projectDisplay.style.borderImageSource = project.gradient;
                projectDisplay.style.borderImageRadius = "10px";
                projectDisplay.style.borderImageSlice = "1";
            }
            
            // Set gray underline for active project display title
            const projectDisplayTitle = projectDisplay.querySelector('.project-display-title');
            if (projectDisplayTitle) {
                projectDisplayTitle.style.borderImage = 'radial-gradient(#b0b0b0, #d0d0d0)';
                projectDisplayTitle.style.borderImageSlice = '1';
            }
            
            // Remove fade-out-down, add fade-in-up
            projectDisplay.classList.remove('fade-out-down');
            projectDisplay.classList.add('fade-in-up');
            projectDisplay.style.visibility = 'visible';
            
            // Trigger fade-in-up animation
            requestAnimationFrame(() => {
                projectDisplay.classList.add('active');
                document.body.classList.add('project-focused');
                
                // Position project display based on overlap with main box
                if (window.innerWidth > 1024) {
                    setTimeout(() => {
                        positionProjectDisplay();
                    }, 50);
                }
            });
            
            // Update active item
            const activeItem = projectItems[projectIndex];
            if (activeItem) {
                const gradient = activeItem.getAttribute('data-gradient');
                if (gradient) {
                    activeItem.style.borderImageSource = gradient;
                    activeItem.style.borderImageSlice = "1";
                }
                activeItem.classList.add('active');
            }
            
            // Render MathJax
            if (window.MathJax) {
                MathJax.typesetPromise([projectDisplay]).catch(err => console.log(err.message));
            }
            
            // Remove fade-in-up class after transition completes
            setTimeout(() => {
                projectDisplay.classList.remove('fade-in-up');
            }, 400);
        }, 400); // Wait for fade-out to complete
    } else {
        // No active project, but check if blog is open
        if (blogDisplay && blogDisplay.classList.contains('active')) {
            // Blog is open, wait for it to fade out first
            // Preserve dimensions during fade-out
            const rect = blogDisplay.getBoundingClientRect();
            blogDisplay.style.width = `${rect.width}px`;
            blogDisplay.style.height = `${rect.height}px`;
            blogDisplay.style.minHeight = `${rect.height}px`;
            blogDisplay.style.maxWidth = `${rect.width}px`;
            
            blogDisplay.classList.add('fade-out-down');
            blogDisplay.classList.remove('active');
            document.body.classList.remove('blog-focused');
            const activeBlogItems = document.querySelectorAll('#blogsContainer .project-item.active');
            activeBlogItems.forEach(item => {
                item.classList.remove('active');
                item.style.borderImageSource = '';
            });
            
            // Wait for fade-out, then show project
            setTimeout(() => {
                blogDisplay.classList.remove('fade-out-down');
                blogDisplay.style.visibility = 'hidden';
                blogDisplay.style.removeProperty('width');
                blogDisplay.style.removeProperty('height');
                blogDisplay.style.removeProperty('min-height');
                blogDisplay.style.removeProperty('max-width');
            displayProject(projectIndex);
            }, 400);
    } else {
            // No active project or blog, display immediately
        displayProject(projectIndex);
        }
    }
}

/**
 * Function to toggle blog details (display or hide if already active)
 */
function toggleBlog(blogIndex) {
    const blog = blogs[blogIndex];
    if (!blog) return;
    
    // Close publications catalog if open
    closePublicationsSlider();
    
    const blogItems = document.querySelectorAll('#blogsContainer .project-item');
    const clickedItem = blogItems[blogIndex];
    
    if (!clickedItem || !blogDisplay) return;

    // Update URL hash
    if (!clickedItem.classList.contains('active')) {
        history.pushState(null, null, `#${blog.id || ''}`);
    } else {
        // Remove hash if closing
        history.pushState(null, null, ' ');
    }
    
    // If clicking the already active item, deactivate it
    if (clickedItem.classList.contains('active')) {
        // Fade out blog display
        if (blogDisplay.classList.contains('active')) {
            blogDisplay.classList.remove('active');
        }
        
        // Fade out active item
        clickedItem.classList.remove('active');
        clickedItem.style.borderImageSource = '';
        
        document.body.classList.remove('blog-focused');
        
        // Reset title underline to original gradient when deactivating
        setTimeout(() => {
            if (blogDisplay.querySelector('.project-display-title')) {
                const blogDisplayTitle = blogDisplay.querySelector('.project-display-title');
                blogDisplayTitle.style.borderImage = 'radial-gradient(#b0b0b0, #d0d0d0)';
                blogDisplayTitle.style.borderImageSlice = '1'; 
            }
        }, 200);
        
        // Announce to screen readers
        if (accessibility) {
            accessibility.announce('Blog details closed', 'polite');
        }
        return;
    }
    
    // Close project display if open - with seamless fade-out transition
    if (projectDisplay && projectDisplay.classList.contains('active')) {
        // Preserve dimensions during fade-out
        const rect = projectDisplay.getBoundingClientRect();
        projectDisplay.style.width = `${rect.width}px`;
        projectDisplay.style.height = `${rect.height}px`;
        projectDisplay.style.minHeight = `${rect.height}px`;
        projectDisplay.style.maxWidth = `${rect.width}px`;
        
        projectDisplay.classList.add('fade-out-down');
        projectDisplay.classList.remove('active');
        // DO NOT remove project-focused yet - keep main box miniature during transition
        // It will be replaced by blog-focused when blog appears
        const activeProjectItems = document.querySelectorAll('#projectsContainer .project-item.active');
        activeProjectItems.forEach(item => {
            item.classList.remove('active');
            item.style.borderImageSource = '';
        });
        
        // Wait for fade-out to complete, then show blog seamlessly
        setTimeout(() => {
            projectDisplay.classList.remove('fade-out-down');
            projectDisplay.style.visibility = 'hidden';
            projectDisplay.style.removeProperty('width');
            projectDisplay.style.removeProperty('height');
            projectDisplay.style.removeProperty('min-height');
            projectDisplay.style.removeProperty('max-width');
            
            // Remove project-focused and show blog with seamless fade-in
            // The blog-focused will be added by displayBlog, keeping main box miniature
            document.body.classList.remove('project-focused');
            displayBlog(blogIndex);
        }, 400);
        return; // Exit early to prevent double handling
    }
    
    // Close publication display if open - with seamless fade-out transition
    if (publicationDisplay && publicationDisplay.classList.contains('active')) {
        // Preserve dimensions during fade-out
        const rect = publicationDisplay.getBoundingClientRect();
        publicationDisplay.style.width = `${rect.width}px`;
        publicationDisplay.style.height = `${rect.height}px`;
        publicationDisplay.style.minHeight = `${rect.height}px`;
        publicationDisplay.style.maxWidth = `${rect.width}px`;
        
        publicationDisplay.classList.add('fade-out-down');
        publicationDisplay.classList.remove('active');
        // DO NOT remove publication-focused yet - keep main box miniature during transition
        // It will be replaced by blog-focused when blog appears
        const activePublicationItems = document.querySelectorAll('#publicationsContainer .project-item.active');
        activePublicationItems.forEach(item => {
            item.classList.remove('active');
            item.style.borderImageSource = '';
        });
        
        setTimeout(() => {
            publicationDisplay.classList.remove('fade-out-down');
            publicationDisplay.style.visibility = 'hidden';
            publicationDisplay.style.removeProperty('width');
            publicationDisplay.style.removeProperty('height');
            publicationDisplay.style.removeProperty('min-height');
            publicationDisplay.style.removeProperty('max-width');
            
            // Remove publication-focused and show blog with seamless fade-in
            // The blog-focused will be added by displayBlog, keeping main box miniature
            document.body.classList.remove('publication-focused');
            displayBlog(blogIndex);
        }, 400);
        return; // Exit early to prevent double handling
    }
    
    // If another blog is currently active, transition seamlessly
    if (blogDisplay.classList.contains('active')) {
        // Prepare new content
        const blog = blogs[blogIndex];
        
        // Fade out current active item
        const currentActiveItem = Array.from(blogItems).find(item => item.classList.contains('active'));
        if (currentActiveItem) {
            currentActiveItem.classList.remove('active');
            currentActiveItem.style.borderImageSource = '';
        }
        
        // Store current dimensions to prevent size changes during fade-out
        const rect = blogDisplay.getBoundingClientRect();
        const currentWidth = rect.width;
        const currentHeight = rect.height;
        
        // Preserve dimensions during fade-out
        blogDisplay.style.width = `${currentWidth}px`;
        blogDisplay.style.height = `${currentHeight}px`;
        blogDisplay.style.minHeight = `${currentHeight}px`;
        blogDisplay.style.maxWidth = `${currentWidth}px`;
        
        // Start fade-out-down transition on current content
        blogDisplay.classList.add('fade-out-down');
        blogDisplay.classList.remove('active');
        
        // Wait for fade-out to complete, then show new content
        setTimeout(() => {
            // Clear dimension preservation
            blogDisplay.style.removeProperty('width');
            blogDisplay.style.removeProperty('height');
            blogDisplay.style.removeProperty('min-height');
            blogDisplay.style.removeProperty('max-width');
            
            // Now set new content
            blogDisplay.innerHTML = `
                <div class="project-display-title">${blog.title}</div>
                <div class="project-display-description">${blog.description}</div>
                <div class="project-display-tags">${blog.tags}</div>
                <div class="project-display-date">${blog.date}</div>
            `;
            
            // Apply gradients dynamically to the blog display box border
            if (blog.gradient) {
                blogDisplay.style.borderImageSource = blog.gradient;
                blogDisplay.style.borderImageRadius = "10px";
                blogDisplay.style.borderImageSlice = "1";
            }
            
            // Set gray underline for active blog display title
            const blogDisplayTitle = blogDisplay.querySelector('.project-display-title');
            if (blogDisplayTitle) {
                blogDisplayTitle.style.borderImage = 'radial-gradient(#b0b0b0, #d0d0d0)';
                blogDisplayTitle.style.borderImageSlice = '1';
            }
            
            // Remove fade-out-down, add fade-in-up
            blogDisplay.classList.remove('fade-out-down');
            blogDisplay.classList.add('fade-in-up');
            blogDisplay.style.visibility = 'visible';
            
            // Trigger fade-in-up animation
            requestAnimationFrame(() => {
                blogDisplay.classList.add('active');
                document.body.classList.add('blog-focused');
                
                // Position blog display based on overlap with main box
                if (window.innerWidth > 1024) {
                    setTimeout(() => {
                        positionBlogDisplay();
                    }, 50);
                }
                
                // Update main-box bottom position for half-screen layout
                if (window.innerWidth <= 1800) {
                    setTimeout(() => {
                        updateMainBoxBottom();
                    }, 100);
                }
            });
            
            // Update active item
            const activeItem = blogItems[blogIndex];
            if (activeItem) {
                const gradient = activeItem.getAttribute('data-gradient');
                if (gradient) {
                    activeItem.style.borderImageSource = gradient;
                    activeItem.style.borderImageSlice = "1";
                }
                activeItem.classList.add('active');
            }
            
            // Render MathJax
            if (window.MathJax) {
                MathJax.typesetPromise([blogDisplay]).catch(err => console.log(err.message));
            }
            
            // Remove fade-in-up class after transition completes
            setTimeout(() => {
                blogDisplay.classList.remove('fade-in-up');
            }, 400);
        }, 400); // Wait for fade-out to complete
    } else {
        // No active blog, but check if project is open
        if (projectDisplay && projectDisplay.classList.contains('active')) {
            // Project is open, wait for it to fade out first with seamless transition
            // Preserve dimensions during fade-out
            const rect = projectDisplay.getBoundingClientRect();
            projectDisplay.style.width = `${rect.width}px`;
            projectDisplay.style.height = `${rect.height}px`;
            projectDisplay.style.minHeight = `${rect.height}px`;
            projectDisplay.style.maxWidth = `${rect.width}px`;
            
            projectDisplay.classList.add('fade-out-down');
            projectDisplay.classList.remove('active');
            document.body.classList.remove('project-focused');
            const activeProjectItems = document.querySelectorAll('#projectsContainer .project-item.active');
            activeProjectItems.forEach(item => {
                item.classList.remove('active');
                item.style.borderImageSource = '';
            });
            
            // Wait for fade-out, then show blog seamlessly
            setTimeout(() => {
                projectDisplay.classList.remove('fade-out-down');
                projectDisplay.style.visibility = 'hidden';
                projectDisplay.style.removeProperty('width');
                projectDisplay.style.removeProperty('height');
                projectDisplay.style.removeProperty('min-height');
                projectDisplay.style.removeProperty('max-width');
                displayBlog(blogIndex);
            }, 400);
        } else {
            // No active blog or project, display immediately
            displayBlog(blogIndex);
        }
    }
}

/**
 * Function to display project details
 */
function displayProject(projectIndex) {
    const project = projects[projectIndex];
    if (!project || !projectDisplay) return;
    
    // Close all catalogs when displaying a project
    closeProjectsSlider();
    closeBlogsSlider();
    closePublicationsSlider();
    
    // If main box is minimized, remove minimized class to switch to summarized mode
    const mainBox = document.querySelector('.main-box');
    if (mainBox && mainBox.classList.contains('minimized')) {
        mainBox.classList.remove('minimized');
    }
    
    // Remove active class from projects nav link when displaying a project
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#projects') {
            link.classList.remove('active');
        }
    });
    
    const projectItems = document.querySelectorAll('#projectsContainer .project-item');

    projectDisplay.innerHTML = `
        <button class="permalink-btn" aria-label="Copy link to ${project.title}" title="Copy direct link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
        </button>
        <div class="project-display-title">${project.title}</div>
        <div class="project-display-description">${project.description}</div>
        <div class="project-display-tags">${project.tags}</div>
        <div class="project-display-date">${project.date}</div>
    `;

    // Attach copy listener
    const permalinkBtn = projectDisplay.querySelector('.permalink-btn');
    if (permalinkBtn) {
        permalinkBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(window.location.href).catch(err => console.error('Failed to copy URL', err));
        });
    }

    // Apply gradients dynamically to the project display box border
    if (project.gradient) {
    projectDisplay.style.borderImageSource = project.gradient;
    projectDisplay.style.borderImageRadius = "10px";
    projectDisplay.style.borderImageSlice = "1";
    }

    // Set gray underline for active project display title
    const projectDisplayTitle = projectDisplay.querySelector('.project-display-title');
    if (projectDisplayTitle) {
    projectDisplayTitle.style.borderImage = 'radial-gradient(#b0b0b0, #d0d0d0)';
    projectDisplayTitle.style.borderImageSlice = '1';
    }

    // Active class management - fade out previously active items
    projectItems.forEach(item => {
        if (item.classList.contains('active')) {
        item.classList.remove('active');
        item.style.borderImageSource = '';
        }
    });
    
    const activeItem = projectItems[projectIndex];
    if (activeItem) {
    // Apply gradient border when active
    const gradient = activeItem.getAttribute('data-gradient');
        if (gradient) {
    activeItem.style.borderImageSource = gradient;
    activeItem.style.borderImageSlice = "1";
        }
        
        // Trigger fadeInUp animation
        requestAnimationFrame(() => {
            activeItem.classList.add('active');
        });
    }
    
    // Start with fade-in-up state, then activate
    projectDisplay.classList.remove('fade-out-down');
    projectDisplay.classList.add('fade-in-up');
    projectDisplay.style.visibility = 'visible';
    
    // Add focused state immediately to keep main box miniature (no flash)
    document.body.classList.add('project-focused');
    
    // Trigger fadeInUp animation
    requestAnimationFrame(() => {
    projectDisplay.classList.add('active');
        
        // Position project display based on overlap with main box
        if (window.innerWidth > 1024) {
            setTimeout(() => {
                positionProjectDisplay();
            }, 50);
        }
        
        // Update main-box bottom position for half-screen layout
        if (window.innerWidth <= 1800) {
            setTimeout(() => {
                updateMainBoxBottom();
            }, 100);
        }
        
        // Remove fade-in-up class after transition completes
        setTimeout(() => {
            projectDisplay.classList.remove('fade-in-up');
        }, 400);
    });
    
    // Scroll project display into view on mobile
    if (window.innerWidth <= 1024) {
        projectDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Render MathJax
    if (window.MathJax) {
        MathJax.typesetPromise([projectDisplay]).catch(err => console.log(err.message));
    }
    
    // Announce to screen readers
    if (accessibility) {
        accessibility.announce(`Project ${project.title} details displayed`, 'polite');
    }
}

/**
 * Function to display blog details
 */
function displayBlog(blogIndex) {
    const blog = blogs[blogIndex];
    if (!blog || !blogDisplay) return;
    
    // Close all catalogs when displaying a blog
    closeProjectsSlider();
    closeBlogsSlider();
    closePublicationsSlider();
    
    // If main box is minimized, remove minimized class to switch to summarized mode
    const mainBox = document.querySelector('.main-box');
    if (mainBox && mainBox.classList.contains('minimized')) {
        mainBox.classList.remove('minimized');
    }
    
    // Remove active class from blogs nav link when displaying a blog
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#blogs') {
            link.classList.remove('active');
        }
    });
    
    const blogItems = document.querySelectorAll('#blogsContainer .project-item');

    blogDisplay.innerHTML = `
        <button class="permalink-btn" aria-label="Copy link to ${blog.title}" title="Copy direct link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
        </button>
        <div class="project-display-title">${blog.title}</div>
        <div class="project-display-description">${blog.description}</div>
        <div class="project-display-tags">${blog.tags}</div>
        <div class="project-display-date">${blog.date}</div>
    `;

    // Attach copy listener
    const permalinkBtn = blogDisplay.querySelector('.permalink-btn');
    if (permalinkBtn) {
        permalinkBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(window.location.href).catch(err => console.error('Failed to copy URL', err));
        });
    }

    // Apply gradients dynamically to the blog display box border
    if (blog.gradient) {
        blogDisplay.style.borderImageSource = blog.gradient;
        blogDisplay.style.borderImageRadius = "10px";
        blogDisplay.style.borderImageSlice = "1";
    }

    // Set gray underline for active blog display title
    const blogDisplayTitle = blogDisplay.querySelector('.project-display-title');
    if (blogDisplayTitle) {
        blogDisplayTitle.style.borderImage = 'radial-gradient(#b0b0b0, #d0d0d0)';
        blogDisplayTitle.style.borderImageSlice = '1';
    }

    // Active class management - fade out previously active items
    blogItems.forEach(item => {
        if (item.classList.contains('active')) {
            item.classList.remove('active');
            item.style.borderImageSource = '';
        }
    });
    
    const activeItem = blogItems[blogIndex];
    if (activeItem) {
        // Apply gradient border when active
        const gradient = activeItem.getAttribute('data-gradient');
        if (gradient) {
            activeItem.style.borderImageSource = gradient;
            activeItem.style.borderImageSlice = "1";
        }
        
        // Trigger fadeInUp animation
        requestAnimationFrame(() => {
            activeItem.classList.add('active');
        });
    }
    
    // Start with fade-in-up state, then activate
    blogDisplay.classList.remove('fade-out-down');
    blogDisplay.classList.add('fade-in-up');
    blogDisplay.style.visibility = 'visible';
    
    // Add focused state immediately to keep main box miniature (no flash)
    document.body.classList.add('blog-focused');
    
    // Trigger fadeInUp animation
    requestAnimationFrame(() => {
        blogDisplay.classList.add('active');
        
        // Position blog display based on overlap with main box
        if (window.innerWidth > 1024) {
            setTimeout(() => {
                positionBlogDisplay();
            }, 50);
        }
        
        // Update main-box bottom position for half-screen layout
        if (window.innerWidth <= 1800) {
            setTimeout(() => {
                updateMainBoxBottom();
            }, 100);
        }
        
        // Remove fade-in-up class after transition completes
        setTimeout(() => {
            blogDisplay.classList.remove('fade-in-up');
        }, 400);
    });
    
    // Scroll blog display into view on mobile
    if (window.innerWidth <= 1024) {
        blogDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Render MathJax
    if (window.MathJax) {
        MathJax.typesetPromise([blogDisplay]).catch(err => console.log(err.message));
    }
    
    // Announce to screen readers
    if (accessibility) {
        accessibility.announce(`Blog ${blog.title} details displayed`, 'polite');
    }
}

/**
 * Function to toggle publication details (display or hide if already active)
 */
function togglePublication(publicationIndex) {
    const publication = publications[publicationIndex];
    if (!publication) return;
    
    // Close projects and blogs catalogs if open
    closeProjectsSlider();
    closeBlogsSlider();
    
    const publicationItems = document.querySelectorAll('#publicationsContainer .project-item');
    const clickedItem = publicationItems[publicationIndex];
    
    if (!clickedItem || !publicationDisplay) return;

    // Update URL hash
    if (!clickedItem.classList.contains('active')) {
        history.pushState(null, null, `#${publication.id || ''}`);
    } else {
        // Remove hash if closing
        history.pushState(null, null, ' ');
    }
    
    // If clicking the already active item, deactivate it
    if (clickedItem.classList.contains('active')) {
        // Fade out publication display
        if (publicationDisplay.classList.contains('active')) {
            publicationDisplay.classList.remove('active');
            publicationDisplay.style.visibility = 'hidden';
        }
        
        // Fade out active item
        clickedItem.classList.remove('active');
        clickedItem.style.borderImageSource = '';
        
        document.body.classList.remove('publication-focused');
        
        // Reset title underline to original gradient when deactivating
        setTimeout(() => {
            if (publicationDisplay.querySelector('.project-display-title')) {
                const publicationDisplayTitle = publicationDisplay.querySelector('.project-display-title');
                publicationDisplayTitle.style.borderImage = 'radial-gradient(#b0b0b0, #d0d0d0)';
                publicationDisplayTitle.style.borderImageSlice = '1'; 
            }
        }, 200);
        
        // Announce to screen readers
        if (accessibility) {
            accessibility.announce('Publication details closed', 'polite');
        }
        return;
    }
    
    // Close project/blog display if open - with seamless fade-out transition
    if (projectDisplay && projectDisplay.classList.contains('active')) {
        // Preserve dimensions during fade-out
        const rect = projectDisplay.getBoundingClientRect();
        projectDisplay.style.width = `${rect.width}px`;
        projectDisplay.style.height = `${rect.height}px`;
        projectDisplay.style.minHeight = `${rect.height}px`;
        projectDisplay.style.maxWidth = `${rect.width}px`;
        
        projectDisplay.classList.add('fade-out-down');
        projectDisplay.classList.remove('active');
        const activeProjectItems = document.querySelectorAll('#projectsContainer .project-item.active');
        activeProjectItems.forEach(item => {
            item.classList.remove('active');
            item.style.borderImageSource = '';
        });
        
        setTimeout(() => {
            projectDisplay.classList.remove('fade-out-down');
            projectDisplay.style.visibility = 'hidden';
            projectDisplay.style.removeProperty('width');
            projectDisplay.style.removeProperty('height');
            projectDisplay.style.removeProperty('min-height');
            projectDisplay.style.removeProperty('max-width');
            document.body.classList.remove('project-focused');
            displayPublication(publicationIndex);
        }, 400);
        return;
    }
    
    if (blogDisplay && blogDisplay.classList.contains('active')) {
        // Preserve dimensions during fade-out
        const rect = blogDisplay.getBoundingClientRect();
        blogDisplay.style.width = `${rect.width}px`;
        blogDisplay.style.height = `${rect.height}px`;
        blogDisplay.style.minHeight = `${rect.height}px`;
        blogDisplay.style.maxWidth = `${rect.width}px`;
        
        blogDisplay.classList.add('fade-out-down');
        blogDisplay.classList.remove('active');
        const activeBlogItems = document.querySelectorAll('#blogsContainer .project-item.active');
        activeBlogItems.forEach(item => {
            item.classList.remove('active');
            item.style.borderImageSource = '';
        });
        
        setTimeout(() => {
            blogDisplay.classList.remove('fade-out-down');
            blogDisplay.style.visibility = 'hidden';
            blogDisplay.style.removeProperty('width');
            blogDisplay.style.removeProperty('height');
            blogDisplay.style.removeProperty('min-height');
            blogDisplay.style.removeProperty('max-width');
            document.body.classList.remove('blog-focused');
            displayPublication(publicationIndex);
        }, 400);
        return;
    }
    
    // If another publication is currently active, transition seamlessly
    if (publicationDisplay.classList.contains('active')) {
        const publication = publications[publicationIndex];
        
        const currentActiveItem = Array.from(publicationItems).find(item => item.classList.contains('active'));
        if (currentActiveItem) {
            currentActiveItem.classList.remove('active');
            currentActiveItem.style.borderImageSource = '';
        }
        
        const rect = publicationDisplay.getBoundingClientRect();
        const currentWidth = rect.width;
        const currentHeight = rect.height;
        
        publicationDisplay.style.width = `${currentWidth}px`;
        publicationDisplay.style.height = `${currentHeight}px`;
        publicationDisplay.style.minHeight = `${currentHeight}px`;
        publicationDisplay.style.maxWidth = `${currentWidth}px`;
        
        publicationDisplay.classList.add('fade-out-down');
        publicationDisplay.classList.remove('active');
        
        setTimeout(() => {
            publicationDisplay.style.removeProperty('width');
            publicationDisplay.style.removeProperty('height');
            publicationDisplay.style.removeProperty('min-height');
            publicationDisplay.style.removeProperty('max-width');
            
            publicationDisplay.innerHTML = `
                <div class="project-display-title">${publication.title}</div>
                <div class="project-display-description">${publication.description}</div>
                <div class="project-display-tags">${publication.tags}</div>
                <div class="project-display-date">${publication.date}</div>
            `;
            
            if (publication.gradient) {
                publicationDisplay.style.borderImageSource = publication.gradient;
                publicationDisplay.style.borderImageRadius = "10px";
                publicationDisplay.style.borderImageSlice = "1";
            }
            
            const publicationDisplayTitle = publicationDisplay.querySelector('.project-display-title');
            if (publicationDisplayTitle) {
                publicationDisplayTitle.style.borderImage = 'radial-gradient(#b0b0b0, #d0d0d0)';
                publicationDisplayTitle.style.borderImageSlice = '1';
            }
            
            publicationDisplay.classList.remove('fade-out-down');
            publicationDisplay.classList.add('fade-in-up');
            publicationDisplay.style.visibility = 'visible';
            
            requestAnimationFrame(() => {
                publicationDisplay.classList.add('active');
                document.body.classList.add('publication-focused');
                
                if (window.innerWidth > 1024) {
                    setTimeout(() => {
                        positionPublicationDisplay();
                    }, 50);
                }
                
                // Update main-box bottom position for half-screen layout
                if (window.innerWidth <= 1800) {
                    setTimeout(() => {
                        updateMainBoxBottom();
                    }, 100);
                }
            });
            
            const activeItem = publicationItems[publicationIndex];
            if (activeItem) {
                const gradient = activeItem.getAttribute('data-gradient');
                if (gradient) {
                    activeItem.style.borderImageSource = gradient;
                    activeItem.style.borderImageSlice = "1";
                }
                activeItem.classList.add('active');
            }
            
            if (window.MathJax) {
                MathJax.typesetPromise([publicationDisplay]).catch(err => console.log(err.message));
            }
            
            setTimeout(() => {
                publicationDisplay.classList.remove('fade-in-up');
            }, 400);
        }, 400);
    } else {
        displayPublication(publicationIndex);
    }
}

/**
 * Function to display publication details
 */
function displayPublication(publicationIndex) {
    const publication = publications[publicationIndex];
    if (!publication || !publicationDisplay) return;
    
    // Close all catalogs when displaying a publication
    closeProjectsSlider();
    closeBlogsSlider();
    closePublicationsSlider();
    
    // If main box is minimized, remove minimized class to switch to summarized mode
    const mainBox = document.querySelector('.main-box');
    if (mainBox && mainBox.classList.contains('minimized')) {
        mainBox.classList.remove('minimized');
    }
    
    // Remove active class from publications nav link when displaying a publication
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#publications') {
            link.classList.remove('active');
        }
    });
    
    const publicationItems = document.querySelectorAll('#publicationsContainer .project-item');

    publicationDisplay.innerHTML = `
        <button class="permalink-btn" aria-label="Copy link to ${publication.title}" title="Copy direct link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
        </button>
        <div class="project-display-title">${publication.title}</div>
        <div class="project-display-description">${publication.description}</div>
        <div class="project-display-tags">${publication.tags}</div>
        <div class="project-display-date">${publication.date}</div>
    `;

    // Attach copy listener
    const permalinkBtn = publicationDisplay.querySelector('.permalink-btn');
    if (permalinkBtn) {
        permalinkBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(window.location.href).catch(err => console.error('Failed to copy URL', err));
        });
    }

    // Apply gradients dynamically to the publication display box border
    if (publication.gradient) {
        publicationDisplay.style.borderImageSource = publication.gradient;
        publicationDisplay.style.borderImageRadius = "10px";
        publicationDisplay.style.borderImageSlice = "1";
    }

    // Set gray underline for active publication display title
    const publicationDisplayTitle = publicationDisplay.querySelector('.project-display-title');
    if (publicationDisplayTitle) {
        publicationDisplayTitle.style.borderImage = 'radial-gradient(#b0b0b0, #d0d0d0)';
        publicationDisplayTitle.style.borderImageSlice = '1';
    }

    // Active class management - fade out previously active items
    publicationItems.forEach(item => {
        if (item.classList.contains('active')) {
            item.classList.remove('active');
            item.style.borderImageSource = '';
        }
    });
    
    const activeItem = publicationItems[publicationIndex];
    if (activeItem) {
        // Apply gradient border when active
        const gradient = activeItem.getAttribute('data-gradient');
        if (gradient) {
            activeItem.style.borderImageSource = gradient;
            activeItem.style.borderImageSlice = "1";
        }
        
        // Trigger fadeInUp animation
        requestAnimationFrame(() => {
            activeItem.classList.add('active');
        });
    }
    
    // Start with fade-in-up state, then activate
    publicationDisplay.classList.remove('fade-out-down');
    publicationDisplay.classList.add('fade-in-up');
    publicationDisplay.style.visibility = 'visible';
    
    // Add focused state immediately to keep main box miniature (no flash)
    document.body.classList.add('publication-focused');
    
    // Trigger fadeInUp animation
    requestAnimationFrame(() => {
        publicationDisplay.classList.add('active');
        
        // Position publication display based on overlap with main box
        if (window.innerWidth > 1024) {
            setTimeout(() => {
                positionPublicationDisplay();
            }, 50);
        }
        
        // Update main-box bottom position for half-screen layout
        if (window.innerWidth <= 1800) {
            setTimeout(() => {
                updateMainBoxBottom();
            }, 100);
        }
        
        // Remove fade-in-up class after transition completes
        setTimeout(() => {
            publicationDisplay.classList.remove('fade-in-up');
        }, 400);
    });
    
    // Scroll publication display into view on mobile
    if (window.innerWidth <= 1024) {
        publicationDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Render MathJax
    if (window.MathJax) {
        MathJax.typesetPromise([publicationDisplay]).catch(err => console.log(err.message));
    }
    
    // Announce to screen readers
    if (accessibility) {
        accessibility.announce(`Publication ${publication.title} details displayed`, 'polite');
    }
}

/**
 * Position publication display box based on overlap with main box
 */
function positionPublicationDisplay() {
    if (!publicationDisplay || !mainBox) return;
    
    if (window.innerWidth <= 1024) {
        publicationDisplay.style.removeProperty('left');
        publicationDisplay.style.removeProperty('right');
        publicationDisplay.style.removeProperty('top');
        publicationDisplay.style.removeProperty('transform');
        return;
    }
    
    requestAnimationFrame(() => {
        const mainBoxRect = mainBox.getBoundingClientRect();
        
        const wasVisible = publicationDisplay.classList.contains('active');
        if (!wasVisible) {
            publicationDisplay.style.visibility = 'hidden';
            publicationDisplay.style.opacity = '0';
            publicationDisplay.style.display = 'block';
        }
        
        const publicationDisplayRect = publicationDisplay.getBoundingClientRect();
        const publicationDisplayWidth = publicationDisplayRect.width || 600;
        const publicationDisplayHeight = publicationDisplayRect.height || 400;
        
        if (!wasVisible) {
            publicationDisplay.style.visibility = '';
            publicationDisplay.style.opacity = '';
            publicationDisplay.style.display = '';
        }
        
        const mainBoxBottom = mainBoxRect.bottom;
        const mainBoxTop = mainBoxRect.top;
        const minMargin = 20;
        
        const publicationDisplayTopAtCenter = mainBoxTop;
        const publicationDisplayBottomAtCenter = mainBoxTop + publicationDisplayHeight;
        
        const centerX = (window.innerWidth - publicationDisplayWidth) / 2;
        const publicationDisplayLeftAtCenter = centerX;
        const publicationDisplayRightAtCenter = centerX + publicationDisplayWidth;
        
        const overlapsHorizontally = (
            publicationDisplayLeftAtCenter < mainBoxRect.right && 
            publicationDisplayRightAtCenter > mainBoxRect.left
        );
        
        const overlapsVertically = (
            publicationDisplayTopAtCenter < mainBoxRect.bottom && 
            publicationDisplayBottomAtCenter > mainBoxRect.top
        );
        
        const overlaps = overlapsHorizontally && overlapsVertically;
        
        publicationDisplay.style.setProperty('transform', 'none', 'important');
        
        if (overlaps) {
            publicationDisplay.style.setProperty('left', `${centerX}px`, 'important');
            publicationDisplay.style.setProperty('right', 'auto', 'important');
            publicationDisplay.style.setProperty('top', `${mainBoxBottom + minMargin}px`, 'important');
        } else {
            publicationDisplay.style.setProperty('left', `${centerX}px`, 'important');
            publicationDisplay.style.setProperty('right', 'auto', 'important');
            publicationDisplay.style.setProperty('top', `${mainBoxTop}px`, 'important');
        }
    });
}

/**
 * Position project display box based on overlap with main box
 * - If overlaps with main box -> center underneath
 * - If doesn't overlap -> center at top (aligned with main box top)
 */
function positionProjectDisplay() {
    if (!projectDisplay || !mainBox) return;
    
    // Only apply this logic when on desktop
    if (window.innerWidth <= 1024) {
        // Reset styles - CSS handles positioning
        projectDisplay.style.removeProperty('left');
        projectDisplay.style.removeProperty('right');
        projectDisplay.style.removeProperty('top');
        projectDisplay.style.removeProperty('transform');
        return;
    }
    
    // Wait for next frame to ensure element is rendered
    requestAnimationFrame(() => {
        // Get bounding boxes
        const mainBoxRect = mainBox.getBoundingClientRect();
        
        // Temporarily show element to measure it
        const wasVisible = projectDisplay.classList.contains('active');
        if (!wasVisible) {
            projectDisplay.style.visibility = 'hidden';
            projectDisplay.style.opacity = '0';
            projectDisplay.style.display = 'block';
        }
        
        const projectDisplayRect = projectDisplay.getBoundingClientRect();
        const projectDisplayWidth = projectDisplayRect.width || 600;
        const projectDisplayHeight = projectDisplayRect.height || 400;
        
        if (!wasVisible) {
            projectDisplay.style.visibility = '';
            projectDisplay.style.opacity = '';
            projectDisplay.style.display = '';
        }
        
        // Calculate positions
        const mainBoxBottom = mainBoxRect.bottom;
        const mainBoxTop = mainBoxRect.top;
        const minMargin = 20; // Minimum 20px margin
        const spacingLg = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--spacing-lg')) || 24;
        
        // Check if project display would overlap with main box when centered at top
        const projectDisplayTopAtCenter = mainBoxTop;
        const projectDisplayBottomAtCenter = mainBoxTop + projectDisplayHeight;
        
        // Calculate center X
        const centerX = (window.innerWidth - projectDisplayWidth) / 2;
        const projectDisplayLeftAtCenter = centerX;
        const projectDisplayRightAtCenter = centerX + projectDisplayWidth;
        
        // Check overlap
        const overlapsHorizontally = (
            projectDisplayLeftAtCenter < mainBoxRect.right && 
            projectDisplayRightAtCenter > mainBoxRect.left
        );
        
        const overlapsVertically = (
            projectDisplayTopAtCenter < mainBoxRect.bottom && 
            projectDisplayBottomAtCenter > mainBoxRect.top
        );
        
        const overlaps = overlapsHorizontally && overlapsVertically;
        
        // Override CSS transform to allow precise pixel positioning
        projectDisplay.style.setProperty('transform', 'none', 'important');
        
        if (overlaps) {
            // Center underneath main box
            projectDisplay.style.setProperty('left', `${centerX}px`, 'important');
            projectDisplay.style.setProperty('right', 'auto', 'important');
            projectDisplay.style.setProperty('top', `${mainBoxBottom + minMargin}px`, 'important');
        } else {
            // Center at top, aligned with main box top
            projectDisplay.style.setProperty('left', `${centerX}px`, 'important');
            projectDisplay.style.setProperty('right', 'auto', 'important');
            projectDisplay.style.setProperty('top', `${mainBoxTop}px`, 'important');
        }
    });
}

/**
 * Position blog display box based on overlap with main box
 * - If overlaps with main box -> center underneath
 * - If doesn't overlap -> center at top (aligned with main box top)
 */
function positionBlogDisplay() {
    if (!blogDisplay || !mainBox) return;
    
    // Only apply this logic when on desktop
    if (window.innerWidth <= 1024) {
        // Reset styles - CSS handles positioning
        blogDisplay.style.removeProperty('left');
        blogDisplay.style.removeProperty('right');
        blogDisplay.style.removeProperty('top');
        blogDisplay.style.removeProperty('transform');
        return;
    }
    
    // Wait for next frame to ensure element is rendered
    requestAnimationFrame(() => {
        // Get bounding boxes
        const mainBoxRect = mainBox.getBoundingClientRect();
        
        // Temporarily show element to measure it
        const wasVisible = blogDisplay.classList.contains('active');
        if (!wasVisible) {
            blogDisplay.style.visibility = 'hidden';
            blogDisplay.style.opacity = '0';
            blogDisplay.style.display = 'block';
        }
        
        const blogDisplayRect = blogDisplay.getBoundingClientRect();
        const blogDisplayWidth = blogDisplayRect.width || 600;
        const blogDisplayHeight = blogDisplayRect.height || 400;
        
        if (!wasVisible) {
            blogDisplay.style.visibility = '';
            blogDisplay.style.opacity = '';
            blogDisplay.style.display = '';
        }
        
        // Calculate positions
        const mainBoxBottom = mainBoxRect.bottom;
        const mainBoxTop = mainBoxRect.top;
        const minMargin = 20; // Minimum 20px margin
        
        // Check if blog display would overlap with main box when centered at top
        const blogDisplayTopAtCenter = mainBoxTop;
        const blogDisplayBottomAtCenter = mainBoxTop + blogDisplayHeight;
        
        // Calculate center X
        const centerX = (window.innerWidth - blogDisplayWidth) / 2;
        const blogDisplayLeftAtCenter = centerX;
        const blogDisplayRightAtCenter = centerX + blogDisplayWidth;
        
        // Check overlap
        const overlapsHorizontally = (
            blogDisplayLeftAtCenter < mainBoxRect.right && 
            blogDisplayRightAtCenter > mainBoxRect.left
        );
        
        const overlapsVertically = (
            blogDisplayTopAtCenter < mainBoxRect.bottom && 
            blogDisplayBottomAtCenter > mainBoxRect.top
        );
        
        const overlaps = overlapsHorizontally && overlapsVertically;
        
        // Override CSS transform to allow precise pixel positioning
        blogDisplay.style.setProperty('transform', 'none', 'important');
        
        if (overlaps) {
            // Center underneath main box
            blogDisplay.style.setProperty('left', `${centerX}px`, 'important');
            blogDisplay.style.setProperty('right', 'auto', 'important');
            blogDisplay.style.setProperty('top', `${mainBoxBottom + minMargin}px`, 'important');
        } else {
            // Center at top, aligned with main box top
            blogDisplay.style.setProperty('left', `${centerX}px`, 'important');
            blogDisplay.style.setProperty('right', 'auto', 'important');
            blogDisplay.style.setProperty('top', `${mainBoxTop}px`, 'important');
        }
    });
}

/**
 * Subtle parallax effect
 */
function setupParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const parallaxBoxes = document.querySelectorAll('.parallax-box');

        parallaxBoxes.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const itemX = rect.left + rect.width / 2;
            const itemY = rect.top + rect.height / 2;

            const deltaX = (mouseX - itemX) * 0.005;
            const deltaY = (mouseY - itemY) * 0.005;

            item.style.transform = `translate(${deltaX}px, ${deltaY}px) ${item.classList.contains('active') ? '' : 'translateX(0px)'}`;
        });
    });
}

/**
 * Setup scroll to top button
 */
function setupScrollToTop() {
    if (!scrollToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Close sliders if open
        closeProjectsSlider();
        closeBlogsSlider();
        closePublicationsSlider();
    });
}

/**
 * Setup command palette
 */
function setupCommandPalette() {
    if (!commandPalette || !commandInput || !commandResults) return;
    
    // Command palette items
    const commands = [
        { label: 'Projects', action: () => scrollToSection('projects') },
        { label: 'Blogs', action: () => scrollToSection('blogs') },
        { label: 'Publications', action: () => scrollToSection('publications') },
        ...projects.map((project, index) => ({
            label: project.title,
            action: () => {
                displayProjectsSlider();
                setTimeout(() => toggleProject(index), 300);
            }
        })),
        ...blogs.map((blog, index) => ({
            label: blog.title,
            action: () => {
                displayBlogsSlider();
                setTimeout(() => toggleBlog(index), 300);
            }
        })),
        ...publications.map((publication, index) => ({
            label: publication.title,
            action: () => {
                displayPublicationsSlider();
                setTimeout(() => togglePublication(index), 300);
            }
        }))
    ];
    
    // Filter commands based on input
    commandInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = commands.filter(cmd => 
            cmd.label.toLowerCase().includes(query)
        );
        
        renderCommandResults(filtered);
    });
    
    // Handle command selection
    commandInput.addEventListener('keydown', (e) => {
        const selected = commandResults.querySelector('.selected');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectNextCommand();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectPreviousCommand();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selected) {
                const index = Array.from(commandResults.children).indexOf(selected);
                const command = getFilteredCommands()[index];
                if (command) {
                    command.action();
                    closeCommandPalette();
                }
            }
        }
    });
    
    // Close on outside click
    commandPalette.addEventListener('click', (e) => {
        if (e.target === commandPalette) {
            closeCommandPalette();
        }
    });
}

function getFilteredCommands() {
    const query = commandInput.value.toLowerCase();
    return commands.filter(cmd => 
        cmd.label.toLowerCase().includes(query)
    );
}

function renderCommandResults(filteredCommands) {
    if (!commandResults) return;
    
    commandResults.innerHTML = '';
    
    filteredCommands.forEach((command, index) => {
        const item = document.createElement('div');
        item.className = 'command-palette-item';
        if (index === 0) item.classList.add('selected');
        item.textContent = command.label;
        item.setAttribute('role', 'option');
        item.addEventListener('click', () => {
            command.action();
            closeCommandPalette();
        });
        commandResults.appendChild(item);
    });
}

function selectNextCommand() {
    const items = commandResults.querySelectorAll('.command-palette-item');
    const selected = commandResults.querySelector('.selected');
    const currentIndex = selected ? Array.from(items).indexOf(selected) : -1;
    const nextIndex = (currentIndex + 1) % items.length;
    
    if (selected) selected.classList.remove('selected');
    items[nextIndex].classList.add('selected');
    items[nextIndex].scrollIntoView({ block: 'nearest' });
}

function selectPreviousCommand() {
    const items = commandResults.querySelectorAll('.command-palette-item');
    const selected = commandResults.querySelector('.selected');
    const currentIndex = selected ? Array.from(items).indexOf(selected) : 0;
    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    
    if (selected) selected.classList.remove('selected');
    items[prevIndex].classList.add('selected');
    items[prevIndex].scrollIntoView({ block: 'nearest' });
}

function closeCommandPalette() {
    if (commandPalette) {
        commandPalette.classList.remove('active');
        commandPalette.setAttribute('aria-hidden', 'true');
        if (commandInput) {
            commandInput.value = '';
        }
        if (commandResults) {
            commandResults.innerHTML = '';
        }
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Setup project filters
 */
function setupProjectFilters() {
    if (!projectFilters) return;
    
    // Extract unique tags from projects
    const allTags = new Set();
    projects.forEach(project => {
        if (project.tags) {
            project.tags.split('•').forEach(tag => {
                const trimmedTag = tag.trim();
                if (trimmedTag) allTags.add(trimmedTag);
            });
        }
    });
    
    // Create filter buttons
    projectFilters.innerHTML = '';
    
    // Add "All" button
    const allButton = document.createElement('button');
    allButton.className = 'filter-button active';
    allButton.textContent = 'All';
    allButton.setAttribute('data-filter', 'all');
    allButton.addEventListener('click', () => filterProjects('all'));
    projectFilters.appendChild(allButton);
    
    // Add tag buttons
    Array.from(allTags).sort().forEach(tag => {
        const button = document.createElement('button');
        button.className = 'filter-button';
        button.textContent = tag;
        button.setAttribute('data-filter', tag);
        button.addEventListener('click', () => filterProjects(tag));
        projectFilters.appendChild(button);
    });
    
    // Setup search
    if (projectSearch) {
        projectSearch.addEventListener('input', (e) => {
            searchProjects(e.target.value);
        });
    }
}

/**
 * Setup blog filters
 */
function setupBlogFilters() {
    if (!blogFilters) return;
    
    // Extract unique tags from blogs
    const allTags = new Set();
    blogs.forEach(blog => {
        if (blog.tags) {
            blog.tags.split('•').forEach(tag => {
                const trimmedTag = tag.trim();
                if (trimmedTag) allTags.add(trimmedTag);
            });
        }
    });
    
    // Create filter buttons
    blogFilters.innerHTML = '';
    
    // Add "All" button
    const allButton = document.createElement('button');
    allButton.className = 'filter-button active';
    allButton.textContent = 'All';
    allButton.setAttribute('data-filter', 'all');
    allButton.addEventListener('click', () => filterBlogs('all'));
    blogFilters.appendChild(allButton);
    
    // Add tag buttons
    Array.from(allTags).sort().forEach(tag => {
        const button = document.createElement('button');
        button.className = 'filter-button';
        button.textContent = tag;
        button.setAttribute('data-filter', tag);
        button.addEventListener('click', () => filterBlogs(tag));
        blogFilters.appendChild(button);
    });
    
    // Setup search
    if (blogSearch) {
        blogSearch.addEventListener('input', (e) => {
            searchBlogs(e.target.value);
        });
    }
}

/**
 * Setup publication filters
 */
function setupPublicationFilters() {
    if (!publicationFilters) return;
    
    // Extract unique tags from publications
    const allTags = new Set();
    publications.forEach(publication => {
        if (publication.tags) {
            publication.tags.split('•').forEach(tag => {
                const trimmedTag = tag.trim();
                if (trimmedTag) allTags.add(trimmedTag);
            });
        }
    });
    
    // Create filter buttons
    publicationFilters.innerHTML = '';
    
    // Add "All" button
    const allButton = document.createElement('button');
    allButton.className = 'filter-button active';
    allButton.textContent = 'All';
    allButton.setAttribute('data-filter', 'all');
    allButton.addEventListener('click', () => filterPublications('all'));
    publicationFilters.appendChild(allButton);
    
    // Add tag buttons
    Array.from(allTags).sort().forEach(tag => {
        const button = document.createElement('button');
        button.className = 'filter-button';
        button.textContent = tag;
        button.setAttribute('data-filter', tag);
        button.addEventListener('click', () => filterPublications(tag));
        publicationFilters.appendChild(button);
    });
    
    // Setup search
    if (publicationSearch) {
        publicationSearch.addEventListener('input', (e) => {
            searchPublications(e.target.value);
        });
    }
}

// Make setup functions globally accessible after they're defined
window.setupProjectFilters = setupProjectFilters;
window.setupBlogFilters = setupBlogFilters;
window.setupPublicationFilters = setupPublicationFilters;

/**
 * Filter projects by tag
 */
function filterProjects(tag) {
    // Update active filter button - CSS will handle transitions
    if (projectFilters) {
        projectFilters.querySelectorAll('.filter-button').forEach(btn => {
            if (btn.getAttribute('data-filter') === tag) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Filter and display projects
    const filteredProjects = tag === 'all' 
        ? projects 
        : projects.filter(project => 
            project.tags && project.tags.includes(tag)
        );
    
    displayFilteredProjects(filteredProjects);
    
    // Clear search
    if (projectSearch) {
        projectSearch.value = '';
    }
}

/**
 * Filter blogs by tag
 */
function filterBlogs(tag) {
    // Update active filter button - CSS will handle transitions
    if (blogFilters) {
        blogFilters.querySelectorAll('.filter-button').forEach(btn => {
            if (btn.getAttribute('data-filter') === tag) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Filter and display blogs
    const filteredBlogs = tag === 'all' 
        ? blogs 
        : blogs.filter(blog => 
            blog.tags && blog.tags.includes(tag)
        );
    
    displayFilteredBlogs(filteredBlogs);
    
    // Clear search
    if (blogSearch) {
        blogSearch.value = '';
    }
}

/**
 * Search projects
 */
function searchProjects(query) {
    const lowerQuery = query.toLowerCase();
    const activeFilter = projectFilters?.querySelector('.filter-button.active');
    const filterTag = activeFilter?.getAttribute('data-filter');
    
    let filteredProjects = filterTag === 'all' || !filterTag
        ? projects
        : projects.filter(project => 
            project.tags && project.tags.includes(filterTag)
        );
    
    if (query.trim()) {
        filteredProjects = filteredProjects.filter(project =>
            project.title.toLowerCase().includes(lowerQuery) ||
            project.summary.toLowerCase().includes(lowerQuery) ||
            (project.tags && project.tags.toLowerCase().includes(lowerQuery)) ||
            (project.description && project.description.toLowerCase().includes(lowerQuery))
        );
    }
    
    displayFilteredProjects(filteredProjects);
}

/**
 * Search blogs
 */
function searchBlogs(query) {
    const lowerQuery = query.toLowerCase();
    const activeFilter = blogFilters?.querySelector('.filter-button.active');
    const filterTag = activeFilter?.getAttribute('data-filter');
    
    let filteredBlogs = filterTag === 'all' || !filterTag
        ? blogs
        : blogs.filter(blog => 
            blog.tags && blog.tags.includes(filterTag)
        );
    
    if (query.trim()) {
        filteredBlogs = filteredBlogs.filter(blog =>
            blog.title.toLowerCase().includes(lowerQuery) ||
            blog.summary.toLowerCase().includes(lowerQuery) ||
            (blog.tags && blog.tags.toLowerCase().includes(lowerQuery)) ||
            (blog.description && blog.description.toLowerCase().includes(lowerQuery))
        );
    }
    
    displayFilteredBlogs(filteredBlogs);
}

/**
 * Filter publications by tag
 */
function filterPublications(tag) {
    // Update active filter button - CSS will handle transitions
    if (publicationFilters) {
        publicationFilters.querySelectorAll('.filter-button').forEach(btn => {
            if (btn.getAttribute('data-filter') === tag) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Filter and display publications
    const filteredPublications = tag === 'all' 
        ? publications 
        : publications.filter(publication => 
            publication.tags && publication.tags.includes(tag)
        );
    
    displayFilteredPublications(filteredPublications);
    
    // Clear search
    if (publicationSearch) {
        publicationSearch.value = '';
    }
}

/**
 * Search publications
 */
function searchPublications(query) {
    const lowerQuery = query.toLowerCase();
    const activeFilter = publicationFilters?.querySelector('.filter-button.active');
    const filterTag = activeFilter?.getAttribute('data-filter');
    
    let filteredPublications = filterTag === 'all' || !filterTag
        ? publications
        : publications.filter(publication => 
            publication.tags && publication.tags.includes(filterTag)
        );
    
    if (query.trim()) {
        filteredPublications = filteredPublications.filter(publication =>
            publication.title.toLowerCase().includes(lowerQuery) ||
            publication.summary.toLowerCase().includes(lowerQuery) ||
            (publication.tags && publication.tags.toLowerCase().includes(lowerQuery)) ||
            (publication.description && publication.description.toLowerCase().includes(lowerQuery))
        );
    }
    
    displayFilteredPublications(filteredPublications);
}

/**
 * Display filtered publications
 */
function displayFilteredPublications(filteredPublications) {
    if (!publicationSlider) return;
    
    const publicationsContainer = document.getElementById('publicationsContainer');
    if (!publicationsContainer) return;
    
    const allItems = publicationsContainer.querySelectorAll('.project-item');
    
    let visibleIndex = 0;
    allItems.forEach(item => {
        const publicationIndex = parseInt(item.getAttribute('data-publication'));
        const isVisible = filteredPublications.some((_, idx) => {
            const originalIndex = publications.findIndex(p => 
                p.title === filteredPublications[idx].title
            );
            return originalIndex === publicationIndex;
        });
        
        if (isVisible) {
            item.classList.remove('hidden');
            item.classList.add('visible');
            
            setTimeout(() => {
                requestAnimationFrame(() => {
                    item.classList.add('show');
                });
            }, visibleIndex * 50);
            
            visibleIndex++;
        } else {
            item.classList.remove('show', 'visible');
            item.classList.add('hidden');
        }
    });
    
    if (accessibility) {
        accessibility.announce(
            `${filteredPublications.length} publication${filteredPublications.length !== 1 ? 's' : ''} found`,
            'polite'
        );
    }
}

/**
 * Display filtered projects
 */
function displayFilteredProjects(filteredProjects) {
    if (!projectSlider) return;
    
    const projectsContainer = document.getElementById('projectsContainer');
    if (!projectsContainer) return;
    
    // Get current active project index (for reference only - we don't change it)
    const allItems = projectsContainer.querySelectorAll('.project-item');
    const activeItem = Array.from(allItems).find(item => item.classList.contains('active'));
    const activeIndex = activeItem 
        ? parseInt(activeItem.getAttribute('data-project'))
        : -1;
    
    // Hide all projects and add fadeInUp animation to visible ones
    let visibleIndex = 0;
    allItems.forEach(item => {
        const projectIndex = parseInt(item.getAttribute('data-project'));
        const isVisible = filteredProjects.some((_, idx) => {
            const originalIndex = projects.findIndex(p => 
                p.title === filteredProjects[idx].title
            );
            return originalIndex === projectIndex;
        });
        
        if (isVisible) {
            // Remove hidden, add visible
            item.classList.remove('hidden');
            item.classList.add('visible');
            
            // Stagger animations
            setTimeout(() => {
                requestAnimationFrame(() => {
                    item.classList.add('show');
                });
            }, visibleIndex * 50); // 50ms delay between items
            
            visibleIndex++;
        } else {
            // Fade out - but keep active state if this is the active item
            item.classList.remove('show', 'visible');
            item.classList.add('hidden');
            // Don't remove active class or border - let it stay highlighted even if hidden
        }
    });
    
    // Note: We don't close the active project display when filtering
    // Only the catalog items change - the active display and main box stay unchanged
    
    // Announce results
    if (accessibility) {
        accessibility.announce(
            `${filteredProjects.length} project${filteredProjects.length !== 1 ? 's' : ''} found`,
            'polite'
        );
        }
    }

/**
 * Display filtered blogs
 */
function displayFilteredBlogs(filteredBlogs) {
    if (!blogSlider) return;
    
    const blogsContainer = document.getElementById('blogsContainer');
    if (!blogsContainer) return;
    
    // Get current active blog index (for reference only - we don't change it)
    const allItems = blogsContainer.querySelectorAll('.project-item');
    const activeItem = Array.from(allItems).find(item => item.classList.contains('active'));
    const activeIndex = activeItem 
        ? parseInt(activeItem.getAttribute('data-blog'))
        : -1;
    
    // Hide all blogs and add fadeInUp animation to visible ones
    let visibleIndex = 0;
    allItems.forEach(item => {
        const blogIndex = parseInt(item.getAttribute('data-blog'));
        const isVisible = filteredBlogs.some((_, idx) => {
            const originalIndex = blogs.findIndex(b => 
                b.title === filteredBlogs[idx].title
            );
            return originalIndex === blogIndex;
        });
        
        if (isVisible) {
            // Remove hidden, add visible
            item.classList.remove('hidden');
            item.classList.add('visible');
            
            // Stagger animations
            setTimeout(() => {
                requestAnimationFrame(() => {
                    item.classList.add('show');
                });
            }, visibleIndex * 50); // 50ms delay between items
            
            visibleIndex++;
        } else {
            // Fade out - but keep active state if this is the active item
            item.classList.remove('show', 'visible');
            item.classList.add('hidden');
            // Don't remove active class or border - let it stay highlighted even if hidden
        }
    });
    
    // Note: We don't close the active blog display when filtering
    // Only the catalog items change - the active display and main box stay unchanged
    
    // Announce results
    if (accessibility) {
        accessibility.announce(
            `${filteredBlogs.length} blog${filteredBlogs.length !== 1 ? 's' : ''} found`,
            'polite'
        );
    }
}

/**
 * Handle initial URL hash to deep link to specific content
 */
function handleInitialHash() {
    const hash = window.location.hash.substring(1); // Remove the #
    if (!hash) return;

    // Check projects
    const projectIndex = projects.findIndex((p, index) => (p.id || `project-${index}`) === hash);
    if (projectIndex !== -1) {
        // Open projects slider
        displayProjectsSlider();
        // Wait for slider to be ready then toggle project
        setTimeout(() => {
             toggleProject(projectIndex);
             // Scroll to project display
             const display = document.getElementById('projectDisplay');
             if (display) display.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 500);
        return;
    }

    // Check blogs
    const blogIndex = blogs.findIndex((b, index) => (b.id || `blog-${index}`) === hash);
    if (blogIndex !== -1) {
        displayBlogsSlider();
        setTimeout(() => {
            toggleBlog(blogIndex);
            const display = document.getElementById('blogDisplay');
            if (display) display.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 500);
        return;
    }

    // Check publications
    const pubIndex = publications.findIndex((p, index) => (p.id || `publication-${index}`) === hash);
    if (pubIndex !== -1) {
        displayPublicationsSlider();
        setTimeout(() => {
            togglePublication(pubIndex);
            const display = document.getElementById('publicationDisplay');
            if (display) display.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 500);
        return;
    }
}

/**
 * Initialize everything when DOM is loaded
 */
/**
 * Toggle minimize state of main-box
 */
/**
 * Update CSS variable for main-box bottom position
 */
function updateMainBoxBottom() {
    const mainBox = document.querySelector('.main-box');
    if (!mainBox) return;
    
    // Get the actual bottom position of the main-box
    const rect = mainBox.getBoundingClientRect();
    const bottom = rect.bottom;
    
    // Set CSS variable on document root
    document.documentElement.style.setProperty('--main-box-bottom', `${bottom}px`);
}

/**
 * Toggle minimize state of main-box (only in opening mode)
 */
function toggleMinimizeMainBox() {
    const mainBox = document.querySelector('.main-box');
    const minimizeBtn = document.getElementById('minimizeMainBox');
    
    if (!mainBox || !minimizeBtn) return;
    
    // Only allow minimization when NOT in focused mode
    if (document.body.classList.contains('project-focused') || 
        document.body.classList.contains('blog-focused') || 
        document.body.classList.contains('publication-focused')) {
        return;
    }
    
    if (mainBox.classList.contains('minimized')) {
        // Expand
        mainBox.classList.remove('minimized');
        minimizeBtn.style.display = 'flex';
        
        if (accessibility) {
            accessibility.announce('Main box expanded', 'polite');
        }
    } else {
        // Minimize
        mainBox.classList.add('minimized');
        minimizeBtn.style.display = 'flex';
        
        if (accessibility) {
            accessibility.announce('Main box minimized', 'polite');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded, initializing modules...');
    
    // Initialize modules
    try {
        accessibility = new Accessibility();
        window.accessibility = accessibility;
        console.log('Accessibility module initialized');
        
        navigation = new Navigation();
        console.log('Navigation module initialized');
        
        animations = new Animations();
        console.log('Animations module initialized');
    } catch (error) {
        console.error('Error initializing modules:', error);
    }
    
    // Initialize features
    try {
        populateProjectsSlider();
        populateBlogsSlider();
        populatePublicationsSlider();
        console.log('Project, blog, and publication sliders populated');
        
        handleInitialHash();
        
        setupParallaxEffect();
        setupScrollToTop();
        setupCommandPalette();
        
        // Setup minimize button (only works in opening mode)
        const minimizeBtn = document.getElementById('minimizeMainBox');
        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMinimizeMainBox();
            });
        }
        
        // Initialize main-box bottom position
        updateMainBoxBottom();
        
        // Update main-box bottom position on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                updateMainBoxBottom();
            }, 100);
        });
        
        // Make setup functions globally accessible after they're defined
        window.setupProjectFilters = setupProjectFilters;
        window.setupBlogFilters = setupBlogFilters;
        window.setupPublicationFilters = setupPublicationFilters;
        console.log('Setup functions made globally accessible');
    } catch (error) {
        console.error('Error initializing features:', error);
    }
    
    // Setup drag to scroll for project slider (if needed)
    if (projectSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        projectSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            projectSlider.style.cursor = 'grabbing';
            startX = e.pageX - projectSlider.offsetLeft;
            scrollLeft = projectSlider.scrollLeft;
        });
        
        projectSlider.addEventListener('mouseleave', () => {
            isDown = false;
            projectSlider.style.cursor = 'grab';
        });
        
        projectSlider.addEventListener('mouseup', () => {
            isDown = false;
            projectSlider.style.cursor = 'grab';
        });
        
        projectSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - projectSlider.offsetLeft;
            const walk = (x - startX) * 2;
            projectSlider.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Setup drag to scroll for blog slider (if needed)
    if (blogSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        blogSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            blogSlider.style.cursor = 'grabbing';
            startX = e.pageX - blogSlider.offsetLeft;
            scrollLeft = blogSlider.scrollLeft;
        });
        
        blogSlider.addEventListener('mouseleave', () => {
            isDown = false;
            blogSlider.style.cursor = 'grab';
        });
        
        blogSlider.addEventListener('mouseup', () => {
            isDown = false;
            blogSlider.style.cursor = 'grab';
        });
        
        blogSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - blogSlider.offsetLeft;
            const walk = (x - startX) * 2;
            blogSlider.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Setup resize listener for project/blog display positioning
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (projectDisplay && projectDisplay.classList.contains('active') && 
                window.innerWidth > 1024) {
                positionProjectDisplay();
            }
            if (blogDisplay && blogDisplay.classList.contains('active') && 
                window.innerWidth > 1024) {
                positionBlogDisplay();
            }
            if (publicationDisplay && publicationDisplay.classList.contains('active') && 
                window.innerWidth > 1024) {
                positionPublicationDisplay();
            }
        }, 100);
    });
});
