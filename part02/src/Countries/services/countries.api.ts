import axios from "axios";
import ICountry from "../types";

const baseUrl = "https://restcountries.com/v3.1/all";

const getAll = (): Promise<ICountry[]> => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

function getWeather(city: string) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${
    import.meta.env.VITE_WEATHER_API_KEY
  }`;
  const request = axios.get(url);
  return request.then((response) => response.data);
}

export default { getAll, getWeather };
