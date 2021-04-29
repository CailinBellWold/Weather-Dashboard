// Variables
let citySearchInputEl = document.querySelector('#city-search-input');
let citySearchInput;
let apiKey = 'a46fae6c97cce84840e8dfd333cdaca5';
let city;
let latLonApiUrl;

// Button
let searchButton = document.getElementById('search-button');

let searchButtonHandler = function (event) {
  event.preventDefault();

  citySearchInput = citySearchInputEl.value.trim(); //TO DO: How to adjust for space/no space, comma, no comma, etc. Start with City, for now...

  if (citySearchInput) {
    getLatLon(citySearchInput);
    setHistory(citySearchInput);
  } else {
    alert('Please enter a City');
  }
};

searchButton.addEventListener('click', searchButtonHandler);

function setHistory() {
  for <i = 0; i < 8; i++> {
  localStorage.setItem(city-[], citySearchInput);
  }
};

function renderHistory() {
    $("#city-1").val(localStorage.getItem('city-1'));
    $("#city-2").val(localStorage.getItem('city-2'));
    $("#city-3").val(localStorage.getItem('city-3'));
    $("#city-4").val(localStorage.getItem('city-4'));
    $("#city-5").val(localStorage.getItem('city-5'));
    $("#city-6").val(localStorage.getItem('city-6'));
    $("#city-7").val(localStorage.getItem('city-7'));
    $("#city-8").val(localStorage.getItem('city-8'));
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
    var latLonApiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearchInput + "," + state + "," + country + '&limit={limit}&appid=' + apiKey;
  
    fetch(latLonApiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          lat = data.lat;
          long = data.lon;
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  };
  
// Will need this to covert city to a lat/lon
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key} 

function getWeatherData (city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&appid=' + apiKey;
  
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data.XXXXX, city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
  };

//GOAL: 1.) Take user input, trim, convert case (if necessary). 2.) Store Input to local storage 3.) Convert city to lat/lon 4.) Run function to retrieve weather. 5.) Input responses into correct spans.  