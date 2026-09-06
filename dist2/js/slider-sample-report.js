//слайдер - пример отчета
if (document.querySelector('.product-card-tabs__slider')) {
    const cardSwiper = new Swiper('.product-card-tabs__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 16,
        speed: 400,
        preloadImages: true,
        navigation: {
            prevEl: '.product-card-arrow-prev',
            nextEl: '.product-card-arrow-next',
        },
    });
}