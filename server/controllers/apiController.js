const fs = require("fs");
const fastcsv = require("fast-csv");
// For fast performance reads of 90000 rows per second make use
// of csv-parser instead of the fast-csv
const csv = require("csv-parser");
const HTTP_STATUS_CODES = require("http-status-codes");
const path = require("path");
/**

 * @controller
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

exports.getTrips = (req, res) => {
  let trips = [];
  fs.createReadStream(path.join(__dirname, "../uploads/trips.csv"))
    .pipe(csv())
    .on("data", function(data) {
      console.log(data);
      trips.push(data);
    })
    .on("end", function() {
      trips = trips && trips.length > 0 ? trips.slice(1, trips.length) : [];
      trips = trips
        .map(trip => {
          return {
            from_lat: trip.from_lat,
            from_long: trip.from_long,
            to_lat: trip.to_lat,
            to_long: trip.to_long
          };
        })
        .filter(
          trip =>
            !isNaN(+trip.from_lat) &&
            !isNaN(+trip.from_long) &&
            !isNaN(+trip.to_lat) &&
            !isNaN(+trip.to_long)
        );
      return res
        .status(HTTP_STATUS_CODES.OK)
        .json({ trips: trips, message: "Rendering all the trips" });
    });
};
