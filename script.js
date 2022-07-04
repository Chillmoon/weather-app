function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTempAndCity);
}
function searchInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".form");
  searchCity(cityInput.value);
}
function myLocation(event) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showTempAndCity(response) {
  let city = document.querySelector(".city");
  let weather = document.querySelector(".weather");
  let humidity = document.querySelector(".humidity");
  let wind = document.querySelector(".wind");
  let icon = document.querySelector(".icon");
  city.innerHTML = response.data.name;
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  weather.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  icon.innerHTML = icon.setAttribute(
    "src",
    `icons/${response.data.weather[0].icon}.png`
  );
  icon.setAttribute("alt", response.data.weather[0].main);
  console.log(response.data);
}
function searchCity(city) {
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTempAndCity);
}

function toFahrenheit() {
  temperature.innerHTML = 77;
  fahrenheit.style.color = "#ffda44";
  celsius.style.color = "#fff";
}

function toCelsius() {
  temperature.innerHTML = 25;
  fahrenheit.style.color = "#fff";
  celsius.style.color = "#ffda44";
}

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
let currentDate = document.querySelector(".local-time");
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentDate.innerHTML = `${days[date.getDay()]} ${hours}:${minutes}`;

let apiKey = "3f9633a1cb53043419b3d4f859581765";

let temperature = document.querySelector(".local-temp strong");

let buttonLocation = document.querySelector(".button-location");
buttonLocation.addEventListener("click", myLocation);

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", toFahrenheit);

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", toCelsius);

let searchEngine = document.querySelector(".search-form");
searchEngine.addEventListener("submit", searchInput);
searchCity("Kyiv");
