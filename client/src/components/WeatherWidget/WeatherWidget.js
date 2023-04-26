import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Row, Col } from "react-bootstrap";
import "./WeatherWidget.css";

export default function WeatherWidget(props) {
  const [weatherData, setWeatherData] = useState(null);
  const [shrunk, setShrunk] = useState(false);

  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  // initialize the loading state to true on load
  const [loading, setLoading] = useState(true);

  // Initial render
  // Get location from browser
  useEffect(() => {
    getLocation();
  }, []);

  // If the navbar is shrunk, just show the weather icon
  useEffect(() => {
    setShrunk(props.collapsed);
  }, [props.collapsed]);

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
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${props.apiKey}&units=imperial`,
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

  function weatherText(temp, condition) {
    return (
      <Col xs={9}>
        <Row>
          {/* Temperature */}
          <div style={{ fontSize: "14px" }}>{temp}&deg;F</div>
        </Row>
        <Row>
          {/* Weather condition */}
          <div style={{ fontSize: "12px" }}>{condition}</div>
        </Row>
      </Col>
    );
  }

  // if loading, show loading spinner
  if (loading) return <LoadingSpinner size={"2rem"} />;
  // if geolocation is not supported, show nothing
  else if (loading === null) return <></>;
  // if weather data is available, show weather widget
  else if (weatherData) {
    // Destructure weather data
    const { main, weather } = weatherData;
    const temperature = main.temp;
    const weatherCondition = toTitleCase(weather[0].description);
    const icon = weather[0].icon;

    return (
      <>
        <div className="WeatherWidget">
          <Row>
            <Col xs={3}>
              {/* Weather icon */}
              <img
                src={`http://openweathermap.org/img/w/${icon}.png`}
                alt={weatherCondition}
              />
            </Col>
            {/* If navbar is not shrunk, show the weather text information too */}
            {!shrunk && weatherText(temperature, weatherCondition)}
          </Row>
        </div>
      </>
    );
  }
}
