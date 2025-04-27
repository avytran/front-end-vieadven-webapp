import axios from "axios";
import { getAccessToken, setAccessToken, getRefreshToken } from "../utils/jwt";
import { getTraceId } from "../utils/trace";

const ENV = process.env.REACT_APP_ENV.trim() || "development";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log(`Running in ${ENV} mode`);

let api;

if (ENV === 'local'){
    api = {
        get: async (url) => {
            if (url !== ""){
                const mockData = require(`../mocks/data${url}.json`);
                return { data: { data: mockData } };
            }            
            return { data: { data: [] } } 
        },
        post: async (url, payload) => {
            console.log(`POST ${url}`, payload);
            return { data: { message: "Created successfully", data: payload } };
        },
        put: async (url, payload) => {
            console.log(`PUT ${url}`, payload);
            return { data: { message: "Updated successfully", data: payload } }
        },
        delete: async (url) => {
            console.log(`DELETE ${url}`);
            return { data: { message: "Deleted successfully" } }
        }
    }
} else {
    api = axios.create({
        baseURL: API_BASE_URL,
        timeout: 20000,
        headers: {"Content-Type": "application/json"}
    })
}

if (ENV !== 'local') {
    api.interceptors.request.use((config) => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        const traceId = getTraceId();
        if (traceId) {
            config.headers["X-Trace-Id"] = traceId;
        }

        return config;
    }, (error) => {
        return Promise.reject(error);
    });
// Response interceptor for handling token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Nếu lỗi là 401 Unauthorized và chưa từng retry
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = getRefreshToken();
          if (!refreshToken) throw new Error("No refresh token available");

          const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const newAccessToken = refreshResponse.data.accessToken;
          setAccessToken(newAccessToken); 

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);

        } catch (refreshError) {
          console.error("Refresh token failed", refreshError);
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
}



export { api };