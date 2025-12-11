/* Fichier : src/js/script.js */

// On attend que toute la page soit chargée avant de lancer le script
document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       1. GESTION DU MENU MOBILE (HAMBURGER)
       ============================================================ */
    const menuButton = document.querySelector('.header__menu-button');
    const nav = document.getElementById('mainNav');

    // On vérifie que les éléments existent sur la page (sécurité)
    if (menuButton && nav) {

        menuButton.addEventListener('click', () => {
            // On regarde si le menu est déjà ouvert
            const isOpened = menuButton.getAttribute('aria-expanded') === 'true';

            if (isOpened) {
                // --- ACTION : FERMER LE MENU ---
                menuButton.setAttribute('aria-expanded', 'false'); // L'icône redevient des barres
                nav.setAttribute('hidden', ''); // On cache le menu
                document.body.style.overflow = ''; // On réactive le scroll de la page
            } else {
                // --- ACTION : OUVRIR LE MENU ---
                menuButton.setAttribute('aria-expanded', 'true'); // L'icône devient une croix
                nav.removeAttribute('hidden'); // On affiche le menu
                document.body.style.overflow = 'hidden'; // On bloque le scroll arrière-plan
            }
        });
    }

    /* ============================================================
       2. GESTION DU CARROUSEL (PROGRAMMATION)
       ============================================================ */
    const track = document.getElementById('track');
    const btnPrev = document.querySelector('.carousel__btn--prev');
    const btnNext = document.querySelector('.carousel__btn--next');

    // On vérifie que le carrousel existe bien sur la page actuelle
    if (track && btnPrev && btnNext) {

        // Distance de défilement (Largeur carte 300px + Gap 30px = 330px)
        const scrollAmount = 330;

        // Clic sur le bouton SUIVANT (Flèche Droite)
        btnNext.addEventListener('click', () => {
            track.scrollBy({
                left: scrollAmount,
                behavior: 'smooth' // Défilement fluide
            });
        });

        // Clic sur le bouton PRÉCÉDENT (Flèche Gauche)
        btnPrev.addEventListener('click', () => {
            track.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
    }

});