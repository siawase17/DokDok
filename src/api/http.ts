import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken, removeToken } from '../store/authStore';

const BASE_URL = 'http://localhost:8888'
// const BASE_URL = 'https://port-0-docktori-server-ly5qmhc1cd365acd.sel5.cloudtype.app';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
            "Authorization": getToken() ? getToken() : '',
        },
        withCredentials: true,
        ...config,
    });

    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                removeToken();
                window.location.href = '/auth/login';
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export const httpClient = createClient();

type RequestMethod = "get" | "post" | "put" | "delete";

export const requestHandler = async <T>(method: RequestMethod, url: string, payload?: T) => {
    try {
        let response;

        switch (method) {
            case "post":
                response = await httpClient.post(url, payload);
                break;
            case "get":
                response = await httpClient.get(url);
                break;
            case "put":
                response = await httpClient.put(url, payload);
                break;
            case "delete":
                response = await httpClient.delete(url);
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }

        return response.data;
    } catch (error) {
        console.error('Request failed:', error);
        throw error; // 상위로 에러 전파
    }
};
