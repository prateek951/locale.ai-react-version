import React, { Component } from "react";
import "react-tabs/style/react-tabs.css";
import MobileBookingTrends from "./charts/MobileBookingTrends";
import { bookingTrends } from "../services/tripService";
export default class ChartVisualization extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   data for mobile site and online bookings for render purposes
      trends: []
    };
  }

  async componentDidMount() {
    const {
      data: { mbtrends, message }
    } = await bookingTrends();
    const onlineBookingsPercentage = mbtrends[0] * 100;
    const mobileBookingsPercentage = mbtrends[1] * 100;
    // console.log(onlineBookingsPercentage, mobileBookingsPercentage);
    this.setState({
      trends: [onlineBookingsPercentage, mobileBookingsPercentage]
    });
  }

  render() {
    return (
        <div>
          <MobileBookingTrends trends={this.state.trends} />
        </div>
    );
  }
}
