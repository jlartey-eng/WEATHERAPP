import React, { useState } from "react";

function App() {
  const key = "fb7c418929873877fbdac7f4a67bfae8"
  const base = "https://api.openweathermap.org/data/2.5/"

  const [ location, setLocation ] = useState("");
  const [ details, setDetails ] = useState({})

  const handleChange = (event) => {
    setLocation(event.target.value)
  }

  const handleSearch = (event) => {
    fetch(`${base}weather?q=${location}&units=metric&APPID=${key}`)
      .then(res => res.json())
      .then(result => {
        setLocation('');
        setDetails(result);
        console.log(result);
    })
  }


  return (
    <div className="app">
      <h1> Julia's Weather App </h1>
      <div className="container">
        <input
          type="text"
          value={location}
          placeholder="search a city"
          onChange={ (event) => handleChange(event) }
        />
        <button onClick={handleSearch}> Search </button>
      </div>
      {typeof details.main != "undefined" ? (
          <div className="info-wrap">
            <div className="location">
              <span>{details.name}, {details.sys.country} </span>
            </div>
            <div className="temperature">
              <h3> Temperature <br/> <span>{Math.round(details.main.temp)}°C</span> </h3>
            </div>
            <div className="weather">
              <h3> Weather <br/> <span>{details.weather[0].main}</span> </h3>
            </div>
          </div>
        ) : (
          <h1 className='null-void'> Search a city to get weather details </h1>
        )}
    </div>
  );
}


export default App;

