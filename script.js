// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init('SNuVv3R3sTqOSXtGD'); // Replace with your EmailJS public key
  
    // Header scroll effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  
    // Handle form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
  
        if (!validateForm()) return;
  
        const submitButton = contactForm.querySelector('.submit-button');
        const originalButtonText = submitButton.textContent;
  
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
  
        emailjs.sendForm('service_6frmina', 'template_q9a3wnl', this)
          .then(function () {
            showNotification('Your message has been sent successfully!', 'success');
            contactForm.reset();
          })
          .catch(function (error) {
            showNotification('Failed to send message. Please try again later.', 'error');
            console.error('EmailJS Error:', error);
          })
          .finally(function () {
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
          });
      });
    }
  
    // Validate form fields
    function validateForm() {
      let isValid = true;
      const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
  
      inputs.forEach(input => {
        input.classList.remove('error');
        if (!input.value.trim()) {
          input.classList.add('error');
          isValid = false;
        }
  
        if (input.type === 'email' && !isValidEmail(input.value)) {
          input.classList.add('error');
          isValid = false;
        }
      });
  
      if (!isValid) {
        showNotification('Please fill all required fields correctly', 'error');
      }
  
      return isValid;
    }
  
    // Email validation helper
    function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  
    // Show notification
    function showNotification(message, type = 'success') {
      const existing = document.querySelector('.notification');
      if (existing) existing.remove();
  
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="close-notification"><i class="fas fa-times"></i></button>
      `;
  
      document.body.appendChild(notification);
      setTimeout(() => notification.classList.add('show'), 10);
  
      const autoHide = setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, 5000);
  
      notification.querySelector('.close-notification').addEventListener('click', () => {
        clearTimeout(autoHide);
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      });
    }
  
    // Scroll-based animation
    function animateOnScroll() {
      document.querySelectorAll('.service-card, .section-title, .about-content').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      });
    }
  
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
  });
  