import React, { useState } from "react";
import "./App.css";
import axios from "axios";

export default function App() {
  let [city, setCity] = useState("");
  let [temprature, setTemperature] = useState("");
  let [description, setDescription] = useState("");
  let [humidity, setHumidity] = useState("");
  let [wind, setWind] = useState("");
  let [icon, setIcon] = useState("");

  function updateSearch(event) {
    setCity(event.target.value);
  }

  function Start(response) {
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(response.data.weather[0].icon);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8944afa6845bd7c413a687258d3211ef&units=metric`;
    axios.get(url).then(Start);
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search for a city"
          onChange={updateSearch}
        />
        <input type="submit" value="search" />
      </form>
      <br />
      <div id="city"></div>
      <div className="information">
        <div id="temp">{`Temprature: ${Math.round(temprature)}°C`}</div>
        <div id="description">{`Description: ${description}`}</div>
        <div id="humidity">{`Humidity: ${humidity}%`}</div>
        <div id="wind">{`Wind: ${Math.round(wind)} km/h`}</div>
      </div>

      <img
        id="image"
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt=""
        width="70"
      />
    </div>
  );
}
