import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ReactDropzone from "./components/ReactDropzone";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RenderTrips from "./components/RenderTrips";
import ChartVisualization from "./components/ChartVisualization";
import MostPreferredVehicleModels from "./components/charts/MostPreferredVehicleModels";
import Navigation from "./renderOnly/Navigation";
import Footer from "./renderOnly/Footer";
import MostlyPreferredVehicleModels from "./components/charts/MostPreferredVehicleModels";
class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route path="/" exact component={ReactDropzone} />
          <Route
            path="/render-trips"
            exact
            render={props => (
              <RenderTrips {...props} />
            )}
          />
          <Route
            path="/visualize"
            exact
            render={props => <ChartVisualization {...props}/>}
          />
          <Route
            path="/prefer"
            exact
            render={props => <MostlyPreferredVehicleModels {...props} />}
          />
          <ToastContainer />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
