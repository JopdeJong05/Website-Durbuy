/* ============================================================
   Boszicht Durbuy — Main JavaScript
   ============================================================ */

(function () {
    'use strict';

    // ── Sticky header ────────────────────────────────────
    const header = document.querySelector('.site-header');
    if (header) {
        const onScroll = () => {
            if (window.scrollY > 60) header.classList.add('is-scrolled');
            else header.classList.remove('is-scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ── Mobile menu toggle ───────────────────────────────
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('is-open');
            nav.classList.toggle('is-open');
        });
        nav.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                toggle.classList.remove('is-open');
                nav.classList.remove('is-open');
            });
        });
    }

    // ── Reveal on scroll ─────────────────────────────────
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach(el => observer.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('is-visible'));
    }

    // ── Scroll-to-top knop ───────────────────────────────
    const scrollTopBtn = document.querySelector('.scroll-top');
    if (scrollTopBtn) {
        const onScrollTop = () => {
            if (window.scrollY > 400) scrollTopBtn.classList.add('is-visible');
            else scrollTopBtn.classList.remove('is-visible');
        };
        window.addEventListener('scroll', onScrollTop, { passive: true });
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── FAQ accordion ────────────────────────────────────
    document.querySelectorAll('.faq__q').forEach(btn => {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            const answer = btn.nextElementSibling;

            // Optie: alle anderen sluiten
            document.querySelectorAll('.faq__q').forEach(other => {
                if (other !== btn) {
                    other.setAttribute('aria-expanded', 'false');
                    other.nextElementSibling.style.maxHeight = null;
                }
            });

            btn.setAttribute('aria-expanded', !expanded);
            if (!expanded) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // ── Lightbox galerij ─────────────────────────────────
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        const lbImg = lightbox.querySelector('img');
        const lbCaption = lightbox.querySelector('.lightbox__caption');
        const lbClose = lightbox.querySelector('.lightbox__close');
        const lbPrev = lightbox.querySelector('.lightbox__nav--prev');
        const lbNext = lightbox.querySelector('.lightbox__nav--next');
        const items = Array.from(document.querySelectorAll('[data-lightbox]'));
        let current = 0;

        const show = (i) => {
            current = (i + items.length) % items.length;
            const el = items[current];
            lbImg.src = el.dataset.src || el.href;
            lbCaption.textContent = el.dataset.caption || '';
            lightbox.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        };
        const hide = () => {
            lightbox.classList.remove('is-open');
            document.body.style.overflow = '';
        };

        items.forEach((el, i) => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                show(i);
            });
        });
        lbClose.addEventListener('click', hide);
        lbPrev.addEventListener('click', () => show(current - 1));
        lbNext.addEventListener('click', () => show(current + 1));
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) hide();
        });
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('is-open')) return;
            if (e.key === 'Escape') hide();
            if (e.key === 'ArrowLeft') show(current - 1);
            if (e.key === 'ArrowRight') show(current + 1);
        });
    }

    // ── Slaapkamer carousel ──────────────────────────────
    document.querySelectorAll('.carousel').forEach(carousel => {
        const track = carousel.querySelector('.carousel__track');
        const slides = Array.from(carousel.querySelectorAll('.carousel__slide'));
        const dots = Array.from(carousel.querySelectorAll('.carousel__dot'));
        const prevBtn = carousel.querySelector('.carousel__btn--prev');
        const nextBtn = carousel.querySelector('.carousel__btn--next');
        let current = 0;

        const goTo = (i) => {
            current = (i + slides.length) % slides.length;
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, idx) => d.classList.toggle('is-active', idx === current));
        };

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
        dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
        goTo(0);
    });

    // ── Modal (bevestiging) helpers ──────────────────────
    window.showModal = (id) => {
        const m = document.getElementById(id);
        if (m) {
            m.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        }
    };
    window.hideModal = (id) => {
        const m = document.getElementById(id);
        if (m) {
            m.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    };
    document.querySelectorAll('[data-modal-close]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.remove('is-open');
                document.body.style.overflow = '';
            }
        });
    });
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('is-open');
                document.body.style.overflow = '';
            }
        });
    });

    // ── Boekingsformulier (EmailJS) ──────────────────────
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm && window.emailjs) {
        const btn = bookingForm.querySelector('button[type="submit"]');
        const btnText = btn ? btn.innerHTML : '';
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (btn) { btn.disabled = true; btn.innerHTML = 'Verzenden…'; }
            emailjs.sendForm('contact_service', 'contact_form', bookingForm)
                .then(() => {
                    showModal('booking-success');
                    bookingForm.reset();
                    if (btn) { btn.disabled = false; btn.innerHTML = btnText; }
                })
                .catch((err) => {
                    console.error('EmailJS:', err);
                    alert('Er is iets misgegaan. Stuur ons gerust een mail op boszichtdurbuy@gmail.com');
                    if (btn) { btn.disabled = false; btn.innerHTML = btnText; }
                });
        });
    }

    // ── Datum-validatie boekingsformulier ────────────────
    const start = document.getElementById('start_date');
    const end = document.getElementById('end_date');
    if (start && end) {
        const fpEnd = flatpickr(end, {
            dateFormat: 'Y-m-d', altInput: true, altFormat: 'd/m/Y',
            minDate: 'today', locale: 'nl'
        });
        flatpickr(start, {
            dateFormat: 'Y-m-d', altInput: true, altFormat: 'd/m/Y',
            minDate: 'today', locale: 'nl',
            onChange: function (sel, dateStr) {
                fpEnd.set('minDate', dateStr);
                if (fpEnd.selectedDates[0] && fpEnd.selectedDates[0] <= sel[0]) fpEnd.clear();
            }
        });
    }

    // ── Actieve nav-link op huidige pagina ───────────────
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === path || (path === '' && href === 'index.html') ||
            (path === 'index.html' && href === 'index.html')) {
            a.classList.add('active');
        }
    });

    // ── Jaartal in footer ────────────────────────────────
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
