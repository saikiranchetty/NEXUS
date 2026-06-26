document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
  
  // Sticky header with glow effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Floating particles
  function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random size between 1px and 3px
      const size = Math.random() * 2 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random animation duration between 10s and 20s
      const duration = Math.random() * 10 + 10;
      particle.style.animationDuration = `${duration}s`;
      
      // Random delay
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      // Random color
      const colors = ['var(--neon-blue)', 'var(--neon-pink)', 'var(--neon-purple)'];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      particlesContainer.appendChild(particle);
    }
  }
  
  // Scroll to top button
  const scrollTopBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  });
  
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Animate elements when they come into view
  function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-float, .animate-fade');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Initialize
  createParticles();
  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load
  
  // Form validation
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      const name = this.querySelector('input[name="name"]');
      const email = this.querySelector('input[name="email"]');
      const message = this.querySelector('textarea[name="message"]');
      
      let isValid = true;
      
      if (!name.value.trim()) {
        name.style.borderColor = 'var(--neon-pink)';
        isValid = false;
      } else {
        name.style.borderColor = '';
      }
      
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = 'var(--neon-pink)';
        isValid = false;
      } else {
        email.style.borderColor = '';
      }
      
      if (!message.value.trim()) {
        message.style.borderColor = 'var(--neon-pink)';
        isValid = false;
      } else {
        message.style.borderColor = '';
      }
      
      if (isValid) {
        // In a real app, you would submit the form here
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <h3>Thank You!</h3>
          <p>Your message has been sent successfully.</p>
        `;
        contactForm.parentNode.replaceChild(successMessage, contactForm);
        
        // Add animation
        successMessage.style.animation = 'fadeIn 0.5s ease forwards';
      }
    });
  }
  
  // Gallery lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length > 0) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <span class="close-lightbox">&times;</span>
        <img src="" alt="">
      </div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.close-lightbox');
    
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').getAttribute('src');
        lightboxImg.setAttribute('src', imgSrc);
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });
    
    closeBtn.addEventListener('click', function() {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
  
  // Current year in footer
  const yearElement = document.querySelector('.current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});