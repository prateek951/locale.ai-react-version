import React, { Component } from "react";
import PropTypes from "prop-types";
import { MDBContainer, MDBRow, MDBCol, MDBJumbotron, MDBBtn } from "mdbreact";
import { VictoryBar, VictoryChart } from "victory";
import { mostPreferredVehicles } from "../../services/tripService";

class MostlyPreferredVehicleModels extends Component {
  constructor(props) {
    super(props);
    this.state = {
      models: {}
      //   { vehiclemodel : countforthem}
    };
  }
  async componentDidMount() {
    const {
      data: { models, message }
    } = await mostPreferredVehicles();
    // console.log(models);
    this.setState({ models: models });
  }

  render() {
    const { models } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <VictoryChart minDomain={{ x: 0 }}>
              <VictoryBar
                data={Object.keys(models)
                  .slice(1, 10)
                  .map(modelKey => {
                    return {
                      x: modelKey,
                      y: models[modelKey]
                    };
                  })}
              />
            </VictoryChart>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBJumbotron>
              <div>
                <h2 className="h1 display-3">
                  Most Preferred Vehicle Model IDs
                </h2>
                <p className="lead">
                  On analyzing the dataset of trips it can be seen the most
                  prominently preferred vehicles were of model 12 with around
                  30,000 trips being carried out in the vehicles that had this
                  as the <code> vehicle_model_id</code> . I just considered a
                  slice of dataset here, giving us directly the vehicle model
                  that we should target. 
                </p>
                <hr className="my-2" />
              </div>
            </MDBJumbotron>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default MostlyPreferredVehicleModels;
