// ========================================================
// KELVIN JACKSON CHEZIEUCHE - AWWWARDS-GRADE SCROLL ENGINE
// Built with Scroll-Craft & Taste-Skill Architecture
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
  initDynamicYear();
  initNavigation();
  initScrollyCanvas();
  initContactInteractions();
});

function initDynamicYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function initNavigation() {
  const navbar = document.querySelector('.nav-floating');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], #scrolly-container');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    let currentId = 'home';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id') || 'home';
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}` || (currentId === 'scrolly-container' && href === '#home')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, { passive: true });

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ========================================================
// CORE SCROLLY CANVAS ENGINE (Scroll-Craft Implementation)
// ========================================================
function initScrollyCanvas() {
  const container = document.getElementById('scrolly-container');
  const canvas = document.getElementById('scrolly-canvas');
  if (!container || !canvas) return;

  const ctx = canvas.getContext('2d', { alpha: false });
  const preloader = document.getElementById('preloader');
  const loaderBar = document.getElementById('loader-bar-fill');
  const loaderPercent = document.getElementById('loader-percent');

  const storyOverlays = [
    document.getElementById('story-0'),
    document.getElementById('story-1'),
    document.getElementById('story-2'),
    document.getElementById('story-3')
  ];

  const totalFrames = 120;
  const images = new Array(totalFrames);
  let loadedCount = 0;
  let currentRenderedIndex = -1;
  let isReady = false;

  // Optimized WebP URL Formatter
  function getFrameUrl(index) {
    const padded = String(index).padStart(3, '0');
    return `./sequence/frame_${padded}_delay-0.067s.webp`;
  }

  // Smooth Interpolation Variables (Lerp)
  let targetProgress = 0;
  let currentProgress = 0;
  let canvasWidth = 0;
  let canvasHeight = 0;
  let dpr = 1;

  function resizeCanvas() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;

    canvas.width = Math.floor(canvasWidth * dpr);
    canvas.height = Math.floor(canvasHeight * dpr);
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (currentRenderedIndex >= 0 && images[currentRenderedIndex]?.complete) {
      drawCoverFrame(images[currentRenderedIndex]);
    }
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Draw image with aspect-ratio cover scaling
  function drawCoverFrame(img) {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const hRatio = canvasWidth / imgWidth;
    const vRatio = canvasHeight / imgHeight;
    const ratio = Math.max(hRatio, vRatio);

    const destWidth = imgWidth * ratio;
    const destHeight = imgHeight * ratio;
    const destX = (canvasWidth - destWidth) / 2;
    const destY = (canvasHeight - destHeight) / 2;

    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    // Fill exact frame dark background to prevent any seam/flicker
    ctx.fillStyle = '#06080C';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight, destX, destY, destWidth, destHeight);
    ctx.restore();
  }

  // Fast Parallel Preloader
  for (let i = 0; i < totalFrames; i++) {
    const img = new Image();
    img.src = getFrameUrl(i);

    img.onload = () => {
      loadedCount++;
      const percent = Math.floor((loadedCount / totalFrames) * 100);
      if (loaderBar) loaderBar.style.width = `${percent}%`;
      if (loaderPercent) loaderPercent.textContent = `${percent}%`;

      // Render the very first frame immediately
      if (i === 0 && !isReady) {
        drawCoverFrame(img);
        currentRenderedIndex = 0;
      }

      if (loadedCount === totalFrames || (loadedCount >= 15 && !isReady)) {
        startExperience();
      }
    };

    img.onerror = () => {
      loadedCount++;
      if (loadedCount >= totalFrames) startExperience();
    };

    images[i] = img;
  }

  function startExperience() {
    if (isReady) return;
    isReady = true;

    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('loaded');
      }
    }, 250);
  }

  // Safety fallback
  setTimeout(() => {
    if (!isReady) startExperience();
  }, 2500);

  // Scroll Progress Listener
  function onScroll() {
    const rect = container.getBoundingClientRect();
    const scrollDistance = container.offsetHeight - window.innerHeight;
    if (scrollDistance <= 0) return;

    let progress = -rect.top / scrollDistance;
    targetProgress = Math.max(0, Math.min(1, progress));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Continuous RAF Animation Loop with Smooth Damped Scrubbing (Lerp)
  function animationLoop() {
    // Damped interpolation: current += (target - current) * factor
    const delta = targetProgress - currentProgress;
    if (Math.abs(delta) > 0.0001) {
      currentProgress += delta * 0.16;
    } else {
      currentProgress = targetProgress;
    }

    // Map progress (0 to 1) to frame index (0 to totalFrames - 1)
    const frameIndex = Math.min(totalFrames - 1, Math.max(0, Math.floor(currentProgress * totalFrames)));

    if (frameIndex !== currentRenderedIndex && images[frameIndex]?.complete) {
      drawCoverFrame(images[frameIndex]);
      currentRenderedIndex = frameIndex;
    }

    // Story Overlays & Parallax Calculations
    updateStoryOverlays(currentProgress);

    requestAnimationFrame(animationLoop);
  }

  requestAnimationFrame(animationLoop);

  // Story Overlays Choreography:
  // 0% - 22%  : Opening (Centered)
  // 26% - 48% : First Transition (Left aligned)
  // 52% - 74% : Second Transition (Right aligned)
  // 78% - 96% : Closing Transition (Centered)
  function updateStoryOverlays(progress) {
    const ranges = [
      { start: 0.00, end: 0.22, overlay: storyOverlays[0] },
      { start: 0.26, end: 0.48, overlay: storyOverlays[1] },
      { start: 0.52, end: 0.74, overlay: storyOverlays[2] },
      { start: 0.78, end: 0.96, overlay: storyOverlays[3] },
    ];

    ranges.forEach(({ start, end, overlay }) => {
      if (!overlay) return;
      const innerCard = overlay.querySelector('.story-card-minimal') || overlay.querySelector('.story-card');
      if (progress >= start && progress <= end) {
        overlay.classList.add('active');
        if (innerCard) {
          const localProgress = (progress - start) / (end - start);
          // Subtle gentle parallax vertical float (only 8-10px)
          const yOffset = (localProgress - 0.5) * -12;
          innerCard.style.transform = `translateY(${yOffset}px)`;
        }
      } else {
        overlay.classList.remove('active');
        if (innerCard) {
          innerCard.style.transform = 'translateY(14px)';
        }
      }
    });
  }
}

// Contact Actions & Clipboard Helpers
function initContactInteractions() {
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  const toast = document.getElementById('toast-notification');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    }, 2800);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('jacksonkelvin703@gmail.com').then(() => {
        showToast('Email address copied: jacksonkelvin703@gmail.com');
      }).catch(() => {
        window.location.href = 'mailto:jacksonkelvin703@gmail.com';
      });
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navigator.clipboard.writeText('+2349030262544').then(() => {
        showToast('Phone number copied: +234 903 026 2544');
      }).catch(() => {
        window.location.href = 'tel:+2349030262544';
      });
    });
  }
}
