var cityFormEl = document.getElementById('city-form');
var cityNameEl = document.getElementById('city-name');
var cityHeaderEl = document.getElementById('city-header');
var iconHeaderEl = document.getElementById('icon-header');
var tempHeaderEl = document.getElementById('temp-header');
var windHeaderEl = document.getElementById('wind-header');
var humHeaderEl = document.getElementById('humidity-header');
var uviHeaderEl = document.getElementById('uvi-header');
var cityListEl = document.getElementById('city-list');

function getCityBtn (city) {
  var cityBtn = document.createElement('button');
  var btnName = document.createTextNode(city);
  cityBtn.appendChild(btnName);
  cityListEl.appendChild(cityBtn);
  console.log(cityBtn)
}

function getHeader (cityName) {
  var geoUrl = 
  'http://api.openweathermap.org/geo/1.0/direct?q='+ cityName +'&appid=4c49f825774489d316f935b0038e0673'
  
  fetch(geoUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json()
      }
    })
    .then(function (data) {
      console.log(data);
      getWeather(data[0].lat, data[0].lon)
    })
}

function getWeather(lat,lon) {
  var oneCallUrl = 
  'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon='+ lon +'&units=imperial&appid=4c49f825774489d316f935b0038e0673'
  
  fetch(oneCallUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json()
      }
    })
    .then(function (data) {
      console.log(data);
      var current = {
        currentCity: cityNameEl.value,
        currentDate: data.current.dt,
        currentIcon: data.current.weather[0].icon,
        curretTemp: data.current.temp,
        currentWind: data.current.wind_speed,
        currentHumidity: data.current.humidity,
        currentUvi: data.current.uvi,

        dOneDate:data.daily[1].dt,
        dOneIcon:data.daily[1].weather[0].icon,
        dOneTemp:data.daily[1].temp.day,
        dOneWind:data.daily[1].wind_speed,
        dOneHum:data.daily[1].humidity,

        dTwoDate:data.daily[2].dt,
        dTwoIcon:data.daily[2].weather[0].icon,
        dTwoTemp:data.daily[2].temp.day,
        dTwoWind:data.daily[2].wind_speed,
        dTwoHum:data.daily[2].humidity,

        dThreeDate:data.daily[3].dt,
        dThreeIcon:data.daily[3].weather[0].icon,
        dThreeTemp:data.daily[3].temp.day,
        dThreeWind:data.daily[3].wind_speed,
        dThreeHum:data.daily[3].humidity,

        dFourDate:data.daily[4].dt,
        dFourIcon:data.daily[4].weather[0].icon,
        dFourTemp:data.daily[4].temp.day,
        dFourWind:data.daily[4].wind_speed,
        dFourHum:data.daily[4].humidity,

        dFiveDate:data.daily[5].dt,
        dFiveIcon:data.daily[5].weather[0].icon,
        dFiveTemp:data.daily[5].temp.day,
        dFiveWind:data.daily[5].wind_speed,
        dFiveHum:data.daily[5].humidity,
      };
      localStorage.setItem('current', JSON.stringify(current));
      renderCurrentItem();
      // console.log(data.daily[2].dt)
      // console.log(data.current.weather[0].icon)
    })
}

function renderCurrentItem() {
  var lastItem = JSON.parse(localStorage.getItem('current'));
  var date = moment.unix(lastItem.currentDate).format("MM/DD/YYYY");
  var dateOne = moment.unix(lastItem.dOneDate).format("MM/DD/YYYY");
  var dateTwo = moment.unix(lastItem.dTwoDate).format("MM/DD/YYYY");
  var dateThree = moment.unix(lastItem.dThreeDate).format("MM/DD/YYYY");
  var dateFour = moment.unix(lastItem.dFourDate).format("MM/DD/YYYY");
  var dateFive = moment.unix(lastItem.dFiveDate).format("MM/DD/YYYY");
  // var icon = '<img src="http://openweathermap.org/img/wn/' + lastItem.currentIcon + '@2x.png"></img>';
  // console.log(lastItem.currentIcon);
  // console.log(icon);
  if (lastItem !== null) {
    /* Display current Date*/
    cityHeaderEl.textContent = lastItem.currentCity + ' (' + date + ') ';
    //iconHeaderEl.innerHTML = <img src="http://openweathermap.org/img/wn/${lastItem.currentIcon}@2x.png"></img>;
    tempHeaderEl.textContent = 'Temp: '+ lastItem.curretTemp + '°F';
    windHeaderEl.textContent = 'Wind: '+ lastItem.currentWind + ' MPH';
    humHeaderEl.textContent = 'Humidity: '+ lastItem.currentHumidity + ' %';
    uviHeaderEl.innerHTML = 'UV Index: <span id="span"> '+ lastItem.currentUvi + ' </span>';
    if (lastItem.currentUvi < 3) {
      document.querySelector('span').style.backgroundColor = 'green';
    } else if (lastItem.currentUvi < 6) {
      document.querySelector('span').style.backgroundColor = 'orange';
    } else {
      document.querySelector('span').style.backgroundColor = 'red';
    }

    /* Display date-1 */
    document.getElementById('date1').textContent = dateOne;
    document.getElementById('temp1').textContent = 'Temp: '+ lastItem.dOneTemp + '°F';
    document.getElementById('wind1').textContent = 'Wind: '+ lastItem.dOneWind + ' MPH';
    document.getElementById('humidity1').textContent = 'Humidity: '+ lastItem.dOneHum + ' %';

    /* Display date-2 */
    document.getElementById('date2').textContent = dateTwo;
    document.getElementById('temp2').textContent = 'Temp: '+ lastItem.dTwoTemp + '°F';
    document.getElementById('wind2').textContent = 'Wind: '+ lastItem.dTwoWind + ' MPH';
    document.getElementById('humidity2').textContent = 'Humidity: '+ lastItem.dTwoHum + ' %';

    /* Display date-3 */
    document.getElementById('date3').textContent = dateThree;
    document.getElementById('temp3').textContent = 'Temp: '+ lastItem.dThreeTemp + '°F';
    document.getElementById('wind3').textContent = 'Wind: '+ lastItem.dThreeWind + ' MPH';
    document.getElementById('humidity3').textContent = 'Humidity: '+ lastItem.dThreeHum + ' %';

    /* Display date-4 */
    document.getElementById('date4').textContent = dateFour;
    document.getElementById('temp4').textContent = 'Temp: '+ lastItem.dFourTemp + '°F';
    document.getElementById('wind4').textContent = 'Wind: '+ lastItem.dFourWind + ' MPH';
    document.getElementById('humidity4').textContent = 'Humidity: '+ lastItem.dFourHum + ' %';

    /* Display date-5 */
    document.getElementById('date5').textContent = dateFive;
    document.getElementById('temp5').textContent = 'Temp: '+ lastItem.dFiveTemp + '°F';
    document.getElementById('wind5').textContent = 'Wind: '+ lastItem.dFiveWind + ' MPH';
    document.getElementById('humidity5').textContent = 'Humidity: '+ lastItem.dFiveHum + ' %';
  } else {
    return;
  }
}


cityFormEl.addEventListener('submit', function(e) {
  e.preventDefault();
  getHeader(cityNameEl.value);
  getCityBtn(cityNameEl.value);
});
// cityFormEl.addEventListener('click', function(e) {
//   getCityBtn(cityNameEl.value);
// });
renderCurrentItem();
