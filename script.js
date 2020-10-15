$(document).ready(function () {
  // Variables
  var searchCity = $("#city-input");
  var searchButton = $("#search-button");
  var clearButton = $("#clear-search");
  var currentCity = $("#city-name");
  var currentTemperature = $("#temperature");
  var currentHumidty = $("#humidity");
  var currentWSpeed = $("#wind-speed");
  var currentUvindex = $("#uv-index");
  var sCity = [];
  var city = "";
  // Search City
  function find(c) {
    for (var i = 0; i < sCity.length; i++) {
      if (c.toUpperCase() === sCity[i]) {
        return -1;
      }
    }
    return 1;
  }
  //Set up the API key
  var APIKey = "905bcc2048ad4a564317e10f1b767d59";
  // Display current weather for the city searched
  function displayWeather(event) {
    event.preventDefault();
    if (searchCity.val().trim() !== "") {
      city = searchCity.val().trim();
      currentWeather(city);
    }
  }
  // AJAX Call to get Weather Info
  function currentWeather(city) {
    // Here we build the URL so we can get a data from server side.
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&APPID=" +
      APIKey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // Weather Image
      var weathericon = response.weather[0].icon;
      var iconurl =
        "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
      // Date
      var date = new Date(response.dt * 1000).toLocaleDateString();
      // Image + Date - Concatenate
      $(currentCity).html(
        response.name + "(" + date + ")" + "<img src=" + iconurl + ">"
      );

      // Current Temperature - Convert to Farenheit
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      $(currentTemperature).html(tempF.toFixed(2) + "&#8457");

      // Humidity
      $(currentHumidty).html(response.main.humidity + "%");
      //Wind Speed in MPH
      var ws = response.wind.speed;
      var windsmph = (ws * 2.237).toFixed(1);
      $(currentWSpeed).html(windsmph + "MPH");
      // UV Index - Run an AJAX call within the original AJAX call
      UVIndex(response.coord.lon, response.coord.lat);
      forecast(response.id);
      if (response.cod == 200) {
        sCity = JSON.parse(localStorage.getItem("cityname"));
        console.log(sCity);
        if (sCity == null) {
          sCity = [];
          sCity.push(city.toUpperCase());
          localStorage.setItem("cityname", JSON.stringify(sCity));
          addToList(city);
        } else {
          if (find(city) > 0) {
            sCity.push(city.toUpperCase());
            localStorage.setItem("cityname", JSON.stringify(sCity));
            addToList(city);
          }
        }
      }
    });
  }
  // Return UV Index
  function UVIndex(ln, lt) {
    var uvqURL =
      "https://api.openweathermap.org/data/2.5/uvi?appid=" +
      APIKey +
      "&lat=" +
      lt +
      "&lon=" +
      ln;
    $.ajax({
      url: uvqURL,
      method: "GET",
    }).then(function (response) {
      $(currentUvindex).html(response.value);
    });
  }

  //Click Handlers
  $("#search-button").on("click", displayWeather);
});
