/**
 *  @author Prateek Madaan
 *  @desc Express Server for location visualizer application 
 */

const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const HTTP_STATUS_CODES = require("http-status-codes");
const app = express();

app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
);

// Only allow csv files to get uploaded and no other mimeTypes
const fileFilter = function(req, file, cb) {
  if (path.extname(file.originalname) !== ".csv") {
    // Create a new error object
    const error = new Error("File Type not permissible");
    // set the error code
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }

  cb(null, true);
};

// If you want to specify the max size of the csv file
// that can be uploaded then only un-comment the limits
// option below

// const MAX_SIZE = 200000

const upload = multer({
  dest: "./uploads",
  fileFilter: fileFilter
  // limits: {
  //   fileSize : MAX_SIZE
  // }
});

const apiController = require("./controllers/apiController");
const routes = require("./utils/routeHandlers");
/**
 * @desc route to upload the file to the server
 * @route /upload
 */

app.post(routes.uploadRoute, upload.single("file"), apiController.makeUpload);
app.get(routes.mapRoute, apiController.getTrips);
app.get(routes.bookingTrendsRoute, apiController.bookingTrends);
app.get(routes.mostPreferredRoute, apiController.vehicleModels);

app.use((err, req, res, next) => {
  // If the error code is for the LIMITED FILE TYPES ( ALLOW ONLY CSV)

  if (err.code === "LIMIT_FILE_TYPES") {
    return res
      .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
      .json({ error: "Only CSV files are allowed" });
  }
  // If the error code is for the LIMIT FILE SIZE
  // Un-comment the below code to make file size limitations
  // if (err.code === "LIMIT_FILE_SIZE") {
  //   return res
  //     .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
  //     .json({ error: ` Too large. Max size that we allow is ${MAX_SIZE}` });
  // }
});

if (process.env.NODE_ENV === "production") {
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 1337;

app.listen(port, () => console.log(`Server running on ${port}`));
