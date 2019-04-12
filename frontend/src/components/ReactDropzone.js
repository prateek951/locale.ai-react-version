import React from "react";
import styled from "styled-components";
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
  MDBListGroupItem,
  MDBAlert
} from "mdbreact";
import { toast } from "react-toastify";
import { uploadCSV } from "../services/tripService";

// Heading Styles for the ReactDropzone Page

const HeadingStyles = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;
// Paragraph Styles for the ReactDropzone Page

const ParagraphStyles = styled.p`
  font-size: 20px;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-2deg);
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

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
      this.props.fileUploaded();
      this.props.history.push("/render-trips");
    } catch (ex) {
      toast.error(ex);
      this.setState({ files: [], isUploaded: false, isUploading: false });
    }
  };
  render() {
    const { isFirstRender, uploadedOrNot } = this.props;
    return (
      <MDBContainer>
        <br />
        {!uploadedOrNot ? (
          <MDBAlert color="danger" dismiss>
            <strong>Trespassing not allowed ! </strong> Please care to upload a
            CSV file. Only then we will allow access to results.
          </MDBAlert>
        ) : null}
        {isFirstRender && (
          <MDBAlert color="primary" dismiss>
            <strong>Glad you are here!</strong>Let us upload a csv now !
          </MDBAlert>
        )}
        <Carousel />
        <br />
        <br />
        <MDBJumbotron>
          <HeadingStyles>
            <span role="img" aria-labelledby="Location App">
              📍
            </span>{" "}
            Location Visualizer.
          </HeadingStyles>
          <hr />
          <br />
          <h4>
            The app does what it says...Let us upload a csv to carry out our
            analysis.
          </h4>
          <br />
          <ParagraphStyles>
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
          </ParagraphStyles>
          <hr />
          <br />

          <Dropzone
            multiple={false}
            accept=".csv"
            marginRight={2}
            onDrop={this.onDrop}
          >
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
                  <p className="lead">
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
            </MDBCol>
          </MDBRow>
        </MDBJumbotron>
      </MDBContainer>
    );
  }
}

export default ReactDropzone;
