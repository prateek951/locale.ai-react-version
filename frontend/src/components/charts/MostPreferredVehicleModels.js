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
                            <h2 className="h1 display-3">Hello, world!</h2>
                            <p className="lead">
                                This is a simple hero unit, a simple Jumbotron-style component
                                for calling extra attention to featured content or information.
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

export default MostlyPreferredVehicleModels;
