import axios, { AxiosInstance } from "axios";

import { configs } from "../index";
import errorHandler from "./error-handler";

const createAxiosInstance = (baseURL: string = ""): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      apiKey: configs.API_KEY,
    },
  });

  applyInterceptor(instance);
  return instance;
};

const applyInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(async (request) => {
    if (typeof window === "undefined") {
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        const cookieString = cookieStore
          .getAll()
          .filter((c) => c.name.startsWith("better-auth"))
          .map((c) => `${c.name}=${c.value}`)
          .join("; ");

        if (cookieString) {
          request.headers.Cookie = cookieString;
        }
      } catch (error) {
        // Abaikan jika dipanggil di luar konteks Next.js Server Components
      }
    }
    return request;
  });
  axiosInstance.interceptors.response.use((response) => response, errorHandler);
};

export const Base = createAxiosInstance(configs.API_BASE);
