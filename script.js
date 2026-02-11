document.addEventListener("DOMContentLoaded", () => {
    /* =========================
         MOBILE MENU
      ========================== */
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const hamburgerIcon = document.getElementById("hamburgerIcon");
    const closeIcon = document.getElementById("closeIcon");

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle("hidden");
            hamburgerIcon?.classList.toggle("hidden");
            closeIcon?.classList.toggle("hidden");
        });

        document.addEventListener("click", (e) => {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.classList.add("hidden");
                hamburgerIcon?.classList.remove("hidden");
                closeIcon?.classList.add("hidden");
            }
        });
    }

    document.querySelectorAll(".mobile-link").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu?.classList.add("hidden");
            hamburgerIcon?.classList.remove("hidden");
            closeIcon?.classList.add("hidden");
        });
    });

    /* =========================
         NAVBAR SCROLL EFFECT
      ========================== */
    const navbar = document.getElementById("navbar");
    const navbarContent = document.getElementById("navbarContent");
    const logo = document.getElementById("logo");
    const navLinks = document.querySelectorAll(".nav-link");

    let isShrunk = false;

    function handleNavbar(scrollY) {
        if (!navbar || !navbarContent || !logo) return;

        if (scrollY > 50 && !isShrunk) {
            isShrunk = true;

            navbar.classList.remove("bg-transparent");
            navbar.classList.add("bg-white", "shadow-lg");

            navbarContent.classList.replace("h-24", "h-16");
            navbarContent.classList.replace("sm:h-28", "sm:h-20");
            navbarContent.classList.replace("lg:h-44", "lg:h-20");

            logo.classList.replace("h-20", "h-12");
            logo.classList.replace("sm:h-24", "sm:h-16");
            logo.classList.replace("lg:h-40", "lg:h-16");

            navLinks.forEach((link) => {
                link.classList.add("text-[#C9A33A]", "hover:text-[#4B5A2A]");
                link.classList.remove("text-white");
            });
        }

        if (scrollY <= 50 && isShrunk) {
            isShrunk = false;

            navbar.classList.add("bg-transparent");
            navbar.classList.remove("bg-white", "shadow-lg");

            navbarContent.classList.replace("h-16", "h-24");
            navbarContent.classList.replace("sm:h-20", "sm:h-28");
            navbarContent.classList.replace("lg:h-20", "lg:h-44");

            logo.classList.replace("h-12", "h-20");
            logo.classList.replace("sm:h-16", "sm:h-24");
            logo.classList.replace("lg:h-16", "lg:h-40");
        }
    }

    window.addEventListener("scroll", () => {
        window.requestAnimationFrame(() => handleNavbar(window.scrollY));
    });

    /* =========================
         ACTIVE LINK ON SCROLL
      ========================== */
    const sections = document.querySelectorAll("section");

    function updateActiveLink() {
        let current = "";
        sections.forEach((section) => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${current}`,
            );
        });
    }

    window.addEventListener("scroll", updateActiveLink);

    /* =========================
         COUNTER ANIMATION
      ========================= */
    function animateCounter(el, target, duration = 2000) {
        let start = null;
        function update(ts) {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            el.textContent = Math.floor(progress * target).toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    /* =========================
         INTERSECTION OBSERVER
      ========================== */
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-fadeUp");
                    entry.target.classList.remove("opacity-0");

                    const counter = entry.target.querySelector("[data-target]");
                    if (counter && !counter.dataset.counted) {
                        counter.dataset.counted = "true";
                        animateCounter(counter, +counter.dataset.target);
                    }

                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 },
    );

    document
        .querySelectorAll(".scroll-animate")
        .forEach((el) => observer.observe(el));

    /* =========================
         SMOOTH SCROLL
      ========================== */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const target = document.querySelector(anchor.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        });
    });

    /* =========================
         TESTIMONIAL SLIDER
      ========================= */
    const track = document.getElementById("testimonialTrack");
    const slides = track?.children || [];
    const dots = document.querySelectorAll(".dot");
    let currentIndex = 0;

    function moveTestimonial(index) {
        if (!track || !slides.length) return;

        currentIndex = index;
        const slideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${slideWidth * index}px)`;

        // Update dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add("bg-[#C9A33A]");
                dot.classList.remove("bg-white/30");
            } else {
                dot.classList.remove("bg-[#C9A33A]");
                dot.classList.add("bg-white/30");
            }
        });
    }

    // Add click listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            moveTestimonial(index);
        });
    });

    // Auto-slide every 5 seconds
    if (slides.length) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            moveTestimonial(currentIndex);
        }, 5000);

        window.addEventListener("resize", () => moveTestimonial(currentIndex));
    }

    /* =========================
         CONTACT FORM → WHATSAPP
      ========================= */
    const contactForm = document.getElementById("contactForm");
    const phoneInput = document.getElementById("phone");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = this.name.value;
            const email = this.email.value;
            const phone = this.phone.value;
            const service = this.service?.value || "Not specified";
            const message = this.message.value;

            if (!/^[0-9]{10}$/.test(phone)) {
                alert("Enter a valid 10-digit phone number");
                return;
            }

            const whatsappNumber = "9009279002";
            const text = `
New Inquiry from Nirantar Website

Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}

Message:
${message}
            `.trim();

            window.open(
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
                "_blank",
            );

            this.reset();
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener("input", (e) => {
            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
        });
    }
});
