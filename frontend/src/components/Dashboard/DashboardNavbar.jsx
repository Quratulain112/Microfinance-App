import React from 'react'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { STRING } from '../../constant/string'

const DashboardNavbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <nav className='fixed w-full z-50 bg-[#0b3d2e]/80 backdrop-blur-md border-b border-white/10'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-20 items-center'>

                    {/* Logo */}
                    <div onClick={() => navigate('/dashboard')} className='flex items-center gap-3 group select-none cursor-pointer'>
                        <div className='w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform'>
                            <span className="text-[#0b3d2e] font-bold text-xl">S</span>
                        </div>
                        <span className='text-2xl font-bold text-white tracking-tight'>
                            {STRING.SAYLANI} <span className="text-emerald-400">{STRING.SAHULAT}</span>
                        </span>
                    </div>

                    {/* User Info & Logout */}
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-white font-bold text-sm">{user?.name}</span>
                            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-tighter">{STRING.VERIFIED_USER}</span>
                        </div>
                        <button
                            onClick={() => { localStorage.clear(); navigate('/login'); }}
                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-2.5 rounded-xl transition-all border border-red-500/20 shadow-lg cursor-pointer"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default DashboardNavbar;