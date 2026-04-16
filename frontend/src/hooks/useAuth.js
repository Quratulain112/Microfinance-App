import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changePassword, login, register } from "../api/authService.js"

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const registerUser = async (userData) => {
        setLoading(true);
        try {
            const data = await register(userData);
            toast.success(data.message || "Registration successful Please Check Your Email!");
            navigate('/login');
        } catch (error) {
            const errorMsg = error.response?.data?.message || "Registration failed!";
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async (credentials) => {
        setLoading(true);
        try {
            const res = await login(credentials);

            const actualData = res.data;

            if (actualData && actualData.token) {
                localStorage.setItem('token', actualData.token);
                localStorage.setItem('user', JSON.stringify({
                    ...actualData.user,
                    isFirstLogin: actualData.isFirstLogin
                }));


                if (actualData.isFirstLogin) {
                    navigate('/change-password');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error(error.response?.data?.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    const updatePassword = async (oldPassword, newPassword) => {
        setLoading(true);
        try {
            const res = await changePassword({ oldPassword, newPassword });

            if (res) {
                toast.success("Password updated successfully!");

                const user = JSON.parse(localStorage.getItem('user'));
                const updatedUser = { ...user, isFirstLogin: false };
                localStorage.setItem('user', JSON.stringify(updatedUser));

                navigate('/dashboard');
                return true;
            }
        } catch (error) {
            console.error("Update Password Error:", error);
            toast.error(error.response?.data?.message || "Failed to update password");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { registerUser, loginUser, updatePassword, loading };
};