import {AnyType} from "@D/global-types";
import axios, {AxiosInstance, AxiosResponse} from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:9090",
    timeout: 5000,
    withCredentials: true,
});

enum ApiStatus {
    Success = "Success",
    Failure = "Failure",
}

interface ApiResponse<T> {
    status: ApiStatus;
    code: number;
    data?: T;
    error?: string;
}

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
)

export class HttpClient {

    async get<T>(url: string, params?: HttpRequestParams): Promise<T> {
        const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.get(url, {params}).catch(error => {
            throw new Error(`Request failed, URL: ${url}, error: ${error}`);
        });
        const {status, code, data, error} = response.data;
        if (status === ApiStatus.Success && data !== undefined) {
            return data;
        } else {
            throw new Error(`Response failed, URL: ${url}, status: ${status}, code: ${code}, data: ${data}, error: ${error}`);
        }
    }

    async post<T>(url: string, params?: HttpRequestParams): Promise<T> {
        const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.post(url, params).catch(error => {
            throw new Error(`Request failed, URL: ${url}, error: ${error}`);
        });
        const {status, code, data, error} = response.data;
        if (status === ApiStatus.Success && data !== undefined) {
            return data;
        } else {
            throw new Error(`Response failed, URL: ${url}, status: ${status}, code: ${code}, data: ${data}, error: ${error}`);
        }
    }

    async put<T>(url: string, params?: HttpRequestParams): Promise<T> {
        const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.put(url, params).catch(error => {
            throw new Error(`Request failed, URL: ${url}, error: ${error}`);
        });
        const {status, code, data, error} = response.data;
        if (status === ApiStatus.Success && data !== undefined) {
            return data;
        } else {
            throw new Error(`Response failed, URL: ${url}, status: ${status}, code: ${code}, data: ${data}, error: ${error}`);
        }

    }

    async delete<T>(url: string): Promise<T> {
        const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.delete(url).catch(error => {
            throw new Error(`Request failed, URL: ${url}, error: ${error}`);
        });
        const {status, code, data, error} = response.data;
        if (status === ApiStatus.Success && data !== undefined) {
            return data;
        } else {
            throw new Error(`Response failed, URL: ${url}, status: ${status}, code: ${code}, data: ${data}, error: ${error}`);
        }
    }

    parseResponseError(error: Error): string {
        const errorPrefix = "error:";
        const errorIndex = error.message.indexOf(errorPrefix);
        if (errorIndex !== -1) {
            return error.message.slice(errorIndex + errorPrefix.length).trim();
        } else {
            return error.message;
        }
    }
}

export type HttpRequestParams = Record<string, AnyType> | Array<AnyType>;