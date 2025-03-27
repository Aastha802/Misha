const apiKey = 'df849dc69d2776cbbc45b55c5f7338bb';

function searchWeather() {
    const city = document.getElementById('city-input').value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    document.getElementById('loading').style.display = 'block';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').style.display = 'none';

            if (data.cod !== 200) {
                document.getElementById('loading').innerText = 'Please check your city name and try again.';
                return;
            }

            const weather = data.weather[0];
            const main = data.main;
            const wind = data.wind;
            const dt = new Date(data.dt * 1000);

            document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById('date').innerText = dt.toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            document.getElementById('main-weather').innerText = weather.main;
            document.getElementById('temperature').innerText = `${main.temp}°C`;
            document.getElementById('pressure').innerText = `${main.pressure} hPa`;
            document.getElementById('humidity').innerText = `${main.humidity}%`;
            document.getElementById('wind-speed').innerText = `${wind.speed} m/s`;
            document.getElementById('wind-direction').innerText = `${wind.deg}°`;
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${weather.icon}.png`;
        })
        .catch(error => {
            document.getElementById('loading').innerText = 'Failed to load weather data.';
            console.error('Error fetching weather data:', error);
        });
}
