import React from "react";
import "./Marker.css";

class MapMarker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="marker"
        style={{ backgroundColor: "#f7b334", cursor: "pointer" }}
      />
    );
  }
}

export default MapMarker;
