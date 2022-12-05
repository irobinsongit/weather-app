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

dayInner.innerHTML = `| ${dayNow}`;
timeInner.innerHTML = `${timeNow}`;

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#right-temp-text");
  let cityElement = document.querySelector("#cityChange");
  let descriptionElement = document.querySelector("#desc");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#rightIcon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apUrl).then(displayWeatherCondition);
}

function search(city) {
  let apiKey = "a969311cfcbb4a83dfad2cf7478397f9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search").value;
  search(cityInputElement);
}

function showFarTemp(event) {
  event.preventDefault();
  let farTemp = (14 * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#right-temp-text");
  temperatureElement.innerHTML = farTemp;
}

function showCelTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#right-temp-text");
  temperatureElement.innerHTML = Math.round(celTemp);
}

let celciusTemperature = null;

let farenheitLink = document.querySelector("#far-link");
farenheitLink.addEventListener("click", showFarTemp);

let celciusLink = document.querySelector("#cel-link");
celciusLink.addEventListener("click", displayCelTemp);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#form-search");
searchForm.addEventListener("submit", handleSubmit);
