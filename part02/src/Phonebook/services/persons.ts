import axios from 'axios'
import IPerson from "../types";

const baseUrl = 'http://localhost:3001/persons'

const getAll = (): Promise<IPerson> => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject: IPerson): Promise<IPerson> => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id: number, newObject: IPerson): Promise<IPerson> => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }