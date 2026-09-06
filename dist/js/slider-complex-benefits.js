//слайдер - комплексы анализа масел
if (document.querySelector('.block-complex-benefits2__slider')) {
    let directionsSwiper = null;

    function initSlider() {
        if (window.innerWidth <= 767 && !directionsSwiper) {
            directionsSwiper = new Swiper('.block-complex-benefits2__slider', {
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 16,
                speed: 400,
                navigation: {
                    prevEl: '.complex-benefits-arrow-prev',
                    nextEl: '.complex-benefits-arrow-next',
                },
            });
        } else if (window.innerWidth > 767 && directionsSwiper) {
            directionsSwiper.destroy(true, true);
            directionsSwiper = null;
        }
    }
    initSlider();

    window.addEventListener('resize', initSlider);
}