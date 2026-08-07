/* ==========================================================================
   DARREN PORTFOLIO - JAVASCRIPT (js/portfolio_darren.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = themeBtn ? themeBtn.querySelector('.theme-icon') : null;

    // 1. Theme Switcher with localStorage
    const savedTheme = localStorage.getItem('darren_portfolio_theme') || 'dark';
    applyTheme(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('darren_portfolio_theme', newTheme);
        });
    }

    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeIcon) themeIcon.textContent = '☀️';
            if (themeBtn) themeBtn.setAttribute('aria-label', 'Switch to dark mode');
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (themeIcon) themeIcon.textContent = '🌙';
            if (themeBtn) themeBtn.setAttribute('aria-label', 'Switch to light mode');
        }
    }

    // 2. Animate Skill Progress Bars when scrolled into view
    const skillFills = document.querySelectorAll('.progress-fill');
    const observeSkills = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const targetWidth = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = targetWidth;
                }, 100);
                observeSkills.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });

    skillFills.forEach(fill => observeSkills.observe(fill));
});