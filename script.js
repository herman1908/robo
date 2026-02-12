// Main JavaScript untuk website Rosoft Digitalindo dengan efek dari ReactBits.dev

// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Update active nav link
      document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.padding = "10px 0";
    navbar.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.padding = "15px 0";
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
  }

  // Update active nav link based on scroll position
  updateActiveNavLink();

  // Trigger scroll animations
  animateOnScroll();
});

// Function to update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Contact form submission
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("nama")?.value;
    const email = document.getElementById("email")?.value;
    const message = document.getElementById("pesan")?.value;

    if (!name || !email || !message) {
      showNotification("Harap lengkapi semua field!", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Email tidak valid!", "error");
      return;
    }

    showNotification("Pesan berhasil dikirim 🚀", "success");
    this.reset();
  });
}

// Custom carousel functionality
function initializeCarousel() {
  const carouselIndicators = document.querySelectorAll(".carousel-indicator");
  const cinematicCarousel = document.getElementById("cinematicCarousel");

  if (!cinematicCarousel) return;

  // Add click event to custom indicators
  carouselIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      // Update active indicator
      carouselIndicators.forEach((ind) => ind.classList.remove("active"));
      this.classList.add("active");

      // Move carousel to corresponding slide
      const carousel = new bootstrap.Carousel(cinematicCarousel);
      carousel.to(index);
    });
  });

  // Update indicators when carousel slides
  cinematicCarousel.addEventListener("slide.bs.carousel", function (event) {
    const activeIndex = event.to;

    carouselIndicators.forEach((indicator, index) => {
      if (index === activeIndex) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  });

  // Zoom effect for active carousel item
  const carouselItems = document.querySelectorAll(".carousel-item");

  cinematicCarousel.addEventListener("slid.bs.carousel", function () {
    carouselItems.forEach((item) => {
      const img = item.querySelector(".carousel-image");
      if (item.classList.contains("active")) {
        img.style.transform = "scale(1.05)";
      } else {
        img.style.transform = "scale(1)";
      }
    });
  });

  // Initialize zoom effect on page load
  const activeItem = document.querySelector(".carousel-item.active");
  if (activeItem) {
    const activeImg = activeItem.querySelector(".carousel-image");
    activeImg.style.transform = "scale(1.05)";
  }
}

// Animate elements on scroll
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Check if element is in viewport
    if (elementPosition.top < viewportHeight - 100) {
      const delay = element.getAttribute("data-delay") || 0;

      setTimeout(() => {
        element.classList.add("animated");
      }, delay * 1000);
    }
  });
}

// Notification system
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"} me-2"></i>
            ${message}
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;

  // Add styles if not already added
  if (!document.querySelector("#notification-styles")) {
    const styles = document.createElement("style");
    styles.id = "notification-styles";
    styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-width: 300px;
                max-width: 400px;
                z-index: 9999;
                transform: translateX(150%);
                transition: transform 0.3s ease;
                border-left: 4px solid #1a73e8;
            }
            .notification-success {
                border-left-color: #28a745;
            }
            .notification-error {
                border-left-color: #dc3545;
            }
            .notification-content {
                flex: 1;
                display: flex;
                align-items: center;
            }
            .notification-close {
                background: none;
                border: none;
                color: #666;
                cursor: pointer;
                font-size: 16px;
                margin-left: 10px;
                transition: color 0.3s ease;
            }
            .notification-close:hover {
                color: #333;
            }
            .notification.show {
                transform: translateX(0);
            }
        `;
    document.head.appendChild(styles);
  }

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);

  // Close button event
  notification.querySelector(".notification-close").addEventListener("click", () => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  });
}

// Parallax effect for hero section
function initParallax() {
  const heroSection = document.querySelector(".hero-section");
  if (!heroSection) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    heroSection.style.backgroundPosition = `center ${rate}px`;
  });
}

// Typing effect for hero title (optional)
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero-title");
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = "";

  let i = 0;
  const speed = 50; // milliseconds per character

  function typeWriter() {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  // Start typing effect when hero section is in view
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        typeWriter();
        observer.disconnect();
      }
    },
    { threshold: 0.5 },
  );

  observer.observe(heroTitle);
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Set current year
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Initialize carousel
  initializeCarousel();

  // Update nav on initial load
  updateActiveNavLink();

  // Initialize parallax
  initParallax();

  // Initialize typing effect (optional - uncomment if needed)
  // initTypingEffect();

  // Add glow effect to primary CTA buttons
  const primaryButtons = document.querySelectorAll(".btn-primary");
  primaryButtons.forEach((btn) => {
    if (btn.textContent.includes("Konsultasi") || btn.textContent.includes("Hubungi")) {
      btn.classList.add("glow");
    }
  });

  // Add hover effects to service cards
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
    });
  });

  // Initialize scroll animations
  animateOnScroll();

  // Add click effect to social icons
  document.querySelectorAll(".social-icon").forEach((icon) => {
    icon.addEventListener("click", function (e) {
      // Add ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple effect
  const rippleStyles = document.createElement("style");
  rippleStyles.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(rippleStyles);
});

// WhatsApp button functionality
document.querySelectorAll('a[href*="whatsapp"]').forEach((whatsappBtn) => {
  whatsappBtn.addEventListener("click", function (e) {
    // Add analytics tracking here
    console.log("WhatsApp button clicked");

    // Optional: Add click animation
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "";
    }, 200);
  });
});

// Form validation helper function
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Use debounce for scroll events
window.addEventListener("scroll", debounce(animateOnScroll, 10));



// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeSwitch.checked = true;
} else {
  document.body.classList.add("light-mode");
}

themeSwitch.addEventListener("change", () => {
  if (themeSwitch.checked) {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  }
});


// Floating navbar on scroll
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (window.scrollY > 50) nav.classList.add("scrolled");
  else nav.classList.remove("scrolled");
});



