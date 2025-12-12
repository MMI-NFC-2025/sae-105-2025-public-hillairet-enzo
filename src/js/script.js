// Fichier : src/js/script.js

document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.header__menu-button');
    const mainNav = document.querySelector('.header__nav');
    const navLinks = document.querySelectorAll('.nav__list a');

    if (menuButton && mainNav) {

        // --- Fonction pour basculer l'état du menu ---
        function toggleMenu() {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded; // L'état cible (ouvert si false, fermé si true)

            // 1. Gère l'état du bouton (croix)
            menuButton.setAttribute('aria-expanded', newState);

            // 2. Gère la visibilité du menu (via CSS opacité/visibilité)
            // L'attribut hidden est utilisé dans votre HTML pour l'état initial
            mainNav.toggleAttribute('hidden', !newState);
            // met à jour aria-hidden pour les lecteurs d'écran
            mainNav.setAttribute('aria-hidden', String(!newState));

            // La visibilité/opacité est contrôlée par [aria-hidden="false"] ou [aria-expanded="true"] en CSS
            // On s'assure de synchroniser le body pour le défilement
            document.body.classList.toggle('no-scroll', newState);
        }

        // Ferme le menu si on clique hors du nav (utile pour mobile)
        document.addEventListener('click', function (e) {
            const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
            if (!isOpen) return;

            const clickInsideNav = mainNav.contains(e.target);
            const clickOnButton = menuButton.contains(e.target);

            if (!clickInsideNav && !clickOnButton) {
                // fermer le menu
                menuButton.setAttribute('aria-expanded', false);
                mainNav.setAttribute('hidden', true);
                mainNav.setAttribute('aria-hidden', true);
                document.body.classList.remove('no-scroll');
            }
        });

        // Fermer le menu avec la touche Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' || e.key === 'Esc') {
                const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
                if (isOpen) {
                    menuButton.setAttribute('aria-expanded', false);
                    mainNav.setAttribute('hidden', true);
                    mainNav.setAttribute('aria-hidden', true);
                    document.body.classList.remove('no-scroll');
                    menuButton.focus();
                }
            }
        });

        // 1. Écouteur pour le bouton Hamburger (Ouverture/Fermeture)
        menuButton.addEventListener('click', toggleMenu);

        // 2. Écouteur pour les liens (Fermeture après navigation)
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                // Vérifie si le menu est actuellement ouvert
                if (menuButton.getAttribute('aria-expanded') === 'true') {
                    // Ferme le menu immédiatement après le clic sur le lien.
                    // On ne passe pas par toggleMenu pour éviter la boucle.

                    menuButton.setAttribute('aria-expanded', false);
                    mainNav.setAttribute('aria-hidden', true); // Assure l'opacité 0
                    mainNav.setAttribute('hidden', true); // Assure la dissimulation
                    document.body.classList.remove('no-scroll');

                    // NOTE: Le navigateur va ensuite naviguer vers le nouveau lien/page.
                }
            });
        });

    }

    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('[data-carousel-track]');
        const prevButton = carousel.querySelector('[data-carousel-prev]');
        const nextButton = carousel.querySelector('[data-carousel-next]');

        if (!track) {
            return;
        }

        function getScrollOffset() {
            const firstSlide = track.querySelector('.card');
            if (!firstSlide) {
                return track.clientWidth;
            }

            const slideWidth = firstSlide.getBoundingClientRect().width;
            const gapValue = getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0';
            const gap = parseFloat(gapValue) || 0;
            return slideWidth + gap;
        }

        function scrollTrack(direction) {
            const offset = getScrollOffset();
            track.scrollBy({ left: direction * offset, behavior: 'smooth' });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => scrollTrack(-1));
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => scrollTrack(1));
        }
    });
});