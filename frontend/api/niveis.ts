import { INivelBody } from "@/utils/types";
import axios from "axios";

const API_URL = "http://localhost:3333/api/niveis";

export const getLevels = async ({
  page = 1,
  query = "",
}: {
  page?: number;
  query?: string;
}) => {
  const response = await axios.get(`${API_URL}`, {
    params: {
      page,
      query,
    },
  });

  return response?.data || [];
};

export const createLevel = async (level: INivelBody) => {
  const response = await axios.post(API_URL, level);

  return response.data;
};

export const updateLevel = async (nivel: INivelBody) => {
  const response = await axios.put(`${API_URL}/${nivel.id}`, nivel);

  return response.data;
};

export const deleteLevel = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);

  return response.data;
};
