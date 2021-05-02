// Variables
let citySearchInputEl = document.querySelector('#city-search-input');
let citySearchInput;
let citySearchHistory = [];
let citySearchHistoryBtnEl;
let citySearchHistoryBtnContainerEl = document.querySelector('#btnList')
let apiKey = 'a46fae6c97cce84840e8dfd333cdaca5';
let latLonApiUrl;
let tempK;
let tempF;

// Current Day
let todayCardHeaderEl = document.querySelector('#todayCardHeader');
let todayIconEl = document.querySelector('#todayIcon');
let currentTempEl = document.querySelector('#currentTemp');
let currentHumidityEl = document.querySelector('#currentHumidity');
let currentWindSpeedEl = document.querySelector('#currentWindSpeed');
let currentUVIndexEl = document.querySelector('#currentUV');
let currentUVIndex;
let weatherTodayIcon;
let weatherTodayIconSource;
let weatherTodayDescription;

// TO DO: Use loop to assign numbers. This process (and the associated rendering) is currently redundant.
// Day 1
let day1CardHeaderEl = document.querySelector('#day1CardHeader');
let day1IconEl = document.querySelector('#day1Icon');
let day1Icon;
let day1IconSource;
let day1IconDescription;
let day1TempEl = document.querySelector('#day1Temp');
let day1WindEl = document.querySelector('#day1Wind');
let day1HumidityEl = document.querySelector('#day1Humidity');
// Day 2
let day2CardHeaderEl = document.querySelector('#day2CardHeader');
let day2Icon;
let day2IconSource;
let day2IconDescription;
let day2IconEl = document.querySelector('#day2Icon');
let day2TempEl = document.querySelector('#day2Temp');
let day2WindEl = document.querySelector('#day2Wind');
let day2HumidityEl = document.querySelector('#day2Humidity');
// Day 3
let day3CardHeaderEl = document.querySelector('#day3CardHeader');
let day3Icon;
let day3IconSource;
let day3IconDescription;
let day3IconEl = document.querySelector('#day3Icon');
let day3TempEl = document.querySelector('#day3Temp');
let day3WindEl = document.querySelector('#day3Wind');
let day3HumidityEl = document.querySelector('#day3Humidity');
// Day 4
let day4CardHeaderEl = document.querySelector('#day4CardHeader');
let day4Icon;
let day4IconSource;
let day4IconDescription;
let day4IconEl = document.querySelector('#day4Icon');
let day4TempEl = document.querySelector('#day4Temp');
let day4WindEl = document.querySelector('#day4Wind');
let day4HumidityEl = document.querySelector('#day4Humidity');
// Day 5
let day5CardHeaderEl = document.querySelector('#day5CardHeader');
let day5Icon;
let day5IconSource;
let day5IconDescription;
let day5IconEl = document.querySelector('#day5Icon');
let day5TempEl = document.querySelector('#day5Temp');
let day5WindEl = document.querySelector('#day5Wind');
let day5HumidityEl = document.querySelector('#day5Humidity');

// Button
let searchButton = document.getElementById('search-button');

// Date
let today = new Date();
let date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();

// Handler for Search Button
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

// Creates Search History and Sets to Local Storage
function createSearchHistory(citySearchInput) {
  citySearchHistory.unshift(citySearchInput);
  localStorage.setItem('searchHistory', JSON.stringify(citySearchHistory));
  renderHistory();
};

// Renders Search History to Buttons
function renderHistory() {
  let retrievedHistory = localStorage.getItem('searchHistory');
  let searchHistoryParse = JSON.parse(retrievedHistory);

  // Creates Button
  citySearchHistoryBtnEl = document.createElement("button");
  citySearchHistoryBtnEl.innerHTML = searchHistoryParse[0];
  citySearchHistoryBtnEl.setAttribute('type', 'submit');
  citySearchHistoryBtnEl.setAttribute('class', 'btn btn-secondary btn-block custom-btn');
  citySearchHistoryBtnEl.setAttribute('display', 'block');

// Appends Button to Page
  citySearchHistoryBtnContainerEl.appendChild(citySearchHistoryBtnEl);

// Adds Event Handler to Button
citySearchHistoryBtnEl.addEventListener ("click", function(event) {
  citySearchInputEl.value = $(this).html();
  console.log(citySearchInputEl.value);
  searchButtonHandler(event);
})
};

renderHistory();

