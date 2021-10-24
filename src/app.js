// current date

let now = new Date();

let current = document.querySelector("#time");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

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

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];
 
current.innerHTML = `${month} ${date}, ${day} ${hours}:${minutes}`;

function celsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector(".currentTemp");
  currentTemp.innerHTML = "18";
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  
  let forecastHTML= `<div class="row"> 
               <div class="col-12">
               <h3> <strong>7 Days Forecast</strong></h3>
<hr/>
<div class="row">`;
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
days.forEach(function (day) {
forecastHTML = forecastHTML + `
                 <div class="col-2">
                   <div class="weather-forecast-date"><strong>${day}</strong></div>
                    <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="cloudy" class=forecast-icon width="36"/>
                  
                      <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max"><strong>18°</strong></span>
                      <span class="weather-forecast-temperature-min">12°</span>
                      </div>
                      </div>`;
                     
});
  

                      forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;                    
}

//current temp
function displaytemp(response) {
  let currentCity = document.querySelector("#currentCity");
currentCity.innerHTML= (response.data.name);

  let currentTemp = document.querySelector("#tempNow");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let country = document.querySelector("#country");
  country.innerHTML = `${response.data.sys.country}`;

  let currentWeatherDescription = document.querySelector(
    ".currentWeatherDescription"
  );
  currentWeatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
weatherIcon.setAttribute("alt", response.data.weather[0].description);


  let currentHighTemperature = document.querySelector(".currentHigh");
  currentHighTemperature.innerHTML = `${Math.round(
    response.data.main.temp_max
  )}`;

  let currentLowTemperature = document.querySelector(".currentLow");
  currentLowTemperature.innerHTML = `${Math.round(
    response.data.main.temp_min
  )}`;

  let feelsLike = document.querySelector(".feelsLikeTemp");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;

  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;

  let wind = document.querySelector(".wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;

  let pressure = document.querySelector(".pressure");
  pressure.innerHTML = `${response.data.main.pressure}`;

  // converted to km from m with the format
  let visibility = document.querySelector(".visibility");
  visibility.innerHTML = `${Math.round(response.data.visibility / 100) / 10}`;

  let sunrise = document.querySelector(".sunrise");
  sunrise.innerHTML = `${response.data.sys.sunrise}`;

  let sunset = document.querySelector(".sunset");
  sunset.innerHTML = `${response.data.sys.sunset}`;

// converted dt with format


}
function search(city) {
 let units = "metric";
  let apiKey = "62231151ce343c4d68652e1617efc22f";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(displaytemp);
}

search("singapore");
displayForecast();

function handleSubmit(event) {
  event.preventDefault();
  
  let searchInput = document.querySelector(".searchInput");
  let currentCity = document.querySelector("#currentCity");

  search(searchInput.value);  
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", handleSubmit);


// current location search
function displayCurrentLocation (response) {
  let currentLocationTemperature = document.querySelector("#tempNow");
  currentLocationTemperature.innerHTML= `${Math.round(response.data.main.temp)}`;

CelsiusTemperature = response.data.main.temp;

let date = document.querySelector("#time");


let currentLocationCity = document.querySelector("#currentCity");
  currentLocationCity.innerHTML= `${response.data.name}`;
  
  let country= document.querySelector("#country");
country.innerHTML= `${response.data.sys.country}`;

  let currentWeatherDescription = document.querySelector(
    ".currentWeatherDescription");
  currentWeatherDescription.innerHTML=`${response.data.weather[0].main}`;

let currentHighTemperature = document.querySelector(".currentHigh");
currentHighTemperature.innerHTML=`${Math.round(response.data.main.temp_max)}`;

let currentLowTemperature = document.querySelector(".currentLow");
currentLowTemperature.innerHTML = `${Math.round(response.data.main.temp_min)}`;

let feelsLike = document.querySelector(".feelsLikeTemp");
feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;

let humidity = document.querySelector(".humidity");
humidity.innerHTML = `${response.data.main.humidity}`;

let wind= document.querySelector(".wind");
wind.innerHTML = `${Math.round(response.data.wind.speed)}`;

let pressure = document.querySelector(".pressure");
pressure.innerHTML = `${response.data.main.pressure}`;

// converted to km from m with the format
let visibility = document.querySelector(".visibility");
visibility.innerHTML = `${Math.round(response.data.visibility/100)/10}`;

let sunrise = document.querySelector(".sunrise");
sunrise.innerHTML = `${response.data.sys.sunrise}`;

let sunset = document.querySelector(".sunset");
sunset.innerHTML = `${response.data.sys.sunset}`;



}

function showPosition(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let units = "metric";
        let apiKey = "62231151ce343c4d68652e1617efc22f";
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
        axios.get(url).then(displayCurrentLocation);
      }
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}


function displayFahrenheitTemp(event) {
  event.preventDefault();
let currentTemperature = document.querySelector(".currentTemp");
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheitTemperature = (CelsiusTemperature* 9) / 5 + 32;
currentTemperature.innerHTML= Math.round(fahrenheitTemperature);

}

function displayCelsiusTemp (event) {
  event.preventDefault();
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector(".currentTemp");
  currentTemperature.innerHTML = Math.round(CelsiusTemperature);
}
let CelsiusTemperature = null;

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);