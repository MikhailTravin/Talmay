//фильтр
document.addEventListener('DOMContentLoaded', function () {
  const filterIcon = document.querySelector('.filter-icon');
  const filterSpollers = document.querySelector('.filter-spollers');

  if (filterIcon) {
    filterIcon.addEventListener('click', function (e) {
      e.stopPropagation();
      document.documentElement.classList.add('filter-open');
    });
  }

  document.addEventListener('click', function (e) {
    const target = e.target;
    const isFilterSpollers = target.closest('.filter-spollers');
    const isFilterIcon = target.closest('.filter-icon');

    if (!isFilterSpollers && !isFilterIcon) {
      document.documentElement.classList.remove('filter-open');
    }
  });
});