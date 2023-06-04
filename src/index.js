function getDate(date) {
  let hours = date.getHours().toString();
  let min = date.getMinutes().toString();
  let dayIndex = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let monthIndex = date.getMonth();
  let month = months[monthIndex];
  let day = days[dayIndex];
  let year = date.getFullYear();
  let currentDay = date.getDate().toString();
  let clockFormat = `${day.padStart(2, "0")} ${hours.padStart(
    2,
    "0"
  )} : ${min.padStart(2, "0")}`;
  let dateFormat = `${month} ${currentDay.padStart(2, "0")}, ${year}`;
  let format = `<p id="today"> ${clockFormat} <br>  ${dateFormat} </p>`;
  return format;
}
let currentDate = document.querySelector("#today");
let now = new Date();
currentDate.innerHTML = getDate(now);

function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  // console.log(forecast);
  let forecastSec = document.querySelectorAll("#forecast-sec h3");

  forecastSec.forEach((heading, i) => {
    if (i < 6) {
      heading.innerText = `${formatDay(forecast[i + 1].dt)}`;
      document.querySelectorAll("#forecast-sec i")[i].innerHTML = `<img
          src="http://openweathermap.org/img/wn/${
            forecast[i + 1].weather[0].icon
          }@2x.png"
          alt=""
          width="46"
        />`;
      document.querySelectorAll("#forecast-sec .temp-li")[
        i
      ].innerHTML = `${Math.round(
        forecast[i + 1].temp.max
      )}° <span>${Math.round(forecast[i + 1].temp.min)}°</span>`;
    }
  });
}

function getForecast(pos) {
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${pos.lat}&lon=${pos.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  // console.log(apiUrl);
}

function getWeather(response) {
  celsiusTemp = response.data.main.temp;
  let currentTemp = Math.round(celsiusTemp);
  let currentCity = response.data.name;
  let desc = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let currentPressure = response.data.main.pressure;
  // console.log(currentCity);
  let currentWind = response.data.wind.speed;
  let mainIcon = response.data.weather[0].icon;
  let coordinates = response.data.coord;
  // console.log(response.data);
  document.getElementById("temp").innerHTML = currentTemp;
  document.getElementById("cityName").innerHTML = currentCity;
  document.getElementById("weather-description").innerHTML = desc;
  document.getElementById("humid").innerHTML = humidity;
  document.getElementById("pressure").innerHTML = currentPressure;
  document.getElementById("wind").innerHTML = Math.round(currentWind * 3.6);
  document
    .getElementById("main-img")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${mainIcon}@2x.png`
    );
  document.getElementById("main-img").setAttribute("alt", desc);
  getForecast(coordinates);
}
function currentLocations(position) {
  let currentLat = position.coords.latitude;
  let currentLon = position.coords.longitude;
  // console.log(currentLat);
  // console.log(currentLon);
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}

function getCurrent(e) {
  e.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocations);
}

let currentBtn = document.querySelector("#current-tmp");
currentBtn.addEventListener("click", getCurrent);

function searchCity(city1) {
  // console.log(city1);
  // document.getElementById("cityName").innerText = city;
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city1}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}

let search = document.querySelector("#searchForm");
search.addEventListener("submit", function (event) {
  let city = document.querySelector("input[type = search]").value.toLowerCase();
  searchCity(city);
  event.preventDefault();
});

let celsiusTemp = null;

function getFahTemp(e) {
  e.preventDefault();
  document.getElementById("temp").innerText = Math.round(
    (celsiusTemp * 9) / 5 + 32
  );
  celsiusTemper.classList.remove("active");
  fahrenheitTemp.classList.add("active");
}

let fahrenheitTemp = document.getElementById("fahrenheit-link");
fahrenheitTemp.addEventListener("click", getFahTemp);

function getCelsiusTemp(e) {
  e.preventDefault();
  document.getElementById("temp").innerText = Math.round(celsiusTemp);
  celsiusTemper.classList.add("active");
  fahrenheitTemp.classList.remove("active");
}

let celsiusTemper = document.getElementById("celsius-link");
celsiusTemper.addEventListener("click", getCelsiusTemp);

searchCity("Addis Ababa");