//TO DO: Update with State/Country once I get this working.

  function getLatLon (citySearchInput) {
    var latLonApiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearchInput + '&appid=' + apiKey;

    fetch(latLonApiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            lat = data.coord.lat;
            lon = data.coord.lon;
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

          // Current City and Date
          todayCardHeader.textContent = (citySearchInputEl.value.trim() + ' (' + date + ')');

          // Current Weather Icon
          weatherTodayIcon = data.current.weather[0].icon;
          weatherTodayIconSource = ('https://openweathermap.org/img/wn/' + weatherTodayIcon + '@2x.png')
          weatherTodayDescription = data.current.weather[0].description;
          todayIconEl.src = weatherTodayIconSource;
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
          currentUVIndex = (data.current.uvi);
          currentUVIndexEl.innerHTML = currentUVIndex;
          if (currentUVIndex < 2.99) {
            currentUVIndexEl.classList.add('custom-favorable');
            currentUVIndexEl.classList.remove('custom-moderate');
            currentUVIndexEl.classList.remove('custom-severe');
          } else if (currentUVIndex > 3 && currentUVIndex < 5.99) {
            currentUVIndexEl.classList.add('custom-moderate');
            currentUVIndexEl.classList.remove('custom-favorable');
            currentUVIndexEl.classList.remove('custom-severe');
          } else {
            currentUVIndexEl.classList.add('custom-severe');
            currentUVIndexEl.classList.remove('custom-favorable');
            currentUVIndexEl.classList.remove('custom-moderate');
          };

          // TO DO: Figure out how to loop this section AND get dates to display correctly
          // Day 1
          day1CardHeaderEl.textContent = (date + 1); //Doesn't Work
          // Day 1 Icon
          day1Icon = data.daily[0].weather[0].icon;
          day1IconSource = ('https://openweathermap.org/img/wn/' + day1Icon + '@2x.png')
          day1IconDescription = data.daily[0].weather[0].description;
          day1IconEl.src =  day1IconSource;
          day1IconEl.alt = day1IconDescription;
          // Day 1 Temp
          tempK = data.daily[0].temp.day;
          tempF = kToF(tempK) + " &#176F";
          day1TempEl.innerHTML = tempF;
          // Day 1 Wind Speed
          day1WindEl.innerHTML = (data.daily[0].wind_speed + " MPH");
          // Day 1 Humidity
          day1HumidityEl.innerHTML = (data.daily[0].humidity + "%");

          // Day 2
          day2CardHeaderEl.textContent = (date + 2); //Doesn't Work
          // Day 2 Icon
          day2Icon = data.daily[1].weather[0].icon;
          day2IconSource = ('https://openweathermap.org/img/wn/' + day2Icon + '@2x.png')
          day2IconDescription = data.daily[1].weather[0].description;
          day2IconEl.src =  day2IconSource;
          day2IconEl.alt = day2IconDescription;
          // Day 2 Temp
          tempK = data.daily[1].temp.day;
          tempF = kToF(tempK) + " &#176F";
          day2TempEl.innerHTML = tempF;
          // Day 2 Wind Speed
          day2WindEl.innerHTML = (data.daily[1].wind_speed + " MPH");
          // Day 2 Humidity
          day2HumidityEl.innerHTML = (data.daily[1].humidity + "%");          

          // Day 3
          day3CardHeaderEl.textContent = (date + 3); //Doesn't Work
          // Day 3 Icon
          day3Icon = data.daily[2].weather[0].icon;
          day3IconSource = ('https://openweathermap.org/img/wn/' + day3Icon + '@2x.png')
          day3IconDescription = data.daily[2].weather[0].description;
          day3IconEl.src =  day3IconSource;
          day3IconEl.alt = day3IconDescription;
          // Day 3 Temp
          tempK = data.daily[2].temp.day;
          tempF = kToF(tempK) + " &#176F";
          day3TempEl.innerHTML = tempF;
          // Day 3 Wind Speed
          day3WindEl.innerHTML = (data.daily[2].wind_speed + " MPH");
          // Day 3 Humidity
          day3HumidityEl.innerHTML = (data.daily[2].humidity + "%");

          // Day 4
          day4CardHeaderEl.textContent = (date + 4); //Doesn't Work
          // Day 4 Icon
          day4Icon = data.daily[3].weather[0].icon;
          day4IconSource = ('https://openweathermap.org/img/wn/' + day4Icon + '@2x.png')
          day4IconDescription = data.daily[3].weather[0].description;
          day4IconEl.src =  day4IconSource;
          day4IconEl.alt = day4IconDescription;
          // Day 4 Temp
          tempK = data.daily[3].temp.day;
          tempF = kToF(tempK) + " &#176F";
          day4TempEl.innerHTML = tempF;
          // Day 4 Wind Speed
          day4WindEl.innerHTML = (data.daily[3].wind_speed + " MPH");
          // Day 4 Humidity
          day4HumidityEl.innerHTML = (data.daily[3].humidity + "%");

          // Day 5
          day5CardHeaderEl.textContent = (date + 5); //Doesn't Work
          // Day 5 Icon
          day5Icon = data.daily[4].weather[0].icon;
          day5IconSource = ('https://openweathermap.org/img/wn/' + day5Icon + '@2x.png')
          day5IconDescription = data.daily[4].weather[0].description;
          day5IconEl.src =  day5IconSource;
          day5IconEl.alt = day5IconDescription;
          // Day 5 Temp
          tempK = data.daily[4].temp.day;
          tempF = kToF(tempK) + " &#176F";
          day5TempEl.innerHTML = tempF;
          // Day 5 Wind Speed
          day5WindEl.innerHTML = (data.daily[4].wind_speed + " MPH");
          // Day 5 Humidity
          day5HumidityEl.innerHTML = (data.daily[4].humidity + "%");
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