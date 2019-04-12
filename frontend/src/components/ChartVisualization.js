import React, { Component } from "react";
import MobileBookingTrends from "./charts/MobileBookingTrends";
export default class ChartVisualization extends Component {
   render() {
    return (
        <div>
          <MobileBookingTrends />
        </div>
    );
  }
}
