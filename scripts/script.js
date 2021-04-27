// Variables
let citySearchInputEl = document.querySelector('#city-search-input');
let citySearchInput;
let apiKey = 'a46fae6c97cce84840e8dfd333cdaca5';

// Button
let searchButton = document.getElementById('search-button');

let searchButtonHandler = function (event) {
  event.preventDefault();

  citySearchInput = citySearchInputEl.value.trim();

  if (citySearchInput) {
    getWeatherData(citySearchInput);

    // repoContainerEl.textContent = '';
    // nameInputEl.value = '';
  } else {
    alert('Please enter a City');
  }
};

searchButton.addEventListener('click', searchButtonHandler);

fetch(apiURL, {
  // The browser fetches the resource from the remote server without first looking in the cache.
  // The browser will then update the cache with the downloaded resource.
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

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