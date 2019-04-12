import React from "react";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import Carousel from "./Carousel";
import {
  MDBContainer,
  MDBJumbotron,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem
} from "mdbreact";
import { toast } from "react-toastify";
import { uploadCSV } from "../services/tripService";
class ReactDropzone extends React.Component {
  constructor() {
    super();
    this.onDrop = files => {
      this.setState({ files });
    };
    this.state = {
      files: [],
      dense: false,
      secondary: false,
      isUploaded: false,
      isUploading: false
    };
  }

  handleUpload = async event => {
    event.preventDefault();
    if (!this.state.files[0]) {
      toast.error("Please upload a csv file to continue");
      return;
    }
    this.setState({ isUploading: true });
    try {
      const {
        data: { message }
      } = await uploadCSV(this.state.files[0]);
      // console.log(message);
      this.setState({ files: [], isUploaded: true, isUploading: false });
      toast.success(message);
      this.props.history.push("/render-trips");
    } catch (ex) {
      toast.error(ex);
      this.setState({ files: [], isUploaded: false, isUploading: false });
    }
  };
  render() {
    return (
      <MDBContainer>
        <Carousel />
        <br />
        <br />
        <MDBJumbotron>
          <h2>
            <span role="img" aria-labelledBy="Location App">
              📍
            </span>{" "}
            Location Visualizer.
          </h2>
          <hr />
          <h4>
            The app does what it says...Let us upload a csv to carry out our
            analysis.
          </h4>
          <p>
            {" "}
            Location intelligence (LI) is a business intelligence (BI) tool
            capability that relates geographic contexts to business data. Like
            BI, location intelligence software is designed to turn data into
            insight for a host of business purposes. Such tools draw on a
            variety of data sources, such as geographic information systems
            (GIS), aerial maps, demographic information and, in some cases, an
            organization own databases. For effective decision making and
            helping companies exploit this location factor which they are unable
            to tap and utilize the fruits of what it can offer in terms of the
            growth and stability of the organisations.
          </p>
          <hr />
          <br />

          <Dropzone marginRight={2} onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section className="container">
                <div
                  style={{
                    border: `2px ${
                      !this.state.isUploaded ? "red" : "green"
                    } dotted`
                  }}
                  {...getRootProps({ className: "dropzone" })}
                >
                  <input {...getInputProps()} />
                  <p class="lead">
                    Drag and drop some files here, or click to select files
                  </p>
                </div>
              </section>
            )}
          </Dropzone>
          <br />
          <MDBRow>
            <MDBCol>
              <MDBBtn
                rounded
                outline
                color={this.state.isUploading ? "primary" : "success"}
                onClick={this.handleUpload}
              >
                Upload{this.state.isUploading ? "ing" : ""}
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBListGroup style={{ width: "22rem" }}>
                {this.state.files.map((file, index) => {
                  return (
                    <MDBListGroupItem key={index}>{file.name}</MDBListGroupItem>
                  );
                })}
              </MDBListGroup>
              {this.state.isUploaded ? (
                <Link to="/render-trips">Visualize the Results</Link>
              ) : (
                ""
              )}
            </MDBCol>
          </MDBRow>
        </MDBJumbotron>
      </MDBContainer>
    );
  }
}

export default ReactDropzone;
