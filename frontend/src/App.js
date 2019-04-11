import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ReactDropzone from "./components/ReactDropzone";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RenderTrips from "./components/RenderTrips";
import ChartVisualization from "./components/ChartVisualization";
import MostPreferredVehicleModels from "./components/charts/MostPreferredVehicleModels";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={ReactDropzone} />
          <Route path="/render-trips" exact component={RenderTrips} />
          <Route path="/visualize" exact component={ChartVisualization} />
          <Route path="/prefer" exact component={MostPreferredVehicleModels} />
        </Switch>
        <ToastContainer />
      </Router>
    );
  }
}

export default App;
