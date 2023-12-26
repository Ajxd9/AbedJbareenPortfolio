const sections = document.querySelectorAll('.biggest-container');
const progressPoints = document.querySelectorAll('.progress-point');
let isScrolling = false;

window.addEventListener('scroll', () => {
    let currentSectionIndex = 0;
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 2) {
            currentSectionIndex = index;
        }
    });

    progressPoints.forEach((point, index) => {
        if (index === currentSectionIndex) {
            point.classList.add('active');
        } else {
            point.classList.remove('active');
        }
    });
});

window.addEventListener('wheel', (event) => {
    event.preventDefault();
    if (isScrolling) return;

    const delta = event.deltaY;
    const direction = delta > 0 ? 1 : -1;

    scrollToSection(direction);

    isScrolling = true;
    setTimeout(() => {
        isScrolling = false;
    }, 1000);
});

window.addEventListener('keydown', (event) => {
    if (isScrolling) return;
    isScrolling = true;

    if (event.key === 'ArrowUp') {
        scrollToSection(-1);
    } else if (event.key === 'ArrowDown') {
        scrollToSection(1);
    }

    setTimeout(() => {
        isScrolling = false;
    }, 1000);
});

function scrollToSection(direction) {
    const currentSectionIndex = Math.floor(window.pageYOffset / window.innerHeight);
    let nextSectionIndex = currentSectionIndex + direction;

    if (nextSectionIndex < 0) {
        nextSectionIndex = 0;
    } else if (nextSectionIndex >= sections.length) {
        nextSectionIndex = sections.length - 1;
    }

    const targetScrollPosition = nextSectionIndex * window.innerHeight;
    window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth'
    });
}
