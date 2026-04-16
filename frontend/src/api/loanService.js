import apiClient from "./apiClient";

export const submitLoanRequest = async (loanData) => {
    return await apiClient.post("/loans/submit", loanData);
};

export const getMyLoanRequest = async () => {
    return await apiClient.get("/loans/my-loans");
};