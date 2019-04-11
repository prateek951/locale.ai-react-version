import React from "react";
import PropTypes from "prop-types";
import { VictoryPie } from "victory";
import { Grid, Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  card: {
    padding: theme.spacing.unit * 2,
    maxWidth: 400,
    textAlign: "center"
  }
});

function MobileBookingTrends({ trends, classes }) {
  return (
    <Grid
      container
      spacing={24}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} md={6}>
        <Card className={classes.card}>
          <VictoryPie
            colorScale={["navy", "orange"]}
            padAngle={3}
            innerRadius={100}
            data={[
              { x: "Online Bookings", y: trends[0] },
              { x: "Mobile Site Bookings", y: trends[1] }
            ]}
          />
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
