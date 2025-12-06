// =======================
// DIGITAL CLOCK
// =======================

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    const meridiem = hours >= 12 ? "PM" : "AM";

    hours = (hours % 12) || 12;
    hours = hours.toString().padStart(2, "0");

    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    const timeString = `${hours}:${minutes}:${seconds} ${meridiem}`;
    document.getElementById("clock").textContent = timeString;
}

updateClock();
setInterval(updateClock, 1000);


// =======================
// WEATHER APP
// =======================

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector("#cityInput");
const card = document.querySelector(".weatherCard");
const apiKey = "ab07334f1f3402375ed7160e785f9385";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        displayError("Please enter a city");
        return;
    }

    getWeatherData(city);
});

// =======================
// DEFAULT CITY ON PAGE LOAD
// =======================

window.addEventListener("DOMContentLoaded", () => {
    const defaultCity = "Nairobi"; // Change this if you want
    getWeatherData(defaultCity);
});


// =======================
// FETCH WEATHER DATA
// =======================

async function getWeatherData(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found. Please check spelling.");
        }

        const data = await response.json();

        displayWeather(data);

    } catch (error) {
        displayError(error.message);
    }
}


// =======================
// DISPLAY WEATHER
// =======================

function displayWeather(data) {
    card.classList.remove("hidden");
    card.classList.add("show");

    document.querySelector(".cityDisplay").textContent = data.name;
    document.querySelector(".tempDisplay").textContent = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidityDisplay").textContent = "Humidity: " + data.main.humidity + "%";
    document.querySelector(".descDisplay").textContent = data.weather[0].description;
    document.querySelector(".weatherEmoji").textContent = getWeatherEmoji(data.weather[0].id);

    const errorDisplay = document.querySelector(".errorDisplay");
    if (errorDisplay) errorDisplay.classList.add("hidden");
}


// =======================
// WEATHER EMOJI
// =======================

function getWeatherEmoji(id) {
    if (id >= 200 && id < 300) return "⛈️";
    if (id >= 300 && id < 600) return "🌧️";
    if (id >= 600 && id < 700) return "❄️";
    if (id >= 700 && id < 800) return "🌫️";
    if (id === 800) return "☀️";
    if (id > 800) return "☁️";
    return "❓";
}


// =======================
// DISPLAY ERROR
// =======================

function displayError(message) {
    card.classList.remove("show");
    card.classList.add("hidden");

    const errorDisplay = document.querySelector(".errorDisplay");
    if (errorDisplay) {
        errorDisplay.textContent = message;
        errorDisplay.classList.remove("hidden");
    } else {
        const p = document.createElement("p");
        p.classList.add("errorDisplay");
        p.textContent = message;
        card.appendChild(p);
    }
}
