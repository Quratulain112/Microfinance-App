import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { STRING } from '../constant/string';

const ChangePassword = () => {
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const { updatePassword, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic Validation
        if (formData.newPassword !== formData.confirmPassword) {
            return toast.error("New passwords do not match!");
        }

        if (formData.newPassword.length < 6) {
            return toast.error("Password must be at least 6 characters long");
        }

        // Calling business logic from our custom hook
        const success = await updatePassword(formData.oldPassword, formData.newPassword);
    };

    return (
        <section className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-slate-50">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">

                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/10">
                        <ShieldCheck size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">{STRING.SET_NEW_PASS}</h2>
                    <p className="mt-2 text-sm text-gray-500 font-medium">
                        {STRING.NEW_PASS_SUBTITLE}
                    </p>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Old Password */}
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">{STRING.TEMP_PASS}</label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400"><Lock size={18} /></div>
                                <input
                                    type="text"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="Paste temp password"
                                    value={formData.oldPassword}
                                    onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">{STRING.NEW_SEC_PASS}</label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400"><Lock size={18} /></div>
                                <input
                                    type={showPass ? "text" : "password"}
                                    required
                                    className="block w-full pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="••••••••"
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                />
                                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-4 text-gray-400">
                                    {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase ml-1">{STRING.CONF_NEW_PASS}</label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400"><Lock size={18} /></div>
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center py-4 px-4 rounded-2xl text-white font-bold text-lg transition-all shadow-lg active:scale-[0.97] ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-900/20'
                            }`}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>{STRING.UPDATING}</span>
                            </div>
                        ) : (
                            <>
                                {STRING.SEC_MY_AC} <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ChangePassword;