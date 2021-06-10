const request = require('request');
const forecast = (lat, log, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=ff742b7eec57bffeab8d3148488de807&units=metric`;
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback(error, undefined);
        }
        else if (body.message) {
            console.log('Weather information not avalaible');
        }
        else{
            callback(undefined,body);
        }
    })
}
module.exports =forecast;