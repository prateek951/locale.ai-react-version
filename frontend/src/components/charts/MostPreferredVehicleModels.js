import React, { Component } from "react";
import PropTypes from "prop-types";
import {  VictoryBar, VictoryChart } from "victory";
import { Grid, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { mostPreferredVehicles } from "../../services/tripService";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    maxWidth: 400,
    textAlign: "center"
  }
});

var cardStyle2 = {
  display: "block",
  width: "500px",
};
var cardStyle = {
  display: "block",
  width: "500px",
  fontSize: "24px",
};
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
    const { classes } = this.props;
    return (
      <Grid
        container
        spacing={24}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item xs={12} sm={6}>
          <Paper style={cardStyle} className={classes.paper}>
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
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper style={cardStyle2} className={classes.paper}>
            Hi Sucker
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

MostlyPreferredVehicleModels.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MostlyPreferredVehicleModels);
