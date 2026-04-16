import React, { useRef } from 'react';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { STRING } from '../../constant/string';

const ApplicationStatus = ({ loanData, onReapply }) => {
    const slipRef = useRef();
    const { appointment, status, category } = loanData || {};

    // 1. REJECTION VIEW 
    if (status?.toLowerCase() === 'rejected') {
        const userName = loanData?.personalInfo?.name || "Applicant";

        return (
            <div className="text-center py-6 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Minimalist Status Icon */}
                <div className="relative w-20 h-20 mx-auto mb-6">
                    <div className="absolute inset-0 bg-red-50 rounded-full animate-pulse opacity-60"></div>
                    <div className="relative w-20 h-20 bg-white border border-red-100 rounded-full flex items-center justify-center shadow-sm">
                        <svg
                            className="w-10 h-10 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-md mx-auto">

                    <h3 className="text-[#1e293b] text-xl md:text-2xl font-extrabold tracking-tight mb-3">
                        {STRING.APP_REVIEW} <span className="text-red-600">{STRING.UPDATE}</span>
                    </h3>

                    <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8">
                        {STRING.DEAR} <span className="font-bold text-slate-800">{userName}</span>, <br />
                        {STRING.HAMARI} <span className="font-semibold text-slate-700">{STRING.REVIEW_COMM}</span>{STRING.REJ_MSG}
                    </p>

                    {/* Action Area */}
                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mb-8">
                        <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-4">
                            {STRING.REC_ACTION}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => {
                                    localStorage.removeItem('activeLoan');
                                    onReapply();
                                }}
                                className="bg-[#0b3d2e] text-white px-8 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest shadow-lg shadow-emerald-900/20 hover:bg-[#059669] transition-all active:scale-95"
                            >
                                {STRING.START_NEW_BTN}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Institutional Footer */}
                <div className="pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-center gap-2 opacity-40 grayscale">
                        <div className="h-[1px] w-8 bg-slate-400"></div>
                        <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em]">
                            {STRING.SWIT}
                        </p>
                        <div className="h-[1px] w-8 bg-slate-400"></div>
                    </div>
                </div>
            </div>
        );
    }

    // 2. DOWNLOAD LOGIC
    const downloadSlip = async () => {
        const element = slipRef.current;
        try {
            const canvas = await html2canvas(element, {
                scale: 3,
                backgroundColor: "#ffffff",
                logging: false,
                useCORS: true
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const imgProps = pdf.getImageProperties(imgData);
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
            pdf.save(`Saylani_Loan_Slip_${appointment?.tokenNumber || 'Record'}.pdf`);
        } catch (error) {
            console.error("PDF generation failed", error);
        }
    };

    // 3. APPROVED / PENDING VIEW (The Slip)
    return (
        <div className="animate-in fade-in duration-700">
            <div className={`mb-8 p-6 rounded-2xl text-center transition-all duration-500 border-2 ${status === 'Approved'
                    ? 'bg-[#f0fdf4] text-[#166534] border-[#bbf7d0]'
                    : 'bg-[#fffbeb] text-[#92400e] border-[#fef3c7]'
                }`}>
                <h4 className="font-black uppercase tracking-[0.2em] text-sm mb-2">
                    {status === 'Approved' ? 'Application Status: Approved' : 'Application Status: In Review'}
                </h4>
                <p className="text-[11px] font-bold opacity-70 uppercase tracking-widest leading-relaxed">
                    {status === 'Approved'
                        ? 'Aapki request manzoor kar li gayi hai. Mazeed maloomat ke liye niche di gayi slip check karein.'
                        : 'Aapki application filhal zair-e-ghaur hai. Jald hi faisla aapke dashboard par dikha diya jayega.'}
                </p>
            </div>
            {/* THE DIGITAL SLIP */}
            <div
                ref={slipRef}
                className="bg-white p-8 border-2 border-[#f1f5f9] rounded-[2rem] max-w-lg mx-auto shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)]"
                style={{ backgroundColor: '#ffffff' }}
            >
                <div className="text-center border-b-2 border-dashed border-[#e2e8f0] pb-6 mb-6">
                    <h2 className="text-[#0b3d2e] font-black text-xl uppercase">{STRING.SWT}</h2>
                    <p className="text-[#10b981] font-bold text-[10px] uppercase tracking-widest">{STRING.LOAN_ASS_SLIP}</p>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[10px] font-black text-[#94a3b8] uppercase">{STRING.TOKEN_NUM}</p>
                            <p className="text-2xl font-black text-[#0b3d2e]">{appointment?.tokenNumber || '---'}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-[#94a3b8] uppercase">{STRING.CATEGORY}</p>
                            <p className="text-sm font-bold text-[#334155]">{category || 'General'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-[#f8fafc] p-4 rounded-2xl" style={{ backgroundColor: '#f8fafc' }}>
                        <div>
                            <p className="text-[9px] font-black text-[#94a3b8] uppercase">{STRING.DATE}</p>
                            <p className="text-xs font-bold text-[#1e293b]">{appointment?.date ? new Date(appointment.date).toDateString() : 'TBD'}</p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-[#94a3b8] uppercase">{STRING.TIME}</p>
                            <p className="text-xs font-bold text-[#1e293b]">{appointment?.time || 'Pending'}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-[9px] font-black text-[#94a3b8] uppercase">{STRING.LOCATION}</p>
                            <p className="text-xs font-bold text-[#1e293b]">{appointment?.location || 'Saylani Head Office'}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center py-4 bg-white">
                        <Barcode value={appointment?.tokenNumber || "SAY-000"} width={1.2} height={40} fontSize={10} />
                    </div>

                    <div className="text-[9px] text-[#94a3b8] text-center italic">
                        {STRING.DOWNLOAD_NOTE}
                    </div>
                </div>
            </div>

            {/* DOWNLOAD BUTTON */}
            <div className="mt-10 flex justify-center">
                <button
                    onClick={downloadSlip}
                    className="bg-[#0b3d2e] text-white px-12 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-[#059669] transition-all active:scale-95 flex items-center gap-3"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    {STRING.DIGITAL_SLIP}
                </button>
            </div>
        </div>
    );
};

export default ApplicationStatus;