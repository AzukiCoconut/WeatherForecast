// pull in the required HTML DOM Objects
var searchBtn = $('#searchBtn');
var cityBtn = $('#pastSearchItem');
var forecastEl = $('#cards');
var currentEl = $('#current');
var historyEl = $('#history');
// Open Weather APP Key
const APPID = 'edde7c8a699268425a7fba556907872f';
// Global Variables
let lon = '';
let lat = '';
let savedSearch = [];

// A function to display the past Search cities
function displayPastSearch(){
    // get any search items from local storage
    savedSearch = JSON.parse(localStorage.getItem('pastSearch'));
    // if it is null then stop the function
    if (savedSearch === null){
        return;
    }
    // iterate through the returned storage items and display them to the screen
    for(var i=0; i<savedSearch.length; i++){
        var searchedCity = $('<button>');
        searchedCity.attr('type', 'button');
        searchedCity.attr('id', 'pastSearchItem');
        searchedCity.addClass('btn btn-secondary');
        searchedCity.text(savedSearch[i].City);
        searchedCity.on("click", handlePastSearch);

        historyEl.append(searchedCity);
    }
}

// A helper function to check to see if a city is already in the search results.  If not return false.
function isAlreadySaved(array, city) {
    for (var i=0; i<array.length; i++){
        if (array[i].City === city){
            return true;
        } 
    }
    return false;
}

// A function that saves the search item to local storage
function saveSearch(city){
    // loads the whatever is currently in local storage
    savedSearch = JSON.parse(localStorage.getItem('pastSearch'));
    // Add the search item to an object
    var item = {'City' : city};
    // if there are no local storage items create a new array and pass the object to local storage
    if (savedSearch === null) {
        var pastSearch = [];
        pastSearch.push(item);
        localStorage.setItem('pastSearch', JSON.stringify(pastSearch));
        //refresh the search history list
        displayPastSearch();
    } else {
        // check to see if the city is already saved.  if not save it to local storage.
        if (!isAlreadySaved(savedSearch, city)){
            savedSearch.push(item);
            localStorage.setItem('pastSearch', JSON.stringify(savedSearch));
        }
        //refresh the search history list
        displayPastSearch();
    }
}

// get the Coordinates from the Geolocation API
function getCityCoord(city) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APPID;
    fetch(url)
        .then(function(response){
            if (response.ok){
                response.json().then (function (data){
                        //pass the coordinates to the current weather and forcast weather functions
                        getCityCurrentWeather(data.coord.lat, data.coord.lon);
                        getCityForecastWeather(data.coord.lat, data.coord.lon);
                });
            } else {  // if error send a message.
                $('.message').text('City not found');
            }});
}

// A function that takes latitude and longitude coordinate and retreves the current weather conditions.
function getCityCurrentWeather(lat, lon) {
    var responseUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + lon + '&units=metric&appid=' + APPID;
    fetch(responseUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // Populate the current weather html section
        var title = $('<h2>');
        title.text(data.name + ' ' + dayjs().format("MM/DD/YYYY"));
        var currentCondition = $('<img>');
        currentCondition.attr('src', 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png');
        currentCondition.attr('alt', data.weather[0].main);
        var temp = $('<p>');
        temp.text("Temp: " + data.main.temp + "\u00B0C");
        var wind = $('<p>');
        wind.text('Wind: ' + data.wind.speed + ' KPH');
        var humidity = $('<p>');
        humidity.text('Humidity: ' + data.main.humidity + '%');


        currentEl.append(title, currentCondition, temp, wind, humidity);
        // save the search city
        saveSearch(data.name);
        
    })
}

// A function that takes a latitude and longitude coordinates and retrieves the 5-day forecast weather
function getCityForecastWeather(lat, lon) {
    var responseUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat + '&lon='+ lon + '&units=metric&appid=' + APPID;
    fetch(responseUrl) 
    .then(function(response){
        return response.json();
    })
    .then (function (data){
        // Iterate through the returned dataset
        for (var i=0; i<data.list.length; i++){
            var forecastHour = dayjs(data.list[i].dt_txt).get('hour');
            //Only work with the forecast point for noon each day
            if (forecastHour == 12){
                // Render the information to the screen
                var card = $('<div>');
                card.addClass('card text-white');
                var cardTitle = $('<h5>');
                cardTitle.text(dayjs(data.list[i].dt_txt).format("MM/DD/YYYY"));
                var img = $('<img>');
                img.attr('src', 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '.png');
                img.attr('alt', data.list[i].weather[0].main);
                var temp = $('<p>');
                temp.text("Temp: " + data.list[i].main.temp + "\u00B0C");
                var wind = $('<p>');
                wind.text('Wind: ' + data.list[i].wind.speed + ' KPH');
                var humidity = $('<p>');
                humidity.text('Humidity: ' + data.list[i].main.humidity + '%');

                card.append(cardTitle, img, temp, wind, humidity);

                forecastEl.append(card);
            }
            
        }

        }
    );
}

// A function to handle the event when the History search city button is clicked
function handlePastSearch(event) {
    var city = event.target.textContent;
    forecastEl.empty();
    currentEl.empty();
    historyEl.empty();
    getCityCoord(city);
}

// A function to handle the event when the city search button is clicked.
function handleSearchFunction() {
    var city = $('#city').val();
    // check to see if the text box is empty
    if (city === '') {
        $('.message').text('Please enter a valid city.');
        return;
    }
    $('.message').empty();
    forecastEl.empty();
    currentEl.empty();
    historyEl.empty();
    getCityCoord(city);
    
}

// Event Listeners
searchBtn.on('click', handleSearchFunction);
// Add the search history to the application when it loads.
displayPastSearch();
