import React, { PureComponent } from "react";
import NProgress from "nprogress";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBJumbotron,
  MDBBtn,
  toast
} from "mdbreact";
import { VictoryBar, VictoryChart } from "victory";
import { mostPreferredVehicles } from "../../services/tripService";

class MostlyPreferredVehicleModels extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      models: {},
      loading: false
      //   { vehiclemodel : countforthem}
    };
  }
  async componentDidMount() {
    NProgress.start();
    this.setState({ loading: true });
    try {
      const {
        data: { models, message }
      } = await mostPreferredVehicles();
      // console.log(models);
      this.setState({ models: models, loading: false });
      NProgress.done();
      toast.success(message);
    } catch (ex) {
      NProgress.done();
      this.setState({ loading: false });
      toast.error(ex);
    }
  }
  
  render() {
    const { models, loading } = this.state;
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <VictoryChart minDomain={{ x: 0 }}>
                <VictoryBar
                  data={Object.keys(models)
                    .slice(0, 10)
                    .map(modelKey => {
                      return {
                        x: modelKey,
                        y: models[modelKey]
                      };
                    })}
                />
              </VictoryChart>
            )}
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
