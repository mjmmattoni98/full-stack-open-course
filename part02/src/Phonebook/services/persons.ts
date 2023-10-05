import axios from "axios";
import IPerson from "../types";

const baseUrl = "/api/persons";

const getAll = async (): Promise<IPerson> => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject: IPerson): Promise<IPerson> => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
};

const update = async (id: number, newObject: IPerson): Promise<IPerson> => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};

const remove = async (id: number): Promise<IPerson> => {
  const request = axios.delete(`${baseUrl}/${id}`);
  const response = await request;
  return response.data;
};

export default { getAll, create, update, remove };
