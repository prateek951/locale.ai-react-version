import React from "react";
import PropTypes from "prop-types";
import { VictoryPie } from "victory";
import { Grid, Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    padding: theme.spacing.unit * 2,
    maxWidth: 400,
    textAlign: "center"
  }
});

var cardStyle = {
  display: "block",
  width: "50vw",
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
      <Grid item style={cardStyle} xs={12} md={6}>
        <Card style={cardStyle} className={classes.card}>
          <VictoryPie
            data={[
              { x: "Online Bookings", y: trends[0] },
              { x: "Mobile Site Bookings", y: trends[1] }
            ]}
          />
        </Card>
      </Grid>
      <Grid item style={cardStyle} xs={12} md={6}>
        <Card style={cardStyle} className={classes.card}>
          <h1>This is another card sucker</h1>
        </Card>
      </Grid>
    </Grid>
  );
}

MobileBookingTrends.propTypes = {
  trends: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MobileBookingTrends);
