/**
 * @documentation Uber React Map GL documentation
 * For more information refer there.
 * https://uber.github.io/react-map-gl
 *  */
import React, { PureComponent } from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  FlyToInterpolator
} from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";
import NProgress from "nprogress";
import { getTrips } from "../services/tripService";
import { toast } from "react-toastify";
import CityPin from "./uber-mapbox-gl-utils/city-pin";
import CityInfo from "./uber-mapbox-gl-utils/city-info";

// Full screen control styles
const fullscreenControlStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};
// navstyles
const navStyle = {
  position: "absolute",
  top: 36,
  left: 0,
  padding: "10px"
};
const styles = {};
class RenderTrips extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        width: 1400,
        height: 700,
        latitude: 12.99313,
        longitude: 77.59828,
        zoom: 11,
        transitionInterpolator: new FlyToInterpolator()
      },
      mapRendered: false,
      requestedPair: "from", //two values from and to
      popupInfo: null,
      trips: null
    };
  }
  // Utility method to update the viewport
  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  // Utility method to render the city marker
  _renderTripMarker = (trip, index) => {
    const { requestedPair } = this.state;
    let point = {};
    if (requestedPair === "from") {
      point.latitude = +trip.from_lat;
      point.longitude = +trip.from_long;
    } else if (requestedPair === "to") {
      point.latitude = +trip.to_lat;
      point.longitude = +trip.to_long;
    }
    return (
      <Marker
        key={`marker-${index}`}
        longitude={point.longitude}
        latitude={point.latitude}
        captureClick={true}
      >
        <CityPin
          size={20}
          onClick={() => {
            const { viewport } = this.state;
            viewport.latitude = point.latitude;
            viewport.longitude = point.longitude;
            viewport.zoom = 13;
            this.setState({ viewport, popupInfo: point });
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
      this.setState({ trips: trips, mapRendered: true });
      NProgress.done();
      toast.success(message);
    } catch (ex) {
      NProgress.done();
      toast.error(ex);
    }
  }
  render() {
    const { trips } = this.state;
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

        <Grid item xs={8}>
          <div>
            <ReactMapGL
              mapboxApiAccessToken="pk.eyJ1IjoicHJhdGVlazk1MSIsImEiOiJjanU4bTZldzQxenpzNDN0YWFlemxmZTR1In0.39lHGz_hKdlKhM-ONRcDpg"
              {...this.state.viewport}
              mapStyle="mapbox://styles/mapbox/dark-v9"
              onViewportChange={this._updateViewport}
            >
              {/* Here goes the markers for the trips that we have */}
              {trips ? (
                trips.map(this._renderTripMarker)
              ) : (
                <span>Network request still in process</span>
              )}
              {this._renderPopup}
              <div className="fullscreen" style={fullscreenControlStyle}>
                <FullscreenControl />
              </div>
              <div className="nav" style={navStyle}>
                <NavigationControl onViewportChange={this._updateViewport} />
              </div>
            </ReactMapGL>
            <br/><br/>
            {this.state.mapRendered && (
              <div>
                <Link to="/visualize">See the Basic Chart</Link>
                <Link to="/prefer">See the Main Chart</Link>
              </div>
            )}
          </div>
        </Grid>
        <Grid xs={2}>{/* offset */}</Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(RenderTrips);
