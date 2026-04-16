import React from 'react';
import StepRenderer from './StepRenderer';
import { useLoanForm } from '../../hooks/useLoanForm';
import { STRING } from '../../constant/string';

const LoanStepper = ({ onComplete }) => {
    const {
        step, setStep, formData, isSubmitting,
        updateFields, updatePersonal, updateGuarantor, handleFinalSubmit
    } = useLoanForm();

    const stepsLabels = ["Plan", "Personal", "Guarantors", "Review"];

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    return (
        <div className="w-full">
            {/* 1. Progress Indicator */}
            <div className="flex justify-between items-center max-w-2xl mx-auto mb-20 relative">
                <div className="absolute top-[28px] left-0 w-full h-[2px] bg-slate-100 -z-0"></div>
                <div className="absolute top-[28px] left-0 h-[2px] bg-emerald-500 transition-all duration-700 -z-0"
                    style={{ width: `${((step - 1) / (stepsLabels.length - 1)) * 100}%` }}></div>

                {stepsLabels.map((label, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center flex-1 text-center">
                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-4 transition-all duration-500 bg-white ${step >= i + 1 ? 'border-emerald-500 text-emerald-500 shadow-lg' : 'border-slate-100 text-slate-300'}`}>
                            <span className="text-sm md:text-lg font-black">{i + 1}</span>
                        </div>
                        <span className={`mt-3 text-[9px] md:text-[11px] font-black uppercase tracking-widest ${step >= i + 1 ? 'text-[#0b3d2e]' : 'text-slate-400'}`}>
                            {label}
                        </span>
                    </div>
                ))}
            </div>

            {/* 2. Step Content */}
            <div className="min-h-[400px]">
                <StepRenderer
                    step={step}
                    formData={formData}
                    updateFields={updateFields}
                    updatePersonal={updatePersonal}
                    updateGuarantor={updateGuarantor}
                />
            </div>

            {/* 3. Navigation - Mobile Optimized */}
            <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-8 md:mt-12 pt-6 md:pt-10 border-t border-slate-50 gap-4 md:gap-0">

                <button
                    onClick={handleBack}
                    disabled={step === 1 || isSubmitting}
                    className={`w-full md:w-auto font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl transition-all 
                ${step === 1 ? 'invisible' : 'text-slate-400 hover:text-emerald-700 hover:bg-emerald-50'}`}
                >
                    {STRING.BACK_BTN}
                </button>

                <button
                    onClick={step === 4 ? () => handleFinalSubmit(onComplete) : handleNext}
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-[#0b3d2e] text-white px-10 py-4 md:py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest shadow-xl shadow-emerald-900/20 hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {STRING.PROCESSING_LOAD}
                        </span>
                    ) : (
                        step === 4 ? 'Confirm & Submit' : 'Continue'
                    )}
                </button>
            </div>
        </div>
    );
};

export default LoanStepper;