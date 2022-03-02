let date = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let displayDay = days[date.getDay()];
let displayDate = date.getDate();
let displayHour = date.getHours();
if (displayHour < 10) {
  displayHour = `0${displayHour}`;
}

let displayMinute = date.getMinutes();
if (displayMinute < 10) {
  displayMinute = `0${displayMinute}`;
}

let showDate = document.querySelector("#showDate");
showDate.innerHTML = `Last updated : ${displayDay} ${displayHour}:${displayMinute}`;
function showTemperature(response) {
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = response.data.name;
  let displayTemp = Math.round(response.data.main.temp);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity : ${response.data.main.humidity}%`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `Wind Speed : ${Math.round(
    response.data.wind.speed
  )}  km/h`;
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].main;
  let temperature = document.querySelector("#display-temp");
  temperature.innerHTML = `${displayTemp}`;
  celsiusTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `src/images/${response.data.weather[0].icon}.svg`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}
function getForecast(coordinates) {
  let apiKey = "1bc306ef820d7e96f756aa75ef67ef95";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];

  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(day.dt)}</div>
        <img
          src="src/images/${day.weather[0].icon}.svg"
          alt=""
          width="60"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            day.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            day.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  showCity(city);
}

function showCity(city) {
  let apiKey = "1bc306ef820d7e96f756aa75ef67ef95";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", handleSubmit);

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "1bc306ef820d7e96f756aa75ef67ef95";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function showCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
  let cityInput = document.querySelector("#city-input");
  cityInput.value = "";
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", showCurrentPosition);
showCity("Sydney");
