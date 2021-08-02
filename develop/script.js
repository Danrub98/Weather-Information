var requestUrl= 'https://api.openweathermap.org/data/2.5/forecast?q=Arizona,us&mode=xml&appid=634fe24f10905ef6a1d05817cb206509'
var searchBtn = document.getElementById('searchBtn')
var searchForm = document.getElementById('searchWeather')
var citySelected = document.getElementById('searchCity')
var cityDisplayed = document.getElementById('cityDisplayed')
var weatherInformation = document.getElementById('weatherInformation')
var forecastInfo =  document.getElementById('forecastInfo')
var weatherBlock = document.getElementsByClassName('weatherBlock')
var fiveForecast = document.getElementById('5forecast')
var celcius = 273.15
let clearHistory = document.getElementById('clearHistory')
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];




console.log(cityDisplayed)
var formSubmitHandler = function (event) {
    event.preventDefault();

    

    var cities = citySelected.value.trim()
    searchTerm = citySelected.value.trim()
    searchHistory.push(searchTerm);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderSearchHistory();

    console.log(cities)
    if (cities){
    getCityInformation(cities)
    } else{
        alert("No city was selected")
    }
}

var getCityInformation = function(city){
    console.log(city)
    var actualWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=634fe24f10905ef6a1d05817cb206509'
    console.log (actualWeatherUrl)
    console.log(weekForecastUrl)
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
                    listItem.innerText = moment.unix(data.dt).format("MM/DD/YYYY")
                    unOrderList.append(listItem)


                    var listItem1 = document.createElement("li");
                    listItem1.innerText = (parseInt( Number(data.main.temp)  - Number(celcius), 10) + "Cº")
                    unOrderList.append(listItem1);
                    
                    var listItem2 = document.createElement("li");
                    listItem2.innerText = data.wind.speed + " MPH";
                    unOrderList.append(listItem2)

                    var listItem3 = document.createElement("li");
                    listItem3.innerText = "Humidity " +  data.main.humidity + "%" 
                    unOrderList.append(listItem3)
                    weatherInformation.append(unOrderList);

                    
                    
                });
                
            } 
            else{
                alert('No page was found')
            };
        });
        var weekForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=634fe24f10905ef6a1d05817cb206509'
        console.log(weekForecastUrl)
        fetch(weekForecastUrl)
        .then(function(response){
            console.log(response)
            if (response.ok){
                response.json().then(function(data) {
                    console.log(data)
                    console.log(data.list[7,15,23,31,39])
                    console.log(data.list[23])
                    console.log(parseInt( Number(data.list[0].main.temp)  - Number(celcius), 10) + "Cº")
                    fiveForecast.innerHTML = ""                
                    let i = 0
                    let number = 0
                    let forecastDays= data.list[0]
                    while(i < 5 ){
                    console.log(forecastDays)
                    var img = document.createElement('img')
                    img.src= "http://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png"
                    console.log(img);
                    document.getElementById('5forecast').appendChild(img);
                    number = (Number(8) + Number(number))
                    console.log(forecastDays)

                    var unOrderList = document.createElement("ul");
                    var listItem = document.createElement("li");
                    listItem.innerText = moment.unix(forecastDays.dt).format("MM/DD/YYYY")
                    unOrderList.append(listItem)

                    var listItem1 = document.createElement("li")
                    listItem1.innerText = (parseInt( Number(forecastDays.main.temp)  - Number(celcius), 10) + "Cº")
                    unOrderList.append(listItem1);
                    
                    var listItem2 = document.createElement("li");
                    listItem2.innerText = forecastDays.wind.speed + " MPH";
                    unOrderList.append(listItem2)

                    var listItem3 = document.createElement("li");
                    listItem3.innerText = "Humidity " +  forecastDays.main.humidity + "%"
                    unOrderList.append(listItem3)
                    fiveForecast.append(unOrderList);

                    forecastDays = data.list[Number(0) + Number(number)]
                    i++;
                    }
                    forecastInfo.innerHTML= "";


                })
            }
        })
};





function searchFunction (){
    console.log (city)
    
};

searchBtn.addEventListener('click', formSubmitHandler) 

function renderSearchHistory() {
    historySection.innerHTML = "";
    for (let i=0; i<searchHistory.length; i++) {
        const historyItem = document.createElement("input");
        historyItem.setAttribute("type","text");
        historyItem.setAttribute("readonly",true);
        historyItem.setAttribute("class", "form-control d-block bg-white");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click",function() {
            getCityInformation(historyItem.value);
        })
        historySection.append(historyItem);
    }
}

clearHistory.addEventListener("click",function() {
    searchHistory = [];
    renderSearchHistory();
})

renderSearchHistory();
if (searchHistory.length > 0) {
    getCityInformation(searchHistory[searchHistory.length - 1]);
}


console.log (requestUrl);