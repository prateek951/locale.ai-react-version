import React, { Fragment, PureComponent } from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import { Cube } from "styled-loaders-react";
import NProgress from "nprogress";
import { MDBContainer, MDBRow, MDBCol, MDBJumbotron, MDBBtn } from "mdbreact";
import { VictoryBar, VictoryChart } from "victory";
import { mostPreferredVehicles } from "../../services/tripService";
import { toast } from "react-toastify";

const BasicChartLink = styled.a`
  font-size: 1rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: #0a12;
    color: black;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

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
              <Cube color="black" size="120px" duration="5s" />
            ) : (
              <Fragment>
                <BasicChartLink>
                  <Link to="/visualize">
                    <a>Go to Basic Chart</a>
                  </Link>
                </BasicChartLink>

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
              </Fragment>
            )}
          </MDBCol>
        </MDBRow>
        {loading ? null : (
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
        )}
      </MDBContainer>
    );
  }
}

export default withRouter(MostlyPreferredVehicleModels);
