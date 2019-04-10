import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl
} from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";
import NProgress from "nprogress";
import { getTrips } from "../services/tripService";
import { toast } from "react-toastify";

/**
 * @documentation Uber React Map GL documentation
 * For more information refer there.
 *  */

// Full screen control styles
const fullscreenControlStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};
//navstyles
const navStyle = {
  position: "absolute",
  top: 36,
  left: 0,
  padding: "10px"
};

export default class RenderTrips extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        width: 1400,
        height: 700,
        latitude: 12.99313,
        longitude: 77.59828,
        zoom: 11
      },
      popupInfo: null,
      trips: [],
      isFetching: false
    };
  }
  // Utility method to update the viewport
  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  // Utility method to render the city marker
  _renderCityMarker = (city, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={city.longitude}
        latitude={city.latitude}
        captureClick={true}
      >
        <CityPin
          size={20}
          onClick={() => {
            const { viewport } = this.state;
            viewport.latitude = city.latitude;
            viewport.longitude = city.longitude;
            viewport.zoom = 13;
            this.setState({ viewport, popupInfo: city });
          }}
        />
      </Marker>
    );
  };

  _renderPopup() {
    const { popupInfo } = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <CityInfo info={popupInfo} />
        </Popup>
      )
    );
  }
  async componentDidMount() {
    // console.log(trips);
    NProgress.start();
    this.setState({ isFetching: true });
    try {
      const {
        data: { trips, message }
      } = await getTrips();
      NProgress.done();
      this.setState({ trips: trips, isFetching: false });
      toast.success(message);
    } catch (ex) {
      this.setState({ isFetching: false });
      NProgress.done();
      toast.error(ex);
    }
  }
  render() {
    const { trips } = this.state;
    const markers =
      trips.length > 0 ? (
        trips.map(this._renderCityMarker)
      ) : (
        <span>Network request still in process</span>
      );
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid xs={2}>{/* offset */}</Grid>

        <Grid width={10} item xs={8}>
          <div>
            <MapGL
              mapboxApiAccessToken="pk.eyJ1IjoicHJhdGVlazk1MSIsImEiOiJjanU4bTZldzQxenpzNDN0YWFlemxmZTR1In0.39lHGz_hKdlKhM-ONRcDpg"
              {...this.state.viewport}
              mapStyle="mapbox://styles/mapbox/dark-v9"
              onViewportChange={this._updateViewport}
            >
              {/* Here goes the markers for the trips that we have */}
              {markers}
              {this._renderPopup}
              <div className="fullscreen" style={fullscreenControlStyle}>
                <FullscreenControl />
              </div>
              <div className="nav" style={navStyle}>
                <NavigationControl onViewportChange={this._updateViewport} />
              </div>

              <ControlPanel
                containerComponent={this.props.containerComponent}
              />
            </MapGL>
          </div>
        </Grid>
        <Grid xs={2}>{/* offset */}</Grid>
      </Grid>
    );
  }
}
