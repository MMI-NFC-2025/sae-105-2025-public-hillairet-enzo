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

            // La visibilité/opacité est contrôlée par [aria-hidden="false"] ou [aria-expanded="true"] en CSS
            // On s'assure de synchroniser le body pour le défilement
            document.body.classList.toggle('no-scroll', newState);
        }

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
});