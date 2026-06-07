/* ============================================================
   Boszicht — Partials (header + footer + modals)
   Wordt vóór main.js geladen zodat alle DOM-elementen bestaan
   ============================================================ */

(function () {
    'use strict';

    // ── Header HTML ──────────────────────────────────────
    const header = `
<header class="site-header">
    <div class="container nav-wrap">
        <a href="index.html" class="brand">Boszicht</a>
        <nav class="main-nav" aria-label="Hoofdnavigatie">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="accommodatie.html">Accommodatie</a></li>
                <li><a href="omgeving.html">Omgeving</a></li>
                <li><a href="boeken.html">Boeken</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="boeken.html" class="nav-cta" style="padding:10px 22px;width:auto;white-space:nowrap;">Reserveer</a></li>
            </ul>
        </nav>
        <button class="nav-toggle" aria-label="Menu" aria-expanded="false">
            <span></span><span></span><span></span>
        </button>
    </div>
</header>`;

    // ── Footer HTML ──────────────────────────────────────
    const footer = `
<footer class="site-footer">
    <div class="container">
        <div class="footer-grid">
            <div class="footer-about">
                <a href="index.html" class="footer-brand">Boszicht</a>
                <p>"Beleef natuur en rust, jouw chalet midden in de bossen van Durbuy"</p>
            </div>
            <div class="footer-col">
                <h4>Pagina's</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="accommodatie.html">Accommodatie</a></li>
                    <li><a href="omgeving.html">Omgeving</a></li>
                    <li><a href="boeken.html">Boeken</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Contact</h4>
                <ul>
                    <li><a href="mailto:boszichtdurbuy@gmail.com">✉ boszichtdurbuy@gmail.com</a></li>
                    <li><a href="tel:+32468002549">☏ +32 468 00 25 49</a></li>
                    <li><a href="https://maps.app.goo.gl/YLTZ14EaJ1cJwLXC7" target="_blank" rel="noopener">📍 Sunclass Park, Durbuy</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Praktisch</h4>
                <ul>
                    <li><a href="contact.html#faq">Veelgestelde vragen</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="boeken.html#prijzen">Prijzen</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; <span id="current-year">2026</span> Boszicht Durbuy — Alle rechten voorbehouden</p>
        </div>
    </div>
</footer>

<button class="scroll-top" aria-label="Terug naar boven">↑</button>

<div class="lightbox" role="dialog" aria-hidden="true">
    <button class="lightbox__close" aria-label="Sluiten">×</button>
    <button class="lightbox__nav lightbox__nav--prev" aria-label="Vorige">‹</button>
    <button class="lightbox__nav lightbox__nav--next" aria-label="Volgende">›</button>
    <img src="" alt="">
    <span class="lightbox__caption"></span>
</div>`;

    // ── Mount in DOM ─────────────────────────────────────
    const headerSlot = document.getElementById('site-header');
    const footerSlot = document.getElementById('site-footer');
    if (headerSlot) headerSlot.outerHTML = header;
    if (footerSlot) footerSlot.outerHTML = footer;

})();
