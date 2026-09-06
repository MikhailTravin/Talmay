let mainCatalog = document.querySelector('.block-main-catalog');

if (mainCatalog) {
    function updateCatalogMeta(filters, count) {
        const descEl = document.getElementById('catalogDescription');
        const countEl = document.getElementById('instrumentsCount');

        let desc = 'В каталоге представлены приборы для анализа масел и оборудование для комплексного контроля состояния рабочих жидкостей, применяемое в промышленных, сервисных и исследовательских лабораториях. Компания поставляет лабораторные приборы и профессиональное испытательное оборудование ведущих мировых производителей: счетчики частиц, вискозиметры, спектрометры, анализаторы окислительной стабильности, приборы для определения ферромагнитного износа и другое лабораторное оборудование для решения широкого спектра аналитических задач. Все аналитические приборы поставляются с метрологическим сопровождением, сервисной поддержкой и возможностью интеграции в программы мониторинга технического состояния оборудования.';

        if (filters.manufacturer) {
            desc = `${filters.manufacturer}`;
        } else if (filters.indicators) {
            desc = `${filters.indicators}`;
        } else if (filters.tasks) {
            desc = `${filters.tasks}`;
        } else if (filters.standards) {
            desc = `${filters.standards}`;
        }

        if (descEl) {
            descEl.textContent = desc;
        }

        if (countEl) {
            countEl.textContent = count;
        }
    }

    function loadInstruments(filters = {}) {
        const oldPagination = document.querySelector('.pagging');
        if (oldPagination) oldPagination.remove();

        instrumentLoader.renderInstruments(
            '#instrumentsContainer',
            filters,
            {
                usePagination: true,
                perPage: 12,
                onAfterRender: function (filtered) {
                    updateCatalogMeta(filters, filtered.length);
                }
            }
        );
    }

    document.querySelectorAll('.filter-spollers__body a[data-filter]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const parentList = this.closest('ul');
            if (parentList) {
                parentList.querySelectorAll('a').forEach(function (a) {
                    a.classList.remove('active');
                });
            }
            this.classList.add('active');

            let filters = {};
            document.querySelectorAll('.filter-spollers__body ul').forEach(function (ul) {
                const activeLink = ul.querySelector('a.active');
                if (activeLink) {
                    const filterType = activeLink.dataset.filter;
                    const filterValue = activeLink.dataset.value;
                    filters[filterType] = filterValue;
                }
            });

            loadInstruments(filters);
        });
    });

    document.getElementById('resetFilters').addEventListener('click', function () {
        document.querySelectorAll('.filter-spollers__body a').forEach(function (a) {
            a.classList.remove('active');
        });
        loadInstruments({});
    });

    document.addEventListener('click', function (e) {
        const pagLink = e.target.closest('.pagging a[data-page]');
        if (pagLink) {
            e.preventDefault();
            const page = parseInt(pagLink.dataset.page);

            let filters = {};
            document.querySelectorAll('.filter-spollers__body ul').forEach(function (ul) {
                const activeLink = ul.querySelector('a.active');
                if (activeLink) {
                    const filterType = activeLink.dataset.filter;
                    const filterValue = activeLink.dataset.value;
                    filters[filterType] = filterValue;
                }
            });

            const oldPagination = document.querySelector('.pagging');
            if (oldPagination) oldPagination.remove();

            instrumentLoader.renderInstruments(
                '#instrumentsContainer',
                filters,
                {
                    usePagination: true,
                    page: page,
                    perPage: 12,
                    onAfterRender: function (filtered) {
                        updateCatalogMeta(filters, filtered.length);
                    }
                }
            );
        }
    });

    loadInstruments({});
}