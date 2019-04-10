import React, { Component } from "react";
import { getTrips } from "../services/tripService";
import { toast } from "react-toastify";
export default class RenderTrips extends Component {
  componentDidMount() {
    console.log("Network Request about to shoot!!");
  }
  render() {
    return <div />;
  }
}
