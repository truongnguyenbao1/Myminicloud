/**
 * Mechanical Profile - main.js
 * Logic for mechanical sounds and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log("Hệ thống khởi động (Chế độ Public)...");
  initializeApp();
});

function initializeApp() {
  initNav();
  initSmoothScroll();
  initMechanicalSounds();
}

/**
 * Mechanical Sound Generator (Web Audio API)
 */
function initMechanicalSounds() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  function playSound(type) {
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'click') {
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } 
    else if (type === 'blip') {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.05);
    }
    else if (type === 'hover') {
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.05);
    }
  }

  // Add sounds to interactive elements
  const interactives = document.querySelectorAll('a, button, .btn, .project-card, .stat-item');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => playSound('hover'));
    el.addEventListener('click', () => playSound('click'));
  });

  // Global click blip
  document.addEventListener('mousedown', () => playSound('blip'));
}



/**
 * Handle Navigation active states
 */
function initNav() {
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id], footer[id]');

  const options = { threshold: 0.5 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });

        // Specific mechanical glow for footer
        if (id === 'contact') {
          entry.target.classList.add('active-glow');
        } else {
          document.getElementById('contact')?.classList.remove('active-glow');
        }
      }
    });
  }, options);

  sections.forEach(section => observer.observe(section));
}

/**
 * Smooth scrolling
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });
}
