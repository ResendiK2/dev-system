// api/desenvolvedores.ts
import { IDesenvolvedor } from "@/utils/types";
import axios from "axios";

const API_URL = "http://localhost:3333/api/desenvolvedores";

export const getDevs = async (page: number, query: string) => {
  const response = await axios.get(`${API_URL}`, {
    params: {
      page,
      query,
    },
  });

  return response?.data || [];
};

export const createDev = async (desenvolvedor: IDesenvolvedor) => {
  const response = await axios.post(API_URL, desenvolvedor);

  return response.data;
};

export const updateDev = async (desenvolvedor: IDesenvolvedor) => {
  const response = await axios.put(
    `${API_URL}/${desenvolvedor.id}`,
    desenvolvedor
  );

  return response.data;
};

export const deleteDev = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
};
