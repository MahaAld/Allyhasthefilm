document.addEventListener("DOMContentLoaded", () => {
    
    const tabLinks = document.querySelectorAll('.tab-link');
    const workTrigger = document.querySelector('.work-trigger');
    const sections = document.querySelectorAll('section');

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

        window.scrollTo(0, 0);
    }

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            showTab(link.getAttribute('href'));
        });
    });

    // Added a check just in case you removed the home button text completely
    if (workTrigger) {
        workTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            showTab(workTrigger.getAttribute('href'));
        });
    }


    // --- 2. LIGHTBOX work EFFECT ---
    const lightboxImages = document.querySelectorAll('.work-item img'); // Renamed to avoid conflicts
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');

    lightboxImages.forEach(image => {
        image.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = image.src;
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }


    // --- 3. UPGRADED CONTACT FORM SYSTEM ---
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('form-success');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show the custom elegant message instead of an old alert box
            if (successMessage) {
                successMessage.style.display = 'block';
                
                // Automatically hide it after 4 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 4000);
            } else {
                // Fallback alert if the HTML element isn't there
                alert(`Thank you! Your message has been recorded safely.`);
            }
            
            contactForm.reset();
        });
    }


    // --- 4. work CATEGORY FILTER ENGINE ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.work-item'); // Renamed to keep code isolated

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            filterItems.forEach(item => {
                item.classList.remove('fade-item');
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.classList.add('fade-item');
                    }, 10);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});