'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue.toLowerCase() === filterItems[i].dataset.category.toLowerCase()) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input fields
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}



document.addEventListener("DOMContentLoaded", () => {
  const spans = document.querySelectorAll(".background-animation span");
  const container = document.querySelector(".background-animation");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  spans.forEach((span) => {
    const randomX = Math.random() * (containerWidth - span.offsetWidth);
    const randomY = Math.random() * (containerHeight - span.offsetHeight);

    span.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });

  // Typing Animation
  const typingElement = document.getElementById('typing-text');
  const cursor = document.querySelector('.typing-cursor');
  
  if (typingElement && cursor) {
    const textLines = [
      "I'm a rising sophomore at Georgia Tech, majoring in Computer Science.",
      "I'm a web and iOS developer with a parallel passion for robotics.",
      "I'm also a language enthusiast -- natural languages help me debug the world in ways C and C++ never could."
    ];
    
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let isTyping = true;
    
         // Typing speeds (in milliseconds)
     const baseTypingSpeed = 35;
     const fastTypingSpeed = 20;
     const slowTypingSpeed = 60;
     const pauseBetweenLines = 400;
     const punctuationPause = 150;
    
    function getTypingSpeed(char) {
      // Faster for common letters, slower for punctuation and special chars
      if (/[,.!?;:]/.test(char)) return slowTypingSpeed;
      if (/[aeiou]/i.test(char)) return fastTypingSpeed;
      if (char === ' ') return baseTypingSpeed * 0.7;
             return baseTypingSpeed + Math.random() * 20 - 10; // Add natural variation
    }
    
    function typeCharacter() {
      if (!isTyping) return;
      
      if (currentLineIndex < textLines.length) {
        const currentLine = textLines[currentLineIndex];
        
        if (currentCharIndex < currentLine.length) {
          const char = currentLine[currentCharIndex];
          
          // Create or get the current line element
          let lineElement = typingElement.querySelector(`[data-line="${currentLineIndex}"]`);
          if (!lineElement) {
            lineElement = document.createElement('span');
            lineElement.setAttribute('data-line', currentLineIndex);
            lineElement.className = 'typed-text';
            typingElement.insertBefore(lineElement, cursor);
            
            // Add line break if not first line
            if (currentLineIndex > 0) {
              const br = document.createElement('br');
              typingElement.insertBefore(br, lineElement);
            }
          }
          
          // Add character to current line
          lineElement.textContent += char;
          currentCharIndex++;
          
          // Stop cursor blinking while typing
          cursor.style.animation = 'none';
          cursor.style.opacity = '1';
          
          // Schedule next character
          const nextSpeed = getTypingSpeed(char);
          const additionalPause = /[.!?]/.test(char) ? punctuationPause : 0;
          
          setTimeout(typeCharacter, nextSpeed + additionalPause);
        } else {
          // Finished current line, move to next
          currentLineIndex++;
          currentCharIndex = 0;
          
          // Resume cursor blinking
          cursor.style.animation = 'blink 1s infinite';
          
          if (currentLineIndex < textLines.length) {
            // Pause between lines
            setTimeout(typeCharacter, pauseBetweenLines);
          } else {
            // Finished all lines - final cursor behavior
            setTimeout(() => {
              cursor.style.animation = 'blink 0.8s infinite';
            }, 1000);
          }
        }
      }
    }
    
    // Start typing animation after about page becomes active
    function startTypingIfActive() {
      const aboutPage = document.querySelector('[data-page="about"]');
      if (aboutPage && aboutPage.classList.contains('active')) {
                 // Small delay before starting typing
         setTimeout(() => {
           typeCharacter();
         }, 500);
      } else {
        // Check again after a short delay
        setTimeout(startTypingIfActive, 100);
      }
    }
    
    // Initialize typing animation
    startTypingIfActive();
    
    // Also restart typing when about page becomes active via navigation
    const aboutNavLink = document.querySelector('[data-nav-link]');
    if (aboutNavLink) {
      const allNavLinks = document.querySelectorAll('[data-nav-link]');
      allNavLinks.forEach(link => {
        link.addEventListener('click', function() {
          if (this.innerHTML.toLowerCase() === 'about') {
            // Reset typing animation
            setTimeout(() => {
              currentLineIndex = 0;
              currentCharIndex = 0;
              isTyping = true;
              
              // Clear existing text
              const existingLines = typingElement.querySelectorAll('[data-line]');
              existingLines.forEach(line => line.remove());
              const existingBrs = typingElement.querySelectorAll('br');
              existingBrs.forEach(br => br.remove());
              
              // Restart typing
              setTimeout(typeCharacter, 500);
            }, 300);
          }
        });
      });
    }
  }
});