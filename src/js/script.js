document.addEventListener('DOMContentLoaded', () => {
    // 1. Sélection des éléments
    const menuButton = document.querySelector('.header__menu-button');
    const nav = document.getElementById('mainNav');

    // 2. Écoute du clic
    menuButton.addEventListener('click', () => {
        // Est-ce que le menu est déjà ouvert ?
        const isOpened = menuButton.getAttribute('aria-expanded') === 'true';

        if (isOpened) {
            // SI OUVERT -> ON FERME
            menuButton.setAttribute('aria-expanded', 'false');
            nav.setAttribute('hidden', ''); // On remet l'attribut hidden pour cacher

            // On empêche le scroll de la page derrière
            document.body.style.overflow = 'auto';
        } else {
            // SI FERMÉ -> ON OUVRE
            menuButton.setAttribute('aria-expanded', 'true');
            nav.removeAttribute('hidden'); // On enlève hidden pour afficher

            // On bloque le scroll de la page derrière
            document.body.style.overflow = 'hidden';
        }
    });
});