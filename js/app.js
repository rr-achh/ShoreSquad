// ============================================
// ShoreSquad JavaScript - Modern, Performant, Accessible
// ============================================

// ============================================
// Utility Functions
// ============================================

/**
 * Debounce function to limit rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function to limit function execution frequency
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
const throttle = (func, limit = 100) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Animate counter with easing
 * @param {HTMLElement} element - Element to animate
 * @param {number} target - Target number
 * @param {number} duration - Animation duration in ms
 */
const animateCounter = (element, target, duration = 2000) => {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.ceil(target).toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.ceil(current).toLocaleString();
    }
  }, 16);
};

// ============================================
// Intersection Observer for Scroll Animations
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      
      // Animate counters if they exist
      if (entry.target.hasAttribute('data-count')) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        animateCounter(entry.target, target);
        entry.target.removeAttribute('data-count'); // Prevent re-animation
      }
    }
  });
}, observerOptions);

// Observe all elements with data-animate attribute
const initScrollAnimations = () => {
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach((el) => animateOnScroll.observe(el));
  
  // Observe stat counters
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  statNumbers.forEach((el) => animateOnScroll.observe(el));
};

// ============================================
// Mobile Menu Toggle
// ============================================

const initMobileMenu = () => {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!menuToggle || !navMenu) return;
  
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      menuToggle.focus();
    }
  });
};

// ============================================
// Smooth Scroll with offset for fixed header
// ============================================

const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Don't handle empty anchors
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        
        // Update focus for accessibility
        target.focus({ preventScroll: true });
      }
    });
  });
};

// ============================================
// Header scroll effect
// ============================================

const initHeaderScroll = () => {
  const header = document.querySelector('.header');
  if (!header) return;
  
  const handleScroll = throttle(() => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, 100);
  
  window.addEventListener('scroll', handleScroll, { passive: true });
};

// ============================================
// Form Handling
// ============================================

const initFormHandling = () => {
  const signupForm = document.querySelector('.signup-form');
  if (!signupForm) return;
  
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const emailInput = signupForm.querySelector('#email-input');
    const submitBtn = signupForm.querySelector('button[type="submit"]');
    const email = emailInput.value;
    
    // Basic validation
    if (!email || !isValidEmail(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Signing up...';
    
    try {
      // Simulate API call
      await simulateAPICall(email);
      
      // Success
      showNotification('Welcome to ShoreSquad! Check your email.', 'success');
      emailInput.value = '';
      
      // Store in localStorage for demo
      localStorage.setItem('shoresquad_email', email);
      
    } catch (error) {
      showNotification('Oops! Something went wrong. Try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
};

/**
 * Simple email validation
 */
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Simulate API call
 */
const simulateAPICall = (email) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, email }), 1500);
  });
};

/**
 * Show notification to user
 */
const showNotification = (message, type = 'info') => {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.setAttribute('role', 'alert');
  notification.setAttribute('aria-live', 'polite');
  
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
};

// ============================================
// Geolocation for "Near Me" button
// ============================================

const initGeolocation = () => {
  const nearMeBtn = document.querySelector('.btn-secondary');
  if (!nearMeBtn) return;
  
  nearMeBtn.addEventListener('click', async () => {
    if (!navigator.geolocation) {
      showNotification('Geolocation is not supported by your browser', 'error');
      return;
    }
    
    const originalText = nearMeBtn.innerHTML;
    nearMeBtn.innerHTML = '<span aria-hidden="true">📍</span> Finding...';
    nearMeBtn.disabled = true;
    
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      
      // Store location
      localStorage.setItem('user_location', JSON.stringify({ latitude, longitude }));
      
      showNotification(`Location found! Showing cleanups near you.`, 'success');
      
      // In a real app, this would filter cleanup data
      console.log('User location:', { latitude, longitude });
      
    } catch (error) {
      showNotification('Unable to get your location. Please enable location services.', 'error');
    } finally {
      nearMeBtn.innerHTML = originalText;
      nearMeBtn.disabled = false;
    }
  });
};

/**
 * Promisified geolocation
 */
const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      timeout: 10000,
      enableHighAccuracy: true,
    });
  });
};

// ============================================
// Dynamic Cleanup Cards
// ============================================

// Mock data for cleanup events
const mockCleanups = [
  {
    id: 1,
    title: 'Santa Monica Sunrise Cleanup',
    location: 'Santa Monica Beach, CA',
    date: '2025-12-05',
    time: '7:00 AM',
    attendees: 24,
    weather: '☀️ 20°C',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
  },
  {
    id: 2,
    title: 'Malibu Crew Beach Sweep',
    location: 'Malibu Coast, CA',
    date: '2025-12-06',
    time: '8:30 AM',
    attendees: 18,
    weather: '⛅ 22°C',
    difficulty: 'Moderate',
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400',
  },
  {
    id: 3,
    title: 'Venice Beach Squad Day',
    location: 'Venice Beach, CA',
    date: '2025-12-07',
    time: '9:00 AM',
    attendees: 32,
    weather: '☀️ 24°C',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
  },
];

