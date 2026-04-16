import apiClient from "./apiClient";

export const register = async (userData) => {
    return await apiClient.post("/auth/register", userData);
};

export const login = async (credentials) => {
    return await apiClient.post("/auth/login", credentials);
};

export const changePassword = async (passwordData) => {
    return await apiClient.post("/auth/change-password", passwordData);
};