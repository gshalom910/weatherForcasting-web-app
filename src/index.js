function getWeather(response) {
  let currenttemp = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let desc = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let currentPressure = response.data.main.pressure;
  // console.log(currentCity);
  let currentWind = response.data.wind.speed;
  // console.log(response.data);
  document.getElementById("temp").innerHTML = `${currenttemp}°C`;
  document.getElementById("cityName").innerHTML = currentCity;
  document.getElementById("weather-description").innerHTML = desc;
  document.getElementById("humid").innerHTML = humidity;
  document.getElementById("pressure").innerHTML = currentPressure;
  document.getElementById("wind").innerHTML = Math.round(currentWind * 3.6);
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

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("input[type = search]").value.toLowerCase();
  document.getElementById("cityName").innerText = city;
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}

let search = document.querySelector("#searchForm");
search.addEventListener("click", searchCity);
