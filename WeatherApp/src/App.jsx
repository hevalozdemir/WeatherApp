import { useState, useEffect } from 'react'
import axios from 'axios'

import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [location, setLocation] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=4&aqi=yes&alerts=yes`)
        setWeatherData(response.data)
        console.log(response)

      } catch (error) {
        console.log(error)
      }
    };
    if (location) {
      fetchData();
    }

  }, [location])

  //In diesem Code wird die Variable „location“ von useEffect verfolgt. 
  //Ändert sich „location“, wird die fetchData-Funktion ausgeführt. 
  //Diese Funktion stellt eine HTTP-Anfrage zum „async“ Abrufen von Daten 
  //und legt die empfangenen Daten über die Funktion „setWeatherData“ fest. 
  //Wenn ein Fehler auftritt, wird der Fehler in die Konsole geschrieben.

  const handleLocationChange = (event) => {setLocation(event.target.value)}


  return (
    <>
      <div className='app-container'>
        <h1 className='app-titel'> Wetter - App </h1>
        <div className='input-container'>
          <input
            className='location-input'
            type='text'
            placeholder='Bitte geben Sie einen Stadtnamen ein!'
            value={location}
            onChange={handleLocationChange}
          />
        </div>
      </div>

      {weatherData && (
        <div className='weather-container'>
          {weatherData.forecast.forecastday.map((day) => (
            <div className='day-container' key ={day.date}>
              <h2 className='date'>{day.date}</h2>
              <img className='weather-icon' src={day.day.condition.icon} alt={day.day.condition.text}/>
              <p className='temperature'>{day.day.avgtemp_c} C</p>
              <p className='temperature'>{day.day.condition.text}</p>
              </div>
          ))}
        </div>
      )}

    </>
  )
}

export default App
