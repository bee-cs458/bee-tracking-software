import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherIndicator = ({ apiKey }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  // Initial render
  // Get location from browser
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (lat && lon) fetchWeatherData();
  }, [lat, lon]);

  // Get location from browser
  // Set lat and lon
  function getLocation() {
    if (navigator.geolocation) {
      setLat(
        navigator.geolocation.getCurrentPosition((position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        })
      );
    }
  }

  const fetchWeatherData = async () => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`,
      { withCredentials: false }
    );

    setWeatherData(response.data);
  };

  if (weatherData) {
    const { main, weather } = weatherData;
    const temperature = main.temp;
    const weatherCondition = weather[0].description;
    const icon = weather[0].icon;

    return (
      <div>
        <h2>Weather</h2>
        <div>
          <img
            src={`http://openweathermap.org/img/w/${icon}.png`}
            alt={weatherCondition}
          />
          <p>Temperature: {temperature}&deg;F</p>
          <p>Condition: {weatherCondition}</p>
        </div>
      </div>
    );
  } else if (lat !== null && lon !== null) {
    return <div>Loading...</div>;
  } else {
    return <div>Location not found</div>;
  }
};

export default WeatherIndicator;
