document.addEventListener('DOMContentLoaded', function() {
  initParallax();
  initTimeBasedColors();
  initLavaLamp();
  initScrollAnimations();
  initColorWheelParticles();
  initGrid3DHover();
  initLazyLoading();
  initSVGGradientAnimation();
  initResponsiveText();
  initVideoOptimization();
});

function initParallax() {
  const bg1 = document.querySelector('.bg');
  const bg2 = document.querySelector('.bg2');
  const bg3 = document.querySelector('.bg3');

  if (!bg1 || !bg2 || !bg3) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    bg1.style.transform = `translateY(${scrolled * 0.1}px)`;
    bg2.style.transform = `translateY(${scrolled * 0.3}px)`;
    bg3.style.transform = `translateY(${scrolled * 0.5}px)`;
  });
}

function initTimeBasedColors() {
  const header = document.querySelector('.page-header');
  if (!header) return;

  function updateTimeColors() {
    const hour = new Date().getHours();
    let gradient;

    if (hour >= 5 && hour < 8) {
      gradient = 'linear-gradient(135deg, rgba(255, 140, 0, 0.9), rgba(255, 200, 124, 0.9))';
    } else if (hour >= 8 && hour < 12) {
      gradient = 'linear-gradient(135deg, rgba(135, 206, 235, 0.9), rgba(176, 224, 230, 0.9))';
    } else if (hour >= 12 && hour < 17) {
      gradient = 'linear-gradient(135deg, rgba(21, 101, 192, 0.9), rgba(0, 172, 193, 0.9))';
    } else if (hour >= 17 && hour < 20) {
      gradient = 'linear-gradient(135deg, rgba(255, 94, 77, 0.9), rgba(255, 150, 105, 0.9))';
    } else {
      gradient = 'linear-gradient(135deg, rgba(25, 25, 112, 0.9), rgba(72, 61, 139, 0.9))';
    }

    header.style.background = gradient;
  }

  updateTimeColors();
  setInterval(updateTimeColors, 60000);
}

function initLavaLamp() {
  const body = document.querySelector('body');
  if (!body) return;

  const lavaLamp = document.createElement('div');
  lavaLamp.className = 'lava-lamp';

  for (let i = 0; i < 3; i++) {
    const blob = document.createElement('div');
    blob.className = 'lava-blob';
    lavaLamp.appendChild(blob);
  }

  body.insertBefore(lavaLamp, body.firstChild);
}

function initScrollAnimations() {
  const faders = document.querySelectorAll('.fade-in-section, .txt, .grid-section, #contact-section');

  const appearOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('fade-in-section', 'is-visible');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => {
    if (!fader.classList.contains('fade-in-section')) {
      fader.classList.add('fade-in-section');
    }
    appearOnScroll.observe(fader);
  });
}

function initColorWheelParticles() {
  const colorWheel = document.getElementById('color-wheel');
  if (!colorWheel) return;

  colorWheel.addEventListener('click', function(e) {
    const rect = colorWheel.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 30; i++) {
      createParticle(centerX, centerY);
    }
  });
}

function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'particle';

  const colors = ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#0000ff', '#8b00ff', '#ff00ff'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 10 + 5;

  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particle.style.width = size + 'px';
  particle.style.height = size + 'px';
  particle.style.background = color;
  particle.style.boxShadow = `0 0 10px ${color}`;

  const angle = Math.random() * Math.PI * 2;
  const velocity = Math.random() * 100 + 50;
  const tx = Math.cos(angle) * velocity;
  const ty = Math.sin(angle) * velocity;

  particle.style.setProperty('--tx', tx + 'px');
  particle.style.setProperty('--ty', ty + 'px');

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 2000);
}

function initGrid3DHover() {
  const gridItems = document.querySelectorAll('.grid-item');

  gridItems.forEach(item => {
    if (item.querySelector('img') || item.querySelector('video')) {
      item.addEventListener('mousemove', function(e) {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = -(x - centerX) / 10;

        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      });

      item.addEventListener('mouseleave', function() {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    }
  });
}

function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  const videos = document.querySelectorAll('video[data-src]');

  const imageOptions = {
    threshold: 0,
    rootMargin: '0px 0px 200px 0px'
  };

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      if (element.tagName === 'IMG') {
        element.src = element.dataset.src;
        element.removeAttribute('data-src');
      } else if (element.tagName === 'VIDEO') {
        const source = element.querySelector('source');
        if (source) {
          source.src = source.dataset.src;
          source.removeAttribute('data-src');
          element.load();
        }
      }

      observer.unobserve(element);
    });
  }, imageOptions);

  images.forEach(img => imageObserver.observe(img));
  videos.forEach(video => imageObserver.observe(video));
}

function initSVGGradientAnimation() {
  const svg = document.querySelector('#svg');
  if (!svg) return;

  const gradient = svg.querySelector('#gradient');
  if (!gradient) return;

  let hue1 = 0;
  let hue2 = 60;

  setInterval(() => {
    hue1 = (hue1 + 1) % 360;
    hue2 = (hue2 + 1) % 360;

    const stops = gradient.querySelectorAll('stop');
    if (stops[0]) stops[0].setAttribute('stop-color', `hsl(${hue1}, 70%, 50%)`);
    if (stops[1]) stops[1].setAttribute('stop-color', `hsl(${hue2}, 80%, 60%)`);
  }, 100);
}

function initResponsiveText() {
  const blurb = document.querySelector('.blurb');
  if (!blurb) return;

  const fullText = "Hello! Welcome to my website. \n\n My hobbies include drawing creatures and psychedelic imagery, as well as worldbuilding. There is a page dedicated to an online Discord game called Karuta, as well as one dedicated to my car. I plan on adding more features in the future. This whole project is a continuous work in progress that I don't plan to stop any time soon, though I may take extended breaks from time to time. \n Thanks for reading!";
  const shortText = "Hello! I'm Ryan Cabell, a Worldbuilder with an affection towards drawing creatures and psychedelic imagery. Take a look around!";

  function handleResize() {
    if (window.innerWidth <= 600) {
      blurb.textContent = shortText;
    } else {
      blurb.textContent = fullText;
    }
  }

  handleResize();
  window.addEventListener('resize', handleResize);
}

function initVideoOptimization() {
  const videos = document.querySelectorAll('video');

  videos.forEach(video => {
    video.playbackRate = 5;
    video.preload = 'metadata';

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(video);
  });
}

function createPageTransition() {
  const transition = document.createElement('div');
  transition.className = 'page-transition';

  for (let i = 0; i < 100; i++) {
    const block = document.createElement('div');
    block.className = 'transition-block';
    block.style.animationDelay = `${Math.random() * 0.5}s`;
    transition.appendChild(block);
  }

  document.body.appendChild(transition);

  setTimeout(() => {
    const blocks = transition.querySelectorAll('.transition-block');
    blocks.forEach(block => block.classList.add('animate'));
  }, 10);

  setTimeout(() => {
    transition.remove();
  }, 1500);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createParticle,
    createPageTransition
  };
}
