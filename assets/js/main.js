// Mobile menu toggle
document.querySelector('.mobile-menu-button').addEventListener('click', function() {
    document.querySelector('.mobile-menu').classList.toggle('hidden');
});

// Before/After slider functionality
document.querySelectorAll('.before-after-container').forEach(container => {
    const slider = container.querySelector('.before-after-slider');
    const handle = container.querySelector('.slider-handle');
    let isDragging = false;
    
    function moveSlider(e) {
        if (!isDragging) return;
        
        // Calculate position
        const containerRect = container.getBoundingClientRect();
        let pos = (e.clientX - containerRect.left) / containerRect.width;
        
        // Keep within bounds
        pos = Math.max(0, Math.min(1, pos));
        
        // Update slider width
        slider.style.width = `${pos * 100}%`;
        handle.style.left = `${pos * 100}%`;
    }
    
    // Mouse events
    handle.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mousemove', moveSlider);
    document.addEventListener('mouseup', () => isDragging = false);
    
    // Touch events
    handle.addEventListener('touchstart', () => isDragging = true);
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            moveSlider(e.touches[0]);
        }
    });
    document.addEventListener('touchend', () => isDragging = false);
});

// Back to top button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
    } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
    }
});

backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            document.querySelector('.mobile-menu').classList.add('hidden');
        }
    });
});