import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import ReactDropzone from "./components/ReactDropzone";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RenderTrips from "./components/RenderTrips";
import ChartVisualization from "./components/ChartVisualization";
import MostPreferredVehicleModels from "./components/charts/MostPreferredVehicleModels";
import Navigation from "./renderOnly/Navigation";
import Footer from "./renderOnly/Footer";
class App extends Component {
  state = {
    isUploaded: false,
    isFirstRender: true
  };

  checkWhetherFileUploaded = () => this.setState({ isUploaded: true, isFirstRender: false });

  render() {
    const { isUploaded, isFirstRender } = this.state;
    return (
      <div>
        <Navigation />
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <ReactDropzone
                {...props}
                uploadedOrNot={isUploaded}
                isFirstRender={isFirstRender}
                fileUploaded={this.checkWhetherFileUploaded}
              />
            )}
          />
          {isUploaded ? (
            <Switch>
              <Route path="/render-trips" exact component={RenderTrips} />
              <Route path="/visualize" exact component={ChartVisualization} />
              <Route
                path="/prefer"
                exact
                component={MostPreferredVehicleModels}
              />
            </Switch>
          ) : (
            <Switch>
              <Redirect to="/" />
            </Switch>
          )}
        </Switch>
        <ToastContainer />
        <Footer />
      </div>
    );
  }
}

export default App;
