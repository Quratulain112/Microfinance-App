import React from 'react'
import { STRING } from '../../constant/string';

const DashboardHero = ({ status }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const currentStatus = status?.toLowerCase();

    return (
        <section className="relative bg-[#0b3d2e] pt-32 pb-20 md:pb-44 overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    <div className="lg:w-2/3">
                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                            {currentStatus === 'new' && (
                                <>{STRING.KHUSH_AMDEED}, <span className="text-emerald-400">{user?.name}</span>!<br />{STRING.APP_STARTED_MSG}</>
                            )}
                            {currentStatus === 'pending' && (
                                <>{STRING.AAP_KI_APP} <span className="text-emerald-400">{STRING.REVIEW}</span> {STRING.REVIEW_MSG}</>
                            )}
                            {currentStatus === 'approved' && (
                                <>{STRING.MUBARAK_HU_APP} <span className="text-emerald-400">{STRING.APPROVE}</span> {STRING.HO_GAYE}</>
                            )}
                            {currentStatus === 'rejected' && (
                                <>{STRING.APPLICATION} <span className="text-red-400">{STRING.UPDATE}</span> {STRING.UPDATE_MSG}</>
                            )}
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl max-w-xl">
                            {currentStatus === 'new' && STRING.NEW_MSG}
                            {currentStatus === 'pending' && STRING.PENDING_MSG}
                            {currentStatus === 'approved' && STRING.APPROVED_MSG}
                            {currentStatus === 'rejected' && STRING.REJECTED_MSG}
                        </p>
                    </div>

                    <div className="lg:w-1/3 flex justify-center lg:justify-end">
                        <div className="relative group">
                            <div className={`absolute -inset-1 rounded-[2.5rem] blur opacity-25 transition duration-1000 ${currentStatus === 'approved' ? 'bg-emerald-500' : currentStatus === 'rejected' ? 'bg-red-500' : 'bg-amber-500'
                                }`}></div>

                            <div className="relative bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 shadow-2xl min-w-[300px]">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">
                                            {STRING.APP_STATUS}
                                        </span>
                                        <h3 className="text-white text-2xl font-bold tracking-tight capitalize">
                                            {currentStatus === 'new' ? 'Action Required' : currentStatus}
                                        </h3>
                                    </div>
                                    <div className={`p-3 rounded-2xl ${currentStatus === 'approved' ? 'bg-emerald-500/20 text-emerald-400' :
                                            currentStatus === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                                'bg-amber-500/20 text-amber-400'
                                        } ${currentStatus !== 'approved' && currentStatus !== 'rejected' ? 'animate-pulse' : ''}`}>
                                        <div className="w-3 h-3 rounded-full bg-current shadow-[0_0_12px_currentcolor]"></div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <span className="text-gray-400 text-xs font-medium">{STRING.PROGRESS}</span>
                                        <span className="text-emerald-400 font-bold text-lg">
                                            {currentStatus === 'new' ? '33%' : (currentStatus === 'pending' ? '66%' : '100%')}
                                        </span>
                                    </div>

                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className={`h-full transition-all duration-1000 ease-out rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 ${currentStatus === 'new' ? 'w-1/3' : (currentStatus === 'pending' ? 'w-2/3' : 'w-full')
                                                }`}
                                        ></div>
                                    </div>

                                    <div className="pt-4 flex items-center gap-3">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map((s) => (
                                                <div
                                                    key={s}
                                                    className={`w-8 h-8 rounded-full border-2 border-[#0b3d2e] flex items-center justify-center text-[10px] font-bold ${(currentStatus === 'new' && s === 1) ||
                                                            (currentStatus === 'pending' && s <= 2) ||
                                                            (currentStatus === 'approved' || currentStatus === 'rejected')
                                                            ? 'bg-emerald-500 text-[#0b3d2e]'
                                                            : 'bg-white/10 text-white/40'
                                                        }`}
                                                >
                                                    {s}
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-white/60 text-[11px] font-medium italic">
                                            {currentStatus === 'approved' ? 'Verified' : currentStatus === 'rejected' ? 'Terminated' : 'Processing'}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/10 flex justify-center">
                                    <span className="text-white text-xl font-black italic tracking-tighter opacity-80 uppercase">
                                        {currentStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DashboardHero;