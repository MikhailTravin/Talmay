//Карточка товара - читать полностью
const readMoreLink = document.querySelector('.product-card-descr1__more');
const targetContent = document.querySelector('#tabs-descr-more');
const header = document.querySelector('.header');

if (readMoreLink && targetContent) {
    readMoreLink.addEventListener('click', (event) => {
        event.preventDefault();

        const tabsBlock = targetContent.closest('[data-tabs]');
        if (!tabsBlock) return;

        const tabTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
        const tabItems = tabsBlock.querySelectorAll('[data-tabs-item]');

        const targetIndex = Array.from(tabItems).findIndex(item => item.id === 'tabs-descr-more');
        if (targetIndex === -1) return;

        if (!tabTitles[targetIndex].classList.contains('_tab-active')) {
            tabTitles[targetIndex].click();
        }
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetContent.getBoundingClientRect().top + window.pageYOffset;
        const scrollTo = targetPosition - headerHeight - 20;

        window.scrollTo({
            top: scrollTo,
            behavior: 'smooth'
        });
    });
}