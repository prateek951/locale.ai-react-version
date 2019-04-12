import React, { Component } from "react";
import PropTypes from "prop-types";
import NProgress from "nprogress";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBJumbotron,
  MDBBtn,
  toast
} from "mdbreact";
import { bookingTrends } from "../../services/tripService";
import { VictoryPie } from "victory";

class MobileBookingTrends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trends: [],
      //   { vehiclemodel : countforthem}
    };
  }
  async componentDidMount() {
    NProgress.start();
    this.setState({ loading: true });
    try {
      const {
        data: { mbtrends, message }
      } = await bookingTrends();
      // console.log(models);
      this.setState({ trends: mbtrends, loading: false });
      NProgress.done();
      toast.success(message);
      console.log(mbtrends);
    } catch (ex) {
      NProgress.done();
      this.setState({ loading: false });
      toast.error(ex);
    }
  }

  render() {
    const { trends, loading } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          {loading ? (
            <h1>Rendering Booking Trends </h1>
          ) : (
            <MDBCol>
              <VictoryPie
                data={[
                  { x: "Online Bookings", y: trends[0] },
                  { x: "Mobile Site Bookings", y: trends[1] }
                ]}
              />
            </MDBCol>
          )}
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBJumbotron>
              <div>
                <h2 className="h1 display-3">Booking Trends</h2>
                <p className="lead">
                  On analysis of the dataset of the trips, it can be well
                  observed that around {trends[0]}% of the trips that were
                  booked were having
                  <code> online_bookings</code> and {trends[1]}% of the trips
                  that were booked were having <code>mobile_site_bookings</code>
                </p>
              </div>
            </MDBJumbotron>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default MobileBookingTrends;
