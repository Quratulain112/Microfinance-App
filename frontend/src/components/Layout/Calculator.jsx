import React from 'react';
import { useLoanCalculator } from '../../hooks/useLoanCalculator';
import { Calculator as CalcIcon, ArrowRight, Info } from 'lucide-react';
import { STRING } from '../../constant/string';
import { useNavigate } from 'react-router-dom';

const LoanCalculator = () => {
    const {
        category, setCategory, amount, setAmount,
        period, setPeriod, deposit, setDeposit, monthlyInstallment
    } = useLoanCalculator();

    const navigate = useNavigate();

    const handleProceed = () => {
        const calculationData = {
            category,
            amount,
            period,
            deposit,
            monthlyInstallment
        };

        localStorage.setItem('tempLoanRequest', JSON.stringify(calculationData));

        navigate('/register');
    };

    return (
        <section id="calculator" className="pb-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900">{STRING.LOAN_CALCULATOR}</h2>
                    <p className="text-gray-500 mt-2">{STRING.CALCULATOR_PLAN}</p>
                </div>

                <div className="bg-[#0b3d2e] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-emerald-800/50">

                    {/* Left Side: Controls (The Logic Inputs) */}
                    <div className="lg:w-3/5 p-8 md:p-16 text-white border-r border-white/5">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400">
                                <CalcIcon size={28} />
                            </div>
                            <h3 className="text-2xl font-bold">{STRING.CUSTOMIZE_LOAN}</h3>
                        </div>

                        <div className="space-y-10">
                            {/* Category Dropdown */}
                            <div className="space-y-4">
                                <label className="text-sm font-medium text-emerald-100/60 uppercase tracking-widest">{STRING.SELECT_CATEGORIES}</label>
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl mt-2 px-6 py-4 outline-none focus:border-emerald-500 transition-all text-lg cursor-pointer appearance-none"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option className="bg-[#0b3d2e]" value="Wedding Loans">{STRING.WEDDING_LOANS}</option>
                                    <option className="bg-[#0b3d2e]" value="Home Construction Loans">{STRING.HOME_LOANS}</option>
                                    <option className="bg-[#0b3d2e]" value="Business Startup Loans">{STRING.BUSINESS_LOANS}</option>
                                    <option className="bg-[#0b3d2e]" value="Education Loans">{STRING.EDUCATIONS_LOANS}</option>
                                </select>
                            </div>

                            {/* Loan Amount Slider */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <label className="text-sm font-medium text-emerald-100/60 uppercase tracking-widest">{STRING.LOAN_AMOUNT}</label>
                                    <span className="text-2xl font-mono font-bold text-emerald-400">{STRING.PKR} {amount.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range" min="50000" max="1000000" step="10000"
                                    className="w-full h-1.5 bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                />
                            </div>

                            {/* Row for Period and Deposit */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-emerald-100/60 uppercase tracking-widest block text-center md:text-left">{STRING.DEPOSIT}: <span className="text-white font-bold">{deposit.toLocaleString()}</span></label>
                                    <input
                                        type="range" min="0" max="100000" step="5000"
                                        className="w-full h-1.5 bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                                        value={deposit}
                                        onChange={(e) => setDeposit(Number(e.target.value))}
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-emerald-100/60 uppercase tracking-widest block text-center md:text-left">{STRING.YEARS}: <span className="text-white font-bold">{period}</span></label>
                                    <input
                                        type="range" min="1" max="5" step="1"
                                        className="w-full h-1.5 bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                                        value={period}
                                        onChange={(e) => setPeriod(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Results (The Final Summary) */}
                    <div className="lg:w-2/5 px-4 py-8 md:p-16 bg-white/5 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-full max-w-sm bg-white rounded-[2.5rem] py-10 px-4 sm:p-10 shadow-2xl relative border border-emerald-100">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-center px-6 py-1 rounded-full text-xs font-bold uppercase">
                                {STRING.ESTIMATED_RES}
                            </div>

                            <div className="text-center space-y-2 mb-8">
                                <p className="text-gray-400 text-sm font-medium">{STRING.MONTHLY_INST}</p>
                                <div className="text-4xl font-black text-[#0b3d2e]">
                                    {STRING.PKR} {monthlyInstallment.toLocaleString()}
                                </div>
                            </div>

                            <div className="sm:space-y-4 py-6 border-y border-gray-100">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-medium">{STRING.LOAN_TYPE}:</span>
                                    <span className="text-[#0b3d2e] font-bold">{category}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-medium">{STRING.TOTAL_DURATION}:</span>
                                    <span className="text-[#0b3d2e] font-bold">{period} {STRING.YEARS}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400 font-medium">{STRING.UPFRONT_DEPOSIT}:</span>
                                    <span className="text-[#0b3d2e] font-bold">{STRING.PKR} {deposit.toLocaleString()}</span>
                                </div>
                            </div>

                            <button onClick={handleProceed} className="w-full mt-10 bg-emerald-600 hover:bg-emerald-700 text-white text-md sm:text-xl font-bold py-4 sm:py-4 px-4 rounded-2xl transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer">
                                {STRING.PROCEED_BTN}  <ArrowRight size={20} />
                            </button>

                            <p className="mt-4 text-[10px] text-gray-400 text-center flex items-center justify-center gap-1 leading-tight">
                                <Info size={12} /> {STRING.INSTRUCTION}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LoanCalculator;