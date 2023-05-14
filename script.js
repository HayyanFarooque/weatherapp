function getWeather() {
    const cityName = document.getElementById('city-input').value;
    const apiKey = 'YOUR_API_KEY';

    if (!cityName.trim()) {
        alert('Please enter a city name.');
        return;
    }

    // Get current weather
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const celsius = data.main.temp - 273;
            const description = data.weather[0].description;
            const city = data.name;

            document.getElementById('current-weather').innerHTML = `
                <div class="weather-card">
                    <h2>${city}</h2>
                    <p>${celsius.toFixed(2)}&deg;C</p>
                    <p>${description}</p>
                </div>`;
        })
        .catch(err => {
            alert(err.message === 'Not Found' ? "City not found!" : "An error occurred!");
        });

    // Get 5-day forecast
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(data => {
            let forecastHTML = '<h2>5-Day Forecast</h2>';

            data.list.forEach((forecast, index) => {
                if (index % 8 === 0) {
                    const celsius = forecast.main.temp - 273;
                    forecastHTML += `
                        <div class="weather-card">
                            <h3>${forecast.dt_txt.split(' ')[0]}</h3>
                            <p>${celsius.toFixed(2)}&deg;C</p>
                            <p>${forecast.weather[0].description}</p>
                        </div>`;
                }
            });

            document.getElementById('forecast').innerHTML = forecastHTML;
        })
        .catch(err => {
            alert(err.message === 'Not Found' ? "City not found!" : "An error occurred!");
        });
}
