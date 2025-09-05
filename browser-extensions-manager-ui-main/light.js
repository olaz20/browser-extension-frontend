const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if(body.classList.contains('light-mode')){
        themeToggle.src = "assets/images/icon-moon.svg";
        themeToggle.alt = "dark mode icon";
    } else {
        themeToggle.src = "assets/images/icon-sun.svg";
        themeToggle.alt ="light mode icon"
    }
});


