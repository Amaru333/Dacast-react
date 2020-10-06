

import React, { useEffect } from 'react';
import { Map, CircleMarker, Popup, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { LocationItem } from '../../app/redux-flow/store/Analytics/Dashboard';
import { randDarkColor } from '../../utils/utils';

const defaultLatLng: LatLngTuple = [48.865572, 2.283523];
const zoom: number = 2;


const LeafletMap = (props: { markers: LocationItem[], markerNameTranform: (element: LocationItem) => string }) => {

  const renderMarkers = () => {
    return props.markers.map(element => {
      console.log(element);
      return (
        <CircleMarker weight={1} radius={12} center={[element.position.latitude, element.position.longitude]} color={randDarkColor() } >
          <Popup>
            {props.markerNameTranform(element)}
          </Popup>
        </CircleMarker>)
    })
  }

  return (
    <Map center={defaultLatLng} zoom={zoom} style={{ height: '350px' }}>
      <TileLayer
        attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        //url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
      />
      {renderMarkers()}
    </Map>)

}

export default LeafletMap;