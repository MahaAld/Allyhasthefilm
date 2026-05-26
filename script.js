document.addEventListener("DOMContentLoaded", () => {
    
    const tabLinks = document.querySelectorAll('.tab-link');
    const galleryTrigger = document.querySelector('.gallery-trigger');
    const sections = document.querySelectorAll('section');

    // --- 1. CORE TAB CONTROLLER ENGINE ---
    function showTab(targetId) {
        // Strip out the '#' character to evaluate clean HTML element IDs
        const cleanId = targetId.replace('#', '');
        
        // Loop and toggle visibility classes: show target, hide all others
        sections.forEach(section => {
            if (section.id === cleanId) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });

        // Loop and synchronize active class colors in top navigation tabs
        tabLinks.forEach(link => {
            if (link.getAttribute('href') === `#${cleanId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Snap window safely up to top for fresh layout views
        window.scrollTo(0, 0);
    }

    // Attach click events to top navigation tab links
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Break native smooth scroll anchors
            showTab(link.getAttribute('href'));
        });
    });

    // Attach click event to home hero 'View Gallery' button
    galleryTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        showTab(galleryTrigger.getAttribute('href'));
    });


    // --- 2. LIGHTBOX GALLERY EFFECT ---
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');

    galleryItems.forEach(image => {
        image.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = image.src;
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });


    // --- 3. CONTACT FORM SYSTEM ---
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert(`Thank you! Your message has been recorded safely.`);
        contactForm.reset();
    });
});