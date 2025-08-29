import Experience from './src/Experience/Experience.js'
import { projects } from './projects.js'

const slider = document.querySelector('.project-slider');
const projectDisplay = document.getElementById('projectDisplay');

const experience = new Experience(document.querySelector('canvas.webgl'))
const mainBox = document.querySelector('.main-box');
mainBox.addEventListener('click', displaySlider);

// Dynamically populate project slider with data from projects.js
function populateProjectSlider() {
    slider.innerHTML = ''; // Clear existing content
    
    projects.forEach((project, index) => {
        const projectItem = document.createElement('div');
        projectItem.className = 'project-item parallax-box';
        projectItem.setAttribute('data-project', index);
        
        projectItem.innerHTML = `
            <h3 class="project-item-title">${project.title}</h3>
            <p class="project-item-preview">${project.summary}</p>
            <p class="project-item-tech">${project.tech}</p>
        `;
        
        // Apply gradient to the title's border
        const projectItemTitle = projectItem.querySelector('.project-item-title');
        projectItemTitle.style.borderImageSource = project.gradient;
        projectItemTitle.style.borderImageSlice = "1";
        
        // Store gradient for active state border
        projectItem.setAttribute('data-gradient', project.gradient);
        
        // Add click handler
        projectItem.addEventListener('click', () => toggleProject(index));
        
        slider.appendChild(projectItem);
    });
}

// Function to display the slider (toggle) - only affects slider visibility
function displaySlider() {
    slider.classList.toggle('show');
}

// Function to toggle project details (display or hide if already active)
function toggleProject(projectIndex) {
    const project = projects[projectIndex];
    const projectItems = document.querySelectorAll('.project-item');
    const clickedItem = projectItems[projectIndex];
    
    // If clicking the already active item, deactivate it
    if (clickedItem.classList.contains('active')) {
        clickedItem.classList.remove('active');
        clickedItem.style.borderImageSource = '';
        projectDisplay.classList.remove('active');
        
        // Reset title underline to original gradient when deactivating
        setTimeout(() => {
            if (projectDisplay.querySelector('.project-display-title')) {
                const projectDisplayTitle = projectDisplay.querySelector('.project-display-title');
                projectDisplayTitle.style.borderImage = 'radial-gradient(#797979, #b6b6b6)';
                projectDisplayTitle.style.borderImageSlice = '1'; 
            }
        }, 200);
        return;
    }
    
    // If another project is currently active, transition out first
    if (projectDisplay.classList.contains('active')) {
        projectDisplay.classList.remove('active');
        setTimeout(() => {
            displayProject(projectIndex);
        }, 300); // Wait for fade out transition
    } else {
        // No active project, display immediately
        displayProject(projectIndex);
    }
}

// Function to display project details
function displayProject(projectIndex) {
    const project = projects[projectIndex];
    const projectItems = document.querySelectorAll('.project-item');

    projectDisplay.innerHTML = `
        <div class="project-display-title">${project.title}</div>
        <div class="project-display-description">${project.description}</div>
        <div class="project-display-tech">${project.tech}</div>
        <div class="project-display-date">${project.date}</div>
    `;

    // Apply gradients dynamically to the project display box border
    projectDisplay.style.borderImageSource = project.gradient;
    projectDisplay.style.borderImageRadius = "10px";
    projectDisplay.style.borderImageSlice = "1";

    // Set white underline for active project display title
    const projectDisplayTitle = projectDisplay.querySelector('.project-display-title');
    projectDisplayTitle.style.borderImage = 'radial-gradient(#ffffff, #ffffff)';
    projectDisplayTitle.style.borderImageSlice = '1';

    // Active class management
    projectItems.forEach(item => {
        item.classList.remove('active');
        // Reset border when not active
        item.style.borderImageSource = '';
    });
    
    const activeItem = projectItems[projectIndex];
    activeItem.classList.add('active');
    
    // Apply gradient border when active
    const gradient = activeItem.getAttribute('data-gradient');
    activeItem.style.borderImageSource = gradient;
    activeItem.style.borderImageSlice = "1";
    
    projectDisplay.classList.add('active');

    // Render MathJax
    if (window.MathJax) {
        MathJax.typesetPromise([projectDisplay]).catch(err => console.log(err.message));
    }
}

// Subtle parallax effect
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateProjectSlider();
    setupParallaxEffect();
});