//TO DO: Get Array to display in button field 

// Variables
let citySearchInputEl = document.querySelector('#city-search-input');
let citySearchInput;
let citySearchHistory = [];
let apiKey = 'a46fae6c97cce84840e8dfd333cdaca5';
let latLonApiUrl;
let todayCardHeaderEl = document.querySelector('#todayCardHeader');
let todayIconEl = document.querySelector('#todayIcon');
let currentTempEl = document.querySelector('#currentTemp');
let currentHumidityEl = document.querySelector('#currentHumidity');
let currentWindSpeedEl = document.querySelector('#currentWindSpeed');
let currentUVIndexEl = document.querySelector('#currentUV');
let weatherTodayIcon;
let weatherTodaySource;
let weatherTodayDescription;
let tempK;
let tempF;


// Button
let searchButton = document.getElementById('search-button');

// Date
let today = new Date();
let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();

let searchButtonHandler = function (event) {
  event.preventDefault();
  citySearchInput = citySearchInputEl.value.trim(); //TO DO: How to adjust for space/no space, comma, no comma, etc. Start with City, for now...
  if (citySearchInput) {
    getLatLon(citySearchInput);
    createSearchHistory(citySearchInput);
  } else {
    alert('Please enter a City');
  }
};

searchButton.addEventListener('click', searchButtonHandler);

function createSearchHistory(citySearchInput) {
  citySearchHistory.unshift(citySearchInput);
  localStorage.setItem('searchHistory', JSON.stringify(citySearchHistory));
  console.log(citySearchHistory);
  renderHistory();
};

function renderHistory() {
  let retrievedHistory = localStorage.getItem('searchHistory');
  let searchHistoryParse = JSON.parse(retrievedHistory);
  console.log(searchHistoryParse);

  for (i = 0; i < searchHistoryParse.length; i++) {
    $('#city-0').text(searchHistoryParse[0]);
    $('#city-1').text(searchHistoryParse[1]);
    $('#city-2').text(searchHistoryParse[2]);
    $('#city-3').text(searchHistoryParse[3]);
    $('#city-4').text(searchHistoryParse[4]);
    $('#city-5').text(searchHistoryParse[5]);
    $('#city-6').text(searchHistoryParse[6]);
    $('#city-7').text(searchHistoryParse[7]);
    $('#city-8').text(searchHistoryParse[8]);
    $('#city-9').text(searchHistoryParse[9]);
  }
};

renderHistory();

//TO DO: Update with State/Country once I get this working.

  function getLatLon (citySearchInput) {
    // console.log("getLatLon triggered");
    // var latLonApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearchInput + "," + state + "," + country + '&limit={limit}&appid=' + apiKey;
    var latLonApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearchInput + '&limit=1&appid=' + apiKey;

    fetch(latLonApiUrl).then(function (response) {
      // console.log(response);
      if (response.ok) {
        response.json().then(function (data) {
          for (var i = 0; i < data.length; i++) {
            lat = data[i].lat;
            // console.log(lat);
            lon = data[i].lon;
            // console.log(lon);
          }
        }) .then(getWeatherData);
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  };

function getWeatherData (citySearchInput) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&appid=' + apiKey;
  console.log(citySearchInput);
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          console.log();
          todayCardHeader.textContent = (citySearchInputEl.value.trim() + ' (' + date + ')');
          // Current Weather Icon
          weatherTodayIcon = data.current.weather[0].icon;
          weatherTodaySource = ('http://openweathermap.org/img/wn/' + weatherTodayIcon + '@2x.png')
          weatherTodayDescription = data.current.weather[0].description;
          todayIconEl.src = weatherTodaySource;
          todayIconEl.alt = weatherTodayDescription;
          // Current Temperature
          tempK = data.current.temp;
          tempF = kToF(tempK) + " &#176F";
          currentTempEl.innerHTML = tempF;
          // Current Humidity
          currentHumidityEl.innerHTML = (data.current.humidity + "%");
          // Current Wind Speed
          currentWindSpeedEl.innerHTML = (data.current.wind_speed + " MPH");
          // Current UV Index
          currentUVIndexEl.innerHTML = (data.current.uvi);

        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  };

  function kToF(tempK) {
    return Math.floor((tempK - 273.15) *1.8 +32);
}

//GOAL: 1.) Take user input, trim, convert case (if necessary). 2.) Store Input to local storage 3.) Convert city to lat/lon 4.) Run function to retrieve weather. 5.) Input responses into correct spans.  