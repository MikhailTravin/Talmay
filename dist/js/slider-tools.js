//слайдер - оборудование для смазывания
if (document.querySelector('.block-tools__slider')) {
    function initSingleSlider(sliderElement) {
        const prevBtn = sliderElement.closest('.block-tools__bottom').querySelector('.tools-arrow-prev');
        const nextBtn = sliderElement.closest('.block-tools__bottom').querySelector('.tools-arrow-next');

        if (sliderElement.swiper) {
            return;
        }

        if (window.innerWidth <= 900) {
            const swiper = new Swiper(sliderElement, {
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 16,
                speed: 400,
                navigation: {
                    prevEl: prevBtn,
                    nextEl: nextBtn,
                },
                breakpoints: {
                    767: {
                        slidesPerView: "auto",
                        spaceBetween: 24,
                    },
                    901: {
                        spaceBetween: 0,
                    },
                },
            });

            sliderElement.swiper = swiper;
        }
    }

    function destroySlider(sliderElement) {
        if (sliderElement.swiper) {
            sliderElement.swiper.destroy(true, true);
            delete sliderElement.swiper;
        }
    }

    function initAllSliders() {
        const sliders = document.querySelectorAll('.block-tools__slider');

        sliders.forEach(slider => {
            if (window.innerWidth <= 900) {
                initSingleSlider(slider);
            } else {
                destroySlider(slider);
            }
        });
    }

    initAllSliders();

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(initAllSliders, 200);
    });
}