//Фильтр сортировка
function initFilter() {
    const filterButtons = document.querySelectorAll('.filter-sorting__title');
    if (!filterButtons.length) return;

    const cardsContainer = document.querySelector('.filter-cards');
    if (!cardsContainer) return;

    const cards = cardsContainer.querySelectorAll('.filter-card');
    if (!cards.length) return;

    function filterCards(filterValue) {
        cards.forEach(card => {
            const cardFilter = card.getAttribute('data-filter');
            if (filterValue === 'all' || cardFilter === filterValue) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterValue = this.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            filterCards(filterValue);
        });
    });

    const allButton = document.querySelector('.filter-sorting__title[data-filter="all"]');
    if (allButton && !allButton.classList.contains('active')) {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        allButton.classList.add('active');
        filterCards('all');
    }
}
initFilter();