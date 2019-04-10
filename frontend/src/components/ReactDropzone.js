import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import Button from "@material-ui/core/Button";
import { uploadCSV } from "../services/tripService";
import { toast } from "react-toastify";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  CardActions
  // Collapse,
  // GridList
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { red } from "@material-ui/core/colors";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  demo: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
  card: {
    padding: theme.spacing.unit * 2,
    maxWidth: 400,
    textAlign: "center"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class ReactDropzone extends Component {
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
    const { classes } = this.props;
    const { dense, secondary } = this.state;
    return (
      <Fragment>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    📍
                  </Avatar>
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title="Trips Visualizer"
              />
              <CardMedia
                className={classes.media}
                image={
                  "http://telecoms.com/wp-content/blogs.dir/1/files/2018/09/Fotolia_156420567_Subscription_Monthly_M-770x285.jpg"
                }
                title="Location Intelligence"
              />
              <CardContent>
                <Typography component="p">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.
                </Typography>
              </CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
                <Grid item xs={9}>
                  <Dropzone marginRight={2} onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps }) => (
                      <section className="container">
                        <div
                          style={{ border: "2px black dotted" }}
                          {...getRootProps({ className: "dropzone" })}
                        >
                          <input {...getInputProps()} />
                          <p>
                            Drag and drop some files here, or click to select
                            files
                          </p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleUpload}
                  >
                    <CloudUploadIcon className={classes.rightIcon} />
                    Upload{this.state.isUploading ? "ing" : ""}
                  </Button>
                </Grid>
              </CardActions>
              <Grid item xs={12} md={6}>
                <div className={classes.demo}>
                  <List dense={dense}>
                    {this.state.files.map((file, index) => {
                      return (
                        <ListItem key={index}>
                          <ListItemIcon>
                            <FolderIcon />
                          </ListItemIcon>
                          <ListItemText primary={file.name} />
                          {this.state.isUploaded ? (
                            <Link to="/render-trips">
                              Visualize the Results
                            </Link>
                          ) : (
                            ""
                          )}
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

ReactDropzone.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReactDropzone);
