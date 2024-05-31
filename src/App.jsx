import "./App.css";
import { useEffect, useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Search from "./components/Search";
import DailyForecast from "./components/DailyForecast";
import CurrentLocation from "./components/CurrentLocation";
import axios from "axios";

export function App() {
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forecast, setForecast] = useState({});

  const KEY = "6ccec0dff6f9499db06bc03f04df1e54";
  const BASE = "https://api.openweathermap.org/data/2.5/";

  let currentURL = `${BASE}weather?q=${location}&appid=${KEY}&units=metric`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      // setIsLoading(true);
      try {
        const response = await axios.get(currentURL);
        const data = response.data; // Move data assignment here
        let forecastURL = `${BASE}forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${KEY}&units=metric`;
        const forecastResponse = await axios.get(forecastURL);
        const forecastData = forecastResponse.data;
        console.log(data);
        setForecast(forecastData);
        setData(data);
        setError(false);
        console.log(forecastData);
      } catch (error) {
        console.error(error);
        setError(true);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getWeatherData = async (lat, lon) => {
      setIsLoading(true);
      try {
        const forecastURL = `${BASE}forecast?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`;
        const forecastResponse = await axios.get(forecastURL);
        const forecastData = forecastResponse.data;
        setForecast(forecastData);

        const currentURL = `${BASE}weather?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric`;
        const currentResponse = await axios.get(currentURL);
        const currentData = currentResponse.data;
        setData(currentData);

        setError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLoading(true);
        const { latitude, longitude } = position.coords;
        getWeatherData(latitude, longitude);
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        setError(true);
        setIsLoading(false);
      }
    );
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setLocation("");
  }

  return (
    <div className="App">
      <Search
        location={location}
        setLocation={setLocation}
        searchLocation={searchLocation}
        onSubmit={handleSubmit}
      />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {!error ? (
            <>
              <CurrentWeather data={data} />
              {forecast.list && forecast.list[0] ? (
                <>
                  <DailyForecast forecast={forecast} />
                </>
              ) : null}
              <CurrentLocation data={data} />
            </>
          ) : (
            <>
              <img
                src="/src/assets/openweathermap/01d.svg"
                alt="invalid city"
                className="sunny"
              />
              <h1>No Found</h1>
            </>
          )}
        </>
      )}
    </div>
  );
}
