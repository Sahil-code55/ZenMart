import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "./token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
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