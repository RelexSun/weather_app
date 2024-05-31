import "../style/CurrentWeather.css";
import { UilTear, UilWind } from "@iconscout/react-unicons";

function CurrentWeather({ data }) {

  return (
    <div className="container">
      <div className="weather-details">
        <div className="temp">
          {data.weather ? <h1 className="temp-status">{data.weather[0].main},</h1> : null}
          {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
        </div>
        <div className="temp-details">
          {data.main ? <p>
            <UilWind size={20} /> Wind: {(data.wind.speed * 3.6).toFixed()} km/h
          </p> : null}
          {data.main ? <p>
            <UilTear size={20} />
            Humidity: {data.main.humidity}%
          </p> : null}
        </div>
      </div>
      
      { data.weather ? <img
        src={`./openweathermap/${data.weather[0].icon}.svg`}
        alt="img"
        className="current-temp-image"
      /> : null}
    </div>
  );
}

export default CurrentWeather;
