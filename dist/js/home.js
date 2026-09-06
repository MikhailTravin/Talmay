//слайдер - главный блок
document.querySelectorAll('.block-intro-right').forEach((block, index) => {
    const slider = block.querySelector('.block-intro-right__slider');
    const fractionEl = block.querySelector('.fraction-slider');
    const prevBtn = block.querySelector('.block-intro-arrow-prev');
    const nextBtn = block.querySelector('.block-intro-arrow-next');

    if (!slider) return;

    const totalSlides = slider.querySelectorAll('.swiper-slide').length;

    if (totalSlides <= 1 && fractionEl) {
        fractionEl.style.display = 'none';
    }

    const uniquePrefix = `slider-${index}`;
    const prevClass = `${uniquePrefix}-prev`;
    const nextClass = `${uniquePrefix}-next`;

    prevBtn.classList.add(prevClass);
    nextBtn.classList.add(nextClass);

    const swiper = new Swiper(slider, {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 400,
        navigation: {
            prevEl: `.${prevClass}`,
            nextEl: `.${nextClass}`,
        },
        on: {
            init: function () {
                updateFraction(this.activeIndex + 1, totalSlides, fractionEl);
            },
            slideChange: function () {
                updateFraction(this.activeIndex + 1, totalSlides, fractionEl);
            }
        }
    });

    function updateFraction(current, total, element) {
        if (element) {
            element.textContent = `${current} из ${total}`;
        }
    }
});

//слайдер - главная каталог приборов
if (document.querySelector('.block-catalog__slider')) {
    let directionsSwiper = null;

    function initSlider() {
        if (window.innerWidth <= 767 && !directionsSwiper) {
            directionsSwiper = new Swiper('.block-catalog__slider', {
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 32,
                speed: 400,
                navigation: {
                    prevEl: '.catalog-arrow-prev',
                    nextEl: '.catalog-arrow-next',
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

//слайдер - курсы
if (document.querySelector('.block-courses__slider')) {
    let directionsSwiper = null;

    function initSlider() {
        if (window.innerWidth <= 767 && !directionsSwiper) {
            directionsSwiper = new Swiper('.block-courses__slider', {
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 32,
                speed: 400,
                navigation: {
                    prevEl: '.courses-arrow-prev',
                    nextEl: '.courses-arrow-next',
                },
                breakpoints: {
                    650: {
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
