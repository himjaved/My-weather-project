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
showDate.innerHTML = `${displayDay} ${displayHour}:${displayMinute}`;
function showTemperature(response) {
  console.log(response.data.name);
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
  temperature.innerHTML = `${displayTemp} °C`;
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
}

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", showCurrentPosition);
showCity("Melbourne");
