document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       MOBILE MENU
    ========================== */
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburgerIcon = document.getElementById('hamburgerIcon');
    const closeIcon = document.getElementById('closeIcon');

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            hamburgerIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            hamburgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });

    document.addEventListener('click', (e) => {
        if (
            !mobileMenu.contains(e.target) &&
            !menuToggle.contains(e.target) &&
            !mobileMenu.classList.contains('hidden')
        ) {
            mobileMenu.classList.add('hidden');
            hamburgerIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });

    /* =========================
       NAVBAR SCROLL EFFECT
    ========================== */
    const navbar = document.getElementById('navbar');
    const navbarContent = document.getElementById('navbarContent');
    const logo = document.getElementById('logo');
    const navLinks = document.querySelectorAll('.nav-link');

    let lastKnownScroll = 0;
    let ticking = false;

    function handleNavbar(scrollY) {
        if (scrollY > 50) {
            navbar.classList.remove('bg-transparent');
            navbar.classList.add('bg-white', 'shadow-lg');

            navbarContent.classList.replace('h-24', 'h-16');
            navbarContent.classList.replace('sm:h-28', 'sm:h-20');
            navbarContent.classList.replace('lg:h-44', 'lg:h-20');

            logo.classList.replace('h-20', 'h-12');
            logo.classList.replace('sm:h-24', 'sm:h-16');
            logo.classList.replace('lg:h-40', 'lg:h-16');

            navLinks.forEach(link => {
                link.classList.add('text-[#C9A33A]', 'hover:text-[#4B5A2A]');
                link.classList.remove('text-white');
            });
        } else {
            navbar.classList.add('bg-transparent');
            navbar.classList.remove('bg-white', 'shadow-lg');

            navbarContent.classList.replace('h-16', 'h-24');
            navbarContent.classList.replace('sm:h-20', 'sm:h-28');
            navbarContent.classList.replace('lg:h-20', 'lg:h-44');

            logo.classList.replace('h-12', 'h-20');
            logo.classList.replace('sm:h-16', 'sm:h-24');
            logo.classList.replace('lg:h-16', 'lg:h-40');
        }
    }

    window.addEventListener('scroll', () => {
        lastKnownScroll = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleNavbar(lastKnownScroll);
                ticking = false;
            });
            ticking = true;
        }
    });

    /* =========================
       ACTIVE LINK ON SCROLL
    ========================== */
    const sections = document.querySelectorAll('section');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('href') === `#${current}`
            );
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    /* =========================
       INTERSECTION OBSERVER
    ========================== */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-fadeUp');
                    entry.target.classList.remove('opacity-0');

                    const counter = entry.target.querySelector('[data-target]');
                    if (counter && !counter.dataset.counted) {
                        counter.dataset.counted = 'true';
                        animateCounter(counter, +counter.dataset.target);
                    }
                }, index * 120);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

    /* =========================
       SMOOTH SCROLL
    ========================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href'))?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    /* =========================
       TESTIMONIAL SLIDER
    ========================== */
    let currentIndex = 0;
    const totalSlides = 3;

    function moveTestimonial(index) {
        const track = document.getElementById("testimonialTrack");
        if (!track) return;

        const slideWidth = track.children[0].offsetWidth;
        track.style.transform = `translateX(-${slideWidth * index}px)`;

        document.querySelectorAll(".dot").forEach((dot, i) => {
            dot.classList.toggle("bg-[#C9A33A]", i === index);
            dot.classList.toggle("bg-white/30", i !== index);
        });
    }

    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        moveTestimonial(currentIndex);
    }, 5000);

    window.addEventListener('resize', () => moveTestimonial(currentIndex));

});

/* =========================
   COUNTER (OPTIMIZED)
========================= */
function animateCounter(el, target, duration = 2000) {
    let startTime = null;

    function update(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        el.textContent = Math.floor(progress * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}
document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value || 'Not specified';
        const message = document.getElementById('message').value;
        
        // Validate phone number (Indian format)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid 10-digit phone number');
            return;
        }
        
        // Your WhatsApp number (replace with your actual number)
        const whatsappNumber = '9009279002'; // Format: country code + number (no + or spaces)
        
        // Create WhatsApp message
        const whatsappMessage = `*New Inquiry from Nirantar Website*%0A%0A` +
            `*Name:* ${encodeURIComponent(name)}%0A` +
            `*Email:* ${encodeURIComponent(email)}%0A` +
            `*Phone:* ${encodeURIComponent(phone)}%0A` +
            `*Service Interest:* ${encodeURIComponent(service)}%0A%0A` +
            `*Message:*%0A${encodeURIComponent(message)}`;
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
        
        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');
        
        // Optional: Reset form after submission
        this.reset();
        
        // Optional: Show success message
        alert('Redirecting to WhatsApp... Please send the pre-filled message!');
    });

    // Phone number formatting (optional)
    document.getElementById('phone').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        e.target.value = value;
    });