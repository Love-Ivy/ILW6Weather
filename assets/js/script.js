//fetch from weather API
//Key: 595716eb9ad5fdcbf4ae8889267dc2d6
//Relevant to: geoCode, getWeather
const apikey = "595716eb9ad5fdcbf4ae8889267dc2d6";
var city = "Seattle";
var state = "Washington;";
var country = "US";
var units = "";
var lat = "33.44";
var lon = "-94.04";
//Relevant to: Print
const d = new Date();
const date = d.toDateString();
//Relevant to: searchbtn event listener
const citysearch = document.querySelector("#searchbox");
const searchbtn = document.querySelector("#searchbtn");

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
  //   geoCode();
  console.log("units returned: ", units);
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
searchbtn.addEventListener("click", function () {
  city = citysearch.value;
  geoCode();
});

//Populate current weather
function Print(data) {
  console.log("printing...");
  //city name not contained in data
  console.log(date);
  console.log(data.current.temp);
  console.log(data.current.weather.icon);
  console.log(data.current.wind_speed);
  console.log(data.current.humidity);
  console.log(data.current.uvi);
  console.log(data.daily);
}

function parseData(data) {
  console.log("parseData", data);
  country = data[0].country;
  city = data[0].name;
  lat = data[0].lat;
  lon = data[0].lon;
  citysearch.value = city + ", " + country;
  if (country === "US") {
    var statename = data[0].state;
    stateNameToAbbreviation(statename);
    console.log("state code: " + state);
    citysearch.value = data[0].name + " " + state + ", " + data[0].country;
  }
}

function stupidUnits(data) {
  console.log("stupidUnits", country);
  let array = ["US", "BS", "KY", "LR", "PW", "FM", "MH"];
  if (array.includes(country)) {
    units = "imperial";
    console.log("Units are stupid");
  } else {
    console.log("Your units are correct");
    units = "metric";
  }
  getWeather();
}

//Autorun for testing
// getWeather();
geoCode();
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
