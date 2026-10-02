/* ============================================================
   SCROLL REVEAL — IntersectionObserver
   
   Technique:
   - Observe every element with class "reveal"
   - Once it crosses the viewport threshold, add "is-visible"
   - Unobserve after triggering (one-shot, like vanschneider.com)
   - Threshold of 0.12 = trigger when ~12% of element is visible
     → feels like the element "arrives" naturally, not late
============================================================ */
(function () {
  // Bail if browser doesn't support IntersectionObserver (very rare now)
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // one-shot: won't reverse on scroll-up
        }
      });
    },
    {
      threshold: 0.12,       // trigger when 12% visible
      rootMargin: '0px 0px -40px 0px' // slight bottom offset so it triggers a touch early
    }
  );

  // Observe all reveal elements — works for any section added to the page
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

const popup = document.getElementById('email-popup');
const openPopupBtn = document.getElementById('open-email-popup');
const closePopupBtn = document.getElementById('close-email-popup');
const popupBackdrop = document.querySelector('.email-popup__backdrop');

function openEmailPopup() {
  if (!popup) return;
  popup.hidden = false;
  popup.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeEmailPopup() {
  if (!popup) return;
  popup.hidden = true;
  popup.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

openPopupBtn?.addEventListener('click', openEmailPopup);
closePopupBtn?.addEventListener('click', closeEmailPopup);
popupBackdrop?.addEventListener('click', closeEmailPopup);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && popup && !popup.hidden) {
    closeEmailPopup();
  }
});

