import { useState } from 'react';
import './App.css';

function App() {
  // State to store the city name entered by the user
  const [city, setCity] = useState('');
  // State to store the fetched weather data
  const [weather, setWeather] = useState(null);

  // Function to fetch weather data from OpenWeatherMap API
  const fetchWeather = () => {
    // The API Key provided for this learning project
    // In a real professional app, you should never store keys directly in frontend code.
    const API_KEY = 'e9780fe5a5c827cc0d83803e8903b73a';

    // Construct the API URL with city, API key, and metric units (for Celsius)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // Fetch data from the API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Check if the request was successful (code 200)
        if (data.cod === 200) {
          setWeather(data);
        } else {
          setWeather(null);
          alert('City not found or error occurred.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        alert('Failed to fetch weather data.');
      });
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Simple Weather App</h1>

      {/* Input field to enter city name */}
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
      />

      {/* Button to fetch weather */}
      <button
        onClick={fetchWeather}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Get Weather
      </button>

      {/* Display weather information only if weather data exists */}
      {weather && (
        <div style={{ marginTop: '30px', border: '1px solid #ccc', display: 'inline-block', padding: '20px', borderRadius: '8px' }}>
          <h2>{weather.name}</h2>
          <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{weather.main.temp} °C</p>
          <p style={{ textTransform: 'capitalize' }}>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
