import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

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
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
        new maps.Marker({
          position: { lat: this.state.lat, lng: this.state.lon },
          map,
          title: "Hello World!"
        });
        map.panTo({ lat: this.state.lat, lng: this.state.lon });
      });
      navigator.geolocation.watchPosition(
        pos => {
          this.setState({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          });
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div
        style={{
          height: "50vh",
          width: "100%",
          alt: "google map of the user location"
        }}
        alt="lo que sea"
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBQGovuMsVwP-HAiTWrNAVND5JfnikoPZ8" }}
          defaultCenter={{ lat: this.state.lat, lng: this.state.lon }}
          defaultZoom={17}
          onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
          yesIWantToUseGoogleMapApiInternals={true}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMapTrack;
