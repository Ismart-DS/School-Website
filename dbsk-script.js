
document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------
  // 1. Mobile navigation
  // ------------------------------------
  const menuToggle = document.getElementById("menuToggle");
  const navigation = document.getElementById("navigation");
  const navLinks = document.querySelectorAll(".nav-link");

  function closeMenu() {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Highlight the current section in navigation.
  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);

            if (isActive) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // ------------------------------------
  // 2. Login and Signup modal
  // ------------------------------------
  const authModal = document.getElementById("authModal");
  const authTrigger = document.getElementById("authTrigger");
  const closeModalButton = document.getElementById("closeModal");
  const authTabs = document.querySelectorAll(".auth-tab");
  const authTitle = document.getElementById("authTitle");
  const authSubmit = document.getElementById("authSubmit");
  const fullNameField = document.getElementById("fullNameField");
  const authName = document.getElementById("authName");
  const authPassword = document.getElementById("authPassword");
  const authForm = document.getElementById("authForm");
  const authStatus = document.getElementById("authStatus");

  let authMode = "login";
  let previousFocus = null;

  function openModal() {
    previousFocus = document.activeElement;

    authModal.classList.add("open");
    authModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    authStatus.textContent = "";

    closeMenu();

    setTimeout(() => {
      document.getElementById("authEmail").focus();
    }, 50);
  }

  function closeModal() {
    authModal.classList.remove("open");
    authModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (previousFocus) previousFocus.focus();
  }

  function setAuthMode(mode) {
    authMode = mode;

    authTabs.forEach((tab) => {
      const active = tab.dataset.auth === mode;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
    });

    const isSignup = mode === "signup";

    authTitle.textContent = isSignup
      ? "Create Your Account"
      : "Welcome Back!";

    fullNameField.hidden = !isSignup;
    authName.required = isSignup;

    authPassword.autocomplete = isSignup
      ? "new-password"
      : "current-password";

    authSubmit.innerHTML = isSignup
      ? 'Sign Up <i class="fa-solid fa-user-plus"></i>'
      : 'Login <i class="fa-solid fa-arrow-right"></i>';

    authStatus.textContent = "";
  }

  authTrigger.addEventListener("click", openModal);
  closeModalButton.addEventListener("click", closeModal);

  authModal.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeModal);
  });

  authTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      setAuthMode(tab.dataset.auth);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && authModal.classList.contains("open")) {
      closeModal();
    }
  });

  authForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Frontend demonstration only; no real account is created.
    authStatus.textContent =
      authMode === "signup"
        ? "Demo only: connect a secure backend to create an account."
        : "Demo only: connect a secure backend to sign in.";

    authStatus.setAttribute("role", "status");
  });

  // ------------------------------------
  // 3. Gallery category buttons
  // ------------------------------------
  const galleryTabs = document.querySelectorAll(".gallery-tab");
  const galleryItems = document.querySelectorAll(".gallery-item");

  function filterGallery(category) {
    galleryTabs.forEach((tab) => {
      const active = tab.dataset.filter === category;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
    });

    galleryItems.forEach((item) => {
      item.hidden = item.dataset.category !== category;
    });
  }

  galleryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterGallery(tab.dataset.filter);
    });
  });

  // Start with the Images category selected.
  filterGallery("images");

  // ------------------------------------
  // 4. School video and YouTube links
  // ------------------------------------

  // Replace these example values with official school URLs.
  const SCHOOL_VIDEO_URL = "";
  const SCHOOL_YOUTUBE_URL = "";

  const videoPlaceholder = document.querySelector(
    '.gallery-item[data-category="videos"]'
  );

  const youtubePlaceholder = document.querySelector(
    '.gallery-item[data-category="youtube"]'
  );

  if (SCHOOL_VIDEO_URL) {
    videoPlaceholder.innerHTML = `
      <i class="fa-solid fa-circle-play"></i>
      <h3>Watch School Video</h3>
      <p>Open our school video</p>
    `;

    videoPlaceholder.setAttribute("role", "link");
    videoPlaceholder.setAttribute("tabindex", "0");
    videoPlaceholder.style.cursor = "pointer";

    const openSchoolVideo = () => {
      window.open(SCHOOL_VIDEO_URL, "_blank", "noopener,noreferrer");
    };

    videoPlaceholder.addEventListener("click", openSchoolVideo);
    videoPlaceholder.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openSchoolVideo();
      }
    });
  } else {
    videoPlaceholder.addEventListener("click", () => {
      alert("Please add your school video URL in script.js.");
    });
    videoPlaceholder.style.cursor = "pointer";
  }

  if (SCHOOL_YOUTUBE_URL) {
    youtubePlaceholder.href = SCHOOL_YOUTUBE_URL;
  }

  // ------------------------------------
  // 5. Contact form demo
  // ------------------------------------
  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    contactStatus.textContent =
      "This is a demo form. Connect an email service or backend to receive enquiries.";

    contactStatus.setAttribute("role", "status");
  });

  // ------------------------------------
  // 6. Scroll reveal animations
  // ------------------------------------
  const revealElements = document.querySelectorAll(".reveal");

  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // ------------------------------------
  // 7. Back to top
  // ------------------------------------
  const backToTop = document.getElementById("backToTop");

  window.addEventListener(
    "scroll",
    () => {
      backToTop.classList.toggle("show", window.scrollY > 400);
    },
    { passive: true }
  );

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // ------------------------------------
  // 8. Automatic copyright year
  // ------------------------------------
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // Default authentication tab.
  setAuthMode("login");
});
