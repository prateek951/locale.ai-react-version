import React from "react";
import PropTypes from "prop-types";
import { VictoryPie } from "victory";
import { Grid, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    maxWidth: 400,
    textAlign: "center"
  }
});

var cardStyle2 = {
  display: "block",
  width: "50vw",
  transitionDuration: "0.3s"
};

var cardStyle = {
  display: "block",
  width: "50vw",
  fontSize: "24px",
  transitionDuration: "0.3s"
};
function MobileBookingTrends({ trends, classes }) {
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
          <VictoryPie
            data={[
              { x: "Online Bookings", y: trends[0] },
              { x: "Mobile Site Bookings", y: trends[1] }
            ]}
          />
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

MobileBookingTrends.propTypes = {
  trends: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MobileBookingTrends);
