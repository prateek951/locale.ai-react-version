import http from "./httpService";
import config from "../config.json";

// Let us create the end point that we want to expose
const MAP_END_POINT = `${config.endpoint}/basic-map`;
const DATASET_UPLOAD_END_POINT = `${config.endpoint}/upload`;

// setters for exposing end points
function MapEndPoint() {
  return `${MAP_END_POINT}`;
}
function DataSetUploadEndPoint() {
  return `${DATASET_UPLOAD_END_POINT}`;
}

/**
 * @async call to make the upload of the csv file
 */

export function uploadCSV(file) {
  //prepare form data
  const formData = new FormData();
  formData.append("file", file);
  //use the headers
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  return http.post(DataSetUploadEndPoint(), formData, config);
}

export function getTrips() { 
  return http.get(MapEndPoint());
}