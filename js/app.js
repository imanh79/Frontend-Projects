const btn = document.querySelector('.butt');
const btnf = document.querySelector('.box-outside-search');
const ezin = document.querySelector('.input-search');
const country = document.querySelector('.country-span');
const weather = document.querySelector('.box-outside__weather-span');
const windspeed = document.querySelector('.box-outside__windspeed-span');
const temperature = document.querySelector('.box-outside__temperature-span');
const humidity = document.querySelector('.box-outside__humidity-span');
const date = document.querySelector('.box-outside__date-span');
const isvg = document.querySelector('.svgweather');
const spana = document.querySelector('.span-all');
const texthide = document.querySelector('.text-hide');
const boxweath = document.querySelector('.box-weather');
let dataaa = new Date();

btnf.addEventListener('click', (e) => {
    e.preventDefault();
});
btn.addEventListener('click', (e) => {
    fetch(
            'https://api.openweathermap.org/data/2.5/weather?q=' +
            ezin.value +
            '&appid=c0abf29b0948f09ebe8bfd66715ff107'
        )
        .then((result) => {
            return result.json();
        })
        .then((res) => {
            result(res);
            console.log(res.cod);
        })
        .catch((err) => {
            console.log(err);
            let tru = true;
            spana.classList.add('displaynone');
            texthide.classList.add('displayblock');

            // country.innerHTML = 'Iran';
        });
});

function result(re) {
    date.innerHTML = dataaa;
    country.innerHTML = re.name;
    weather.innerHTML = re.weather[0].main;
    windspeed.innerHTML = re.wind.speed;
    temperature.innerHTML = `${Math.floor(
    re.main.temp_min - 273.15
  )}°c / ${Math.floor(re.main.temp_max - 273.15)}°c`;
    humidity.innerHTML = re.main.humidity + '°c';
    if (re.cod == '200') {
        spana.classList.remove('displaynone');
        texthide.classList.remove('displayblock');
    }

    if (weather.innerHTML == 'Haze') {
        isvg.className = '';
        isvg.classList.add('fa-solid', 'fa-smog');
    } else if (weather.innerHTML == 'Clouds') {
        isvg.className = '';
        isvg.classList.add('fa-solid', 'fa-cloud');
    } else if (weather.innerHTML == 'Clear') {
        isvg.className = '';
        isvg.classList.add('fa-solid', 'fa-sun');
    } else if (weather.innerHTML == 'Snow') {
        isvg.className = '';
        isvg.classList.add('fa-solid', 'fa-snowflake');
        // boxweath.style.background = `url('https://media4.giphy.com/media/xkGkrAIbJqAtKlsZI5/giphy.gif?cid=ecf05e47jv78pa67s26vfpr2eyi2wcybv5cmy1eost28ijty&rid=giphy.gif&ct=s')`;
    } else if (weather.innerHTML == 'Rain') {
        isvg.className = '';
        isvg.classList.add('fa-solid', 'fa-cloud-showers-heavy');
    } else if (weather.innerHTML == 'Mist') {
        isvg.className = '';
        isvg.classList.add('fa-solid', 'fa-smog');
    }
}