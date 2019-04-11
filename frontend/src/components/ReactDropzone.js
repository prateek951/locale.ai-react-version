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
            Location Visualizer
          </h2>
          <hr />
          <h4>
            The app does what it says...Let's upload a csv to carry out our
            analysis
          </h4>
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
                    <MDBListGroupItem key={index}>
                      {file.name}
                    </MDBListGroupItem>
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
// class ReactDropzone extends Component {

//   render() {
//     const { classes } = this.props;
//     const { dense, secondary } = this.state;
//     return (
//       <Fragment>
//         <Grid
//           container
//           spacing={0}
//           direction="column"
//           alignItems="center"
//           justify="center"
//           style={{ minHeight: "100vh" }}
//         >
//           <Grid item xs={12} md={6}>
//             <Card className={classes.card}>
//               <CardHeader
//                 avatar={
//                   <Avatar aria-label="Recipe" className={classes.avatar}>
//                     📍
//                   </Avatar>
//                 }
//                 action={
//                   <IconButton>
//                     <MoreVertIcon />
//                   </IconButton>
//                 }
//                 title="Trips Visualizer"
//               />
//               <CardMedia
//                 className={classes.media}
//                 image={
//                   "http://telecoms.com/wp-content/blogs.dir/1/files/2018/09/Fotolia_156420567_Subscription_Monthly_M-770x285.jpg"
//                 }
//                 title="Location Intelligence"
//               />
//               <CardContent>
//                 <Typography component="p">
//                   This impressive paella is a perfect party dish and a fun meal
//                   to cook together with your guests. Add 1 cup of frozen peas
//                   along with the mussels, if you like.
//                 </Typography>
//               </CardContent>
//               <CardActions className={classes.actions} disableActionSpacing>
//                 <Grid item xs={9}>
//                   <Dropzone marginRight={2} onDrop={this.onDrop}>
//                     {({ getRootProps, getInputProps }) => (
//                       <section className="container">
//                         <div
//                           style={{ border: "2px black dotted" }}
//                           {...getRootProps({ className: "dropzone" })}
//                         >
//                           <input {...getInputProps()} />
//                           <p>
//                             Drag and drop some files here, or click to select
//                             files
//                           </p>
//                         </div>
//                       </section>
//                     )}
//                   </Dropzone>
//                 </Grid>
//                 <Grid item xs={3}>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     className={classes.button}
//                     onClick={this.handleUpload}
//                   >
//                     <CloudUploadIcon className={classes.rightIcon} />
//                     Upload{this.state.isUploading ? "ing" : ""}
//                   </Button>
//                 </Grid>
//               </CardActions>
//               <Grid item xs={12} md={6}>
//                 <div className={classes.demo}>
//                   <List dense={dense}>
//                   </List>
//                 </div>
//               </Grid>
//             </Card>
//           </Grid>
//         </Grid>
//       </Fragment>
//     );
//   }
// }

// ReactDropzone.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(ReactDropzone);
