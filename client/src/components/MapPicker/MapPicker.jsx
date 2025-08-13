import React, { useState, useEffect, useRef } from 'react';
import { YMaps, Map, Placemark, Polygon, SearchControl } from '@pbe/react-yandex-maps';
import styles from './MapPicker.module.css';
import { tarazDeliveryZone } from '../../utils/deliveryZone';

const MapPicker = ({ onAddressSelect }) => {
    const defaultState = {
        center: [42.90, 71.37],
        zoom: 12,
        controls: ['zoomControl', 'fullscreenControl', 'geolocationControl'],
    };

    const [mapState, setMapState] = useState(defaultState);
    const [placemarkCoords, setPlacemarkCoords] = useState(null);
    const [ymapsApi, setYmapsApi] = useState(null);
    const polygonRef = useRef(null);

    // Геолокация при загрузке
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setMapState(prevState => ({ ...prevState, center: [latitude, longitude], zoom: 15 }));
                },
                () => console.warn("Геолокация недоступна")
            );
        }
    }, []);

    // Центральная функция для обработки координат
    const processCoords = async (coords) => {
        if (!ymapsApi || !polygonRef.current) return;
        try {
            const res = await ymapsApi.geocode(coords);
            const firstGeoObject = res.geoObjects.get(0);
            if (!firstGeoObject) return;

            const address = firstGeoObject.getAddressLine();
            const isInsideZone = polygonRef.current.geometry.contains(coords);

            onAddressSelect({
                address,
                latitude: coords[0],
                longitude: coords[1],
                isValid: isInsideZone,
            });

            setPlacemarkCoords(coords);
        } catch (error) {
            console.error("Ошибка геокодирования:", error);
        }
    };

    // Обработчик для клика по карте
    const handleMapClick = (e) => {
        const coords = e.get('coords');
        processCoords(coords);
    };

    // Обработчик для выбора результата в стандартном поиске
    const handleSearchResultSelect = (e) => {
        const result = e.get('target').getResultsArray()[0];
        if (result) {
            const coords = result.geometry.getCoordinates();
            setMapState(prevState => ({ ...prevState, center: coords, zoom: 17 }));
            processCoords(coords);
        }
    };

    return (
        <div className={styles.mapContainer}>
            <YMaps query={{ apikey: import.meta.env.VITE_YANDEX_MAP_API_KEY, lang: 'ru_RU', load: 'package.full' }}>
                <Map
                    state={mapState}
                    width="100%"
                    height="350px"
                    onClick={handleMapClick}
                    onLoad={(ymaps) => setYmapsApi(ymaps)}
                >
                    <Polygon
                        geometry={tarazDeliveryZone}
                        options={{ fillColor: '#b1d1b1', fillOpacity: 0.3, strokeColor: '#0e7904', strokeWidth: 2, interactivityModel: 'default#transparent' }}
                        instanceRef={polygonRef}
                    />
                    {placemarkCoords && <Placemark geometry={placemarkCoords} />}
                    
                    {/* Используем стандартный SearchControl, он сам все делает */}
                    <SearchControl 
                        options={{
                            float: 'right',
                            noSuggestPanel: true,
                            provider: 'yandex#search',
                            noPlacemark: true,
                            suppressMapOpen: true
                        }} 
                        onResultSelect={handleSearchResultSelect} // <-- Используем правильный обработчик
                    />
                </Map>
            </YMaps>
        </div>
    );
};

export default MapPicker;