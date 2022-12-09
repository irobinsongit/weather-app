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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-1">
              <div class="weather-forecast-day">${formatDay(
                forecastDay.dt
              )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="33"
                />
                <div class="weather-forecast-temps">
                  <span class="weather-forecast-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
            </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#right-temp-text");
  let cityElement = document.querySelector("#cityChange");
  let descriptionElement = document.querySelector("#desc");
  let iconElement = document.querySelector("#icon");
  let windElement = document.querySelector("#wind");

  celTemperature = response.data.main.temp;

  temperatureElement.innerHTML = `${Math.round(celTemperature)}°C`;
  cityElement.innerHTML = response.data.name;
  windElement.innerHTML = `| wind ${Math.round(response.data.wind.speed)} km/h`;
  descriptionElement.innerHTML = `| ${response.data.weather[0].description}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
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

let form = document.querySelector("#form-search");
form.addEventListener("submit", handleSubmit);

search("LEEDS");
