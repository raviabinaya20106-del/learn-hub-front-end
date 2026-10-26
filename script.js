/**
 * ==============================================================================
 * LearnHub - Online Learning Platform
 * JavaScript Functionality & Client-Side Validation
 * ==============================================================================
 * This script manages:
 *  1. Sticky navigation & scroll progress styling
 *  2. Mobile hamburger menu toggling and auto-close
 *  3. ScrollSpy (Active link highlighting on scroll)
 *  4. Password show/hide visibility toggle & password strength estimator
 *  5. Comprehensive real-time & on-submit registration form validation
 *  6. Registration success modal presentation
 *  7. Course details "Learn More" interactive modal with syllabus population
 *  8. Quick-enroll shortcut linking course modal directly to registration form
 *  9. Back-to-top floating button smooth scroll
 * ==============================================================================
 */

// Execute code only after DOM is completely parsed
document.addEventListener('DOMContentLoaded', () => {

  // ============================================================================
  // 1. DOM ELEMENT SELECTORS
  // ============================================================================
  
  // Navigation elements
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTopBtn');

  // Registration Form elements
  const registrationForm = document.getElementById('registrationForm');
  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const courseSelect = document.getElementById('courseSelect');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const togglePasswordIcon = document.getElementById('togglePasswordIcon');
  const strengthMeter = document.getElementById('strengthMeter');
  const passwordStrengthBar = document.getElementById('passwordStrengthBar');

  // Course Details Modal elements
  const courseModal = document.getElementById('courseModal');
  const closeCourseModalBtn = document.getElementById('closeCourseModalBtn');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const modalEnrollBtn = document.getElementById('modalEnrollBtn');
  const modalCourseTitle = document.getElementById('modalCourseTitle');
  const modalCourseDuration = document.getElementById('modalCourseDuration');
  const modalCourseInstructor = document.getElementById('modalCourseInstructor');
  const modalCourseDesc = document.getElementById('modalCourseDesc');
  const modalCourseSyllabus = document.getElementById('modalCourseSyllabus');
  const learnMoreBtns = document.querySelectorAll('.learn-more-btn');

  // Success Modal elements
  const successModal = document.getElementById('successModal');
  const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');
  const successStudentName = document.getElementById('successStudentName');
  const successCourseName = document.getElementById('successCourseName');
  const successStudentEmail = document.getElementById('successStudentEmail');
  const successStudentPhone = document.getElementById('successStudentPhone');

  // State variable to store currently viewed course in modal
  let currentlySelectedCourseName = '';


  // ============================================================================
  // 2. MOBILE HAMBURGER MENU NAVIGATION
  // ============================================================================

  /**
   * Toggles mobile navigation menu open/close state
   */
  function toggleMobileMenu() {
    const isOpen = navMenu.classList.toggle('open');
    hamburgerBtn.classList.toggle('active', isOpen);
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  /**
   * Closes the mobile navigation menu
   */
  function closeMobileMenu() {
    navMenu.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  // Hamburger button click event
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile menu when clicking outside of it
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnHamburger = hamburgerBtn.contains(event.target);
    if (!isClickInsideMenu && !isClickOnHamburger && navMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });


  // ============================================================================
  // 3. NAVBAR SCROLL EFFECT & SCROLLSPY (ACTIVE LINK HIGHLIGHTING)
  // ============================================================================

  /**
   * Handles navbar shadow styling and back-to-top button visibility on scroll
   */
  function handleWindowScroll() {
    const scrollPosition = window.scrollY;

    // Add shadow styling when scrolled past 50px
    if (scrollPosition > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Toggle Back to Top button visibility after 350px
    if (scrollPosition > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Update active nav link based on current viewport section (Scrollspy)
    updateActiveNavLink(scrollPosition);
  }

  /**
   * Highlights the nav link corresponding to the section in current view
   */
  function updateActiveNavLink(scrollPosition) {
    const headerOffset = navbar.offsetHeight + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerOffset;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleWindowScroll);


  // ============================================================================
  // 4. BACK TO TOP SMOOTH SCROLL
  // ============================================================================
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  // ============================================================================
  // 5. PASSWORD VISIBILITY TOGGLE & STRENGTH METER
  // ============================================================================

  // Toggle password visibility (eye icon)
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
      togglePasswordIcon.classList.toggle('fa-eye', !isPassword);
      togglePasswordIcon.classList.toggle('fa-eye-slash', isPassword);
    });
  }

  // Calculate and update password strength indicator as user types
  passwordInput.addEventListener('input', () => {
    const value = passwordInput.value;
    if (value.length > 0) {
      passwordStrengthBar.style.display = 'block';
    } else {
      passwordStrengthBar.style.display = 'none';
      return;
    }

    // Simple strength calculation: length, digits, and special characters
    let strengthScore = 0;
    if (value.length >= 6) strengthScore++;
    if (/[0-9]/.test(value)) strengthScore++;
    if (/[^A-Za-z0-9]/.test(value) || value.length >= 10) strengthScore++;

    // Update meter styling
    strengthMeter.className = 'strength-meter';
    if (strengthScore === 1) {
      strengthMeter.classList.add('strength-weak');
    } else if (strengthScore === 2) {
      strengthMeter.classList.add('strength-medium');
    } else if (strengthScore >= 3) {
      strengthMeter.classList.add('strength-strong');
    }
  });


  // ============================================================================
  // 6. FORM VALIDATION LOGIC
  // ============================================================================

  /**
   * Displays an error message and sets error UI state for a field
   */
  function showError(inputElement, errorElementId, message) {
    const formGroup = inputElement.closest('.form-group');
    const errorText = document.getElementById(errorElementId);
    const statusIcon = formGroup.querySelector('.input-status-icon');

    formGroup.classList.remove('has-success');
    formGroup.classList.add('has-error');
    if (errorText) errorText.textContent = message;

    if (statusIcon) {
      statusIcon.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i>';
    }
  }

  /**
   * Clears error message and sets valid UI state for a field
   */
  function showSuccess(inputElement, errorElementId) {
    const formGroup = inputElement.closest('.form-group');
    const errorText = document.getElementById(errorElementId);
    const statusIcon = formGroup.querySelector('.input-status-icon');

    formGroup.classList.remove('has-error');
    formGroup.classList.add('has-success');
    if (errorText) errorText.textContent = '';

    if (statusIcon) {
      statusIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    }
  }

  /**
   * Resets all validation states on a form
   */
  function resetFormValidationState() {
    const formGroups = registrationForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
      group.classList.remove('has-error', 'has-success');
      const errorText = group.querySelector('.error-text');
      if (errorText) errorText.textContent = '';
      const statusIcon = group.querySelector('.input-status-icon');
      if (statusIcon) statusIcon.innerHTML = '';
    });
    if (passwordStrengthBar) {
      passwordStrengthBar.style.display = 'none';
    }
  }

  // --- Field Validation Functions ---

  function validateFullName() {
    const value = fullNameInput.value.trim();
    const nameRegex = /^[a-zA-Z\s]{3,50}$/;

    if (!value) {
      showError(fullNameInput, 'nameError', 'Full name is required.');
      return false;
    }
    if (value.length < 3) {
      showError(fullNameInput, 'nameError', 'Name must be at least 3 characters.');
      return false;
    }
    if (!nameRegex.test(value)) {
      showError(fullNameInput, 'nameError', 'Name must contain only alphabets and spaces.');
      return false;
    }

    showSuccess(fullNameInput, 'nameError');
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    // Standard robust email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!value) {
      showError(emailInput, 'emailError', 'Email address is required.');
      return false;
    }
    if (!emailRegex.test(value)) {
      showError(emailInput, 'emailError', 'Please enter a valid email address (e.g., student@domain.com).');
      return false;
    }

    showSuccess(emailInput, 'emailError');
    return true;
  }

  function validatePhone() {
    const rawValue = phoneInput.value.trim();
    // Remove formatting symbols like space, dash, parentheses for digit count
    const digitsOnly = rawValue.replace(/[\s\-\(\)\+]/g, '');

    if (!rawValue) {
      showError(phoneInput, 'phoneError', 'Phone number is required.');
      return false;
    }
    // Check for standard 10 to 12 digit phone numbers
    if (digitsOnly.length < 10 || digitsOnly.length > 12 || !/^\d+$/.test(digitsOnly)) {
      showError(phoneInput, 'phoneError', 'Please enter a valid 10-digit phone number.');
      return false;
    }

    showSuccess(phoneInput, 'phoneError');
    return true;
  }

  function validateCourse() {
    const value = courseSelect.value;
    if (!value || value === '') {
      showError(courseSelect, 'courseError', 'Please select a course track.');
      return false;
    }

    showSuccess(courseSelect, 'courseError');
    return true;
  }

  function validatePassword() {
    const value = passwordInput.value;

    if (!value) {
      showError(passwordInput, 'passwordError', 'Password is required.');
      return false;
    }
    if (value.length < 6) {
      showError(passwordInput, 'passwordError', 'Password must be at least 6 characters long.');
      return false;
    }

    showSuccess(passwordInput, 'passwordError');
    return true;
  }

  // --- Attach Real-Time Listeners for interactive UX feedback ---
  fullNameInput.addEventListener('blur', validateFullName);
  fullNameInput.addEventListener('input', () => {
    if (fullNameInput.closest('.form-group').classList.contains('has-error')) {
      validateFullName();
    }
  });

  emailInput.addEventListener('blur', validateEmail);
  emailInput.addEventListener('input', () => {
    if (emailInput.closest('.form-group').classList.contains('has-error')) {
      validateEmail();
    }
  });

  phoneInput.addEventListener('blur', validatePhone);
  phoneInput.addEventListener('input', () => {
    if (phoneInput.closest('.form-group').classList.contains('has-error')) {
      validatePhone();
    }
  });

  courseSelect.addEventListener('change', validateCourse);

  passwordInput.addEventListener('blur', validatePassword);
  passwordInput.addEventListener('input', () => {
    if (passwordInput.closest('.form-group').classList.contains('has-error')) {
      validatePassword();
    }
  });


  // ============================================================================
  // 7. FORM SUBMISSION HANDLER
  // ============================================================================

  if (registrationForm) {
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop standard page reload

      // Trigger all validations
      const isNameValid = validateFullName();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isCourseValid = validateCourse();
      const isPasswordValid = validatePassword();

      // Check if all inputs passed validation
      if (isNameValid && isEmailValid && isPhoneValid && isCourseValid && isPasswordValid) {
        
        // Retrieve values for confirmation modal
        const studentName = fullNameInput.value.trim();
        const studentEmail = emailInput.value.trim();
        const studentPhone = phoneInput.value.trim();
        const selectedCourse = courseSelect.options[courseSelect.selectedIndex].text;

        // Populate success modal content
        successStudentName.textContent = studentName;
        successCourseName.textContent = selectedCourse;
        successStudentEmail.textContent = studentEmail;
        successStudentPhone.textContent = studentPhone;

        // Open Success Modal
        openModal(successModal);

        // Reset the form and clear validation classes
        registrationForm.reset();
        resetFormValidationState();

        // Reset password type back to password if it was visible
        passwordInput.setAttribute('type', 'password');
        togglePasswordIcon.classList.remove('fa-eye-slash');
        togglePasswordIcon.classList.add('fa-eye');
      } else {
        // Focus on first invalid input field for accessibility
        const firstErrorField = registrationForm.querySelector('.has-error input, .has-error select');
        if (firstErrorField) {
          firstErrorField.focus();
        }
      }
    });
  }


  // ============================================================================
  // 8. MODAL CONTROLS (Open, Close & Keyboard ESC)
  // ============================================================================

  /**
   * Opens a specified modal element
   */
  function openModal(modalElement) {
    modalElement.classList.add('open');
    modalElement.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent page background scrolling
  }

  /**
   * Closes a specified modal element
   */
  function closeModal(modalElement) {
    modalElement.classList.remove('open');
    modalElement.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore page scrolling
  }

  // Close modals on clicking background backdrop
  [courseModal, successModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (event) => {
        if (event.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // Close modals on ESC key press
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (courseModal.classList.contains('open')) closeModal(courseModal);
      if (successModal.classList.contains('open')) closeModal(successModal);
    }
  });

  // Close Course Modal buttons
  if (closeCourseModalBtn) closeCourseModalBtn.addEventListener('click', () => closeModal(courseModal));
  if (modalCancelBtn) modalCancelBtn.addEventListener('click', () => closeModal(courseModal));

  // Close Success Modal button
  if (closeSuccessModalBtn) {
    closeSuccessModalBtn.addEventListener('click', () => {
      closeModal(successModal);
      // Smoothly navigate back to courses or home
      const homeSection = document.getElementById('home');
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }


  // ============================================================================
  // 9. COURSE DETAILS "LEARN MORE" DYNAMIC MODAL
  // ============================================================================

  learnMoreBtns.forEach(button => {
    button.addEventListener('click', () => {
      // Extract data attributes from button
      const name = button.getAttribute('data-course-name');
      const duration = button.getAttribute('data-course-duration');
      const instructor = button.getAttribute('data-course-instructor');
      const desc = button.getAttribute('data-course-desc');
      const syllabusString = button.getAttribute('data-course-syllabus');

      // Save for quick enroll shortcut
      currentlySelectedCourseName = name;

      // Populate modal dialog
      modalCourseTitle.textContent = name;
      modalCourseDuration.innerHTML = `<i class="fa-regular fa-clock"></i> ${duration}`;
      modalCourseInstructor.textContent = instructor;
      modalCourseDesc.textContent = desc;

      // Generate syllabus list items
      modalCourseSyllabus.innerHTML = '';
      if (syllabusString) {
        const topics = syllabusString.split('|');
        topics.forEach(topic => {
          const li = document.createElement('li');
          li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${topic}</span>`;
          modalCourseSyllabus.appendChild(li);
        });
      }

      // Open the modal
      openModal(courseModal);
    });
  });

  // Modal Enroll Shortcut Button: Connects Course Modal directly to Registration Form
  if (modalEnrollBtn) {
    modalEnrollBtn.addEventListener('click', () => {
      // Close course modal
      closeModal(courseModal);

      // Pre-select matching course in registration select dropdown
      if (currentlySelectedCourseName) {
        for (let i = 0; i < courseSelect.options.length; i++) {
          if (courseSelect.options[i].value === currentlySelectedCourseName || 
              courseSelect.options[i].text.toLowerCase().includes(currentlySelectedCourseName.toLowerCase())) {
            courseSelect.selectedIndex = i;
            // Mark course as successfully valid
            showSuccess(courseSelect, 'courseError');
            break;
          }
        }
      }

      // Smooth scroll down to registration section
      const registerSection = document.getElementById('register');
      if (registerSection) {
        registerSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Focus on the first input (Full Name) after scroll
      setTimeout(() => {
        fullNameInput.focus();
      }, 500);
    });
  }

});
