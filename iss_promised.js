const request = require("request-promise-native");

const fetchMyIP = function () {
  return request("https://api.ipify.org?format=json");
};

const fetchLocationByIp = (ip) => {
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = (coords) => {
  return request(
    `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`
  );
};

const fetchCallback = (passTimes) => {
  for (const passTime of passTimes) {
    // convert the seconds from the API into miliseconds for the JS date
    const date = new Date(passTime.risetime * 1000);
    console.log(
      `ISS Spotter passes over your location at ${date.toString()} for ${
        passTime.duration
      } seconds.`
    );
  }
};

module.exports = {
  fetchMyIP,
  fetchLocationByIp,
  fetchISSFlyOverTimes,
  fetchCallback,
};
