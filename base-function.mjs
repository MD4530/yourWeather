import { weatherMeasure, forcastCalculation } from './process.mjs';

//checking the locastorage value.
let currentWeather = JSON.parse(localStorage.getItem('currentWeather')) || [];
let clickFunction = document.getElementById('conveterInput');

//using this function i am sending weather data for different purpose. 
function weatherHtmlDom(object) {
    let option = clickFunction.value;
    clickFunction.addEventListener('click', () => {
        convertTempByClick(object);
        let localStorageWeather = JSON.parse(localStorage.getItem('weatherForecast')) || [];
        let table = document.getElementById('table');
        table.removeChild(table.lastElementChild);
        forecastTableCreate(localStorageWeather.hourly);
        forcastCalculation();
    });

    let tem = tempConveter(object.main.temp, option);
    let feels_like = tempConveter(object.main.feels_like, option);
    let temp_max = tempConveter(object.main.temp_max, option);
    let temp_min = tempConveter(object.main.temp_min, option);
    let humidity = (object.main.humidity) + '%';
    let speed = (3.6 * (object.wind.speed)).toFixed(3) + 'KM/H';
    let visibility = ((object.visibility) / 1609).toFixed(3) + `M`;
    let weaterDesc = object.weather[0].description.toUpperCase();
    let icon = `http://openweathermap.org/img/wn/${object.weather[0].icon}`;
    currentWeatherInfoToDOM(tem, feels_like, weaterDesc, icon);
    rightSideHtmlDOM(temp_max, temp_min, humidity, speed, visibility);
    nameAndCity(object.name, object.sys.country);
    weatherMeasure(option);
    timeFormat(object.dt);
}

//attach the current weather to the index page
function currentWeatherInfoToDOM(tem, feels_like, weaterDesc, icon) {
    let temp = document.getElementById('temp');
    temp.innerHTML = `<h1 id= 'tem'>${tem}</h1>
                        <p class='weatherDese'>${weaterDesc}</p>
                         <img src='${icon}.png' alt='Weather icon'/>
                         <p class='feel'>${feels_like}</p>`;
}

//more information add to the current page
function rightSideHtmlDOM(temp_max, temp_min, humidity, speed, visibility) {
    let rightSide = document.getElementById('rightSide');
    rightSide.innerHTML = `<h2 > Today </h2> <hr>
                        <p>Max Temp: ${temp_max} </p> <hr>
                        <p>Min Temp: ${temp_min} </p> <hr>
                        <p>Wind: ${speed}</p> <hr> 
                        <p>Humidity: ${humidity}</p> <hr> 
                        <p>Visibility:${visibility} </p>`;
}

//city name and country name add to the heading 
function nameAndCity(cityName, countryName) {
    document.querySelectorAll('.location')
        .forEach(function (tag) {
            tag.textContent = `${cityName},${countryName}`;
        });
    document.querySelector('span.time').textContent = currentDateAndTime();
}

//current data and time function
function currentDateAndTime() {
    let date = new Date();
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

//temperature conveter
function tempConveter(tem, option) {
    let cel = 273.15;
    if (option === '℃') {
        return Math.round(tem - cel) + '℃';
    } else {
        return Math.round((tem - cel) * 9 / 5 + 32) + '℉';
    }
}

//user click function
function convertTempByClick(object) {
    (clickFunction.value === '℉') ? clickFunction.value = '℃' : clickFunction.value = '℉';
    let option = (clickFunction.value);
    let tem = tempConveter(object.main.temp, option);
    let feels_like = tempConveter(object.main.feels_like, option);
    let temp_max = tempConveter(object.main.temp_max, option);
    let temp_min = tempConveter(object.main.temp_min, option);
    let humidity = (object.main.humidity) + '%';
    let speed = (3.6 * (object.wind.speed)).toFixed(3) + 'KM/H';
    let visibility = ((object.visibility) / 1609).toFixed(3) + `M`;
    let weaterDesc = object.weather[0].description.toUpperCase();
    let icon = `http://openweathermap.org/img/wn/${object.weather[0].icon}`;
    currentWeatherInfoToDOM(tem, feels_like, weaterDesc, icon);
    rightSideHtmlDOM(temp_max, temp_min, humidity, speed, visibility);
    weatherMeasure(option);
}

//timestamp convert to the human readable format.
function timeFormat(dt) {
    let time = new Date(dt * 1000);
    return time.toLocaleString('en-US', { hour12: true });
}

//forecast page table crate.
function forecastTableCreate(object) {
    let table = document.querySelector("table");
    let iconUrl = `http://openweathermap.org/img/wn/`;
    let counter = 0;
    for (let i = 0; i < (object.length) / 6; i++) {
        let tr = table.insertRow();
        for (let j = 0; j < (object.length) / 8 - 1; j++) {
            let temp = (tempConveter(object[counter].temp, clickFunction.value));
            let feels_like = tempConveter(object[counter].feels_like, clickFunction.value);
            let cell = tr.insertCell();
            cell.innerHTML = `<div id='${counter}' class='table'>
                                <p id="timeF"> ${timeFormat(object[counter].dt)}</p>
                                <h2 id="tempF">${temp}</h2>
                                <img id="${counter}" src="${iconUrl + object[counter].weather[0].icon}.png" alt='icon'>
                                <p id="felF">${feels_like}</p>
                            </div>`;
            counter++;
        }
    }
}

// more information get by hours
function eachHoverForecast(object) {
    let eachForecast = document.createElement('div');
    eachForecast.id = 'eachForeast';
    eachForecast.innerHTML = `<h2 > Date: ${timeFormat(object[0].dt)} </h2> <hr>
                        <p>Desc: ${object[0].weather[0].description.toUpperCase()} </p> <hr>
                        <p>Wind: ${(3.6 * (object[0].wind_speed)).toFixed(3)} KM/H</p> <hr> 
                        <p>Humidity: ${object[0].humidity}%</p> <hr> 
                        <p>pressure :${object[0].pressure} hPa</p>`;
    document.getElementsByTagName('body')[0].appendChild(eachForecast);
}

//about page crate by get data from the fetch request.
function about() {
    weatherHtmlDom(currentWeather);
    let dataUrl = 'jsonData/data.json';
    fetch(dataUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Invalid response'); //longitude latitude
            }
            return response.json();
        })
        .then((address) => {
            address.map(data => {
                document.getElementById('about')
                    .innerHTML += `<div class="column">
                                <h3>${data.name}</h3>
                                <p> ${data.house}</p>
                                <p>${data.city}</p>
                                <p>${data.town}</p>
                                <p>${data.state}</p>
                                <p>${data.country}</p>
                            </div>`;
            })

        })
        .catch((e) => {
            console.log(e.message)
        });

}

//map crate.
function mapCreate(link) {
    let mapLocation = document.getElementById('mapLocation');
    mapLocation.innerHTML = `<iframe frameborder="0" id="map" src="${link}"></iframe>`;
}


export {
    weatherHtmlDom,
    timeFormat,
    tempConveter,
    currentDateAndTime,
    nameAndCity,
    forecastTableCreate,
    eachHoverForecast,
    about,
    mapCreate,
}




