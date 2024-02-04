async function moduleProject4() {

  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  let descriptions = [
    ["Sunny", "☀️"],
    ["Cloudy", "☁️"],
    ["Rainy", "🌧️"],
    ["Thunderstorm", "⛈️"],
    ["Snowy", "❄️"],
    ["Partly Cloudy", "⛅️"]
  ]

  // 👉 Tasks 1 - 5 go here
  const weatherWidget = document.querySelector('#weatherWidget');
  weatherWidget.style.display = 'none';
  const citySelect = document.querySelector('#citySelect');
  const info = document.querySelector('.info');

  citySelect.addEventListener('change', async () => {
    try {
      citySelect.setAttribute('disabled', 'disabled');
      weatherWidget.style.display = 'none';
      info.textContent = 'Fetching weather data...';

      const city = citySelect.value;
      const response = await axios.get(`/api/weather?city=${city}`);
      const data = response.data;
      const { current, forecast, location } = data;

      console.log(data);

      info.textContent = '';
      weatherWidget.style.display = 'block';
      citySelect.removeAttribute('disabled');

      document.querySelector('#apparentTemp :nth-child(2)').textContent =
        `${current.apparent_temperature}°`;
      document.querySelector('#todayDescription').textContent =
        descriptions.find(d => d[0] === current.weather_description)[1];
      document.querySelector('#todayStats :nth-child(1)').textContent =
        `${current.temperature_min}°/${current.temperature_max}°`;
      document.querySelector('#todayStats :nth-child(2)').textContent =
        `Precipitation: ${current.precipitation_probability * 100}%`;
      document.querySelector('#todayStats :nth-child(3)').textContent =
        `Humidity: ${current.humidity}%`;
      document.querySelector('#todayStats :nth-child(4)').textContent =
        `Wind: ${current.wind_speed}m/s`;
      document.querySelector('#location :nth-child(1)').textContent =
        `${location.city}`;

      forecast.daily.forEach((day, index) => {
        const card = document.querySelectorAll('.next-day')[index];

        const weekDay = card.children[0];
        const weather = card.children[1];
        const low_high = card.children[2];
        const precipitation = card.children[3];

        const date = day.date.slice(0, 9) + (parseInt(day.date.at(-1)) + 1);

        weekDay.textContent = getWeekDay(date);
        weather.textContent = descriptions.find(d => d[0] === day.weather_description)[1];
        low_high.textContent = `${day.temperature_min}°/${day.temperature_max}°`;
        precipitation.textContent = `Precipitation: ${day.precipitation_probability * 100}%`;
      })
    } catch (error) {
      console.log(error.message);
    }
  })

  function getWeekDay(dateStr) {
    let date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long'});
  }

  // 👆 WORK WORK ABOVE THIS LINE 👆

}

// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { moduleProject4 }
else moduleProject4()
