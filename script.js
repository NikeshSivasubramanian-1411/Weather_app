// ========== API CONFIGURATION ==========
const apiKey = "97d779edeef4b6c1aa8970f013281418";     // Your OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="; // API endpoint with metric unit

// ========== SELECTING ELEMENTS ==========
const searchBox = document.querySelector(".search input");     // Get the input field for city name
const searchBtn = document.querySelector(".search button");    // Get the search button element
const weatherIcon = document.querySelector(".weather-icon");   // Get the image tag for weather icon
const background = document.querySelector(".background");      // Get the background container div

// ========== FUNCTION: updateBackground ==========
function updateBackground(condition) {
    condition = condition.toLowerCase();   // Convert condition text to lowercase for easier comparison

    switch (condition) {
        case "clear":
            background.style.backgroundImage = "url('images/clearday.jpg')";   // Clear day image
            break;
        case "clouds":
            background.style.backgroundImage = "url('images/cloud-fog.gif')";     // Cloudy background
            break;
        case "rain":
        case "drizzle":
            background.style.backgroundImage = "url('images/rain.gif')";       // Rain background
            break;
        case "mist":
        case "fog":
        case "haze":
            background.style.backgroundImage = "url('images/mist.gif')";       // Mist/fog background
            break;
        case "snow":
            background.style.backgroundImage = "url('images/snow.webp')";      // Snowy background
            break;
        case "wind":
            background.style.backgroundImage = "url('images/wind.gif')";       // Windy background
            break;
        default:
            background.style.backgroundImage = "url('images/wind.gif')";       // Default fallback background
    }
}

// ========== FUNCTION: checkWeather ==========
async function checkWeather(city) {
    if (!city) return;    // If city input is empty, stop the function

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`); // Call the API with city name and API key

    if (response.status == 404) {    // If city is not found (404 error)
        document.querySelector(".error").style.display = "block";     // Show error message
        document.querySelector(".weather").style.display = "none";    // Hide weather section
    } else {
        const data = await response.json();      // Convert response into JSON format

        console.log("Raw weather data:", data.weather[0]);            // Log weather info to console
        console.log("Main condition:", data.weather[0].main.toLowerCase()); // Log condition name

        // ====== Update Text Data ======
        document.querySelector(".city").innerHTML = data.name;                         // Show city name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; // Show temperature
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";      // Show humidity
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";         // Show wind speed

        // ====== Weather Icon ======
        let condition = data.weather[0].main;   // Get weather condition (e.g., Clouds, Rain, etc.)
        switch (condition) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";     // Clouds icon
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";      // Clear icon
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";       // Rain icon
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";    // Drizzle icon
                break;
            case "Mist":
            case "Fog":
                weatherIcon.src = "images/mist.png";       // Mist icon
                break;
            case "Snow":
                weatherIcon.src = "images/snow.png";       // Snow icon
                break;
            case "Wind":
                weatherIcon.src = "images/wind.png";       // Wind icon
                break;
            default:
                weatherIcon.src = "images/default.png";    // Default icon
        }

        updateBackground(condition);   // Change background based on condition

        document.querySelector(".weather").style.display = "block";  // Show weather card
        document.querySelector(".error").style.display = "none";     // Hide error message
    }
}

// ========== EVENT LISTENER ==========
searchBtn.addEventListener("click", () => {
    const city = searchBox.value;     // Get value entered in input box
    checkWeather(city);              // Call function to fetch and display weather
});

// ========== INITIAL BACKGROUND ON PAGE LOAD ==========
window.addEventListener("load", () => {
    background.style.backgroundImage = "url('images/wind.gif')"; // Set wind.gif as default background
});

/*
    Summary:
    This JavaScript file handles the core functionality of the Weather App.
    It connects to the OpenWeatherMap API to fetch real-time weather data based on user input.
    It updates the DOM with the temperature, city name, humidity, wind speed, and weather icon.
    It also dynamically changes the background image based on weather conditions.
    Error handling is included for invalid city names.
*/
