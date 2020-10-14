$(document).ready(function () {
  // Variables
  var cityInput = $("#city-input");
  var searchBtn = $("#button-addon2");
  var clearBtn = $("#clear-search");
  var weatherHistory = $("#weather-history");
  var APIKey = "905bcc2048ad4a564317e10f1b767d59";
  let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
});
