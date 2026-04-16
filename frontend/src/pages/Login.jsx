import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { STRING } from '../constant/string';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { loginUser, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(credentials);
    };

    const navigate = useNavigate();

    return (
        <section className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-slate-50">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">

                {/* Header Section */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-[#0b3d2e] text-emerald-400 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-900/20">
                        <Lock size={30} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900">
                        {STRING.WELCOME_BACK}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500 font-medium">
                        {STRING.LOGIN_SUBTITILE}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">
                        {/* Email Input */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1 tracking-widest">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={20} />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                                    placeholder="yourname@example.com"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="block w-full pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-emerald-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button with Loading State */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center py-4 px-4 rounded-2xl text-white font-bold text-lg transition-all shadow-lg active:scale-[0.97] ${loading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-[#0b3d2e] hover:bg-[#082d22] shadow-emerald-900/20'
                            }`}
                    >
                        {loading ? (
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>{STRING.LOGIN_BTN}</span>
                            </div>
                        ) : (
                            <>
                                {STRING.SIGN_IN} <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </button>
                </form>

                <div className="text-center text-sm font-medium text-gray-500">
                    {STRING.NOT_REG_YET} 
                    <span
                        onClick={() => navigate("/register")}
                        className="text-emerald-600 font-bold cursor-pointer hover:underline"
                    >
                     {STRING.CREATE_AN_AC}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Login;