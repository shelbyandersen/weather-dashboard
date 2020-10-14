$(document).ready(function () {
  function weatherInput() {
    var cityInput = $("#city-input");
    var searchEl = $("#button-addon2");
    var clearEl = $("#clear-search");
    var nameEl = $("#city-name");
    var currentPicEl = $("#current-pic");
    var currentTempEl = $("#temperature");
    var currentHumidityEl = $("#humidity");
    var currentWindEl = $("#wind-speed");
    var currentUVEl = $("#uv-index");
    var historyEl = $("#weather-history");
    //let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);

    var APIKey = "905bcc2048ad4a564317e10f1b767d59";
    //  When search button is clicked, read the city name typed by the user

    function getWeather(cityName) {
      //  Using saved city name, Request weather information from API
      let queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=" +
        APIKey;
      weatherInput();
    }
  }
});
