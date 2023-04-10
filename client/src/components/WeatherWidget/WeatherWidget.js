import ReactWeather, { useOpenWeather } from "react-open-weather";
import React, { useState } from "react";

function WeatherWidget() {
  console.log("WeatherWidget");
  // const { data, isLoading, errorMessage } = useOpenWeather({
  //   key: "31ce4e6176a86ec5e02b416e968ea5f7",
  //   lat: "48.137154",
  //   lon: "11.576124",
  //   lang: "en",
  //   unit: "standard", // values are (metric, standard, imperial)
  // });

  return (
    <>
      <div> poop 
        {/* <ReactWeather
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="en"
          locationLabel="Munich"
          unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
          showForecast
        /> */}
      </div>
    </>
  );
}

export default WeatherWidget;
