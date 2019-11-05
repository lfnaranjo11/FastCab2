import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class SimpleMap extends Component {
  renderMarkers(map, maps) {
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

      map.panTo({ lat: newLat, lng: newLon });
    });
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
          defaultCenter={{ lat: this.props.lat, lng: this.props.lon }}
          defaultZoom={17}
          onGoogleApiLoaded={({ map, maps }) => this.renderMarkers(map, maps)}
          yesIWantToUseGoogleMapApiInternals={true}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
