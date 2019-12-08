import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";

class GoogleMapTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 4.7057892,
      lon: -74.0381977
    };
  }
  renderMarkers(map, maps) {
    if (navigator.geolocation) {
      let marker = null;
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        map.panTo({ lat: this.state.lat, lng: this.state.lon });
      });

      navigator.geolocation.watchPosition(
        pos => {
          let lat = pos.coords.latitude;
          let lon = pos.coords.longitude;
          this.setState({
            lat: lat,
            lon: lon
          });
          map.panTo({ lat: this.state.lat, lng: this.state.lon });
          this.saveCurrentLocation();
        },
        err => {
          console.log(err);
        },
        {
          enableHighAccuracy: true
        }
      );
    }
  }

  saveCurrentLocation = () => {
    fetch("taxistas/position", {
      method: "POST",
      body: JSON.stringify({
        lat: this.state.lat,
        lon: this.state.lon,
        conductor: this.props.location.conductor
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.location.token
      }
    })
      .then(res => {})
      .catch(error => console.log("Error:", error));
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div
        style={{
          height: "70vh",
          width: "100%",
          alt: "google map of that tracks the current location"
        }}
        alt="lo que sea"
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBQGovuMsVwP-HAiTWrNAVND5JfnikoPZ8" }}
          defaultCenter={{ lat: this.state.lat, lng: this.state.lon }}
          defaultZoom={17}
          onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
          yesIWantToUseGoogleMapApiInternals={true}
        >
          <MapMarker lat={this.state.lat} lng={this.state.lon} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMapTrack;
