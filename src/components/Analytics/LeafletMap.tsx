

import React from 'react';
import { Map, CircleMarker, Popup, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import { LocationItem } from '../../app/redux-flow/store/Content/Analytics';
import { EmptyAnalytics } from './EmptyAnalytics';

const defaultLatLng: LatLngTuple = [48.865572, 2.283523];
const zoom: number = 2;


const LeafletMap = (props: { markers: LocationItem[], markerNameTranform: (element: LocationItem) => string }) => {

  if(!props.markers.length) {
    return (
        <EmptyAnalytics />
    )
}
  const logScale = (value: number, minp: number, maxp: number, minv: number, maxv: number) => {
    var minv = Math.log(minv);
    var maxv = Math.log(maxv);
    var scale = (maxv - minv) / (maxp - minp);
    return Math.exp(minv + scale * (value - minp));
  }

  const lerpColor = (a: string, b: string, amount: number) => {
    var ah = parseInt(a.replace(/#/g, ''), 16),
      ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
      bh = parseInt(b.replace(/#/g, ''), 16),
      br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
      rr = ar + amount * (br - ar),
      rg = ag + amount * (bg - ag),
      rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
  }

  let max = Math.max(...props.markers.map(k => k.value));
  let min = Math.min(...props.markers.map(k => k.value));

  const renderMarkers = () => {
    return props.markers.map((element, index) => {
      let lerpPercent = logScale(element.value, 0, max, 100, 1000);
      lerpPercent -= 100;
      lerpPercent /= 1000;

      return (
        <CircleMarker
          weight={1} radius={12} center={[element.position.latitude, element.position.longitude]}
          color={lerpColor('#93d5ed', '#2f5ec4', lerpPercent)}
        >
          <Popup>
            {props.markerNameTranform(element)}
          </Popup>
        </CircleMarker>)
    })
  }

  return (
    <>
      <Map center={defaultLatLng} zoom={zoom} style={{ height: '350px' }}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        //url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        {renderMarkers()}
      </Map>
      <div className="flex mt2 justify-center">
        <a className="mr2">{min}</a>
        <div style={{ backgroundColor: '#93d5ed', height: '20px', width: '30px' }}></div>
        <div style={{ backgroundColor: '#45a5f5', height: '20px', width: '30px' }}></div>
        <div style={{ backgroundColor: '#4285f4', height: '20px', width: '30px' }}></div>
        <div style={{ backgroundColor: '#2f5ec4', height: '20px', width: '30px' }}></div>
        <a className="ml2">{max}</a>
      </div>
    </>)

}

export default LeafletMap;