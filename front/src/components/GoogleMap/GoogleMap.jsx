import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker";

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 4.7057892,
      lon: -74.0381977,
      latu: 4.7057892,
      lonu: -74.0381977,
      maps: undefined
    };
  }

  renderMarkers(map, maps) {
    this.setState({ maps: maps });
    const geocoder = new maps.Geocoder();
    let newLat = this.props.lat;
    let newLon = this.props.lon;
    geocoder.geocode({ address: this.props.direccion }, (results, status) => {
      if (status === "OK") {
        newLat = results[0].geometry.location.lat();
        newLon = results[0].geometry.location.lng();
      }
      new maps.Marker({
        position: { lat: newLat, lng: newLon },
        map,
        title: "Hello World!"
      });
      this.setState({
        latu: newLat,
        lonu: newLon
      });
      map.panTo({ lat: newLat, lng: newLon });
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
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
          height: "50vh",
          width: "100%",
          alt: "google map of the user location"
        }}
        alt="lo que sea"
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBQGovuMsVwP-HAiTWrNAVND5JfnikoPZ8" }}
          defaultCenter={{ lat: this.props.lat, lng: this.props.lon }}
          defaultZoom={15}
          onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
          yesIWantToUseGoogleMapApiInternals={true}
        >
          <MapMarker lat={this.state.lat} lng={this.state.lon} />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
