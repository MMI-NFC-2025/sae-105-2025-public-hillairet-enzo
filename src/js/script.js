// Fichier : src/js/script.js

document.addEventListener('DOMContentLoaded', function () {

    // ======================================================
    // 1. GESTION DU MENU HAMBURGER
    // ======================================================
    const menuButton = document.querySelector('.header__menu-button');
    // On utilise l'ID pour être sûr de trouver le bon élément
    const mainNav = document.querySelector('#mainNav');
    const navLinks = document.querySelectorAll('.nav__list a');

    if (menuButton && mainNav) {
        function toggleMenu() {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded;

            menuButton.setAttribute('aria-expanded', newState);
            mainNav.toggleAttribute('hidden', !newState);
            mainNav.setAttribute('aria-hidden', String(!newState));
            document.body.classList.toggle('no-scroll', newState);
        }

        // Clic sur le bouton
        menuButton.addEventListener('click', toggleMenu);

        // Fermeture au clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuButton.getAttribute('aria-expanded') === 'true') {
                    toggleMenu(); // Ferme le menu proprement
                }
            });
        });

        // Fermeture si clic en dehors
        document.addEventListener('click', (e) => {
            if (menuButton.getAttribute('aria-expanded') === 'true' &&
                !mainNav.contains(e.target) &&
                !menuButton.contains(e.target)) {
                toggleMenu();
            }
        });
    }

    // ======================================================
    // 2. GESTION DU CARROUSEL
    // ======================================================
    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('[data-carousel-track]');
        const prevButton = carousel.querySelector('[data-carousel-prev]');
        const nextButton = carousel.querySelector('[data-carousel-next]');

        if (!track) return;

        function getScrollOffset() {
            const firstCard = track.querySelector('.card, .artist-card');
            if (!firstCard) return track.clientWidth;

            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.columnGap || style.gap || 0);
            return firstCard.getBoundingClientRect().width + gap;
        }

        function scrollTrack(direction) {
            const offset = getScrollOffset();
            track.scrollBy({ left: direction * offset, behavior: 'smooth' });
        }

        if (prevButton) prevButton.addEventListener('click', () => scrollTrack(-1));
        if (nextButton) nextButton.addEventListener('click', () => scrollTrack(1));
    });

    // ======================================================
    // 3. GESTION DU BOUTON RETOUR EN HAUT (LA FLÈCHE)
    // ======================================================
    const backToTopButton = document.getElementById('btn-retour-haut');

    if (backToTopButton) {
        // Fonction pour remonter
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Afficher/Masquer le bouton selon le scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        // Vérification initiale
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'flex';
        }
    }
});

const btnHaut = document.getElementById('btn-retour-haut');

if (btnHaut) {

    window.addEventListener('scroll', () => {
        const isBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 50);

        if (isBottom) {
            btnHaut.classList.add('visible');
        } else {
            btnHaut.classList.remove('visible');
        }
    });

    btnHaut.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}