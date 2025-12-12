document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.header__menu-button');
    const mainNav = document.querySelector('#mainNav');
    if (menuButton && mainNav) {
        menuButton.addEventListener('click', function () {
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            menuButton.setAttribute('aria-expanded', !isExpanded);
            mainNav.toggleAttribute('hidden');
            mainNav.setAttribute('aria-hidden', isExpanded);
            document.body.classList.toggle('no-scroll');
        });

    }
});