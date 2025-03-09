document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const icon = themeToggle.querySelector('i');

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      icon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    }
  });

  // Smooth scroll for navigation links
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

  // Animate skill bars
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
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, observerOptions);
  skills.forEach(skill => observer.observe(skill));

  // Form submission with enhanced feedback
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    const formData = new FormData(contactForm);
    
    try {
      // เปลี่ยน URL ให้เป็นแบบ Absolute ของ PHP Server
      const response = await fetch('https://yourserver.com/send_email.php', {
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
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
