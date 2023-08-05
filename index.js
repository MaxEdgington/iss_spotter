// It will require and run our main fetch function.

const { fetchISSFlyOverTimes, fetchMyIP, fetchCoordsByIp } = require("./iss");

/*
fetchCoordsByIp("108.170.159.184", (error, data) => {
  console.log(error);
  console.log(data);
});
*/

// init the coords argument for below
const fetchCoords = { latitude: 43.1593745, longitude: -79.2468626 };

// init the callback for the fetch function
const fetchCallback = (error, passTimes) => {
  if (error) {
    console.error(error);
  } else if (passTimes) {
    for (const passTime of passTimes) {
      console.log(passTime);
    }
  }
};

// fetchISSFlyOverTimes(fetchCoords, fetchCallback);

const nextISSTimesForMyLocation = function () {
  fetchMyIP((ipErr, ip) => {
    if (ipErr) {
      console.error("Server could not retrieve IP address");
    } else {
      fetchCoordsByIp(ip, (coordsErr, latLong) => {
        if (coordsErr) {
          console.error("Server could not retrieve coordinates by IP");
        } else if (latLong) {
          fetchISSFlyOverTimes(latLong, fetchCallback);
        }
      });
    }
  });
};

const printPassTimes = function (passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation();
