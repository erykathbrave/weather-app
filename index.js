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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  // let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  let forecastHTML = ` <div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `        
              <div class="col-2">
                <div class="weather-forecast-day">${formatDay(
                  forecastDay.dt
                )}</div>
              <div class="weather-forecast-img"><img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
                /></div>
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperatures-max"> ${Math.round(
                    forecastDay.temp.max
                  )}° </span>/
                  <span class="weather-forecast-temperature-min"> ${Math.round(
                    forecastDay.temp.min
                  )} </span>
                </div>
              </div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2a2eaa51d996796495bf456e5b58adf4";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function showTemperature(response) {
  //display current city name
  document.querySelector("#current-city-display").innerHTML =
    response.data.main;
  //display current city temp
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(celsiusTemperature);
  document.querySelector("#temperature").innerHTML = `${temperature}`;
  //Precip, humidity, wind
  console.log(response.data);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let currentCityName = response.data.name;
  let currentCityDis = document.querySelector("#current-city-display");
  currentCityDis.innerHTML = `${currentCityName}`;

  getForecast(response.data.coord);
}

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

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}
function getNewOrleansLink(event) {
  event.preventDefault();
  search("new orleans");
}

function changeTheme() {
  let theme = document.querySelector("html");

  if (theme.classList.contains("dark")) {
    theme.classList.remove("dark");
  } else {
    theme.classList.add("dark");
  }
}
function myFunction(x) {
  let togglebutton = document.querySelector("#toggle-icon");
  togglebutton.classList.toggle("fa-moon");
  togglebutton.classList.toggle("fa-sun");
}

let themeButton = document.querySelector(".theme-button");
themeButton.addEventListener("click", changeTheme);

let newOrleansLink = document.querySelector("#new-orleans");
newOrleansLink.addEventListener("click", getNewOrleansLink);

let currentButton = document.querySelector("#current-city-temp-button");
currentButton.addEventListener("click", showCurrent);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Austin");
