// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

// Countdown timer functionality
function initCountdown() {
  const weddingDate = new Date('2025-07-11T10:30:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      document.getElementById('countdown').innerHTML =
        '<div class="countdown-item"><span class="countdown-number">🎉</span><span class="countdown-label">СВЯТО ПОЧАЛОСЯ!</span></div>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(
      2,
      '0'
    );
    document.getElementById('minutes').textContent = String(minutes).padStart(
      2,
      '0'
    );
    document.getElementById('seconds').textContent = String(seconds).padStart(
      2,
      '0'
    );
  }

  // Update countdown immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Navigation scroll effect
function handleNavScroll() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
  });
}

// Active navigation link highlighting
function setActiveNavLink() {
  const sections = ['hero', 'details', 'location', 'timing'];
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          currentSection = sectionId;
        }
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

// Animate elements on scroll
function animateOnScroll() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe sections for animation
  const sections = document.querySelectorAll('section:not(.hero)');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
  });
}

// Button click handlers
function setupButtonHandlers() {
  // RSVP buttons
  const rsvpButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
  rsvpButtons.forEach(button => {
    button.addEventListener('click', e => {
      if (button.textContent.includes('Підтвердження')) {
        handleRSVP();
      } else if (button.textContent.includes('Запрошення')) {
        scrollToSection('hero');
      }
    });
  });

  // Navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });
}

// RSVP handler
function handleRSVP() {
  const confirmed = confirm(
    'Ви підтверджуєте свою присутність на весіллі 11 липня 2025 року?'
  );

  if (confirmed) {
    alert('Дякуємо за підтвердження! Ми з нетерпінням чекаємо на вас! 💕');
  } else {
    alert('Дякуємо за відповідь. Нам буде вас не вистачати! 💔');
  }
}

// Parallax effect for hero section
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');

    if (heroImage) {
      const rate = scrolled * -0.5;
      heroImage.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Add floating hearts animation
function createFloatingHearts() {
  const heartsContainer = document.createElement('div');
  heartsContainer.className = 'floating-hearts';
  heartsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1001;
        overflow: hidden;
    `;

  document.body.appendChild(heartsContainer);

  function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * 100}%;
            top: 100%;
            opacity: 0.7;
            animation: floatUp ${Math.random() * 3 + 4}s linear infinite;
        `;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 7000);
  }

  // Add CSS for floating animation
  const style = document.createElement('style');
  style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.7;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // Create hearts periodically
  setInterval(createHeart, 3000);
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  handleNavScroll();
  setActiveNavLink();
  animateOnScroll();
  setupButtonHandlers();
  initParallax();

  // Add floating hearts effect after a delay
  setTimeout(createFloatingHearts, 2000);

  // Add click effect to countdown numbers
  document.querySelectorAll('.countdown-number').forEach(number => {
    number.addEventListener('click', () => {
      number.style.transform = 'scale(1.2)';
      number.style.transition = 'transform 0.3s ease';

      setTimeout(() => {
        number.style.transform = 'scale(1)';
      }, 300);
    });
  });
});

// Add some Easter eggs
document.addEventListener('keydown', e => {
  // Press 'L' for love
  if (e.key.toLowerCase() === 'l') {
    const hearts = ['💕', '💖', '💗', '💘', '💝', '💞', '💟'];
    const randomHeart = hearts[Math.floor(Math.random() * hearts.length)];

    const heartElement = document.createElement('div');
    heartElement.innerHTML = randomHeart;
    heartElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            z-index: 9999;
            pointer-events: none;
            animation: heartPulse 1s ease-out forwards;
        `;

    document.body.appendChild(heartElement);

    setTimeout(() => {
      heartElement.remove();
    }, 1000);
  }
});

// Add CSS for heart pulse animation
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes heartPulse {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.2);
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(heartStyle);
