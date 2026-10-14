import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function getAreas() {
  const response = await api.get("/api/areas");
  return response.data;
}

export async function getCrops() {
  const response = await api.get("/api/crops");
  return response.data;
}

export async function getStatistics() {
  const response = await api.get("/api/statistics");
  return response.data;
}

export async function getAnalytics() {
  const response = await api.get("/api/analytics");
  return response.data;
}

export async function predictYield(payload) {
  const response = await api.post("/api/predict", payload);
  return response.data;
}