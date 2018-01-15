
let date = document.querySelector('input[type="date"]');
let cities = [];
let url = 'http://api.worldweatheronline.com/premium/v1/search.ashx?format=json&key=45075ea5a0634356a83155447181401&query=';
let chouseCity = {};

date.addEventListener('change', function (e) {
    console.log(e.target.value);
});

function searchLocation(e) {
    // if (e.target.value.length < 4) return;
    fetch(url + e.target.value)
        .then(blonb => blonb.json())
        .then(data => {
            if (data.data){
                console.log(data.data.error[0].msg);
            } else {
                cities.push(...data.search_api.result);
                console.table(cities); 
                displayRes(); 
            } 
        });
}

function displayRes() {
    // const matchArray = findMatches(this.value, cities);
    const html = cities.map((place, id) => {
        // const regex = new RegExp(this.value, 'gi');
        // const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        // const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
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
    console.dir(e.target.dataset.id);
    chouseCity = cities[e.target.dataset.id];
    suggestions.innerHTML = ' ';
}

var searchInput = document.querySelector('input#search');
var suggestions = document.querySelector('.suggestions');
searchInput.addEventListener('click', searchLocation);
document.querySelector('input[type="text"]').addEventListener('keyup', () => {
    suggestions.innerHTML = ' ';
});

