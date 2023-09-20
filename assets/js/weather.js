var cities = [];
var cityFormEl = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#current-weather-container");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
//declare variables
//handle formSubmit 
var formSumbitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if(city) {
        getCityWeather(city);
        getfiveDay(city);
        cities.unshift({city});
        cityInputEl.value = "";
    } ;
    
    saveSearch();
    pastSearch(city);
};
//create function to display search history list
var saveSearch = function() {
    localStorage.setItem("cities", JSON.stringify(cities));
};
//fetch current weather data
//store response data from fetch data in variables
var getCityWeather = function(city) {
    var apiKey = "b2260977d0782a75bd6c4c08c5634cbd";
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
            displayWeather(data, city);
        });
    });
};
//element varibales using document.createElement then .append
var displayWeather = function(weather, searchCity) {
   weatherContainerEl.textContent= "";  
   citySearchInputEl.textContent=searchCity;

   // create elements from html
   var currentDate = document.createElement("span")
   currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
   citySearchInputEl.appendChild(currentDate);

   var temperatureEl = document.createElement("span");
   temperatureEl.textContent = "Temperature:" + weather.main.temp + " °F";
   temperatureEl.classList = "list-group-item";

   var humidityEl = document.createElement("span");
   humidityEl.textContent = "Humidity:" + weather.main.humidity + " %";
   humidityEl.classList = "list-group-item";

   var windSpeedEl = document.createElement("span");
   windSpeedEl.textContent = "Wind Speed:" + weather.wind.speed + " MPH";
   windSpeedEl.classList = "list-group-item";

   weatherContainerEl.appendChild(temperatureEl);
   weatherContainerEl.appendChild(humidityEl);
   weatherContainerEl.appendChild(windSpeedEl);

   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   getUvIndex(lat,lon)
};
//fetch uv weather data
//store response data from fetch to variables
var getUvIndex = function(lat,lon) {
    var apiKey = "b2260977d0782a75bd6c4c08c5634cbd";
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`;
    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
            displayUvIndex(data)
        });
    });

};
 //create elements using variables
 //add content to elements 
 //element varibales using document.createElement then .append
var displayUvIndex = function(index) {
    var uvIndexEl = document.createElement("div");
    uvIndexEl.textContent = "UV Index:";
    uvIndexEl.classList = "list-group-item";

    uvIndexValue = document.createElement("span");
    uvIndexValue.textContent = index.value;

    if(index.value <= 2) {
        uvIndexValue.classList = "favorable";
    }
    else if(index.value > 2 && index.value<=8) {
        uvIndexValue.classList = "moderate ";
    }
    else if(index.value >8) {
        uvIndexValue.classList = "severe";
    };

    uvIndexEl.appendChild(uvIndexValue);
    weatherContainerEl.appendChild(uvIndexEl);
};
//create function displaying 5 day forecast 
var getfiveDay = function(city) {
    var apiKey = "b2260977d0782a75bd6c4c08c5634cbd";
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(apiURL)
    .then(function(response) {
        response.json().then(function(data) {
           displayfiveDay(data);
        });
    });
};
//fetch current 5 day weather data
//store response data from fetch data in variables
//element varibales using document.createElement then .append
var displayfiveDay = function(weather) {
    forecastContainerEl.textContent = "";
    forecastTitle.textContent = "5-Day Forecast:";

    var forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8) {
        var dailyForecast = forecast[i];
        
       
       var forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-2";


       var forecastDate = document.createElement("h5");
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);
       
       
       //create temperature span
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";

        //append to forecast card
        forecastEl.appendChild(forecastTempEl);

       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

       //append to forecast card
       forecastEl.appendChild(forecastHumEl);

      
       //append to five day container
        forecastContainerEl.appendChild(forecastEl);
    };

};

var pastSearch = function(pastSearch) {
 
    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city",pastSearch);
    pastSearchEl.setAttribute("type", "submit");

    pastSearchButtonEl.prepend(pastSearchEl);
};

//create a loop that goes through array and allows to preview history search
var pastSearchHandler = function(event) {
    var city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        getfiveDay(city);
    };
};

//handle formSubmit add searchHistoryClick
cityFormEl.addEventListener("submit", formSumbitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);