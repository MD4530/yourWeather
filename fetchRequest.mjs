import { weatherHtmlDom, mapCreate } from './base-function.mjs';

// using the gelocation getting the user position.
function noGeo(e) {
    return e.message;
}

function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function showPosition(position) {
    requestWeatherDataByPosition(position.coords.latitude, position.coords.longitude);
}

function fetchRequest() {
    getPosition()
        .then((showPosition))
        .catch(noGeo)
}

//fetch request to the openweathermpa.com website to get real time data.
function requestWeatherDataByPosition(lat, lon) {
    //For more accurecy, i am geting this link to get zip code.
    let locationUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

    let weaterhUrl = `https://api.openweathermap.org/data/2.5/`;
    let mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=`;

    fetch(locationUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Invalid response'); //longitude latitude
            }
            return response.json();
        })
        .then((data) => {
            //map create link
            mapCreate(`${mapUrl}${data.longitude - 0.003}%2C${data.latitude - 0.001}%2C${data.longitude + 0.003}%2C${data.latitude + 0.001}&layer=mapnik&marker=${data.latitude}%2C${data.longitude}`);
            https://www.openstreetmap.org/export/embed.html?bbox=139.68870600000002%2C35.688487%2C139.694706%2C35.690487&layer=mapnik&marker=35.689487%2C139.691706               

            return fetch(weaterhUrl + `weather?zip=${data.postcode},${data.countryCode}&appid=2d9910d078c635b66b65c6b3d7edda53`);
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Invalid response');
            }
            return response.json();
        })
        .then((data) => {
            //store the data to the local storage and function
            weatherHtmlDom(data);
            setCurrentWeather(data);
            return fetch(`${weaterhUrl}onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&&appid=2d9910d078c635b66b65c6b3d7edda53`);
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Invalid response');
            }
            return response.json();
        })
        .then((data) => {
            setWeatherForecast(data)
        })
        .catch((e) => {
            alert(e.message);
        });
}

//set the forecast weather to the localstorage
function setWeatherForecast(object) {
    localStorage.setItem('weatherForecast', JSON.stringify(object));
}

//set the current weather to the localstorage
function setCurrentWeather(object) {
    localStorage.setItem('currentWeather', JSON.stringify(object));
}

export {
    fetchRequest
};