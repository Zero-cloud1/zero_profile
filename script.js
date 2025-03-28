document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    const mobileIcon = mobileThemeToggle ? mobileThemeToggle.querySelector('i') : null;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
        if (mobileIcon) {
            mobileIcon.classList.replace('fa-moon', 'fa-sun');
        }
    }

    // Function to toggle theme
    function toggleTheme() {
        // Add animation class
        this.classList.add('animating');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            this.classList.remove('animating');
        }, 500);
        
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            document.querySelectorAll('.theme-toggle i').forEach(i => {
                i.classList.replace('fa-moon', 'fa-sun');
            });
            localStorage.setItem('theme', 'dark');
        } else {
            document.querySelectorAll('.theme-toggle i').forEach(i => {
                i.classList.replace('fa-sun', 'fa-moon');
            });
            localStorage.setItem('theme', 'light');
        }
    }

    // Add event listeners to both theme toggles
    themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }
    
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            body.classList.remove('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links with refined easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Animate skill bars with refined animation
    const skills = document.querySelectorAll('.progress');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percent = entry.target.getAttribute('data-percent');
                entry.target.style.width = `${percent}%`;
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    skills.forEach(skill => observer.observe(skill));

    // Form submission with enhanced feedback
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch('send_email.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.status === 'success') {
                    Swal.fire({
                        title: 'Message Sent',
                        text: 'Thank you for reaching out!',
                        icon: 'success',
                        confirmButtonColor: '#000000',
                        background: '#ffffff',
                        iconColor: '#000000'
                    });
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                Swal.fire({
                    title: 'Message Failed',
                    text: 'Please try again or contact directly.',
                    icon: 'error',
                    confirmButtonColor: '#000000',
                    background: '#ffffff',
                    iconColor: '#666666'
                });
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add touch event listeners for better mobile experience
    if ('ontouchstart' in window) {
        document.querySelectorAll('.theme-toggle, .mobile-menu-btn, .mobile-nav-close, .nav-link, .mobile-nav-link, .submit-btn').forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        });
    }
});
