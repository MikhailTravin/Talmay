//Яндекс карта
const map1 = document.querySelector('#map1');
if (map1) {
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map('map1', {
            center: [43.181311, 76.810044],
            zoom: 15,
            controls: ['zoomControl'],
            behaviors: ['drag']
        }, {
            searchControlProvider: 'yandex#search'
        });

        myMap.geoObjects
            .add(new ymaps.Placemark([43.181311, 76.810044], {
                /*
                iconColor: '#0c8ce9',
                iconImageSize: [105, 140],
                iconImageOffset: [-57, -137],*/
            }))

    };
}