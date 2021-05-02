//TO DO: Get Array to display in button field 

// Variables
let citySearchInputEl = document.querySelector('#city-search-input');
let citySearchInput;
let citySearchHistory = [];
let apiKey = 'a46fae6c97cce84840e8dfd333cdaca5';
let latLonApiUrl;
let todayCardHeader = document.querySelector('#todayCardHeader');

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
  console.log(searchHistoryParse); //WORKS

  for (i = 0; i < searchHistoryParse.length; i++) {
    $('#city-0').text(searchHistoryParse[0]); //Works
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
  
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          for (var i = 0; i < data.length; i++) {
            let icon = data[i].current.weather[0].icon;
            console.log(icon);
          }      
          todayCardHeader.innerHTML = (citySearchInput + '(' + date + ')');
          // displayWeather(data.XXXXX, citySearchInput);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  };

//GOAL: 1.) Take user input, trim, convert case (if necessary). 2.) Store Input to local storage 3.) Convert city to lat/lon 4.) Run function to retrieve weather. 5.) Input responses into correct spans.  