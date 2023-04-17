import React, { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherWidget.css";

export default function WeatherWidget({ apiKey }) {
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

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  if (weatherData) {
    const { main, weather } = weatherData;
    const temperature = main.temp;
    const weatherCondition = toTitleCase(weather[0].description);
    const icon = weather[0].icon;

    return (
      <div className="WeatherWidget">
        <div>
          <img
            src={`http://openweathermap.org/img/w/${icon}.png`}
            alt={weatherCondition}
          />
          <div>{temperature}&deg;F</div>
          <div>{weatherCondition}</div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
