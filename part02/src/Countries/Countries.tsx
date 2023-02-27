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

function Weather({ weather }: { weather: any }) {
  if (!weather.main) {
    return null;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold p-2">Weather in {weather.name}</h2>
      <p>Temperature: {weather.main.temp} Celcius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
      <p>Wind: {weather.wind.speed} m/s</p>
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
      {/* <div>{country.flag}</div> */}
      <img src={country.flags.svg} alt="flag" width="40" height="40" />
    </div>
  );
}

function Countries() {
  const [countries, setCountries] = useState([] as ICountry[]);
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({} as any);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  function handleShowClick(name: string) {
    setSearch(name);
  }

  const hook = () => {
    CountriesApi.getAll().then((data) => {
      setCountries(data);
    });
  };

  useEffect(hook, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (filteredCountries.length === 1) {
      console.log(filteredCountries[0].capital);
      CountriesApi.getWeather(filteredCountries[0].capital).then((data) => {
        setWeather(data);
      });
    }
  }, [search]);

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
        <div>
          <Country country={filteredCountries[0]} />
          <Weather weather={weather} />
        </div>
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li
              key={country.name.common}
              className="flex flex-row items-center justify-center"
            >
              <p>{country.name.common}</p>
              <Button
                text="Show"
                type="button"
                onClick={() => handleShowClick(country.name.common)}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Countries;
