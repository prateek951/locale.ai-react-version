import React, { Component } from "react";
import PropTypes from "prop-types";
import { MDBContainer, MDBRow, MDBCol, MDBJumbotron, MDBBtn } from "mdbreact";
import { bookingTrends } from "../../services/tripService";
import { VictoryPie } from "victory";

class MobileBookingTrends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trends: []
      //   { vehiclemodel : countforthem}
    };
  }
  async componentDidMount() {
    const {
      data: { mbtrends, message }
    } = await bookingTrends();
    // console.log(models);
    this.setState({ trends: mbtrends });
    console.log(mbtrends);
  }

  render() {
    const { trends } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <VictoryPie
              data={[
                { x: "Online Bookings", y: trends[0] },
                { x: "Mobile Site Bookings", y: trends[1] }
              ]}
            />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBJumbotron>
              <div>
                <h2 className="h1 display-3">Booking Trends</h2>
                <p className="lead">
                  On analysis of the dataset of the trips, it can be well
                  observed that around {trends[0]}% of the trips that were booked were having
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
