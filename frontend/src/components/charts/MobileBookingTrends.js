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
                <h2 className="h1 display-3">Hello, world!</h2>
                <p className="lead">
                  This is a simple hero unit, a simple Jumbotron-style component
                  for calling extra attention to featured content or
                  information.
                </p>
                <hr className="my-2" />
                <p>
                  It uses utility classes for typgraphy and spacing to space
                  content out within the larger container.
                </p>
                <p className="lead">
                  <MDBBtn color="primary">Learn More</MDBBtn>
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
