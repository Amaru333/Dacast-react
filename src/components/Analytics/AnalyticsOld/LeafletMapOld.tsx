import React, { useEffect } from 'react';
// import * as Leaflet from 'leaflet';
import JSInjector from '../../../utils/services/injectors/JSInjector';
import CSSInjector from '../../../utils/services/injectors/CSSInjector';
import { lerpColor, logScale } from '../../../app/pages/Analytics/AnalyticsCommunOld';

const LeafletMapOld = (props: any) => {

    const getDivRef = React.useRef<HTMLDivElement>(null);

    const [leafletDiv, setLeafletDiv] = React.useState<any>(getDivRef);
    const [leafletMap, setLeafletMap] = React.useState<any>(null);
    const [loadedScript, setLoadedScript] = React.useState<any>(false);
    const [markers, setMarkers] = React.useState<any>([]);

    

    const updateMap = () => {
        if (!leafletDiv || !loadedScript) {
            return;
        }

        if (leafletMap === null) {
            //bounds of the entire planet 
            let bounds = new L.LatLngBounds(new L.LatLng(-90, -180), new L.LatLng(90, 180));
            var map = L.map(props.idMap ? props.idMap : "defaultMapId", {
                center: bounds.getCenter(),
                maxBounds: bounds,
                maxBoundsViscosity: 1.0
            }).setView([51.505, -0.09], 1);
            setLeafletMap(map);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 9,
                minZoom: 1,
                noWrap: true,
                id: 'mapbox.light',
                accessToken: 'pk.eyJ1IjoicGxlbnRpdXciLCJhIjoiY2poY2F6MXoxMGFwYzM2bnlicDVsNHEwNyJ9.x52xNZWzRhsaWoHCl_5d3Q'
            }).addTo(map);
        }

        if (!props.markers) {
            return;
        }
        let max = Math.max(...props.markers.map(k => k.consumedMB));

        markers.forEach(m => leafletMap.removeLayer(m));
        setMarkers([]);

        var newMarkersTable = [];
        for (let i = 0; i < props.markers.length; i++) {
            let propMarker = props.markers[i];
            if (propMarker.consumedMB === 0 || !propMarker.position.latitude || !propMarker.position.longitude) {
                continue;
            }
            let lerpPercent = logScale(propMarker.consumedMB, 0, max, 100, 1000);
            lerpPercent -= 100;
            lerpPercent /= 1000;

            let circle = L.circleMarker([propMarker.position.latitude, propMarker.position.longitude], { radius: 10 })
                .bindPopup(props.markerNameTranform ? props.markerNameTranform(propMarker.city, propMarker.consumedMB, props.datasetName) : propMarker.city + ': ' + propMarker.value + ' ' + props.datasetName)
                .addTo(map);
            circle.setStyle({
                color: lerpColor('#93d5ed', '#2f5ec4', lerpPercent),
                fillOpacity: 0.5,
                stroke: false
            })
            circle.on('mouseover', function (e) {
                //openPopup();
            });
            circle.on('mouseout', function (e) {
                //closePopup();
            });
            newMarkersTable.push(circle);
        }
        setMarkers(newMarkersTable);

    }

    const loadScript = async () => {
        CSSInjector.injectCss('https://unpkg.com/leaflet@1.3.1/dist/leaflet.css');
        await JSInjector.injectJs('https://unpkg.com/leaflet@1.3.1/dist/leaflet.js');
        setLoadedScript(true);
    }


    useEffect(() => {
        if (!loadedScript) {
            loadScript();
        }
        updateMap();
    }, [loadedScript]);



    return (
        <div style={{ height: props.height ? props.height : '100%', width: props.width ? props.width : '100%' }} id={props.idMap ? props.idMap : "defaultMapId"} ref={getDivRef}></div>
    );

}

export default LeafletMapOld;