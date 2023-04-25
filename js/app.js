// Select DOM elements
const btn = document.querySelector('.icon');
// const btnf = document.querySelector('.icon');
const ezin = document.querySelector('#search');
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
const svgroad = document.querySelector("#svg-road")
const spantime = document.querySelector(".span-time")
const toggleButton = document.getElementById('dark-mode-toggle');
// Function to handle API response
let currentData = {};
// Function to handle API response
function handleResponse(res) {
    // Clear previous country data
    currentData = {};
    const dataaa = new Date();
    date.innerHTML = dataaa;
    country.innerHTML = res.name;
    weather.innerHTML = res.weather[0].main;
    windspeed.innerHTML = res.wind.speed;
    const minTempCelsius = Math.floor(res.main.temp_min - 273.15);
    const maxTempCelsius = Math.floor(res.main.temp_max - 273.15);
    temperature.innerHTML = `${minTempCelsius}°c / ${maxTempCelsius}°c`;
    humidity.innerHTML = res.main.humidity + '°c';

    // Show span-all and hide text-hide if response status code is 200
    if (res.cod === '200') {
        spana.classList.remove('displaynone');
        texthide.classList.remove('displayblock');
    }

    // Change SVG icon based on weather description
    switch (weather.innerHTML) {
        case 'Haze':
            isvg.className = '';
            isvg.classList.add('fa-solid', 'fa-smog');
            break;
        case 'Clouds':
            isvg.className = '';
            isvg.classList.add('fa-solid', 'fa-cloud');
            break;
        case 'Clear':
            isvg.className = '';
            isvg.classList.add('fa-solid', 'fa-sun');
            break;
        case 'Snow':
            isvg.className = '';
            isvg.classList.add('fa-solid', 'fa-snowflake');
            break;
        case 'Rain':
            isvg.className = '';
            isvg.classList.add('fa-solid', 'fa-cloud-showers-heavy');
            break;
        case 'Mist':
            isvg.className = '';
            isvg.classList.add('fa-solid', 'fa-smog');
            break;
    }
}

// Function to handle API error
function handleError(error) {
    console.log(error);
    spana.classList.add('displaynone');
    texthide.classList.add('displayblock');
    // country.innerHTML = 'Iran';
}
spana.style.display = "none"
ezin.addEventListener("input", () => {
    console.log(ezin.value);
    if (ezin.value === "") {
        spana.style.display = "none"
        svgroad.style.display = "block"
        texthide.classList.remove('displayblock');
        spantime.style.visibility = "hidden"

    }
})
ezin.addEventListener('change', () => {
    // Remove the error styles

    spana.classList.remove('displaynone');
    texthide.classList.remove('displayblock');
});

// Event listener for button click
btn.addEventListener('click', (event) => {
    event.preventDefault();
    svgroad.style.display = "none"
    spana.style.display = "flex"
    spantime.style.visibility = "visible"
    fetchWeatherData(ezin.value);
});

function clearCountryData() {
    country.innerHTML = "";
    weather.innerHTML = "";
    windspeed.innerHTML = "";
    temperature.innerHTML = "";
    humidity.innerHTML = "";
    date.innerHTML = "";
    isvg.className = '';
}
// Function to fetch weather data from API
function fetchWeatherData(city) {
    const apiKey = 'c0abf29b0948f09ebe8bfd66715ff107';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    clearCountryData()
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.name === undefined) {
                throw new Error('City not found');
            }
            handleResponse(data);
        })
        .catch(error => {
            handleError(error);
        });
}

// Event listener for box-outside-search click
btn.addEventListener('click', (event) => {
    event.preventDefault();
});
// object describing the possible values for the light/dark theme
const isEnabled = localStorage.getItem('isDarkModeEnabled');

const defaultColors = {
    '--background-color': '#fff',
    '--text-color': '#1e1d1d'
};
const darkModeColors = {
    '--background-color': '#1e1d1d',
    '--text-color': '#fff'
};

// check if dark mode is enabled in local storage
const isDarkModeEnabled = localStorage.getItem('isDarkModeEnabled') === 'true';

// set the initial colors based on the stored value
if (isDarkModeEnabled) {
    setColors(darkModeColors);
    toggleButton.innerHTML = `<i class="fa-solid fa-sun-bright"></i>`;
    toggleButton.style.setProperty('color', '#fff');
    toggleButton.style.setProperty('background-color', '#3a3a3a');
} else {
    setColors(defaultColors);
    toggleButton.innerHTML = `<i class="fa-duotone fa-moon"></i>`;
    toggleButton.style.setProperty('color', '#1e1d1d');
    toggleButton.style.setProperty('background-color', '#dadada');
}

// add a click listener to toggle the colors and store the value
toggleButton.addEventListener('click', () => {
    const isEnabled = localStorage.getItem('isDarkModeEnabled') === 'true';
    if (isEnabled) {
        localStorage.removeItem('isDarkModeEnabled');
        setColors(defaultColors);
        toggleButton.innerHTML = `<i class="fa-duotone fa-moon"></i>`;
        toggleButton.style.setProperty('color', '#1e1d1d');
        toggleButton.style.setProperty('background-color', '#dadada');
    } else {
        localStorage.setItem('isDarkModeEnabled', true);
        setColors(darkModeColors);
        toggleButton.innerHTML = `<i class="fa-solid fa-sun-bright"></i>`;
        toggleButton.style.setProperty('color', '#fff');
        toggleButton.style.setProperty('background-color', '#3a3a3a');
    }
});

// helper function to set the colors on the page
function setColors(colors) {
    Object.entries(colors).forEach(([key, value]) => {
        boxweath.style.setProperty(key, value);
    });
}