import axios from "axios";

export const graphqlClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

graphqlClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        success: false,
        message: "Network error: Backend not reachable",
      });
    }

    return Promise.reject({
      success: false,
      message: error.response.data?.message || "Something went wrong",
      status: error.response.status,
    });
  }
);
