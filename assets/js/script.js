var searchBtn = $('#searchBtn');

const APPID = 'edde7c8a699268425a7fba556907872f';
let lon = '';
let lat = '';

function getCityCoord(city) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APPID;
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then (function (data){
           getCityWeather(data.coord.lat, data.coord.lon);
        });
}

function getCityWeather(lat, lon) {
    var responseUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat + '&lon='+ lon + '&appid=' + APPID;

    console.log(responseUrl);
    console.log(lat, lon);

    fetch(responseUrl) 
    .then(function(response){
        return response.json();
    })
    .then (function (data){
        console.log(data);
    })
}

function handleSearchFunction() {
    var city = $('#city').val();
    getCityCoord(city);
    
}



























searchBtn.on('click', handleSearchFunction);