import axios from 'axios'
import ICountry from "../types";

const baseUrl = 'https://restcountries.com/v3.1/all';

const getAll = (): Promise<ICountry[]> => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }