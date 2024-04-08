import Axios from "axios";

const BASE_URL =
  (process.env.BASE_URL_API || process.env.NEXT_PUBLIC_BASE_URL_API) || "http://localhost:3000/api";

export const axios = Axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const fetcher = (url) => axios.get(url).then((res) => res.data);
