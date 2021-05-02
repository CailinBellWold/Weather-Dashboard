//TO DO: Get Array to display in button field 

// Variables
let citySearchInputEl = document.querySelector('#city-search-input');
let citySearchInput;
let citySearchHistory = [];
let apiKey = 'a46fae6c97cce84840e8dfd333cdaca5';
let latLonApiUrl;

// Button
let searchButton = document.getElementById('search-button');

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
    console.log(searchHistoryParse.length); //Works
    console.log(searchHistoryParse[0]); //Works
    console.log(searchHistoryParse[1]); //Works

    $('#city-0').innerText = "Testing";
    $('#city-0').value = "Testing";
    $('#city-1').innerText = searchHistoryParse[1];
    $('#city-2').innerText = (searchHistoryParse[2]);
    $('#city-3').innerText = (searchHistoryParse[3]);
    $('#city-4').innerText = (searchHistoryParse[4]);
    $('#city-5').innerText = (searchHistoryParse[5]);
    $('#city-6').innerText = (searchHistoryParse[6]);
    $('#city-7').innerText = (searchHistoryParse[7]);
    $('#city-8').innerText = (searchHistoryParse[8]);
    $('#city-9').innerText = (searchHistoryParse[9]);
  }
};

// fetch(apiURL, {
//   // The browser fetches the resource from the remote server without first looking in the cache.
//   // The browser will then update the cache with the downloaded resource.
// })
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

//TO DO: Update with State/Country once I get this working.
  function getLatLon (citySearchInput) {
    var latLonApiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + citySearchInput + '&limit=1&appid=' + apiKey;
    // var latLonApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearchInput + "," + state + "," + country + '&limit={limit}&appid=' + apiKey;
    fetch(latLonApiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          lat = data.lat;
          lon = data.lon;
          console.log(lat);
          console.log(lon);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  };

// Will need this to covert city to a lat/lon
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key} 

function getWeatherData (citySearchInput) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&appid=' + apiKey;
  
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data.XXXXX, citySearchInput);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  };

//GOAL: 1.) Take user input, trim, convert case (if necessary). 2.) Store Input to local storage 3.) Convert city to lat/lon 4.) Run function to retrieve weather. 5.) Input responses into correct spans.  