/* ============================================================
   SOCIAL PROOF TOAST — Translation-ready and API-ready widget
============================================================ */
(function () {
  const toast = document.getElementById('social-toast');
  const flagEl = document.getElementById('social-toast-flag');
  const nameEl = document.getElementById('social-toast-name');
  const countryEl = document.getElementById('social-toast-country');
  const actionEl = document.getElementById('social-toast-action');
  const timeEl = document.getElementById('social-toast-time');
  const closeButton = document.getElementById('social-toast-close');
  const soundToggle = document.getElementById('social-toast-sound-toggle');

  if (!toast) return;

  const storageKeys = {
    dismissed: 'siterevSocialProofDismissed',
    sound: 'siterevSocialProofSound'
  };

  const config = {
    displayDuration: 5000,
    minDelay: 2000,
    maxDelay: 3800,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    soundEnabled: JSON.parse(localStorage.getItem(storageKeys.sound) || 'true'),
    position: 'bottom-left'
  };

  const notificationSound = new Audio('mixkit-long-pop-2358.wav');
  notificationSound.preload = 'auto';
  notificationSound.volume = 0.25;

  const signupData = [
    { id: 1, name: 'Carlos', country: 'Brazil', flag: '🇧🇷', action: 'joined the Academy', time: '2 minutes ago' },
    { id: 2, name: 'Priya', country: 'India', flag: '🇮🇳', action: 'enrolled', time: '3 minutes ago' },
    { id: 3, name: 'Lina', country: 'Sweden', flag: '🇸🇪', action: 'reserved a spot', time: '5 minutes ago' },
    { id: 4, name: 'Noah', country: 'Canada', flag: '🇨🇦', action: 'joined the Academy', time: '7 minutes ago' },
    { id: 5, name: 'Aisha', country: 'Nigeria', flag: '🇳🇬', action: 'signed up', time: '9 minutes ago' },
    { id: 6, name: 'Diego', country: 'Mexico', flag: '🇲🇽', action: 'joined the Academy', time: '11 minutes ago' },
    { id: 7, name: 'Mila', country: 'Germany', flag: '🇩🇪', action: 'enrolled', time: '12 minutes ago' },
    { id: 8, name: 'Hana', country: 'Japan', flag: '🇯🇵', action: 'joined the Academy', time: '14 minutes ago' },
    { id: 9, name: 'Omar', country: 'Egypt', flag: '🇪🇬', action: 'registered', time: '15 minutes ago' },
    { id: 10, name: 'Sara', country: 'Saudi Arabia', flag: '🇸🇦', action: 'reserved a spot', time: '17 minutes ago' },
    { id: 11, name: 'Luca', country: 'Italy', flag: '🇮🇹', action: 'joined the Academy', time: '20 minutes ago' },
    { id: 12, name: 'Chiara', country: 'Spain', flag: '🇪🇸', action: 'enrolled', time: '21 minutes ago' },
    { id: 13, name: 'Yara', country: 'Morocco', flag: '🇲🇦', action: 'signed up', time: '23 minutes ago' },
    { id: 14, name: 'Alex', country: 'Australia', flag: '🇦🇺', action: 'joined the Academy', time: '24 minutes ago' },
    { id: 15, name: 'Maya', country: 'Ghana', flag: '🇬🇭', action: 'registered', time: '26 minutes ago' },
    { id: 16, name: 'Ivan', country: 'Russia', flag: '🇷🇺', action: 'joined the Academy', time: '28 minutes ago' },
    { id: 17, name: 'Lily', country: 'United Kingdom', flag: '🇬🇧', action: 'enrolled', time: '30 minutes ago' },
    { id: 18, name: 'Nina', country: 'France', flag: '🇫🇷', action: 'joined the Academy', time: '32 minutes ago' },
    { id: 19, name: 'Jamal', country: 'Kenya', flag: '🇰🇪', action: 'signed up', time: '35 minutes ago' },
    { id: 20, name: 'Mei', country: 'China', flag: '🇨🇳', action: 'reserved a spot', time: '38 minutes ago' },
    { id: 21, name: 'Viktor', country: 'Poland', flag: '🇵🇱', action: 'joined the Academy', time: '40 minutes ago' },
    { id: 22, name: 'Sophia', country: 'Greece', flag: '🇬🇷', action: 'enrolled', time: '42 minutes ago' },
    { id: 23, name: 'Mateo', country: 'Argentina', flag: '🇦🇷', action: 'joined the Academy', time: '45 minutes ago' },
    { id: 24, name: 'Elena', country: 'Portugal', flag: '🇵🇹', action: 'registered', time: '47 minutes ago' },
    { id: 25, name: 'Noor', country: 'United Arab Emirates', flag: '🇦🇪', action: 'joined the Academy', time: '50 minutes ago' }
  ];

  let queue = [];
  let lastEventId = null;
  let showTimer = null;
  let hideTimer = null;
  let cycleTimer = null;
  let isPaused = document.hidden;
  let userDismissed = localStorage.getItem(storageKeys.dismissed) === 'true';

  function shuffle(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function refillQueue() {
    queue = shuffle(signupData);
    if (queue[0]?.id === lastEventId && queue.length > 1) {
      queue.push(queue.shift());
    }
  }

  function getNextEvent() {
    if (!queue.length) {
      refillQueue();
    }
    let next = queue.shift();
    if (next && next.id === lastEventId && queue.length) {
      queue.push(next);
      next = queue.shift();
    }
    lastEventId = next?.id ?? lastEventId;
    return next;
  }

  function clearTimers() {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    clearTimeout(cycleTimer);
    showTimer = hideTimer = cycleTimer = null;
  }

  function updateSoundButton() {
    const label = config.soundEnabled ? 'Turn sound off' : 'Turn sound on';
    soundToggle.textContent = config.soundEnabled ? '🔔' : '🔕';
    soundToggle.setAttribute('aria-label', label);
    soundToggle.setAttribute('aria-pressed', String(config.soundEnabled));
    localStorage.setItem(storageKeys.sound, JSON.stringify(config.soundEnabled));
  }

  function playNotificationSound() {
    if (config.prefersReducedMotion || !config.soundEnabled) return;
    notificationSound.currentTime = 0;
    notificationSound.play().catch(() => {
      // Browsers may block autoplay until user interaction; silently ignore.
    });
  }

  function renderNotification(payload) {
    if (!payload) return;
    flagEl.textContent = payload.flag;
    nameEl.textContent = payload.name;
    countryEl.textContent = payload.country;
    actionEl.textContent = payload.action;
    timeEl.textContent = payload.time;
  }

  function showNotification() {
    if (userDismissed || document.hidden) return;
    const event = getNextEvent();
    renderNotification(event);
    toast.dataset.visible = 'true';
    playNotificationSound();
    hideTimer = window.setTimeout(hideNotification, config.displayDuration);
  }

  function hideNotification() {
    toast.dataset.visible = 'false';
    clearTimeout(hideTimer);
    if (!userDismissed && !document.hidden) {
      cycleTimer = window.setTimeout(startCycle, randomDelay());
    }
  }

  function randomDelay() {
    return Math.round(Math.random() * (config.maxDelay - config.minDelay) + config.minDelay);
  }

  function startCycle() {
    if (userDismissed || document.hidden) return;
    clearTimers();
    showTimer = window.setTimeout(showNotification, randomDelay());
  }

  function dismissNotifications() {
    userDismissed = true;
    localStorage.setItem(storageKeys.dismissed, 'true');
    toast.dataset.visible = 'false';
    clearTimers();
  }

  soundToggle.addEventListener('click', () => {
    config.soundEnabled = !config.soundEnabled;
    updateSoundButton();
  });

  closeButton.addEventListener('click', () => {
    dismissNotifications();
  });

  document.addEventListener('visibilitychange', () => {
    isPaused = document.hidden;
    if (isPaused) {
      clearTimers();
      toast.dataset.visible = 'false';
    } else if (!userDismissed) {
      startCycle();
    }
  });

  window.addEventListener('beforeunload', clearTimers);

  updateSoundButton();

  // Instead of firing the first toast on a flat page-load timer, wait for a
  // real engagement signal — the user has scrolled past the hero, or is
  // lingering on the "What You'll Master" benefits section. Whichever
  // happens first triggers it. A fallback timeout guards short pages or
  // visitors who never scroll (e.g. landing lower via an anchor link).
  function triggerFirstCycleOnce() {
    if (userDismissed || document.hidden) return;
    engagementObserver?.disconnect();
    clearTimeout(fallbackTimer);
    startCycle();
  }

  const engagementTargets = [
    document.querySelector('.cta-wrap'),   // hero CTA area — "past the hero" once this exits view
    document.querySelector('.learn')       // key-benefit section — a pause here counts as engagement
  ].filter(Boolean);

  let engagementObserver = null;
  if (!userDismissed && 'IntersectionObserver' in window && engagementTargets.length) {
    engagementObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const pastHero = entry.target.classList.contains('cta-wrap') && !entry.isIntersecting;
        const dwellingOnBenefits = entry.target.classList.contains('learn') && entry.isIntersecting;
        if (pastHero || dwellingOnBenefits) triggerFirstCycleOnce();
      });
    }, { threshold: 0.3 });
    engagementTargets.forEach((el) => engagementObserver.observe(el));
  }

  const fallbackTimer = window.setTimeout(triggerFirstCycleOnce, 9000);

  // API hook for future integration; returns the hardcoded data by default.
  async function fetchRecentSignups() {
    // Replace this with a real fetch call when the academy backend is available.
    return Promise.resolve(shuffle(signupData));
  }

  window.fetchRecentSignups = fetchRecentSignups;
})();
