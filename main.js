var weatherPics = {
  0: 'http://i.imgur.com/MhAeiO8.jpg',
  10: 'http://i.imgur.com/6N84B8j.jpg',
  20: 'http://i.imgur.com/60AUJqV.jpg',
  30: 'http://i.imgur.com/ZEgVW.jpg',
  40: 'http://i.imgur.com/VUI5NsZ.jpg',
  50: 'http://i.imgur.com/3QM1RDz.jpg',
  60: 'http://i.imgur.com/b9yq6.jpg',
  70: 'http://i.imgur.com/uaCt7cS.jpg',
  80: 'http://i.imgur.com/cgq4o2C.jpg',
  90: 'http://i.imgur.com/keGIFKu.jpg',
  100: 'http://i.imgur.com/HXvHFkc.jpg'
};

var temperature = {
  degrees: 0,
  units: "Celsius",
  toggleMetricVsImperial: function() {
    if (this.units === "Celsius") {
      this.units = "Fahrenheit";
      this.degrees = (this.degrees * (9 / 5)) + 32;
    } else if (this.units === "Fahrenheit") {
      this.units = "Celsius";
      this.degrees = (this.degrees - 32) * (5 / 9);
    }
  }
};

var setWeatherIcon = function(iconId) {
  $("#weather-icon").attr("src", "http://openweathermap.org/img/w/" + iconId + ".png");
}

var getWeather = function(city) {
  var urlRequest = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=b882c4328e1fc63caa33252db4622717";
  $.get(urlRequest, function(weather) {
    console.log(weather);
    $("#weather").html(weather.weather[0].description);
    $("#temp").html(kevlinToCelsius(weather.main.temp) + " ");
    $("#degrees").html(temperature.units)
    setWeatherIcon(weather.weather[0].icon);
  }, 'jsonp');
}

$(document).ready(function() {
  getData();

  $("#degrees").click(function(){
    temperature.toggleMetricVsImperial();
    $("#temp").html(Math.round(temperature.degrees) + " ");
    $("#degrees").html(temperature.units);
  });

  function getData() {
    $.get("http://ipinfo.io", function(location) {
      $("#city").html(location.city);
      getWeather(location.city);
    }, 'jsonp');
  }
})

var kevlinToCelsius = function(kelvin) {
  temperature.degrees = kelvin - 273;
  return Math.round(temperature.degrees);
}
