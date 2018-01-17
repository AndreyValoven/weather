
let searchUrl = 'https://api.worldweatheronline.com/premium/v1/search.ashx?leng=en&format=json&key=45075ea5a0634356a83155447181401&q=';
let weatherUrl = 'https://api.worldweatheronline.com/premium/v1/weather.ashx?leng=en&key=45075ea5a0634356a83155447181401&format=json&q='

let chouseCity = {};
let cities = [];

let weatherInfo = document.querySelector('#weahert_info');

let buttonInput = document.querySelector('input#search');
let suggestions = document.querySelector('.suggestions');
let inputSearch = document.querySelector('input[type="text"]');

let date = document.querySelector('input[type="date"]');
let today = document.querySelector('input#today');
let tomorrow = document.querySelector('input#tomorrow');

let dateShow = document.querySelector('#chosen_date p');

let tempC = document.querySelector('.info_short h1');
let city = document.querySelector('.info_short h3');
let feels = document.querySelector('#feels');
let wind = document.querySelector('#wind');
let humidity = document.querySelector('#humidity');
let pressure = document.querySelector('#pressure');

let img = document.querySelector('.info_img img');

buttonInput.addEventListener('click', searchLocation);
inputSearch.addEventListener('click', (e) => {
    suggestions.innerHTML = ' ';
    e.target.value = '';
});


date.addEventListener('change', function (e) {
    console.log(e.target.value);
    getWeather(e.target.value);
});

today.addEventListener('click', (e) => getWeather(e.target.value));

tomorrow.addEventListener('click',(e) => getWeather(e.target.value))

function setData(date) {
    if(typeof(date) === 'string') {
        let now = new Date();
        date.toLocaleLowerCase === 'tomorrow' ? now.setDate(now.getDate() + 1): now;
        let month = 
        dateShow.innerHTML = `${ now.getDate() }.${ now.getMonth() === 0 ? now.getMonth() + 1: now.getMonth() }.${ now.getFullYear() }`;
        dateShow.classList.toggle('hiden');
    }
}

function getWeather(day) {
    setData(day);
    if (typeof chouseCity.latitude === 'undefined') {
        alert('Don\`t chouse city')
        return;
    }
    fetch(weatherUrl + `${chouseCity.latitude}, ${chouseCity.longitude}&data=${day}`)
        .then(res => res.json())
        .then(weatherResult);
}

function weatherResult(data) {
    tempC.innerHTML = `${data.data.current_condition[0].temp_C}C`;
    city.innerHTML = `${chouseCity.areaName[0].value} | ${data.data.current_condition[0].weatherDesc[0].value}`
    img.src = data.data.current_condition[0].weatherIconUrl[0].value;
    feels.innerHTML = `${data.data.current_condition[0].FeelsLikeC}C`
    wind.innerHTML = `${data.data.current_condition[0].winddir16Point} | ${data.data.current_condition[0].windspeedKmph} km/hr`;
    humidity.innerHTML = data.data.current_condition[0].humidity;
    pressure.innerHTML = data.data.current_condition[0].pressure;
    weatherInfo.classList.toggle('hiden');

}

function searchLocation() {
    fetch(searchUrl + inputSearch.value)
        .then(blonb => blonb.json())
        .then(data => {
            if (data.data){
                console.log(data.data.error[0].msg);
            } else {
                cities.push(...data.search_api.result);
                displayRes(); 
            } 
        });
}

function displayRes() {
    const html = cities.map((place, id) => {
        return `
                <li>
                    <span class="name" data-id=${id}>${place.areaName[0].value}, ${place.country[0].value}</span>
                    <span class="population">${place.population}</span>
                </li>
                `;
    }).join('');
    suggestions.innerHTML = html;
    addClick();
}

function addClick() {
    let li = document.querySelectorAll('li')
    for(let i = 0; i < cities.length; i++) {
        li[i].addEventListener('click', clickLi);
    }
}

function clickLi(e) {
    chouseCity = cities[e.target.dataset.id];
    suggestions.innerHTML = ' ';
    inputSearch.value = chouseCity.areaName[0].value;
}



