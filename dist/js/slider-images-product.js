//слайдер - карточка прибора
document.querySelectorAll('.images-product').forEach((productBlock) => {
    const thumbEl = productBlock.querySelector('.images-product__thumb');
    const sliderEl = productBlock.querySelector('.images-product__slider');

    if (!sliderEl) return;

    const prevEl = productBlock.querySelector('.images-product-arrow-prev');
    const nextEl = productBlock.querySelector('.images-product-arrow-next');
    const hasNavigation = prevEl && nextEl;

    let thumbsSwiper = null;
    if (thumbEl) {
        thumbsSwiper = new Swiper(thumbEl, {
            observer: true,
            observeParents: true,
            slidesPerView: 3,
            spaceBetween: 12,
            speed: 400,
            preloadImages: true,
            breakpoints: {
                601: {
                    slidesPerView: 4,
                    spaceBetween: 12,
                },
            },
            ...(hasNavigation && {
                navigation: {
                    prevEl: prevEl,
                    nextEl: nextEl,
                },
            }),
        });
    }

    const mainConfig = {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 400,
        preloadImages: true,
        breakpoints: {
            767: {
                spaceBetween: 32,
            },
        },
    };

    if (thumbsSwiper) {
        mainConfig.thumbs = {
            swiper: thumbsSwiper,
        };
    }

    if (hasNavigation) {
        mainConfig.navigation = {
            prevEl: prevEl,
            nextEl: nextEl,
        };
    }

    const mainThumbsSwiper = new Swiper(sliderEl, mainConfig);
});
function togglePopupAttribute() {
    const slides = document.querySelectorAll('.images-product__thumb .images-product__slide[data-popup="#slider-gallery"]');

    slides.forEach((slide) => {
        if (window.innerWidth <= 600) {
            slide.removeAttribute('data-popup');
            slide.dataset.popupBackup = '#slider-gallery';
        } else if (slide.dataset.popupBackup) {
            slide.setAttribute('data-popup', slide.dataset.popupBackup);
            delete slide.dataset.popupBackup;
        }
    });
}
togglePopupAttribute();
window.addEventListener('resize', togglePopupAttribute);