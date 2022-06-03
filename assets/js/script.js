//Key: 595716eb9ad5fdcbf4ae8889267dc2d6
//Relevant to: geoCode, getWeather
const apikey = "595716eb9ad5fdcbf4ae8889267dc2d6";
var city = "Seattle";
var state = "Washington;";
var country = "US";
var units = "";
var tempunit = "";
var windunit = "";
var lat = "33.44";
var lon = "-94.04";
//Relevant to: searchbtn event listener
const citysearch = document.querySelector("#searchbox");
const searchbtn = document.querySelector("#searchbtn");
//Relevant to: Print
var dateformat = "en-UK";
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
var date = new Date();
const currentcity = document.querySelector("#currentcity");
const currentdate = document.querySelector("#currentdate");
const currenticon = document.getElementById("currenticon");
const currenttemp = document.querySelector("#currenttemp");
const currentwind = document.querySelector("#currentwind");
const currenthumidity = document.querySelector("#currenthumidity");
const currentuvindex = document.querySelector("#currentuvindex");
const futureweather = document.querySelector("#futureweather");
//Relevant to: addSavedCities
const savedsearches = document.querySelector("#savedsearches");
var citystring = localStorage.getItem("citykey", "packcity");
var savedcities = JSON.parse(citystring);
if (savedcities == null) {
  savedcities = [];
} else {
  printSavedCities();
}

//Call functions for testing
// getWeather();
// geoCode();
// stateNameToAbbreviation(state);
// hidePlaceholders();
// localStorage.clear();

//Listen for user search
searchbtn.addEventListener("click", function () {
  city = citysearch.value;
  geoCode();
});

//Call geocoding api for accurate search
function geoCode(data) {
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&limit=1&appid=" +
      apikey
  )
    .then((response) => response.json())
    .then((data) => {
      parseData(data);
      stupidUnits(data);
    })
    .catch((err) => console.error(err));
}

//store relevant data in variables
function parseData(data) {
  country = data[0].country;
  city = data[0].name;
  lat = data[0].lat;
  lon = data[0].lon;
  citysearch.value = city + ", " + country;
  //correct date format
  if (country === "US") {
    dateformat = "en-US";
    var statename = data[0].state;
    stateNameToAbbreviation(statename);
    citysearch.value = data[0].name + " " + state + ", " + data[0].country;
  }
  saveCity();
}

//Changes units to imperial or metric based on country searched
function stupidUnits(data) {
  let array = ["US", "BS", "KY", "LR", "PW", "FM", "MH"];
  if (array.includes(country)) {
    units = "imperial";
    tempunit = "°F";
    windunit = "mi/h";
    console.log("Imperial units are stupid");
  } else {
    console.log("Metric is the superior measurement system.");
    units = "metric";
    tempunit = "°C";
    windunit = "m/h";
  }
  getWeather();
}

//get weather data from
function getWeather(data) {
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
      Print(data);
    })
    .catch((err) => console.error(err));
}

//Populate weather data onto page
function Print(data) {
  hidePlaceholders();
  currentcity.innerHTML = city;
  currentdate.innerHTML = date.toLocaleDateString(dateformat, options);
  let imgcode = data.current.weather[0].icon;
  let imgalt = data.current.weather[0].description;
  currenticon.src = "https://openweathermap.org/img/wn/" + imgcode + "@2x.png";
  currenticon.title = imgalt;
  currenttemp.innerHTML = data.current.temp + tempunit;
  currentwind.innerHTML = data.current.wind_speed + windunit;
  currenthumidity.innerHTML = data.current.humidity + "%";

  //Color code UV index
  if (11 <= data.current.uvi) {
    currentuvindex.style.background = "#7b439c";
  } else if (8 <= data.current.uvi) {
    currentuvindex.style.background = "#ee154a";
  } else if (6 <= data.current.uvi) {
    currentuvindex.style.background = "#f66b34";
  } else if (3 <= data.current.uvi) {
    currentuvindex.style.background = "#fcbd22";
  } else if (0 <= data.current.uvi) {
    currentuvindex.style.background = "#67be4d";
  }
  currentuvindex.innerHTML = data.current.uvi;

  //Print daily forecast
  futureweather.innerHTML = ""; //clear display
  let forecast = data.daily;
  for (let i = 0; i < 5; i++) {
    const daily = forecast[i];

    //create and append display card
    let day = document.createElement("figure");
    day.classList.add("futureweathercard");
    futureweather.appendChild(day);

    //create and append weather icon
    let fimgcode = daily.weather[0].icon;
    let fimagealt = daily.weather[0].description;
    let ficon = document.createElement("img");
    ficon.classList.add("icon");
    ficon.src = "https://openweathermap.org/img/wn/" + fimgcode + "@2x.png";
    ficon.title = fimagealt;
    day.appendChild(ficon);

    //create and append appropriate date
    let fdate = document.createElement("p");
    var newdate = new Date();
    //Add [i] days to current date
    Date.prototype.addDays = function (days) {
      let day = new Date(this.valueOf());
      day.setDate(day.getDate() + days);
      return day;
    };
    fdate.innerHTML =
      "Date: " + newdate.addDays(i).toLocaleDateString(dateformat, options);
    day.appendChild(fdate);

    //create and append temperature, wind speed, and humidity
    let ftemp = document.createElement("p");
    ftemp.innerHTML = "Temp: " + daily.temp.day + tempunit;
    day.appendChild(ftemp);
    let fwind = document.createElement("p");
    fwind.innerHTML = "Wind: " + daily.wind_speed + windunit;
    day.appendChild(fwind);
    let fhumidity = document.createElement("p");
    fhumidity.innerHTML = "Humidity: " + daily.humidity + "%";
    day.appendChild(fhumidity);
  }
  printSavedCities();
}

//Hide placeholders
function hidePlaceholders() {
  let placeholders = document.querySelectorAll(".placeholder");
  for (let i = 0; i < placeholders.length; i++) {
    const placeholder = placeholders[i];
    placeholder.classList.add("hidden");
  }
}

//Add city to localstorage
function saveCity() {
  if (!savedcities.includes(city)) {
    savedcities.unshift(city);
    let packcity = JSON.stringify(savedcities);
    localStorage.setItem("citykey", packcity);
  }
}

//Display previous searches on page
function printSavedCities() {
  savedsearches.innerHTML = ""; //clear display
  console.log(savedcities);
  if (savedcities.length == 8) {
    savedcities.pop();
    console.log("popped");
    console.log(savedcities);
  }
  for (let i = 0; i < savedcities.length; i++) {
    const cityname = savedcities[i];
    let citycard = document.createElement("h3");
    citycard.classList.add("savedcity");
    citycard.innerHTML = cityname;
    savedsearches.appendChild(citycard);
    citycard.addEventListener("click", function () {
      city = cityname;
      geoCode();
    });
  }
}

//Convert State Name to State Code
function stateNameToAbbreviation(statename) {
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
  }
}
