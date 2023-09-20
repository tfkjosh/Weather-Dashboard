let city = "";
let searchCity = $('#search-city');
let searchButton = $('#search-button');
let clearButton = $('#clear-history');
let currentCity = $('#current-city');
let currentTemperature = $('#temperature');
let currentHumidity = $('#humidity');
let currentSpeed = $('#wind-speed');
let currentUvindex = $('#uv-index');
let sCity = [];
//declare variables
let apiKeyey = 'b2260977d0782a75bd6c4c08c5634cbd';

function find(city) {
    for (var i = 0; i < sCity.length; i++) {
        if (city.toUpperCase()===sCity[i]) {
            return -1;
        }
    }
    return -1;
}
//create function displaying current weather 
function displayWeather(event) {
    event.preventDefault();
    if(searchCity.val().trim()!=='') {
        city = searchCity.val().trim();
        currentWeather(city); 
    }
}

function currentWeather(city) {
    const queryURL = 'https://api.openweathermap.org/data/2.5/weather?lat='+city+'&appid='+ apiKey;
    $.ajax( {
        URL:queryURL,
        method:'GET'
    }).then(function(response) {

        console.log(response);
        const weathericon = response.weather[0].icon;
        const iconurl = 'https://openweathermap.org/img/wn/' + weathericon + '@2x.png';
        const date = new Date(response.dt*1000).toLocaleDateString();
        $(currentCity).html(response.name + '('+date+')' + '<img src=' + iconurl + '>');

        const tempF = (response.main.Temperature - 273.15) * 1.80 + 32;
        $(currentTemperature).html((tempF).toFixed(2) + '&8457');
        $(currentHumidity).html(response.main.Humidity + '%');
        const ws = response.wind.speed;
        const windsmph = (ws * 2.237).toFixed(1);
        $(current)
    }) 
}

function getLocation(cityName) {
    fetch('https://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&appid='+ apiKey)

    .then(function (response) {
      console.log(response);
      return response.json();
})
    .then(function(data) {
        console.log(data)
        var currentLat = data[0].lat;
        var currentLon = data[0].lon;
        getWeather(currentLat,currentLon)
    }) 
  }
function getWeather(lat,lon) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+ apiKey)

    .then(function (response) {
      console.log(response);
      return response.json();
})
    .then(function(data) {
        console.log(data)

    })

  
  
    }
//time zone plugin, create function to display search history list
//create a for loop that goes through array and allows to preview history search
//create function that updates history in local storage also display history 
//create a function to get history from local storage

//store response data from fetch data in variables
//create function displaying forecast
//create element for card using varibales using document.createElement then .append / .setAttr
//add content to elements
//create function displaying 5 day forecast (for loop)
//fetch weather data
//handle formSubmit add searchHistoryClick