import React, { Component } from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import NProgress from "nprogress";
import { MDBContainer, MDBRow, MDBCol, MDBJumbotron } from "mdbreact";
import { toast } from "react-toastify";
import { Cube } from "styled-loaders-react";
import { bookingTrends } from "../../services/tripService";
import { VictoryPie } from "victory";

const MainChartLink = styled.a`
  font-size: 1rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: #0a12;
    color: black;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

class MobileBookingTrends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trends: []
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
      // console.log(mbtrends);
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
            <Cube color="black" size="120px" duration="5s" />
          ) : (
            <MDBCol>
              <MainChartLink>
                <Link to="/prefer">
                  <a>Go to Main Chart</a>
                </Link>
              </MainChartLink>

              <VictoryPie
                data={[
                  { x: "Online Bookings", y: trends[0] },
                  { x: "Mobile Site Bookings", y: trends[1] }
                ]}
              />
            </MDBCol>
          )}
        </MDBRow>
        {loading ? null : (
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
                    that were booked were having{" "}
                    <code>mobile_site_bookings</code>
                  </p>
                </div>
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>
        )}
      </MDBContainer>
    );
  }
}

export default withRouter(MobileBookingTrends);
