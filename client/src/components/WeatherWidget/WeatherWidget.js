import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./WeatherWidget.css";

export default function WeatherWidget({ apiKey }) {
  const [weatherData, setWeatherData] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial render
  // Get location from browser
  useEffect(() => {
    getLocation();
  }, []);

  // If lat and lon are changed, fetch weather data
  // Both must be valid at the same time
  useEffect(() => {
    if (lat && lon) fetchWeatherData();
  }, [lat, lon]);

  function getLocation() {
    // Set loading to true
    setLoading(true);

    // Get current position
    // Pass success and error callbacks
    // If geolocation is not supported, set loading to null
    setLat(
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Set latitude and longitude
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        () => {
          console.error("WeatherWidget: Geolocation is not supported.");
          setLoading(null);
        }
      )
    );
  }

  // Fetch weather data from OpenWeatherMap
  // API: https://openweathermap.org/current
  async function fetchWeatherData() {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`,
      // Disable credentials
      { withCredentials: false }
    );

    // Set weather data
    setWeatherData(response.data);

    // Set loading to false if weather data is available
    setLoading(false);
  }

  // Convert string to title case
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  if (loading) return <LoadingSpinner size={"2rem"} />;
  else if (loading === null) return <></>;
  else if (weatherData) {
    // Destructure weather data
    const { main, weather } = weatherData;
    const temperature = main.temp;
    const weatherCondition = toTitleCase(weather[0].description);
    const icon = weather[0].icon;

    return (
      <>
        <div className="WeatherWidget">
          <div>
            {/* Weather icon */}
            <img
              src={`http://openweathermap.org/img/w/${icon}.png`}
              alt={weatherCondition}
            />
            {/* Temperature */}
            <div>
              {temperature}&deg;F
              <br />
              {/* Weather Condition */}
              {weatherCondition}
            </div>
          </div>
        </div>
      </>
    );
  }
}
