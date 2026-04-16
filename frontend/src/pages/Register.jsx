import React, { useState } from 'react';
import { User, Mail, CreditCard, ArrowRight, Lock } from 'lucide-react';
import { STRING } from '../constant/string';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const { registerUser, loading } = useAuth();
    const [formData, setFormData] = useState({
        cnic: '',
        email: '',
        name: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(formData);
    };

    const navigate = useNavigate();

    return (
        <section className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">

                {/* Header */}
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        {STRING.CREATE_ACCOUNT}
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        {STRING.REG_SUBTITLE}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* CNIC Input */}
                        <div className="relative">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">{STRING.CNIC_NUM}</label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <CreditCard size={20} />
                                </div>
                                <input
                                    name="cnic"
                                    type="text"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-slate-50/50"
                                    placeholder="42101-XXXXXXX-X"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Full Name Input */}
                        <div className="relative">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">{STRING.FULL_NAME}</label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <User size={20} />
                                </div>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-slate-50/50"
                                    placeholder="Naveed Ahmed"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">{STRING.EMAIL_ADD}</label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={20} />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 border border-slate-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none bg-slate-50/50"
                                    placeholder="name@example.com"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-bold rounded-2xl text-white transition-all shadow-lg active:scale-[0.95] ${loading
                                ? 'bg-emerald-400 cursor-not-allowed'
                                : 'bg-[#0b3d2e] hover:bg-[#082d22] shadow-emerald-900/20'
                                }`}
                        >
                            {loading ? (
                                <div className="flex items-center gap-3">
                                    {/* Elegant Spinner */}
                                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>{STRING.PROCESSING_LOAD}</span>
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    {STRING.REGISTER_NOW}
                                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </button>
                    </div>
                </form>

                <div className="text-center text-sm text-gray-500 pt-4">
                    {STRING.ALREADY_HAVE_AN} <span onClick={() => navigate("/login")} className="text-emerald-600 font-bold cursor-pointer hover:underline">{STRING.LOGIN_HERE}</span>
                </div>
            </div>
        </section>
    );
};

export default Register;