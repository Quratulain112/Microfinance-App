import React from 'react';
import DashboardNavbar from '../components/Dashboard/DashboardNavbar';
import DashboardHero from '../components/Dashboard/DashboardHero';
import LoanStepper from '../components/Dashboard/LoanStepper';
import ApplicationStatus from '../components/Dashboard/ApplicationStatus';
import { useDashboard } from '../hooks/useDashboard'; // Hook import karein
import { STRING } from '../constant/string';

const Dashboard = () => {
    const { status, loanData, handleSuccess, resetToNew, isLoading } = useDashboard();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            <DashboardNavbar />
            <DashboardHero status={status} />

            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-[#0b3d2e] text-3xl md:text-5xl font-black mb-4 uppercase tracking-tight">
                            {status === 'new' ? (
                                <>{STRING.APPLICATION} <span className="text-emerald-500">{STRING.SUBMISSION}</span></>
                            ) : (
                                <>{STRING.TRACK_YOUR} <span className="text-emerald-400">{STRING.REQUEST}</span></>
                            )}
                        </h2>
                        <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mb-6"></div>
                    </div>

                    <div className="bg-white rounded-[3rem] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.08)] p-2 md:p-16 border border-slate-100">
                        {status === 'new' ? (
                            <LoanStepper onComplete={handleSuccess} />
                        ) : (
                            <ApplicationStatus loanData={loanData} onReapply={resetToNew} />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;