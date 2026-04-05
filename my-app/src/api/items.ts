import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchItemById(id: string) {
  try {
    const response = await api.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch item:", error);
    throw error;
  }
}

export async function updateItem(id: string, body: unknown) {
  try {
    const response = await api.put(`/items/${id}`, body);
    return response.data;
  } catch (error) {
    console.error("Save failed:", error);
    throw error;
  }
}

export async function fetchItems(queryString: string) {
  const response = await api.get(`/items?${queryString}`);
  return response.data;
}