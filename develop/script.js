var requestUrl= 'https://api.openweathermap.org/data/2.5/forecast?q=Arizona,us&mode=xml&appid=634fe24f10905ef6a1d05817cb206509'
var searchBtn = document.getElementById('searchBtn')
var searchForm = document.getElementById('searchWeather')
var citySelected = document.getElementById('searchCity')
var cityDisplayed = document.getElementById('cityDisplayed')
var weatherInformation = document.getElementById('weatherInformation')
var weatherBlock = document.getElementsByClassName('weatherBlock')



console.log(cityDisplayed)
var formSubmitHandler = function (event) {
    event.preventDefault();

    var cities = citySelected.value.trim()
    console.log(cities)
    if (cities){
    getCityInformation(cities)
       // cityDisplayed =cities;
        //cityDisplayed.textContent = "";
        //weatherInformation = "";
    } else{
        alert("No city was selected")
    }
}

var getCityInformation = function(city){
    var actualWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=634fe24f10905ef6a1d05817cb206509'
    console.log (actualWeatherUrl)
    fetch(actualWeatherUrl)
        .then(function(response){
            if(response.ok) {
                console.log(response)
                response.json().then(function (data){
                    console.log(data)
                    console.log(data.name)
                    console.log(data.dt)
                    console.log(moment.unix(data.dt).format("MM/DD/YYYY"))
                    console.log(data.weather[0].icon);
                    console.log(data.main.temp);
                    console.log(data.main.humidity)
                    console.log(data.wind.speed);
                    cityDisplayed.innerHTML = data.name
                    var imageDOM = document.getElementById('image')
                    var img = document.createElement('img')
                    img.src= "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
                    console.log(img);
                    document.getElementById('cityDisplayed').appendChild(img)
                    
                    //src.append(image)
                    weatherInformation.innerHTML= "";

                    //http://openweathermap.org/img/wn/ + "data.weather[0].icon" + ".png"
                    //src = 
                    //hay que crear otra función que la pueda pasar la longitud y latitud, y las pueda unir.

                    var unOrderList = document.createElement("ul");
                    var listItem = document.createElement("li");
                    listItem.innerText = data.main.temp + " ºF"
                    unOrderList.append(listItem);
                    
                    var listItem2 = document.createElement("li");
                    listItem2.innerText = data.wind.speed + " MPH";
                    unOrderList.append(listItem2)

                    var listItem3 = document.createElement("li");
                    listItem3.innerText = data.main.humidity + "%"
                    unOrderList.append(listItem3)
                    weatherInformation.append(unOrderList);
                });
            } else{
                alert('No page was found')
            };
        });
};


//var getCityInformation = function(city){
  //  var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + ',us&mode=xml&appid=634fe24f10905ef6a1d05817cb206509'
    //console.log (weatherUrl)
    //fetch(weatherUrl)
      //  .then(function(response){
        //    if(response.ok) {
          //      console.log(response)
            //    response.json().then(function (data){
                //    console.log(data)
              //  });
           // } else{
            //    alert('No page was found')
           // };
    //    });
//};



function searchFunction (){
    console.log (city)
};

searchBtn.addEventListener('click', formSubmitHandler)

console.log (requestUrl);