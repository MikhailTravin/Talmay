//слайдер - комплексы анализа масел
if (document.querySelector('.block-complexes__slider')) {
  let directionsSwiper = null;

  function initSlider() {
    if (window.innerWidth <= 767 && !directionsSwiper) {
      directionsSwiper = new Swiper('.block-complexes__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 32,
        speed: 400,
        navigation: {
          prevEl: '.complexes-arrow-prev',
          nextEl: '.complexes-arrow-next',
        },
        breakpoints: {
          550: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
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