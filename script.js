// ตัวอย่างการส่งฟอร์มด้วย Fetch API
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    const formData = new FormData(contactForm);
    
    try {
        // เปลี่ยน URL เป็น URL ของ PHP API บน InfinityFree
        const response = await fetch('https://zero-profile.ct.ws/send_email.php', {
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
            Swal.fire({
                title: 'Message Failed',
                text: result.message,
                icon: 'error',
                confirmButtonColor: '#000000',
                background: '#ffffff',
                iconColor: '#666666'
            });
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
