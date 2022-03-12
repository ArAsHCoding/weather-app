const tempElement = document.querySelector(".temp-value h2");
const descriptionElement = document.querySelector(".temp-description");
const locationElement = document.querySelector(".location h2");
const notificationElement = document.querySelector(".notification");
const dateElement = document.querySelector(".date p")

const weather = {};
weather.temperature = {
	unit: "celsius",
};

const KELVIN = 273;

const APIKey = "7993245d5908db11b6ec14976225e4da";

if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
	notificationElement.style.display = "block";
	notificationElement.innerHTML = `<p> Browser does not support Geolocation </p>`;
}

function setPosition(position) {
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;

	getWeather(latitude, longitude);
}

function showError(error) {
	notificationElement.style.display = "block";
	notificationElement.innerHTML = `<p> ${error.message}`;
}

function getWeather(latitude, longitude) {
	let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKey}`;

	fetch(api)
		.then(function (response) {
			let data = response.json();
			return data;
		})
		.then(function (data) {
			weather.temperature.value = Math.floor(data.main.temp - KELVIN);
			weather.description = data.weather[0].description;
			weather.city = data.name;
			weather.country = data.sys.country;			
		})
		.then(function () {
			displayWeather();
		});

	function displayWeather() {
		tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
		descriptionElement.innerHTML = weather.description;
		locationElement.innerHTML = `${weather.city}, ${weather.country}`;
		dateElement.innerHTML = `${date}`;
	}
}

var options = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
};

var date = new Date().toLocaleDateString("en-US", options)

