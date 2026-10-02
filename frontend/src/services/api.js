import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "./token";

// In production, use the same-origin /api rewrite configured in vercel.json.
// Local development still talks directly to the Express server.
const configuredApiURL = import.meta.env.VITE_API_URL;
let configuredApiHost = "";

if (configuredApiURL) {
  try {
    configuredApiHost = new URL(configuredApiURL).hostname;
  } catch {
    // Relative URLs are valid API base URLs and have no host to check.
  }
}

const configuredApiIsLocal =
  configuredApiHost === "localhost" ||
  configuredApiHost === "127.0.0.1" ||
  configuredApiHost === "::1";

const apiBaseURL =
  import.meta.env.PROD && configuredApiIsLocal
    ? "/api"
    : configuredApiURL ||
      (import.meta.env.PROD ? "/api" : "http://localhost:5000/api");

const api = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeToRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const notifyRefreshSubscribers = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

/*
  REQUEST INTERCEPTOR
  Automatically attaches access token
*/
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


/*
  RESPONSE INTERCEPTOR
  Handles expired access tokens
*/
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      originalRequest?.url === "/auth/login" ||
      originalRequest?.url === "/auth/refresh-token"
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    /*
      If another request is already refreshing,
      wait for that refresh instead of making
      another refresh request.
    */
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeToRefresh((token) => {
          if (!token) {
            reject(error);
            return;
          }

          originalRequest.headers.Authorization = `Bearer ${token}`;

          resolve(api(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const response = await api.post("/auth/refresh-token");

      const newAccessToken = response.data.accessToken;

      setAccessToken(newAccessToken);

      notifyRefreshSubscribers(newAccessToken);

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      return api(originalRequest);

    } catch (refreshError) {
      clearAccessToken();

      notifyRefreshSubscribers(null);

      return Promise.reject(refreshError);

    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
