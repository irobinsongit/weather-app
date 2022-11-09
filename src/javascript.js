//Feature 1

let now = new Date();

let dayInner = document.querySelector("#day");
let timeInner = document.querySelector("#time");

let hoursAdd = now.getHours();
let minutesAdd = now.getMinutes();
let timeNow = `${hoursAdd}:${minutesAdd}`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let dayNow = days[now.getDay()];

dayInner.innerHTML = `${dayNow}`;
timeInner.innerHTML = `${timeNow}`;

//Week 5

function displayWeatherCondition(response) {
  document.querySelector("#cityChange").innerHTML = response.data.name;
  document.querySelector("#right-temp").innerHTML =
    Math.round(response.data.main.temp) + "°C";
  document.querySelector("#desc").innerHTML =
    "| " + response.data.weather[0].main;
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
  let apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiWeatherURL).then(displayWeatherCondition);
}

function searchCity(city) {
  let apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
  let apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiWeatherURL).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  searchCity(city);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#form-search");
searchForm.addEventListener("submit", handleSubmit);
