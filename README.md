# WeatherForecast
Get the 5 day weather forecast for your city

## Description
This is an application that retreives the current and 5-day forecast weather data for any city the user specifies.  The user enters a city in the search box and clicks "Search" and the current weather and 5-day weather forecast is displayed.  The application also will save the search history in local storage so that the user does not have to keep searching for the same city.  They can simply select it from the list.  This application makes use of OpenWeather.org's Current Weather and 5-day / 3 Hour Forecast API.  The application also uses the Geocoding API to get the Latitude and Longitude coordinates when the user enters a city for more accurate weather data.  My first introduction to using server side API's and it was a fun little project to work on.  In addition to the API used, I was able to make better use of Bootstrap and found how easy it is to build a more responsive website with this CSS Framwork.  

## Usage
Below is a screenshot of the completed site.

![Screenshot fo the completed WeatherForecast site.](/assets/images/ScreenShot_WeatherForecast.png)

Link to the deployed application is here:  https://azukicoconut.github.io/WeatherForecast/

## Credits
This application was developed from scratch.  The inspiration for the site design was from a sample I was given from the UNB Bootcamp course.  

The following are the references used in my application:
  - w3Schools jQuery Remove/Empty - https://www.w3schools.com/jquery/jquery_dom_remove.asp
  - w3Schools JavaScript API Fetching - https://www.w3schools.com/js/js_api_fetch.asp
  - OpenWeather Map Current Weather API documentation - https://openweathermap.org/current
  - OpenWeather Map 5-day Forecast Weather API documentation - https://openweathermap.org/forecast5
  - OpenWeather Map Geocoding API documentation - https://openweathermap.org/api/geocoding-api
  - Dayjs for Date manipulation - https://day.js.org/
  - Bootstrap documentation - https://getbootstrap.com/
    
## License
MIT License

Copyright (c) 2023 Matthew Tingley

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
