let now = new Date();

let dayInner = document.querySelector("#day");
let timeInner = document.querySelector("#time");

let hoursAdd = now.getHours();
let minutesAdd = now.getMinutes();
let timeNow = `${hoursAdd}:${minutesAdd}`;

let days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

let dayNow = days[now.getDay()];

dayInner.innerHTML = `| ${dayNow}`;
timeInner.innerHTML = `${timeNow}`;

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#right-temp-text");
  let cityElement = document.querySelector("#cityChange");
  let descriptionElement = document.querySelector("#desc");
  let iconElement = document.querySelector("#icon");
  let windElement = document.querySelector("#wind");

  celTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celTemperature);
  cityElement.innerHTML = response.data.name;
  windElement.innerHTML = `| wind ${Math.round(response.data.wind.speed)} km/h`;
  descriptionElement.innerHTML = `| ${response.data.weather[0].description}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search");
  search(cityInputElement.value);
}

function displayFarTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#right-temp-text");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let farTemperature = (celTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farTemperature);
}

function displayCelTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#right-temp-text");
  temperatureElement.innerHTML = Math.round(celTemperature);
}

let celTemperature = null;

let form = document.querySelector("#form-search");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#far-link");
fahrenheitLink.addEventListener("click", displayFarTemperature);

let celsiusLink = document.querySelector("#cel-link");
celsiusLink.addEventListener("click", displayCelTemperature);

search("Leeds");
