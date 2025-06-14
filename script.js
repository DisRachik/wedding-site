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
  const sections = [
    'hero',
    'details',
    'location',
    'invitation',
    'photos',
    'timing',
  ];
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
  // Navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });
}

// RSVP handler for footer button
function handleRSVP() {
  scrollToSection('invitation');
}

// Card flip functionality
function flipCard() {
  const card = document.querySelector('.invitation-card');
  if (card) {
    card.classList.toggle('flipped');
  }
}

// Toggle guest count visibility
function toggleGuestCount() {
  const attendance = document.querySelector(
    'input[name="attendance"]:checked'
  )?.value;
  const guestControls = document.querySelector('.guest-controls');
  const additionalGuestsContainer = document.querySelector(
    '.additional-guests-container'
  );

  if (attendance === 'yes') {
    if (guestControls) guestControls.style.display = 'flex';
  } else {
    if (guestControls) guestControls.style.display = 'none';
    if (additionalGuestsContainer) {
      additionalGuestsContainer.style.display = 'none';
      // Clear all additional guests
      additionalGuestsContainer.innerHTML = '';
      updateAddGuestButton();
    }
  }
}

// Add additional guest field
function addAdditionalGuest() {
  const additionalGuestsContainer = document.querySelector(
    '.additional-guests-container'
  );
  const currentGuests = additionalGuestsContainer.querySelectorAll(
    '.additional-guest-item'
  ).length;

  if (currentGuests >= 5) {
    alert('Максимум 5 додаткових гостей');
    return;
  }

  const guestNumber = currentGuests + 1;
  const guestId = `additionalGuest${guestNumber}`;

  const guestItem = document.createElement('div');
  guestItem.className = 'additional-guest-item';
  guestItem.innerHTML = `
    <div class="additional-guest-header">
      <label for="${guestId}">Додатковий гість ${guestNumber}</label>
      <button type="button" class="btn-remove-guest" onclick="removeAdditionalGuest('${guestId}')">×</button>
    </div>
    <input type="text" id="${guestId}" name="${guestId}" placeholder="Ім'я та прізвище гостя ${guestNumber}" required>
  `;

  additionalGuestsContainer.appendChild(guestItem);
  additionalGuestsContainer.style.display = 'block';

  updateAddGuestButton();
}

// Remove specific additional guest field
function removeAdditionalGuest(guestId) {
  const guestItem = document
    .getElementById(guestId)
    .closest('.additional-guest-item');
  if (guestItem) {
    guestItem.remove();
  }

  const additionalGuestsContainer = document.querySelector(
    '.additional-guests-container'
  );
  const remainingGuests = additionalGuestsContainer.querySelectorAll(
    '.additional-guest-item'
  );

  if (remainingGuests.length === 0) {
    additionalGuestsContainer.style.display = 'none';
  } else {
    // Renumber remaining guests
    remainingGuests.forEach((guest, index) => {
      const newNumber = index + 1;
      const input = guest.querySelector('input');
      const label = guest.querySelector('label');
      const removeBtn = guest.querySelector('.btn-remove-guest');

      const newId = `additionalGuest${newNumber}`;
      input.id = newId;
      input.name = newId;
      input.placeholder = `Ім'я та прізвище гостя ${newNumber}`;
      label.htmlFor = newId;
      label.textContent = `Додатковий гість ${newNumber}`;
      removeBtn.onclick = () => removeAdditionalGuest(newId);
    });
  }

  updateAddGuestButton();
}

// Update add guest button state
function updateAddGuestButton() {
  const additionalGuestsContainer = document.querySelector(
    '.additional-guests-container'
  );
  const addButton = document.querySelector('.btn-add-guest');
  const guestInfo = document.querySelector('.guest-count-info');
  const currentGuests = additionalGuestsContainer.querySelectorAll(
    '.additional-guest-item'
  ).length;

  if (currentGuests >= 5) {
    addButton.disabled = true;
    addButton.textContent = 'Максимум гостей досягнуто';
    guestInfo.textContent = 'Досягнуто максимум (5 гостей)';
  } else {
    addButton.disabled = false;
    addButton.textContent = '+ Додати гостя';
    guestInfo.textContent = `Можна додати до ${5 - currentGuests} гостей`;
  }
}

// Submit RSVP form
function submitRSVP(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  // Prepare message for Telegram
  let message = '🎉 НОВЕ ПІДТВЕРДЖЕННЯ ВЕСІЛЛЯ 🎉\n\n';
  message += "👤 Ім'я: " + data.guestName + '\n';
  message += '📧 Email: ' + data.email + '\n';
  message += '📱 Телефон: ' + data.phoneNumber + '\n';
  message +=
    '✅ Відповідь: ' +
    (data.attendance === 'yes'
      ? 'Із радістю приймємо запрошення'
      : 'На жаль, змушений відмовити') +
    '\n';

  // Add all additional guests
  const additionalGuests = [];
  for (let i = 1; i <= 5; i++) {
    const guestName = data[`additionalGuest${i}`];
    if (guestName) {
      additionalGuests.push(guestName);
    }
  }

  if (additionalGuests.length > 0) {
    message += '👥 Додаткові гості:\n';
    additionalGuests.forEach((guest, index) => {
      message += `   ${index + 1}. ${guest}\n`;
    });
  }

  message += '\n📅 Дата подачі: ' + new Date().toLocaleString('uk-UA');

  // Here you would send the message to Telegram
  // For now, we'll show it in console
  console.log('Telegram message:', message);

  // Reset form and flip back
  event.target.reset();
  // Clear additional guests
  const additionalGuestsContainer = document.querySelector(
    '.additional-guests-container'
  );
  if (additionalGuestsContainer) {
    additionalGuestsContainer.innerHTML = '';
    additionalGuestsContainer.style.display = 'none';
  }
  // Hide guest controls
  const guestControls = document.querySelector('.guest-controls');
  if (guestControls) guestControls.style.display = 'none';

  updateAddGuestButton();
  flipCard();

  // TODO: Add actual Telegram Bot API call here
  // sendToTelegram(message);
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

// Function to send message to Telegram (to be implemented)
function sendToTelegram(message) {
  // This would require a Telegram Bot Token and Chat ID
  // Example implementation:
  /*
  const botToken = 'YOUR_BOT_TOKEN';
  const chatId = 'YOUR_CHAT_ID';
  
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.ok) {
      console.log('Message sent to Telegram successfully');
    } else {
      console.error('Error sending message to Telegram:', data);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
  */
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
