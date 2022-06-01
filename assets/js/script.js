//fetch from weather API
//Key: 595716eb9ad5fdcbf4ae8889267dc2d6
const apikey = "595716eb9ad5fdcbf4ae8889267dc2d6";
var city = "Seattle";
var state = "Washington;";
var country = "US";
var units = "metric";
var lat = "33.44";
var lon = "-94.04";

//Call geocoding api for accurate search
function geoCode(data) {
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=1&appid=" +
      apikey
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("Geocode", data);
      parseData(data);
      stupidUnits(data);
    })
    .catch((err) => console.error(err));
}

function getWeather(data) {
  geoCode();
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&units=" +
      units +
      "&exclude=hourly,minutely" +
      "&appid=" +
      apikey
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("getWeather", data);
      Print(data);
    })
    .catch((err) => console.error(err));
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
  console.log("printing...");
  console.log(data.name);
  console.log(date);
  console.log(data.main.temp);
  console.log(data.weather[0].icon);
}

function parseData(data) {
  console.log("parseData", data);
  country = data[0].country;
  lat = data[0].lat;
  lon = data[0].lon;
  if (country === "US") {
    var statename = data[0].state;
    stateNameToAbbreviation(statename);
    console.log("state code: " + state);
    citysearch.value = data[0].name + " " + state + ", " + data[0].country;
  }
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
    console.log("Units are stupid");
  }
  city = data[0].name;
  console.log("Your units are correct");
}

//Autorun for testing
getWeather();
// getForecast();
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
