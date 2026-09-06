//слайдер - используемые приборы
document.querySelectorAll('.block-base-products').forEach((block, index) => {
    const slider = block.querySelector('.block-base-products__slider');
    const fractionEl = block.querySelector('.base-products-fraction');
    const prevBtn = block.querySelector('.base-products-arrow-prev');
    const nextBtn = block.querySelector('.base-products-arrow-next');

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