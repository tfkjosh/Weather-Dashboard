var apiKey = 'b2260977d0782a75bd6c4c08c5634cbd'
function getLocation(cityName) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&appid='+ apiKey)

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
    fetch('http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+lon+'&appid='+ apiKey)

    .then(function (response) {
      console.log(response);
      return response.json();
})
    .then(function(data) {
        console.log(data)
       
    })
    }
   
    getLocation('New York, US')
   
