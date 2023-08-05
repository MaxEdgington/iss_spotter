// It will contain most of the logic for fetching the data from each API endpoint.

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

/**
 * #Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - # A callback (to pass back an error or the array of resulting data)
 * # Returns (via Callback):
 *   - # An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */

const request = require("request");

// This lets me the request library which
// Basically you have

/**
 * Returns coordinates for the ISS as an array of `{ risetime: number; duration: number}`.
 * The coords argument requires a `latitude` and `longitude`.
 * @param { { latitude: number; longitude: number} } coords - Object with the keys latitude and longitude.
 * @param { (err: string; data: { risetime: number; duration: number}[] ) => void } callback - callback function that expects an error and data
 */
const fetchISSFlyOverTimes = function (coords, callback) {
  request(
    `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,

    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }

      // if the server fails
      if (response.statusCode !== 200) {
        callback("Invalid server response", null);
      } else {
        // parse the returned body so we can check its information
        const parsedBody = JSON.parse(body);
        // check if the response has the data we're looking for
        if (!parsedBody.response) {
          callback("Server returned an invalid response", null);
        }
        const res = parsedBody.response;
        callback(null, res);
      }
    }
  );
};

module.exports = { fetchISSFlyOverTimes };

const fetchCoordsByIp = function (ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // parse the returned body so we can check its information
    const parsedBody = JSON.parse(body);

    // check if "success" is true or not
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    const obj = {};
    obj.latitude = parsedBody.latitude;
    obj.longitude = parsedBody.longitude;
    callback(null, obj);
  });
};

const fetchMyIP = function (callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes };
