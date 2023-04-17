import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherIndicator = ({ apiKey, city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`,
        { withCredentials: false }
      );

      setWeatherData(response.data);
    };

    fetchWeatherData();
  }, [apiKey, city]);

  if (!weatherData) {
    return <div style={{ color: "whitesmoke" }}>Loading weather data...</div>;
  }

  const { main, weather } = weatherData;
  const temperature = main.temp;
  const weatherCondition = weather[0].description;
  const icon = weather[0].icon;

  return (
    <div style={{ color: "whitesmoke" }}>
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
};

export default WeatherIndicator;
