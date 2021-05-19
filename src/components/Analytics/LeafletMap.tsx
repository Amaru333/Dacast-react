

import React from 'react';
import { Map, CircleMarker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import { LatLngTuple, Layer, LeafletMouseEvent } from 'leaflet';
import { LocationItem } from '../../app/redux-flow/store/Content/Analytics';
import { EmptyAnalytics } from './EmptyAnalytics';
import { world } from '../../app/constants/CountriesList';
import { useMedia } from '../../utils/utils';

const defaultLatLng: LatLngTuple = [48.865572, 2.283523];
const zoom: number = 1;


const LeafletMap = (props: { markers: LocationItem[]; markerNameTranform: (element: LocationItem, index: number) => string; smallMap?: boolean }) => {

  const smallMap = props.smallMap || useMedia('(max-width: 1024px)')
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
    if(!amount || amount === 0) {
      return '#00000'
    }
    var ah = parseInt(a.replace(/#/g, ''), 16),
      ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff,
      bh = parseInt(b.replace(/#/g, ''), 16),
      br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff,
      rr = ar + amount * (br - ar),
      rg = ag + amount * (bg - ag),
      rb = ab + amount * (bb - ab);

    return '#' + ((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1);
  }

  let max = Math.max(...props.markers.map(k => k.value[0]));
  let min = Math.min(...props.markers.map(k => k.value[0]));

  // const renderMarkers = () => {
  //   return props.markers.map((element, index) => {
  //     let lerpPercent = logScale(element.value[0], 0, max, 100, 1000);
  //     lerpPercent -= 100;
  //     lerpPercent /= 1000;

  //     return (
  //       <CircleMarker
  //         weight={1} radius={12} center={[element.position.latitude, element.position.longitude]}
  //         color={lerpColor('#93d5ed', '#2f5ec4', lerpPercent)}
  //       >
  //         <Popup>
  //           {props.markerNameTranform(element, index)}
  //         </Popup>
  //       </CircleMarker>)
  //   })
  // }

  function UpdateCountryStyle(feature: any, layer: any) {
  let fillColor = '#e2e0db'

  if(feature.properties.maxVal > 0) {
    console.log(feature)
    let lerpPercent = logScale(feature.properties.maxVal, 0, max, 100, 1000);
      lerpPercent -= 100;
      lerpPercent /= 1000;
    fillColor = lerpColor('#93d5ed', '#2f5ec4', lerpPercent)
  }

  return {
      fillColor: fillColor,
      weight: 2,
      opacity: 1,
      color: '#C8D1E0',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

const handleMouseOver = (e: LeafletMouseEvent, feature: any) => {
  let layer = e.target
  layer.bindPopup('<p>'+feature.properties.name+ ': ' + feature.properties.plays +'</p>')
}


  const onEachFeature = (feature: any, layer: Layer) => {
    layer.on({
      mouseover: (e) => handleMouseOver(e, feature)
    })
    
  }

  const makeLabel = (item: LocationItem): string => {
    const labels = item.label
    const values = item.value

    let returnedString = ''

    values.map((v, i) => {
      returnedString += v + ' ' + labels[i]
      if(i < values.length - 1) {
        returnedString += ', '
      } 
    })

    return returnedString
  }

  const renderGeoJSON = () => {
    let countries = world.features.map((country) => {
      return {
        ...country, 
        properties: {
          ...country.properties,
          plays: props.markers.filter(c => country.id.indexOf(c.city) !== -1).length > 0 ? makeLabel(props.markers.filter(c => country.id.indexOf(c.city) !== -1)[0]) : '',
          maxVal: props.markers.filter(c => country.id.indexOf(c.city) !== -1).length > 0 ? Math.max(...props.markers.filter(c => country.id.indexOf(c.city) !== -1)[0].value): 0
        }
      }
    })
    return <GeoJSON onEachFeature={onEachFeature} data={countries} style={UpdateCountryStyle} />
  }
 
  return (
    <>
      <Map dragging={false} zoomControl={false} scrollWheelZoom={false} center={defaultLatLng} zoom={smallMap ? 1 : 1.3} style={{width:'100%', height: smallMap ? 450 : 600, paddingBottom: 0.5625}} minZoom={smallMap ? 1 : 1.3}  >
        <TileLayer
          noWrap={false}
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
        //url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
        />
        {renderGeoJSON()}
      </Map>
      <div className="flex mt2 justify-center">
        <span className="mr2">{min}</span>
        <div style={{ backgroundColor: '#93d5ed', height: '20px', width: '30px' }}></div>
        <div style={{ backgroundColor: '#45a5f5', height: '20px', width: '30px' }}></div>
        <div style={{ backgroundColor: '#4285f4', height: '20px', width: '30px' }}></div>
        <div style={{ backgroundColor: '#2f5ec4', height: '20px', width: '30px' }}></div>
        <span className="ml2">{max}</span>
      </div>
    </>)

}

export default LeafletMap;