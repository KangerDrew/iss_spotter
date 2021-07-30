const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  for (const flyTime of passTimes) {
    let gmtTime = new Date(flyTime.risetime*1000).toGMTString();
    let seconds = flyTime.duration;
    console.log(`Next pass at ${gmtTime} for ${seconds} seconds!`)
  }

});