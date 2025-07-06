import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const axios_API = axios.create({
  baseURL: BASE_URL,
});

export default axios_API;