/**
 * Load and render cleanup cards
 */
const loadCleanupCards = () => {
  const cleanupsGrid = document.querySelector('.cleanups-grid');
  if (!cleanupsGrid) return;
  
  // Remove skeleton loaders
  cleanupsGrid.innerHTML = '';
  
  // Render cleanup cards
  mockCleanups.forEach((cleanup, index) => {
    const card = createCleanupCard(cleanup);
    cleanupsGrid.appendChild(card);
    
    // Stagger animation
    setTimeout(() => {
      card.classList.add('animate-in');
    }, index * 100);
  });
};

/**
 * Create cleanup card element
 */
const createCleanupCard = (cleanup) => {
  const card = document.createElement('article');
  card.className = 'cleanup-card';
  card.setAttribute('role', 'listitem');
  
  card.innerHTML = `
    <div class="cleanup-card-image" style="background-image: url('${cleanup.image}');">
      <span class="cleanup-badge">${cleanup.difficulty}</span>
    </div>
    <div class="cleanup-card-content">
      <h3 class="cleanup-title">${cleanup.title}</h3>
      <div class="cleanup-info">
        <span class="cleanup-location">📍 ${cleanup.location}</span>
        <span class="cleanup-date">📅 ${formatDate(cleanup.date)}</span>
        <span class="cleanup-time">🕐 ${cleanup.time}</span>
        <span class="cleanup-weather">${cleanup.weather}</span>
      </div>
      <div class="cleanup-footer">
        <span class="cleanup-attendees">👥 ${cleanup.attendees} going</span>
        <button class="btn btn-primary btn-small" data-cleanup-id="${cleanup.id}">
          Join Cleanup
        </button>
      </div>
    </div>
  `;
  
  // Add event listener to join button
  const joinBtn = card.querySelector('.btn-primary');
  joinBtn.addEventListener('click', () => handleJoinCleanup(cleanup));
  
  return card;
};

/**
 * Format date string
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

/**
 * Handle joining a cleanup
 */
const handleJoinCleanup = (cleanup) => {
  showNotification(`You're in! See you at ${cleanup.title}! 🌊`, 'success');
  
  // Store in localStorage
  const joinedCleanups = JSON.parse(localStorage.getItem('joined_cleanups') || '[]');
  if (!joinedCleanups.includes(cleanup.id)) {
    joinedCleanups.push(cleanup.id);
    localStorage.setItem('joined_cleanups', JSON.stringify(joinedCleanups));
  }
  
  console.log('Joined cleanup:', cleanup);
};

// ============================================
// Performance Optimizations
// ============================================

/**
 * Lazy load images
 */
const initLazyLoading = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach((img) => imageObserver.observe(img));
};

// ============================================
// Dark Mode Toggle (Future Enhancement)
// ============================================

const initDarkMode = () => {
  const darkModePreference = localStorage.getItem('dark_mode');
  
  if (darkModePreference === 'true') {
    document.body.classList.add('dark-mode');
  }
  
  // Listen for system preference changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('dark_mode')) {
        document.body.classList.toggle('dark-mode', e.matches);
      }
    });
  }
};

// ============================================
// Performance Monitoring
// ============================================

const logPerformanceMetrics = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      
      console.log('📊 Performance Metrics:');
      console.log(`   Page Load Time: ${pageLoadTime}ms`);
      console.log(`   Connection Time: ${connectTime}ms`);
    });
  }
};

// ============================================
// Service Worker Registration (PWA Support)
// ============================================

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Uncomment when service worker file is created
      // const registration = await navigator.serviceWorker.register('/sw.js');
      // console.log('✅ Service Worker registered:', registration);
    } catch (error) {
      console.log('❌ Service Worker registration failed:', error);
    }
  }
};

// ============================================
// Initialization
// ============================================

const init = () => {
  console.log('🌊 ShoreSquad initializing...');
  
  // Core functionality
  initMobileMenu();
  initSmoothScroll();
  initHeaderScroll();
  initScrollAnimations();
  
  // Forms and interactions
  initFormHandling();
  initGeolocation();
  
  // Dynamic content
  loadCleanupCards();
  
  // Optimizations
  initLazyLoading();
  initDarkMode();
  
  // PWA
  // registerServiceWorker();
  
  // Performance monitoring (dev only)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    logPerformanceMetrics();
  }
  
  console.log('✅ ShoreSquad ready!');
};

// ============================================
// Start when DOM is ready
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ============================================
// Export for modules (if needed)
// ============================================

// Uncomment if using ES6 modules
// export { init, animateCounter, showNotification };
