import { useEffect, useState } from "react";
import ICountry from "./types";
import CountriesApi from "./services/countries.api";

function Button({
  text,
  type,
  onClick,
}: {
  text: string;
  type: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type={type}
      className="m-2 px-4 py-2 bg-blue-500 text-white rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function Input({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={name}>{name}:</label>
      <input
        id={name}
        className="m-2 px-4 py-2 rounded"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function Country({ country }: { country: ICountry }) {
  return (
    <div>
      <h1 className="text-3xl font-bold p-2">{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2 className="text-xl font-bold p-2">Languages:</h2>
      <ul className=" list-disc">
        {Object.values(country.languages).map((language: any) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div>{country.flag}</div>
    </div>
  );
}

function Countries() {
  const [countries, setCountries] = useState([] as ICountry[]);
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({} as any);
  const [icon, setIcon] = useState();
  const [country, setCountry] = useState({} as ICountry);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    if (filteredCountries.length === 1) setCountry(filteredCountries[0]);
    else setCountry({} as ICountry);
  };

  function handleShowClick(name: string) {
    setSearch(name);
    setCountry(filteredCountries[0]);
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (country.capital) {
      CountriesApi.getWeather(country.capital).then((data) => {
        setWeather(data);
      });
    }
  }, [country]);

  useEffect(() => {
    if (weather.weather) {
      console.log(weather);
      CountriesApi.getWeatherIcon(weather.weather[0].icon).then((data) => {
        setIcon(data);
      });
    }
  }, [weather]);

  const hook = () => {
    CountriesApi.getAll().then((data) => {
      setCountries(data);
    });
  };

  useEffect(hook, []);

  return (
    <>
      <Input
        name="Find countries"
        value={search}
        onChange={handleSearchChange}
      />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <>
          <Country country={filteredCountries[0]} />
          {weather.main ? (
            <div>
              <h2>Weather in {filteredCountries[0].capital}</h2>
              <p>Temperature: {weather.main.temp} Celsius</p>
              <img src={icon} alt="weather icon" />
              <p>Wind: {weather.wind.speed} m/s</p>
            </div>
          ) : null}
        </>
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <div
              key={country.name.common}
              className="flex flex-row items-center justify-center"
            >
              <li>{country.name.common}</li>
              <Button
                text="Show"
                type="button"
                onClick={() => handleShowClick(country.name.common)}
              />
            </div>
          ))}
        </ul>
      )}
    </>
  );
}

export default Countries;
