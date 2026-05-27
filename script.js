document.addEventListener("DOMContentLoaded", () => {
    
    const tabLinks = document.querySelectorAll('.tab-link');
    const logoLink = document.querySelector('.logo-link'); 
    const sections = document.querySelectorAll('section');

    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.work-item');
    const workGrid = document.querySelector('.work-grid');

    // --- 1. CORE TAB CONTROLLER ENGINE ---
    function showTab(targetId) {
        const cleanId = targetId.replace('#', '');
        
        sections.forEach(section => {
            if (section.id === cleanId) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });

        tabLinks.forEach(link => {
            if (link.getAttribute('href') === `#${cleanId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Reset Rule: If they navigate AWAY from work, clear out the active pictures
        if (cleanId !== 'work') {
            runFilter(''); 
            filterButtons.forEach(btn => btn.classList.remove('active'));
        }

        window.scrollTo(0, 0);
    }

    // Attach click events to your navigation links (Work, About)
    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            showTab(link.getAttribute('href'));
        });
    });

    // Attach click event to the Logo link (Home)
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            showTab(logoLink.getAttribute('href') || '#home');
        });
    }


    // --- 2. LIGHTBOX EFFECT ---
    const lightboxImages = document.querySelectorAll('.work-item img'); 
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');

    lightboxImages.forEach(image => {
        image.addEventListener('click', () => {
            if (lightbox && lightboxImg) {
                lightbox.style.display = 'flex';
                lightboxImg.src = image.src;
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }


    // --- 3. GALLERY CATEGORY FILTER ENGINE ---
    function runFilter(filterValue) {
        // If no button has been selected yet, hide the entire grid container and items
        if (!filterValue) {
            if (workGrid) workGrid.classList.add('container-hidden');
            filterItems.forEach(item => {
                item.classList.add('hidden');
                item.classList.remove('fade-item');
            });
            return;
        }

        // A category was clicked! Unhide the grid container layout
        if (workGrid) workGrid.classList.remove('container-hidden');

        // Loop through images and show only matching files
        filterItems.forEach(item => {
            item.classList.remove('fade-item');
            const itemCategory = item.getAttribute('data-category');

            if (itemCategory === filterValue) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.classList.add('fade-item');
                }, 10);
            } else {
                item.classList.add('hidden');
            }
        });
    }

    // Run initially with an empty value so the gallery view starts 100% blank
    runFilter('');

    // Handle button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            runFilter(filterValue);
        });
    });

});