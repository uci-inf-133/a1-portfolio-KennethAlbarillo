
// Contact and Home page swaps
document.addEventListener('DOMContentLoaded', () => {
    // Initially hide home-page and show biography with about-me
    document.querySelector('.home-page').style.display = 'block';
    document.querySelector('.biography').style.display = 'block';
    document.querySelector('.contact-page').style.display = 'none';
    document.querySelector('#about-me').classList.add('active');

    document.querySelectorAll('.my-menu a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            const target = link.getAttribute('href').substring(1);

            if (target === 'home') {
                // Update menu button
                document.querySelectorAll('.my-menu a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
                // Show biography with about-me
                document.querySelector('.home-page').style.display = 'block';
                document.querySelector('.biography').style.display = 'block';
                document.querySelector('.contact-page').style.display = 'none';
                document.querySelector('#about-me').classList.add('active');
                // Hide other bio-sects if needed
                document.querySelectorAll('.bio-sect').forEach(sect => {
                    if (sect.id !== 'about-me') {
                        sect.classList.remove('active');
                        sect.style.display = 'none';
                    } else {
                        sect.style.display = 'block';
                    }
                });
                
                // Sync bio-menu active
                document.querySelectorAll('.bio-menu a').forEach(a => a.classList.remove('active'));
                document.querySelector('.bio-menu a[href="#about-me"]').classList.add('active');
                
            } else if (target === 'contact') {
                // Update menu button
                document.querySelectorAll('.my-menu a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
                // Remove home page
                document.querySelector('.home-page').style.display = 'none';
                document.querySelector('.biography').style.display = 'none';

                // Show contact page
                document.querySelector('.contact-page').style.display = 'grid';
            }
        });
    });
});

// Fade Effect with menu between top image and primary text/photo elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.bio-menu a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            const nextID = link.getAttribute('href').substring(1);
            const nextSection = document.getElementById(nextID);
            const currentSection = document.querySelector('.bio-sect.active');

            // User clicks the section they're already seeing
            if (currentSection === nextSection) return;

            // User clicks into new section
            document.querySelectorAll('.bio-menu a')
            .forEach(a => a.classList.remove('active'));
            link.classList.add('active');

            // Fade out current section
            currentSection.classList.remove('active');

            // After fade out, hide current content, wait for display change, then add new content
            setTimeout(() => {
                currentSection.style.display = 'none';
                nextSection.style.display = 'block';
                // Short delay before fade in
                setTimeout(() => {
                    nextSection.classList.add('active');
                }, 50);
            }, 400);
        });
    });
});

// Carousel Control (supports multiple carousels)
document.addEventListener('DOMContentLoaded', () => {
    // Find all carousels on the page
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const controlsId = carousel.querySelector('.image-controls').id; // Get the shared ID
        const leftButton = carousel.querySelector(`#${controlsId}.carousel-left`);
        const rightButton = carousel.querySelector(`#${controlsId}.carousel-right`);
        const dotsContainer = carousel.querySelector(`#${controlsId}.carousel-dots`);
        const slides = carousel.querySelectorAll('.carousel-slide');
        let currentIndex = 0; // Local to this carousel

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('carousel-dot');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                updateDots();
            });
            dotsContainer.appendChild(dot);
        });

        // Set initial active slide
        slides[0].classList.add('active');

        // Function to update the carousel position
        function updateCarousel() {
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentIndex);
            });
        }

        // Function to update active dot
        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Left button click
        leftButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            updateCarousel();
            updateDots();
        });

        // Right button click
        rightButton.addEventListener('click', () => {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
            updateDots();
        });
    });
});

// Click onto image to fullscreen, click again to exit
function toggleFS(img){
    if (!document.fullscreenElement){
        img.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

/* 
Makes sure the image is true to its size,
then reverts it back to how it looks when
on the grid.
*/
document.addEventListener('fullscreenchange', () => {
    const img = document.fullscreenElement;

    if (img && img.tagName === 'IMG'){
        img.style.backgroundColor = 'black';
        img.style.border = 'none';
        img.style.objectFit = 'contain';
    } else {
        document.querySelectorAll('img').forEach(originImg => {
            originImg.style.objectFit = 'cover';
            originImg.style.backgroundColor = '';
            originImg.style.border = '0.05px solid #fff';
            originImg.style.width = '';
            originImg.style.height = '';
        });
    }
});
