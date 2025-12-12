// Fichier : src/js/script.js (Assurez-vous que ce code est bien dans votre script)

document.addEventListener('DOMContentLoaded', function () {
    // ... (Votre code existant pour le menu hamburger) ...

    // ===============================================
    // 2. GESTION DU CARROUSEL DE PROGRAMMATION
    // (Utilise les sélecteurs data-* de votre HTML)
    // ===============================================

    const carousels = document.querySelectorAll('[data-carousel]');

    carousels.forEach(carousel => {
        // Sélection des éléments spécifiques à ce carrousel
        const track = carousel.querySelector('[data-carousel-track]');
        // Utilisation des sélecteurs d'attribut pour les boutons Précédent/Suivant
        const prevButton = carousel.querySelector('[data-carousel-prev]');
        const nextButton = carousel.querySelector('[data-carousel-next]');

        if (!track) {
            return; // Sortir si la piste de défilement n'est pas trouvée
        }

        /**
         * Calcule le décalage nécessaire pour défiler d'une carte (slide) à l'autre.
         * Prend en compte la largeur de la carte PLUS l'espace (gap) entre les cartes.
         * @returns {number} La distance à défiler.
         */
        function getScrollOffset() {
            // Utilise la classe '.card' pour trouver la taille d'un élément
            const firstSlide = track.querySelector('.card'); 
            if (!firstSlide) {
                return track.clientWidth;
            }

            const slideWidth = firstSlide.getBoundingClientRect().width; 
            
            // Récupère la valeur du 'gap' (espace) défini dans le CSS
            const gapValue = getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0';
            const gap = parseFloat(gapValue) || 0;
            
            return slideWidth + gap;
        }

        /**
         * Déclenche le défilement de la piste.
         * @param {number} direction - -1 pour gauche, 1 pour droite.
         */
        function scrollTrack(direction) {
            const offset = getScrollOffset();
            // Utilise la méthode native scrollBy pour un défilement fluide
            track.scrollBy({ left: direction * offset, behavior: 'smooth' });
        }

        // Écouteur pour le bouton précédent
        if (prevButton) {
            prevButton.addEventListener('click', () => scrollTrack(-1));
        }

        // Écouteur pour le bouton suivant
        if (nextButton) {
            nextButton.addEventListener('click', () => scrollTrack(1));
        }
    });

    // ... (Votre code pour le bouton retour en haut, etc.) ...
});

