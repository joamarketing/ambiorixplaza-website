/* ========================================
   Ambiorixplaza — Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Header scroll effect ---
    const header = document.getElementById('header');

    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Mobile navigation ---
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    nav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // --- Scroll reveal animations ---
    const revealElements = document.querySelectorAll(
        '.section-text, .section-image, .card, .sfeer-content, .section-header'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Animated counter for stats ---
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count, 10);
                    animateCounter(el, target);
                    counterObserver.unobserve(el);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(c => counterObserver.observe(c));

    function animateCounter(el, target) {
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);

            el.textContent = target >= 1000
                ? current.toLocaleString('nl-BE') + '+'
                : current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = parseInt(getComputedStyle(document.documentElement)
                    .getPropertyValue('--header-height'), 10) || 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Contact form (basic handler) ---
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Verstuurd!';
            btn.disabled = true;
            btn.style.backgroundColor = '#4a7c59';

            setTimeout(() => {
                form.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.backgroundColor = '';
            }, 3000);
        });
    }
});
