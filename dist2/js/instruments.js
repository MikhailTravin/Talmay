/**
 * @param {Object} instrument - Данные прибора
 * @returns {string} HTML карточки
 */
function createInstrumentCard(instrument) {
    return `
        <div class="card-product2" data-id="${instrument.id}">
            <div class="card-product2__pic1">
                <img src="${instrument.image}" alt="${instrument.name}" loading="lazy">
            </div>
            <div class="card-product2__item">
                <div class="card-product2__top">
                    <div class="card-product2__title">
                        ${instrument.name}
                    </div>
                    <p>${instrument.description}</p>
                </div>
                <a href="${instrument.url}" target="_blank" class="link link2">
                    <span>Подробнее</span>
                    <svg aria-hidden="true" width="20" height="12">
                        <use xlink:href="img/sprite.svg#arrow3"></use>
                    </svg>
                </a>
            </div>
        </div>
    `;
}