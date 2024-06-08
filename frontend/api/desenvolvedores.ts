// api/desenvolvedores.ts
import { IDesenvolvedorBody } from "@/utils/types";
import axios from "axios";

const API_URL = "http://localhost:3333/api/desenvolvedores";

export const getDevs = async ({
  page,
  query,
}: {
  page: number;
  query: string;
}) => {
  const response = await axios.get(`${API_URL}`, {
    params: {
      page,
      query,
    },
  });

  return response?.data || [];
};

export const createDev = async (desenvolvedor: IDesenvolvedorBody) => {
  const response = await axios.post(API_URL, desenvolvedor);

  return response.data;
};

export const updateDev = async (desenvolvedor: IDesenvolvedorBody) => {
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
