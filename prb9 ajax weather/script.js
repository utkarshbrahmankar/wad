function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'weather.json', true);

  xhr.onload = function () {
    if (this.status === 200) {
      const data = JSON.parse(this.responseText);
      const weather = data[city];

      if (weather) {
        resultDiv.innerHTML = `
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Temperature:</strong> ${weather.temperature}</p>
          <p><strong>Humidity:</strong> ${weather.humidity}</p>
          <p><strong>Condition:</strong> ${weather.condition}</p>
        `;
      } else {
        resultDiv.innerHTML = `<p style="color:red;">Weather data for "${city}" not found.</p>`;
      }
    } else {
      resultDiv.innerHTML = `<p style="color:red;">Failed to load weather data.</p>`;
    }
  };

  xhr.send();
}
