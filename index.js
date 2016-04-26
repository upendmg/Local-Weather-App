function displayPosition(position) {
      $.getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude+ "&sensor=false", function(json) {
     var addressCity = JSON.stringify(json.results[0].address_components[3].long_name);
     addressCity = addressCity.replace(/"/g, "");
     var addressCountry = JSON.stringify(json.results[0].address_components[5].long_name);
     addressCountry = addressCountry.replace(/"/g, "");
     $("#geo-data").html(addressCity + ", " + addressCountry);
      });
      getWeather(position);
    }
function getWeatherAndPositionData() {
  if (navigator.geolocation) {
    position = navigator.geolocation.getCurrentPosition(displayPosition);
   }
 }
function convertDate(time) {
    var d = new Date(0);
    d.setUTCSeconds(time);
    return d;
}

function covertKelvinToCelcius(kelvin) {
  return Math.floor(kelvin - 273.15);
}

function covertKelvinFahrenheit(kelvin) {
  return Math.floor(1.8*(kelvin-273.15)+32);
}

function fahrToCel(fahr) {
  return Math.floor((fahr-32)*(5/9));
}

function celToFahr(cel) {
  return Math.ceil((cel*(9/5))+32);
}
function parseTime(d) {
  var hour = d.getHours();
  if (hour < 10) hour = "0" + hour;
  var minutes = d.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;
  return hour + ":" + minutes;
}

function parseDayOfWeek(d) {
  var daysOfWeekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeekArray[d.getDay()];
}

function parseDate(d) {
  var dateDay = parseInt(d.getDate());
  if (dateDay < 10 ) dateDay = "0" + dateDay;
  var dateMonth = parseInt(d.getMonth())+1;
  if (dateMonth < 10 ) dateMonth = "0" + dateMonth;
  var dateYear = d.getFullYear();
  return dateDay + "." + dateMonth + "." + dateYear;
}

function displayCurrentDateAndTime(d) {
  var dayOfWeek = parseDayOfWeek(d);
  var date = dayOfWeek + ", " + parseDate(d);
  var time = parseTime(d);
  $("#date").html(date);
  $("#current-time").html(time);
}

function displayGeneralInfo(info) {
  info = info.replace(/"/g, '');
  $("#general-info").html(info);
}
function displayTemperature(temperature) {
  var html = '';
  var weatherTempCelcius = covertKelvinToCelcius(parseFloat(temperature));  
  html = "<div>" + weatherTempCelcius + "&deg;C <span id='inact'>&deg;F</span></div>";
  $("#temp-wraper").html(html);
}

function displayWeather(json) {
  var weatherId = JSON.stringify(json.weather[0].id);
  var weatherDesc = JSON.stringify(json.weather[0].main);
  var temperature = JSON.stringify(json.main.temp);
  var currentDate = new Date();
  displayCurrentDateAndTime(currentDate);
  displayGeneralInfo(weatherDesc);
  displayTemperature(temperature);
  chooseBackImg(weatherId, currentDate);
}
function getWeather(position) {
  var weatherInfo = '';
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=5f7bcf238dc7056a7325948af9cb61be", function(json) {
    displayWeather(json);
  });
}
$(document).ready(function() {
  getWeatherAndPositionData();
});
function chooseBackImg(weatherId, currentDate){
     if (weatherId >= 200 && weatherId < 300) {
      $('body').css("background-image", "url(http://feelgrafix.com/data_images/out/10/842732-lightning.jpg)");
      $("#weather-icon").attr("src","https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/512/chance_of_storm.png");
    } else if (weatherId >= 300 && weatherId < 400) {
      $('body').css("background-image", "url(http://d2118lkw40i39g.cloudfront.net/wp-content/uploads/2015/06/gloomy_rainy_day_by_humanlly-d635anc.png.jpeg)");
      $("#weather-icon").attr("src","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc80YHbnTtymeUnpEaQrLT0V4A4NlZwntESABa4qbZb5ytzZlhHOm0j-A");
    } else if (weatherId >= 500 && weatherId < 600) {
      $('body').css("background-image", "url(http://revivalhut.com/wp-content/uploads/rain-leaves.jpg)");
      $("#weather-icon").attr("src","http://www.varbergsappen.nu/wp-content/themes/mycity/img/icon/rain-xxl.png");
    } else if (weatherId >= 600 && weatherId < 700) {
      $('body').css("background-image", "url(http://www.ambwallpapers.com/wp-content/uploads/2015/05/fruits_snowflakes_falling-Download.jpg)");
      $("#weather-icon").attr("src","https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTvtg0Bl0YfXJ9S1shGZwhd6S9mVAOgd7fBL315VEnIhy0p3eTw1g");
    } else if (weatherId >= 700 && weatherId < 800) {
      $('body').css("background-image", "url(http://forest-wallpapers.com/wp-content/uploads/wallpapers/Misty-Forest-Wallpaper.jpg)");
      $("#weather-icon").attr("src","http://www.iconsdb.com/icons/preview/black/fog-day-xxl.png");
    } else if (weatherId == 800) {
      $('body').css("background-image", "url(https://raymus97.files.wordpress.com/2014/12/img_7830.jpg)");
      $("#weather-icon").attr("src","http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/magic-marker-icons-natural-wonders/115691-magic-marker-icon-natural-wonders-sun9-sc37.png");
    } else if (weatherId > 800 && weatherId < 900) {
      $('body').css("background-image", "url(http://images.fineartamerica.com/images-medium-large-5/sun-rays-on-a-cloudy-day-john-supan.jpg)");
      $("#weather-icon").attr("src","http://www.iconsdb.com/icons/preview/white/clouds-xxl.png");
    } else if (weatherId >= 900 && weatherId < 950) {
      $('body').css("background-image", "url(https://s-media-cache-ak0.pinimg.com/736x/ac/4a/48/ac4a4897476c9b3e260fa27fd50c3aab.jpg)");
       $("#weather-icon").attr("src","http://www.iconsdb.com/icons/preview/white/chance-of-storm-xxl.png");
    } else {
      $('body').css("background-image", "url(https://www.walldevil.com/wallpapers/a86/9758-sun-cloud-sky.jpg)");
      $("#weather-icon").attr("src","https://cdn3.iconfinder.com/data/icons/weather-and-forecast/51/Weather_icons_grey-03-512.png");
    }
}
$("#temp-wraper").click(function(){
  var currentTemp = $("#temp-wraper").html();
  if (currentTemp.match(/[0-9][0-9]*.C/)) {
    currentTemp = parseInt(currentTemp.replace(/[^0-9]/g, ''));
    currentTemp = celToFahr(currentTemp);
    html = "<div>" + currentTemp + "&deg;F <span id='inact'>&deg;C</span></div>";;
    $("#temp-wraper").html(html);
  } else {
    currentTemp = parseInt(currentTemp.replace(/[^0-9]/g, ''));
    currentTemp = fahrToCel(currentTemp);
    html = "<div>" + currentTemp + "&deg;C <span id='inact'>&deg;F</span></div>";
    $("#temp-wraper").html(html);
  }
});