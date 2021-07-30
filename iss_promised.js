const request = require('request-promise-native');


const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const IPAddress = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${IPAddress}`);
};

const fetchISSFlyOverTimes = function(body) {
  const {latitude, longitude} = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`)

};

nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      const passTimes = JSON.parse(body).response;

      for (const flyTime of passTimes) {
        const gmtTime = new Date(0);
        gmtTime.setUTCSeconds(flyTime.risetime);
        const seconds = flyTime.duration;
        console.log(`Next pass at ${gmtTime} for ${seconds} seconds!`)
      }
    })

};








module.exports = { nextISSTimesForMyLocation };