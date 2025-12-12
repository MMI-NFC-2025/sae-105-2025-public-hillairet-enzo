// Fichier : src/js/script.js

document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.header__menu-button');
    const mainNav = document.querySelector('#mainNav');

    // Si le bouton et la navigation sont trouvés, on ajoute l'écouteur d'événement
    if (menuButton && mainNav) {

        menuButton.addEventListener('click', function () {
            // 1. Basculer l'état aria-expanded (pour l'accessibilité)
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            menuButton.setAttribute('aria-expanded', !isExpanded);

            // 2. Basculer l'attribut hidden pour afficher/masquer la navigation
            // L'attribut 'hidden' est ensuite stylisé dans header.css pour l'opacité et la visibilité
            mainNav.toggleAttribute('hidden');

            // 3. Basculer l'attribut aria-hidden pour l'accessibilité
            mainNav.setAttribute('aria-hidden', isExpanded);

            // OPTIONNEL : Désactiver le défilement du body quand le menu est ouvert
            document.body.classList.toggle('no-scroll');
        });

    }
});