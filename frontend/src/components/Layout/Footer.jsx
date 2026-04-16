import React from 'react';
import { STRING } from '../../constant/string';

const Footer = () => {
    return (
        <footer className="bg-[#0f172a] py-10 relative overflow-hidden">

            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[80px]"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Logo Section */}
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-[#0f172a] group-hover:rotate-6 transition-transform">
                            S
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">
                            {STRING.SAYLANI} <span className="text-emerald-400">{STRING.SAHULAT}</span>
                        </span>
                    </div>

                    {/* Copyright & Info */}
                    <div className="text-gray-400 text-sm font-medium tracking-wide text-center md:text-left">
                        {STRING.FOOTER_RESERVED}
                    </div>

                    {/* Developer Credit - Highlighting Your Name */}
                    <div className="flex items-center gap-2 text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                        <span>{STRING.DEVELOPED_BY}</span>
                        <span className="text-emerald-400 font-bold hover:text-white transition-colors cursor-pointer tracking-wide">
                            {STRING.NAVEED_AHMED}
                        </span>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;