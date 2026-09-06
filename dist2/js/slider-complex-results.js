//слайдер - ЛИМС-система. ПО собственной разработки
if (document.querySelector('.block-complex-results__slider')) {
    const cardSwiper = new Swiper('.block-complex-results__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 400,
        preloadImages: true,
        navigation: {
            prevEl: '.complex-results-arrow-prev',
            nextEl: '.complex-results-arrow-next',
        },
    });
}