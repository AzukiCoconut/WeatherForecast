var searchBtn = $('#searchBtn');
var cityBtn = $('#pastSearchItem');
var forecastEl = $('#cards');
var currentEl = $('#current');
var historyEl = $('#history');
var tooltipTriggerList = [];
const APPID = 'edde7c8a699268425a7fba556907872f';
let lon = '';
let lat = '';
let savedSearch = [];


function displayPastSearch(){
    savedSearch = JSON.parse(localStorage.getItem('pastSearch'));
    if (savedSearch === null){
        return;
    }
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
function isAlreadySaved(array, city) {
    for (var i=0; i<array.length; i++){
        if (array[i].City === city){
            return true;
        } 
    }
    return false;
}
function saveSearch(city){
    savedSearch = JSON.parse(localStorage.getItem('pastSearch'));
    var item = {'City' : city};
    if (savedSearch === null) {
        var pastSearch = [];
        pastSearch.push(item);
        localStorage.setItem('pastSearch', JSON.stringify(pastSearch));
        displayPastSearch();
    } else {
        if (!isAlreadySaved(savedSearch, city)){
            savedSearch.push(item);
            localStorage.setItem('pastSearch', JSON.stringify(savedSearch));
        }
        displayPastSearch();
    }
}
function getCityCoord(city) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APPID;
    fetch(url)
        .then(function(response){
            if (response.ok){
                response.json().then (function (data){
                        getCityCurrentWeather(data.coord.lat, data.coord.lon);
                        getCityForecastWeather(data.coord.lat, data.coord.lon);
                });
            } else {
                $('.message').text('City not found');
            }});
}

function getCityCurrentWeather(lat, lon) {
    var responseUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat + '&lon=' + lon + '&units=metric&appid=' + APPID;
    fetch(responseUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
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
        saveSearch(data.name);
        
    })
}
function getCityForecastWeather(lat, lon) {
    var responseUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat + '&lon='+ lon + '&units=metric&appid=' + APPID;
    fetch(responseUrl) 
    .then(function(response){
        return response.json();
    })
    .then (function (data){
        for (var i=0; i<data.list.length; i++){
            var forecastHour = dayjs(data.list[i].dt_txt).get('hour');
            if (forecastHour == 12){
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

function handlePastSearch(event) {
    var city = event.target.textContent;
    forecastEl.empty();
    currentEl.empty();
    historyEl.empty();
    getCityCoord(city);
}

function handleSearchFunction() {
    var city = $('#city').val();
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

searchBtn.on('click', handleSearchFunction);
displayPastSearch();
