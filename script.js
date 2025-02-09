document.addEventListener("DOMContentLoaded", function () {
    // Animace při scrollování pro jednotlivé sekce
    const sections = document.querySelectorAll('.about, .skills, .ai-focus');
    const triggerBottom = window.innerHeight * 0.8; // Spouštěcí bod animace

    function checkScroll() {
        sections.forEach((section, index) => {
            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop < triggerBottom) {
                // Přidání animace podle pořadí sekce
                if (index === 0) {
                    section.classList.add("slide-in-right");
                } else if (index === 1) {
                    section.classList.add("slide-in-left");
                } else {
                    section.classList.add("slide-in-right");
                }
            } else {
                // Odstranění animace při scrollování zpět nahoru
                section.classList.remove("slide-in-right", "slide-in-left");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); // Zkontroluje, zda se některé sekce neaktivují už při načtení stránky

    // Přidání animace pro pomalejší scrollování při kliknutí na tlačítko
    document.querySelector(".cta-button").addEventListener("click", function (e) {
        e.preventDefault(); // Zabrání normálnímu chování odkazu

        // Nastavení počáteční a cílové pozice pro scrollování
        const targetPosition = document.getElementById("about").offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1500; // Doba animace v milisekundách (pomalejší)

        let start = null;

        // Funkce pro plynulé scrollování
        function animationScroll(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1); // Omezení na 1 (100%)
            window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));
            if (timeElapsed < duration) requestAnimationFrame(animationScroll);
        }

        // Funkce pro jemné zpomalení při scrollování (ease-in-out)
        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }

        requestAnimationFrame(animationScroll);
    });
});
