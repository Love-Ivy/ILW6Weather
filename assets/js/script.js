//fetch from weather API
//Key: 08f2ec377a9f9d2d4c2727249a9b714a
const apikey = "08f2ec377a9f9d2d4c2727249a9b714a";
var city = "Seattle";
var state = "Washington;";
var country = "US";
var units = "metric";
var lat = "";
var lon = "";

//Call geocoding api for accurate search
function geoCode(data) {
  console.log("geoCode");
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=1&appid=" +
      apikey
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Geocode" + data);
      parseData(data);
      stupidUnits(data);
    })
    .catch((err) => console.error(err));
}

function getWeather(data) {
  console.log("getWeather");
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
  console.log("getForecast");
  console.log("-------------");
  geoCode();
  fetch(
    "http://api.openweathermap.org/data/2.5/forecast/daily/?q=" +
      city +
      "&cnt=5&appid=" +
      apikey
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("getForecast");
      console.log(data);
    })
    .catch((err) => console.error(err));
  console.log("--------------");
}

//Listen for user search
const citysearch = document.querySelector("#searchbox");
const searchbtn = document.querySelector("#searchbtn");
searchbtn.addEventListener("click", function () {
  city = citysearch.value;
  getWeather();
  //   getForecast();
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

function parseData(data) {
  console.log("parseData");
  country = data[0].country;
  lat = data[0].lat;
  lon = data[0].lon;
  if (country === "US") {
    var statename = data[0].state;
    stateNameToAbbreviation(statename);
    console.log("checkUS sees " + state);
    citysearch.value = data[0].name + " " + state + ", " + data[0].country;
  }
}

function stupidUnits(data) {
  console.log("stupidUnits");
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
    console.log("Units are stupid");
  }
  city = data[0].name;
}

//Autorun for testing
// getWeather();
getForecast();
// geoCode();
// stateNameToAbbreviation(state);

//Convert State Name to State Code
function stateNameToAbbreviation(statename) {
  console.log("stateNameToAbbreviation");
  let states = {
    "arizona": "AZ",
    "alabama": "AL",
    "alaska": "AK",
    "arkansas": "AR",
    "california": "CA",
    "colorado": "CO",
    "connecticut": "CT",
    "district of columbia": "DC",
    "delaware": "DE",
    "florida": "FL",
    "georgia": "GA",
    "hawaii": "HI",
    "idaho": "ID",
    "illinois": "IL",
    "indiana": "IN",
    "iowa": "IA",
    "kansas": "KS",
    "kentucky": "KY",
    "louisiana": "LA",
    "maine": "ME",
    "maryland": "MD",
    "massachusetts": "MA",
    "michigan": "MI",
    "minnesota": "MN",
    "mississippi": "MS",
    "missouri": "MO",
    "montana": "MT",
    "nebraska": "NE",
    "nevada": "NV",
    "new hampshire": "NH",
    "new jersey": "NJ",
    "new mexico": "NM",
    "new york": "NY",
    "north carolina": "NC",
    "north dakota": "ND",
    "ohio": "OH",
    "oklahoma": "OK",
    "oregon": "OR",
    "pennsylvania": "PA",
    "rhode island": "RI",
    "south carolina": "SC",
    "south dakota": "SD",
    "tennessee": "TN",
    "texas": "TX",
    "utah": "UT",
    "vermont": "VT",
    "virginia": "VA",
    "washington": "WA",
    "west virginia": "WV",
    "wisconsin": "WI",
    "wyoming": "WY",
    "american samoa": "AS",
    "guam": "GU",
    "northern mariana islands": "MP",
    "puerto rico": "PR",
    "us virgin islands": "VI",
    "us minor outlying islands": "UM",
  };
  let a = statename.trim().replace(";", "").toLowerCase();
  if (states[a] !== null) {
    state = states[a];
    console.log("state changed to " + state);
  }
}
