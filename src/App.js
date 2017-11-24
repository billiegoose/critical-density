import React, { Component } from 'react';
import ReactMapboxGl, { ZoomControl, ScaleControl, Layer, Feature, Marker, Popup, GeoJSONLayer } from "react-mapbox-gl";
import { createGeoJSONCircle } from './createGeoJSONCircle';
import logo from './logo.svg';
import './App.css';

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1Ijoid21oaWx0b24iLCJhIjoiY2phY3E2bXlpMGNucjJxbGR0dGkxbTVoeiJ9.txTo7euZfXHMXQG_XuYQzQ"
});

const icon = new Image(24, 24);
icon.src = 'wifi.svg';

const geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: createGeoJSONCircle([-84.5274513, 39.3218257], 5),
    properties: {
      radius: 5,
      title: 'My house',
      description: 'Cincinnati, OH'
    }
  },
  {
    type: 'Feature',
    geometry: createGeoJSONCircle([-122.414, 37.776], 100),
    properties: {
      radius: 100,
      title: 'Mapbox',
      description: 'San Francisco, California'
    }
  }]
};

class App extends Component {
  constructor () {
    super()
    this.state = {
      coords: [0, 0],
      zoom: [0]
    }
  }
  centerOnCurrentPosition () {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState(state => ({
        coords: [position.coords.longitude, position.coords.latitude],
        zoom: [9]
      }))
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React!</h1>
        </header>
        <Map
          center={this.state.coords}
          style="mapbox://styles/mapbox/streets-v9"
          zoom={this.state.zoom}
          containerStyle={{
            height: "600px",
            width: "600px",
            margin: "auto"
          }}>
          <GeoJSONLayer
            data={geojson}
            fillPaint={{
              'fill-color': 'yellow',
              'fill-opacity': 0.4
            }}/>
          <Layer type="symbol"
            images={[['radio-tower', icon]]}
            layout={{
              'icon-image': 'radio-tower',
            }}>
            <Feature coordinates={[-84.5274513, 39.3218257]} draggable={true}/>
          </Layer>
          <Popup coordinates={[0, 0]} anchor="bottom" offset={10}>
            <p>Mesh Wifi Station</p>
          </Popup>
          <Marker coordinates={[0, 0]} draggable={true}>
            <img alt="Mesh Wifi Station" id="wifi" width="16" height="16" src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Wifi.svg"/>
          </Marker>
          <img alt="Zoom to my location" title="Zoom to my location" src="my_location.svg" width="24" height="24" onClick={this.centerOnCurrentPosition.bind(this)} style={{position: 'relative', background: 'white', borderRadius: '12px'}}/>
          <ZoomControl/>
          <ScaleControl/>
        </Map>
      </div>
    );
  }
}

export default App;
