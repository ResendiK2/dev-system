// api/desenvolvedores.ts
import axios from "axios";

const API_URL = "http://localhost:3333/api/desenvolvedores";

export const getDevs = async (page: number, limit: number) => {
  const response = await axios.get(`${API_URL}`);

  return response?.data || [];
};

export const createDev = async (dev: any) => {
  const response = await axios.post(API_URL, dev);
  return response.data;
};

export const updateDev = async (id: string, dev: any) => {
  const response = await axios.put(`${API_URL}/${id}`, dev);
  return response.data;
};

export const deleteDev = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
