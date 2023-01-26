//Get current date
let now = new Date();
let currentdate = document.querySelector("#current-date");

let hour = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

currentdate.innerHTML = `${day} ${hour}:${minutes}`;

function search(city) {
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
//Search city to get temp and weather conditions
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city-input").value;
  search(city);
}

function showTemperature(response) {
  //display current city name
  document.querySelector("#current-city-display").innerHTML =
    response.data.main;
  //display current city temp
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = `${temperature}°C`;
  //Precip, humidity, wind
  console.log(response.data);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let currentCityName = response.data.name;
  let currentCityDis = document.querySelector("#current-city-display");
  currentCityDis.innerHTML = `${currentCityName}`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-city-temp-button");
currentButton.addEventListener("click", showCurrent);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);
search("Austin");