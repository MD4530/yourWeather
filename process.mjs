import { weatherHtmlDom, eachHoverForecast, timeFormat, tempConveter, forecastTableCreate, currentDateAndTime } from './base-function.mjs';
import Weather  from './Weather.mjs';
let localStorageWeather = JSON.parse(localStorage.getItem('weatherForecast')) || [];

//checking the local storage data if nothing then add the current time.
function weatherMeasure(option) {
    let currentWeather = JSON.parse(localStorage.getItem('currentWeather')) || [];
    option === '℉' ? option = '℉' : option = '℃';
    let inOrDec = document.getElementById('inOrDec');
    if (currentWeather.length === 0) {
        inOrDec.textContent = `Current date: ${currentDateAndTime()}`;
    } else {
        inOrDec.innerHTML = `Last Temperature was: ${tempConveter(currentWeather.main.temp, option)} </br> On ${timeFormat(currentWeather.dt)}`;
    }
}

// checking the forecast weather 
function weatherForecastM() {
    document.getElementById('leftSide').className = 'hidden';
    document.getElementById('rightSide').className = 'hidden';
    let currentWeather = JSON.parse(localStorage.getItem('currentWeather')) || [];
    weatherHtmlDom(currentWeather);
    let localStorageWeather = JSON.parse(localStorage.getItem('weatherForecast')) || [];
    forecastTableCreate(localStorageWeather.hourly);
    forcastCalculation();
}

// mouseover method start
function forcastCalculation() {
    let sort = document.getElementById('sort');
    let queryImg = document.querySelectorAll('img');
    sort.addEventListener('change', sortTemp);
    queryImg.forEach(item => {
        item.addEventListener('mouseover', eachEventOccur);
    })
}

// when user hover the mouse on picture then it will take id and data 
// send to the weather calss.  
function eachEventOccur(event) {
    let eachForeast = document.getElementById('eachForeast');
    if (eachForeast !== null) {
        eachForeast.remove();
    }
    let id = event.target.id;
    let forecast = new Weather(id, localStorageWeather);
    eachHoverForecast(forecast.eachClickInformation());
}

// sort the temp using the Weather class
function sortTemp(e) {
    let table = document.getElementById('table');
    if (sort.value === 'max') {
        table.removeChild(table.lastElementChild);
    } else {
        table.removeChild(table.lastElementChild);
    }
    let forecastSort = new Weather(sort.value, localStorageWeather);
    forecastTableCreate(forecastSort.sortTheTemp());
    forcastCalculation();
}

export {
    weatherMeasure,
    weatherForecastM,
    forcastCalculation,
}