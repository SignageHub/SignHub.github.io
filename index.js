document.addEventListener('DOMContentLoaded', () => {
    // Current year for footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lightbox functionality
    const projectCards = document.querySelectorAll('.project-card img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = card.src;
            lightboxImg.alt = card.alt;
            // Get caption from the sibling .project-info h3 or p
            const parentCard = card.closest('.project-card');
            const projectTitle = parentCard ? parentCard.querySelector('.project-info h3')?.textContent : '';
            const projectLocation = parentCard ? parentCard.querySelector('.project-info p')?.textContent : '';
            
            if (projectTitle || projectLocation) {
                lightboxCaption.textContent = `${projectTitle}${projectLocation ? ' - ' + projectLocation : ''}`;
            } else {
                lightboxCaption.textContent = card.alt; // Fallback to alt text
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
        }
    });
});
