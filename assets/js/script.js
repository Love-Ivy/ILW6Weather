//fetch from weather API
//Key: 08f2ec377a9f9d2d4c2727249a9b714a
const apikey = "08f2ec377a9f9d2d4c2727249a9b714a";
var city = "Seattle";
var cityname = "Seattle";
var units = "metric";

function getWeather(data) {
  geoCode();
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apikey
  )
    .then((response) => response.json())
    .then((data) => Print(data))
    .catch((err) => console.error(err));
}

//fetch forecast
function getForecast() {
  console.log("Forecast");
  console.log("-------------");
  fetch(
    "api.openweathermap.org/data/2.5/forecast/daily?q=" +
      city +
      "&appid=" +
      apikey
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
  console.log("--------------");
}

//Listen for user search
const citysearch = document.querySelector("#searchbox");
const searchbtn = document.querySelector("#searchbtn");
searchbtn.addEventListener("click", function () {
  city = citysearch.value;
  getWeather();
  getForecast();
});

//Populate current weather
const d = new Date();
const date = d.toDateString();
function Print(data) {
  console.log(data);
  console.log("--------------");
  console.log(data.name);
  console.log("--------------");
  console.log(date);
  console.log("--------------");
  console.log(data.main.temp);
  console.log("--------------");
  console.log(data.weather[0].icon);
  console.log("--------------");
}

//Call geocoding api for accurate search
function geoCode(data) {
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=1&appid=" +
      apikey
  )
    .then((response) => response.json())
    .then((data) => stupidUnits(data))
    .catch((err) => console.error(err));
}

function stupidUnits(data) {
  if (
    data[0].country === "US" ||
    "BS" ||
    "KY" ||
    "LR" ||
    "PW" ||
    "FM" ||
    "MH"
  ) {
    units = "imperial";
  }
  city = data[0].name;
  citysearch.value =
    data[0].name + " " + data[0].state + ", " + data[0].country;
  console.log(data);
}

//Autorun for testing
// getWeather();
// getForecast();
geoCode();
//Why isn't this working?

// const apikey = "08f2ec377a9f9d2d4c2727249a9b714a";
// var city = "Seattle";
// const url =
//   "http://api.openweathermap.org/data/2.5/weather?q=" +
//   city +
//   "&appid=" +
//   apikey;

// //Listen for user search
// const citysearch = document.querySelector("#searchbox");
// const searchbtn = document.querySelector("#searchbtn");
// function getWeather(city) {
//   console.log(city);
//   console.log("--------------");
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => console.log(data));
//   console.log("--------------");
// }

// searchbtn.addEventListener("click", function () {
//   city = citysearch.value;
//   getWeather(city);
// });
