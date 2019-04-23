const time = [{
    start: '08:00',
    end: '08:30'
  },{
    start: '10:00',
    end: '10:30'
}];
const location = [{
    lat: 30.639712,
    lng: 104.069027
  },{
    lat:30.641441,
    lng:104.065515
}];
const config = {
    date: ['2019-04-23','2019-04-24','2019-04-26','2019-05-01','2019-05-03','2019-05-08','2019-05-10','2019-05-15','2019-05-17','2019-05-22','2019-05-24','2019-05-29','2019-05-31','2019-06-05','2019-06-07','2019-06-12','2019-06-14'],
    "2019-04-23":{
        time: {
            start: '08:00',
            end: '23:00'
        },
        location: {
            lat: 30.5893255554,
            lng: 104.0754818916
        }
    },
    "2019-04-24":{
      time: time[0],
      location: location[0]
    },
    "2019-04-26":{
        time: time[1],
        location: location[1]
    },
    "2019-05-01":{
        time: time[0],
        location: location[0]
    },
    "2019-05-03":{
        time: time[1],
        location: location[1]
    },
    "2019-05-08":{
        time: time[0],
        location: location[0]
    },
    "2019-05-10":{
        time: time[1],
        location: location[1]
    },
    "2019-05-15":{
        time: time[0],
        location: location[0]
    },
    "2019-05-17":{
        time: time[1],
        location: location[1]
    },
    "2019-05-22":{
        time: time[0],
        location: location[0]
    },
    "2019-05-24":{
        time: time[1],
        location: location[1]
    },
    "2019-05-29":{
        time: time[0],
        location: location[0]
    },
    "2019-05-31":{
        time: time[1],
        location: location[1]
    },
    "2019-06-05":{
        time: time[0],
        location: location[0]
    },
    "2019-06-07":{
        time: time[1],
        location: location[1]
    },
    "2019-06-12":{
        time: time[0],
        location: location[0]
    },
    "2019-06-14":{
        time: time[1],
        location: location[1]
    }
  }
module.exports = config