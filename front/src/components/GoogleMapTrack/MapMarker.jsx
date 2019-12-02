import React from "react";
import ForkTKM from "./taxi.svg";

class MapMarker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src={ForkTKM} height="50rem" width="40rem" alt="map marker" />
      </div>
    );
  }
}

export default MapMarker;
