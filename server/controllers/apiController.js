const fs = require("fs");
const fastcsv = require("fast-csv");
// For fast performance reads of 90000 rows per second make use
// of csv-parser instead of the fast-csv
const csv = require("csv-parser");
const HTTP_STATUS_CODES = require("http-status-codes");
const path = require("path");
/**
 * @controller method to make the upload of the csv files 
 */
exports.makeUpload = (req, res) => {
  //   console.log("Make upload now");
  let trips = [];
  // We are just interested in latitude and the longitude data
  //  { from_lat, from_long, to_lat, to_long }

  fastcsv
    .fromPath(req.file.path)
    .on("data", function(data) {
      trips.push(data);
    })
    .on("end", function() {
      // console.log(trips);
      // unlink the file path
      var ws = fs.createWriteStream(
        path.join(__dirname, "../uploads/trips.csv")
      );
      fastcsv.write(trips, { headers: true }).pipe(ws);
      fs.unlinkSync(req.file.path);
      // return trips but only their latitudes and longitudes and nothing else;
      // return res.status(HTTP_STATUS_CODES.OK).json({ trips: trips });
      return res
        .status(HTTP_STATUS_CODES.OK)
        .json({ message: "The dataset is uploaded successfully" });
    });
};

/**
 * @controller method to get the list of the trips 
 */

exports.getTrips = (req, res) => {
  let trips = [];
  fs.createReadStream(path.join(__dirname, "../uploads/trips.csv"))
    .pipe(csv())
    .on("data", function(data) {
      console.log(data);
      if (
        isFinite(+data.from_lat) &&
        isFinite(+data.from_long) &&
        isFinite(+data.to_lat) &&
        isFinite(+data.to_long)
      ) {
        trips.push({
          from_lat: +data.from_lat,
          from_long: +data.from_long,
          to_lat: +data.to_lat,
          to_long: +data.to_long
        });
      }
    })
    .on("end", function() {
      trips =
        trips && trips.length > 0 ? trips.slice(1, trips.length/10) : [];
      return res
        .status(HTTP_STATUS_CODES.OK)
        .json({ trips: trips, message: "Rendering all the trips" });
    });
};

/**
 * @controller method to return the list of all the booking trends
 */

exports.bookingTrends = (req, res) => {
  // compute these on the server side with the data that we have
  let bookingTrends = { mobileBookings: 0, onlineBookings: 0 };
  let onlineBookingPercentage = 0;
  let mobileBookingPercentage = 0;
  fs.createReadStream(path.join(__dirname, "../uploads/trips.csv"))
    .pipe(csv())
    .on("data", function(data) {
      // trips.push(data);
      bookingTrends.mobileBookings += Number(data.mobile_site_booking);
      bookingTrends.onlineBookings += Number(data.online_booking);
    })
    .on("end", function() {
      onlineBookingPercentage = Number(
        bookingTrends.onlineBookings /
          (bookingTrends.onlineBookings + bookingTrends.mobileBookings)
      );
      mobileBookingPercentage = Number(
        bookingTrends.mobileBookings /
          (bookingTrends.onlineBookings + bookingTrends.mobileBookings)
      );
      // console.log(bookingTrends.mobileBookings, bookingTrends.onlineBookings);
      console.log("done danna done");
      return res.status(HTTP_STATUS_CODES.OK).json({
        mbtrends: [onlineBookingPercentage, mobileBookingPercentage],
        message: "Pie chart creation begins"
      });
    });
};

/**
 * @controller method Controller method to return the list of all the vehicle models
 */

exports.vehicleModels = (req, res) => {
  // compute these on the server side with the data that we have
  let vehicleModelsWithCounts;
  let vehicleModels = [];
  fs.createReadStream(path.join(__dirname, "../uploads/trips.csv"))
    .pipe(csv())
    .on("data", function(data) {
      // trips.push(data);
      vehicleModels.push(data.vehicle_model_id);
    })
    .on("end", function() {
      vehicleModelsWithCounts = vehicleModels.reduce(function(tally, vm) {
        if (typeof tally[vm] === "undefined") {
          tally[vm] = 1;
        } else {
          tally[vm] += 1;
        }
        return tally;
      }, {});

      console.log("done danna done");
      return res.status(HTTP_STATUS_CODES.OK).json({
        models: vehicleModelsWithCounts,
        message: "Trends for Vehicle Models"
      });
    });
};
