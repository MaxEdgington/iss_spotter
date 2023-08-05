const {
  fetchMyIP,
  fetchLocationByIp,
  fetchISSFlyOverTimes,
  fetchCallback,
} = require("./iss_promised");

/**
 * Get ISS flyover times for my location
 */
const nextISSTimesForMyLocation = () => {
  fetchMyIP()
    .then((res) => {
      // take the returned response (res), convert it to JSON then grab the ip key
      // and pass it to fetchLocationByIp
      fetchLocationByIp(JSON.parse(res).ip).then((res) => {
        // take the returned response (res), convert it to JSON then pass it to fetchISSFlyOverTimes
        // fetchISSFlyOverTimes grabs the latitude and longitude keys
        fetchISSFlyOverTimes(JSON.parse(res)).then((res) => {
          // take the returned response (res), convert it to an object and pass the .response key to fetchCallback
          fetchCallback(JSON.parse(res).response);
        });
      });
    })
    .catch((err) => console.error(err));
};

nextISSTimesForMyLocation();
