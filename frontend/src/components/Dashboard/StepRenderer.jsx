import React from 'react';
import { LOAN_CATEGORIES } from '../../constant/loanData';
import { STRING } from '../../constant/string';

const StepRenderer = ({ step, formData, updateFields, updatePersonal, updateGuarantor }) => {

    const inputStyle = "w-full p-4 md:p-5 bg-white border-2 border-emerald-100/50 rounded-2xl focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 outline-none font-bold text-slate-700 transition-all duration-300 shadow-sm text-sm md:text-base border-l-4 border-l-emerald-500";

    if (step === 1) return (
        <div className="max-w-5xl mx-auto px-2 animate-in fade-in slide-in-from-bottom-5">
            <h3 className="text-2xl md:text-4xl font-black text-[#0b3d2e] mb-10">{STRING.LOAN_REQ}</h3>

            <div className="bg-white rounded-[2.5rem] border-t-8 border-emerald-500 shadow-[0_25px_60px_rgba(0,0,0,0.12)] p-6 md:p-12 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#0b3d2e] uppercase tracking-widest ml-1">{STRING.CATEGORY}</label>
                        <select className={inputStyle} value={formData.category} onChange={(e) => updateFields({ category: e.target.value, subcategory: '' })}>
                            <option value="">{STRING.CHOOSE_CATEGORY}</option>
                            {Object.keys(LOAN_CATEGORIES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#0b3d2e] uppercase tracking-widest ml-1">{STRING.SUB_CAT}</label>
                        <select className={inputStyle} value={formData.subcategory} onChange={(e) => updateFields({ subcategory: e.target.value })} disabled={!formData.category}>
                            <option value="">{STRING.CHOOSE_SUBCAT}</option>
                            {formData.category && LOAN_CATEGORIES[formData.category].map(sub => <option key={sub} value={sub}>{sub}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#0b3d2e] uppercase tracking-widest ml-1">Amount (PKR)</label>
                        <input
                            type="number"
                            placeholder="e.g. 200000"
                            className={inputStyle}
                            value={formData.amount}
                            onChange={(e) => updateFields({ amount: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#0b3d2e] uppercase tracking-widest ml-1">{STRING.LOAN_PERIOD}</label>
                        <select className={inputStyle} value={formData.loanPeriod} onChange={(e) => updateFields({ loanPeriod: e.target.value })}>
                            <option value="">{STRING.SELECT_TEN}</option>
                            {[1, 2, 3, 4, 5].map(y => <option key={y} value={y}>{y} {STRING.YEARS}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    // Step 2: Personal & Financial Information
    if (step === 2) return (
        <div className="max-w-5xl mx-auto px-2 animate-in fade-in slide-in-from-right-5">
            <h3 className="text-2xl md:text-4xl font-black text-[#0b3d2e] mb-10">{STRING.VERIFICATION} <span className="text-emerald-500">{STRING.DETAILS}</span></h3>
            <div className="bg-white rounded-[2.5rem] border-t-8 border-emerald-500 shadow-[0_25px_60px_rgba(0,0,0,0.12)] p-6 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">{STRING.CONTACT_INFO}</h4>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#0b3d2e] uppercase tracking-widest ml-1">{STRING.PHONE_NUM}</label>
                            <input type="tel" placeholder="03XXXXXXXXX" className={inputStyle} value={formData.personalInfo.phone} onChange={(e) => updatePersonal('phone', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#0b3d2e] uppercase tracking-widest ml-1">{STRING.ADDRESS}</label>
                            <textarea placeholder="Full home address..." className={`${inputStyle} h-32 resize-none`} value={formData.personalInfo.address} onChange={(e) => updatePersonal('address', e.target.value)} />
                        </div>
                    </div>

                    {/* Financial Info (The Fintech Touch) */}
                    <div className="space-y-6 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                        <h4 className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em] mb-4">{STRING.FINANCIAL_STANDING}</h4>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#0b3d2e] uppercase tracking-widest ml-1">{STRING.OCCUPATION}</label>
                            <select className={inputStyle} value={formData.personalInfo.occupation} onChange={(e) => updatePersonal('occupation', e.target.value)}>
                                <option value="" disabled>{STRING.SEL_OCC}</option>
                                <option value="Salaried">{STRING.SALARIED}</option>
                                <option value="Business">{STRING.BUSINESS}</option>
                                <option value="Self-Employed">{STRING.SELF_EMP}</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#0b3d2e] uppercase tracking-widest ml-1">{STRING.MONTHLY_INCOME}</label>
                                <input type="number" placeholder="Income" className={inputStyle} value={formData.personalInfo.monthlyIncome} onChange={(e) => updatePersonal('monthlyIncome', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-[#0b3d2e] uppercase tracking-widest ml-1">{STRING.MONTHLY_EXPENCE}</label>
                                <input type="number" placeholder="Expenses" className={inputStyle} value={formData.personalInfo.monthlyExpenses} onChange={(e) => updatePersonal('monthlyExpenses', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // 👥 Step 3: Guarantors
    if (step === 3) return (
        <div className="max-w-5xl mx-auto px-2 animate-in fade-in slide-in-from-bottom-5">
            <h3 className="text-2xl md:text-4xl font-black text-[#0b3d2e] mb-10">{STRING.ZAMANAT_DAAR}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-10">
                {formData.guarantors.map((g, i) => (
                    <div key={i} className="bg-white rounded-[2.5rem] border-t-8 border-emerald-500 shadow-[0_25px_60px_rgba(0,0,0,0.12)] p-8 relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#0b3d2e] text-white px-8 py-2 rounded-full font-black text-[10px] uppercase shadow-xl">
                            {STRING.GUARANTOR} 0{i + 1}
                        </div>
                        <div className="space-y-5 pt-4">
                            <input type="text" placeholder="Name" className={inputStyle} value={g.name} onChange={(e) => updateGuarantor(i, 'name', e.target.value)} />
                            <input type="email" placeholder="Email" className={inputStyle} value={g.email} onChange={(e) => updateGuarantor(i, 'email', e.target.value)} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" placeholder="CNIC" className={inputStyle} value={g.cnic} onChange={(e) => updateGuarantor(i, 'cnic', e.target.value)} />
                                <input type="text" placeholder="City" className={inputStyle} value={g.location} onChange={(e) => updateGuarantor(i, 'location', e.target.value)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // 🧾 Step 4: Review (Digital Receipt) - Mobile Optimized
    return (
        <div className="max-w-4xl mx-auto px-2 animate-in zoom-in-95 pb-10">
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-slate-100">

                {/* Header: Responsive Padding */}
                <div className="bg-[#0b3d2e] p-8 md:p-16 text-center">
                    <h3 className="text-white text-2xl md:text-6xl font-black uppercase tracking-tighter">
                        {STRING.REVIEW} <span className="text-emerald-500">{STRING.DATA}</span>
                    </h3>
                    <p className="text-emerald-100/40 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] mt-2">
                        {STRING.FINAL_VER_SLIP}
                    </p>
                </div>

                <div className="p-5 md:p-16">
                    {/* 1️⃣ Top Row: Responsive Layout */}
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start border-b-2 border-slate-50 pb-8 mb-8 gap-6 text-center md:text-left">
                        <div>
                            <h4 className="text-[10px] font-black text-emerald-600 uppercase mb-2">{STRING.LOAN_PLAN}</h4>
                            <p className="text-2xl md:text-3xl font-black text-[#0b3d2e]">{formData.category}</p>
                            <p className="text-slate-400 font-bold text-sm">{formData.subcategory}</p>
                        </div>
                        <div className="bg-emerald-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border-2 border-dashed border-emerald-200 w-full md:w-auto">
                            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">{STRING.TOTAL_AMOUNT}</p>
                            <p className="text-2xl md:text-4xl font-black text-emerald-600">
                                Rs. {Number(formData.amount).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* 2️⃣ Middle Row: 3-Card Grid (Full width on mobile) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex md:flex-col justify-between items-center md:justify-center">
                            <p className="text-[9px] font-black text-slate-400 uppercase">{STRING.DURATION}</p>
                            <p className="text-lg font-black text-[#0b3d2e]">{formData.loanPeriod} {STRING.YEARS}</p>
                        </div>

                        {/* Monthly Installment: Highlighted but safe for mobile */}
                        <div className="bg-[#0b3d2e] p-6 rounded-2xl shadow-lg text-center text-white border-b-4 border-emerald-500">
                            <p className="text-[9px] font-black text-emerald-200 uppercase mb-1">{STRING.MONTHLY_INST}</p>
                            <p className="text-xl md:text-2xl font-black">
                                Rs. {Math.round(formData.amount / (formData.loanPeriod * 12)).toLocaleString()}
                            </p>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex md:flex-col justify-between items-center md:justify-center">
                            <p className="text-[9px] font-black text-slate-400 uppercase">{STRING.SOURCE}</p>
                            <p className="text-lg font-black text-[#0b3d2e]">{formData.personalInfo.occupation || 'Personal'}</p>
                        </div>
                    </div>

                    {/* 3 Bottom Section: Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Applicant Info */}
                        <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100">
                            <h5 className="font-black text-[#0b3d2e] uppercase text-[9px] mb-4 border-b border-slate-200 pb-2">
                                {STRING.APPLICANT} Info
                            </h5>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                    <span className="text-emerald-500">📞</span> {formData.personalInfo.phone}
                                </div>
                                <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                    <span className="text-emerald-500">💼</span> Income: Rs. {Number(formData.personalInfo.monthlyIncome).toLocaleString()}
                                </div>
                                <div className="flex items-start gap-3 text-[11px] font-medium text-slate-400 italic">
                                    <span>📍</span> {formData.personalInfo.address}
                                </div>
                            </div>
                        </div>

                        {/* Guarantors */}
                        <div className="space-y-3">
                            <h5 className="font-black text-[#0b3d2e] uppercase text-[9px] mb-1 pl-1">
                                {STRING.GUARANTORS}
                            </h5>
                            {formData.guarantors.map((g, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-slate-700">{g.name || 'G-Name'}</span>
                                        <span className="text-[9px] font-bold text-slate-400">{g.cnic || 'CNIC'}</span>
                                    </div>
                                    <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md uppercase">
                                        {g.location}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 md:p-6 bg-slate-50 text-center text-[8px] md:text-[10px] font-bold text-slate-300 uppercase tracking-widest border-t border-slate-100">
                    {STRING.VER_SUCC_MSG}
                </div>
            </div>
        </div>
    );
};

export default StepRenderer;