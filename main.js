const button = document.getElementById("btn");

if (button) {
    button.addEventListener("click", () => {
        alert("Hallo Welt!");
    });
}

const initHeroCarousel = (hero) => {
    if (!hero || hero.dataset.carouselReady === "true") {
        return;
    }

    hero.dataset.carouselReady = "true";

    const getImages = () => Array.from(hero.querySelectorAll("img"));

    const getCurrentIndex = (images) => {
        const heroLeft = hero.scrollLeft;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        images.forEach((image, index) => {
            const distance = Math.abs(image.offsetLeft - heroLeft);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    };

    hero.addEventListener("click", (event) => {
        const images = getImages();

        if (images.length === 0) {
            return;
        }

        const rect = hero.getBoundingClientRect();
        const clickOnLeftSide = event.clientX < rect.left + rect.width / 2;
        const currentIndex = getCurrentIndex(images);
        const targetIndex = clickOnLeftSide
            ? Math.max(0, currentIndex - 1)
            : Math.min(images.length - 1, currentIndex + 1);

        images[targetIndex]?.scrollIntoView({
            behavior: "smooth",
            inline: "start",
            block: "nearest",
        });
    });
};

const initAllHeroCarousels = () => {
    document.querySelectorAll(".hero").forEach(initHeroCarousel);
};

initAllHeroCarousels();

const heroObserver = new MutationObserver(() => {
    initAllHeroCarousels();
});

heroObserver.observe(document.body, {
    childList: true,
    subtree: true,
});