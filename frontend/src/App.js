import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import ReactDropzone from "./components/ReactDropzone";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RenderTrips from "./components/RenderTrips";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={ReactDropzone} />
          <Route path="/render-trips" exact component={RenderTrips} />
        </Switch>
        <ToastContainer />
      </Router>
    );
  }
}

export default App;
