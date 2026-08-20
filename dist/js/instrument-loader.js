class InstrumentLoader {
    constructor() {
        this.instruments = [];
        this.descriptions = {};
        this.cache = new Map();
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.currentFilters = {};
    }

    async loadDescriptions() {
        try {
            const response = await fetch('/data/descriptions.json');
            if (response.ok) {
                this.descriptions = await response.json();
            }
        } catch (error) {
            console.warn('Описания не загружены:', error);
        }
    }

    async loadInstruments() {
        if (this.instruments.length > 0) {
            return this.instruments;
        }

        try {
            await this.loadDescriptions();

            const response = await fetch('/data/instruments.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.instruments = await response.json();
            return this.instruments;
        } catch (error) {
            console.error('Ошибка загрузки приборов:', error);
            return [];
        }
    }

    filterInstruments(instruments, filters = {}) {
        let filtered = [...instruments];

        if (filters.ids && filters.ids.length > 0) {
            filtered = filtered.filter(item => filters.ids.includes(item.id));
        }

        if (filters.manufacturer) {
            const manufacturers = Array.isArray(filters.manufacturer)
                ? filters.manufacturer
                : [filters.manufacturer];
            filtered = filtered.filter(item =>
                item.manufacturer.some(m => manufacturers.includes(m))
            );
        }

        if (filters.indicators) {
            const indicators = Array.isArray(filters.indicators)
                ? filters.indicators
                : [filters.indicators];
            filtered = filtered.filter(item =>
                item.indicators.some(i => indicators.includes(i))
            );
        }

        if (filters.tasks) {
            const tasks = Array.isArray(filters.tasks)
                ? filters.tasks
                : [filters.tasks];
            filtered = filtered.filter(item =>
                item.tasks.some(t => tasks.includes(t))
            );
        }

        if (filters.standards) {
            const standards = Array.isArray(filters.standards)
                ? filters.standards
                : [filters.standards];
            filtered = filtered.filter(item =>
                item.standards.some(s => standards.includes(s))
            );
        }

        if (filters.type) {
            const types = Array.isArray(filters.type)
                ? filters.type
                : [filters.type];
            filtered = filtered.filter(item =>
                item.type.some(t => types.includes(t))
            );
        }

        if (filters.search) {
            const search = filters.search.toLowerCase();
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(search) ||
                item.description.toLowerCase().includes(search)
            );
        }

        if (filters.limit && filters.limit > 0) {
            filtered = filtered.slice(0, filters.limit);
        }

        return filtered;
    }

    getPaginatedItems(items, page = 1, perPage = this.itemsPerPage) {
        const start = (page - 1) * perPage;
        const end = start + perPage;
        return {
            items: items.slice(start, end),
            total: items.length,
            page: page,
            totalPages: Math.ceil(items.length / perPage),
            perPage: perPage
        };
    }

    async renderInstruments(container, filters = {}, options = {}) {
        const containerEl = typeof container === 'string'
            ? document.querySelector(container)
            : container;

        if (!containerEl) {
            console.error('Контейнер не найден:', container);
            return;
        }

        const {
            clearBeforeRender = true,
            showEmptyMessage = true,
            emptyMessage = 'Приборы не найдены',
            usePagination = false,
            page = 1,
            perPage = this.itemsPerPage,
            onBeforeRender = null,
            onAfterRender = null,
            updateTitle = true,
            titleSelector = '.block-descr .title2',
            countSelector = '.number'
        } = options;

        this.currentFilters = filters;

        const instruments = await this.loadInstruments();

        const filtered = this.filterInstruments(instruments, filters);

        if (onBeforeRender) {
            onBeforeRender(filtered);
        }

        if (updateTitle) {
            this.updateTitleAndCount(filtered, titleSelector, countSelector, filters);
        }

        if (clearBeforeRender) {
            containerEl.innerHTML = '';
        }

        if (filtered.length === 0 && showEmptyMessage) {
            containerEl.innerHTML = `<p class="empty-message">${emptyMessage}</p>`;
            return;
        }

        let itemsToRender = filtered;
        let paginationData = null;

        if (usePagination) {
            paginationData = this.getPaginatedItems(filtered, page, perPage);
            itemsToRender = paginationData.items;
        }

        const cardsHTML = itemsToRender.map(instrument => createInstrumentCard(instrument)).join('');
        containerEl.insertAdjacentHTML('beforeend', cardsHTML);

        if (usePagination && paginationData && paginationData.totalPages > 1) {
            this.renderPagination(containerEl, paginationData, filters);
        }

        if (onAfterRender) {
            onAfterRender(filtered);
        }
    }

    updateTitleAndCount(filtered, titleSelector, countSelector, filters) {
        const titleEl = document.querySelector(titleSelector);
        const countEl = document.querySelector(countSelector);
        const descEl = document.getElementById('catalogDescription');

        if (titleEl) {
            let title = 'Все приборы';

            if (filters.manufacturer) {
                title = filters.manufacturer;
            } else if (filters.indicators) {
                title = filters.indicators;
            } else if (filters.tasks) {
                title = filters.tasks;
            } else if (filters.standards) {
                title = filters.standards;
            } else if (filters.ids && filters.ids.length > 0) {
                title = 'Рекомендуемое оборудование';
            }

            const span = titleEl.querySelector('span');
            if (span) {
                span.textContent = title;
            } else {
                titleEl.textContent = title;
            }
        }

        if (descEl) {
            let desc = 'В каталоге представлены приборы для анализа масел и оборудование для комплексного контроля состояния рабочих жидкостей';

            if (filters.manufacturer && this.descriptions.manufacturer) {
                desc = this.descriptions.manufacturer[filters.manufacturer] || `Все приборы производителя ${filters.manufacturer}`;
            } else if (filters.indicators && this.descriptions.indicators) {
                desc = this.descriptions.indicators[filters.indicators] || `Оборудование для анализа ${filters.indicators}`;
            } else if (filters.tasks && this.descriptions.tasks) {
                desc = this.descriptions.tasks[filters.tasks] || `Приборы для анализа ${filters.tasks}`;
            } else if (filters.standards && this.descriptions.standards) {
                desc = this.descriptions.standards[filters.standards] || `Оборудование, соответствующее ${filters.standards}`;
            }

            descEl.textContent = desc;
        }

        if (countEl) {
            countEl.textContent = filtered.length;
        }
    }

    renderPagination(container, paginationData, filters) {
        const paginationHTML = `
            <div class="pagging pagging-circle">
                <!-- СТРЕЛОЧКИ ЗАКОММЕНТИРОВАНЫ
                ${paginationData.page > 1 ? `
                <a href="#" class="pagging__item_nav pagging__item_nav-prev" data-page="${paginationData.page - 1}">
                    <img loading="lazy" src="img/icons/arrow3.svg" alt="">
                </a>
                ` : ''}
                -->
                
                ${this.generatePaginationItems(paginationData)}
                
                <!-- СТРЕЛОЧКИ ЗАКОММЕНТИРОВАНЫ
                ${paginationData.page < paginationData.totalPages ? `
                <a href="#" class="pagging__item_nav pagging__item_nav-next" data-page="${paginationData.page + 1}">
                    <img loading="lazy" src="img/icons/arrow3.svg" alt="">
                </a>
                ` : ''}
                -->
            </div>
        `;

        container.insertAdjacentHTML('afterend', paginationHTML);

        container.parentElement.querySelectorAll('.pagging a[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(e.target.closest('a').dataset.page);
                this.loadPage(page, container, filters);
            });
        });
    }

    generatePaginationItems(data) {
        let html = '';
        const total = data.totalPages;
        const current = data.page;
        const maxVisible = 5;

        let start = Math.max(1, current - 2);
        let end = Math.min(total, current + 2);

        if (end - start < maxVisible - 1) {
            if (start === 1) {
                end = Math.min(total, start + maxVisible - 1);
            } else if (end === total) {
                start = Math.max(1, end - maxVisible + 1);
            }
        }

        if (start > 1) {
            html += `<a class="pagging__item" href="#" data-page="1">1</a>`;
            if (start > 2) {
                html += `<a class="pagging__item pagging__item_ellipsis" href="#">...</a>`;
            }
        }

        for (let i = start; i <= end; i++) {
            html += `<a class="pagging__item ${i === current ? 'pagging__item_active' : ''}" href="#" data-page="${i}">${i}</a>`;
        }

        if (end < total) {
            if (end < total - 1) {
                html += `<a class="pagging__item pagging__item_ellipsis" href="#">...</a>`;
            }
            html += `<a class="pagging__item" href="#" data-page="${total}">${total}</a>`;
        }

        return html;
    }

    async loadPage(page, container, filters) {
        const oldPagination = container.parentElement.querySelector('.pagging');
        if (oldPagination) {
            oldPagination.remove();
        }

        await this.renderInstruments(container, filters, {
            usePagination: true,
            page: page,
            perPage: this.itemsPerPage,
            clearBeforeRender: true
        });
    }

    async getInstrumentById(id) {
        const instruments = await this.loadInstruments();
        return instruments.find(item => item.id === id) || null;
    }

    async getUniqueValues(property) {
        const instruments = await this.loadInstruments();
        const values = new Set();
        instruments.forEach(item => {
            if (Array.isArray(item[property])) {
                item[property].forEach(val => values.add(val));
            } else if (item[property]) {
                values.add(item[property]);
            }
        });
        return Array.from(values);
    }
}

const instrumentLoader = new InstrumentLoader();