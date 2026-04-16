import React from 'react'
import { STRING } from '../../constant/string';

const HeroSec = () => {

    const scrollToCalculator = () => {
        const element = document.getElementById('calculator');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth', 
                block: 'start'      
            });
        }
    };

    return (
        <section className="relative min-h-screen bg-[#0b3d2e] pt-20 md:pt-24 pb-20 overflow-hidden">

            {/* Background Decorative Circles */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left Column: Text Content */}
                    <div className="lg:w-1/2 text-center lg:text-left">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                            {STRING.SHAPPING_FINANCIAL} <br />
                            <span className="text-emerald-400">{STRING.FUTURES}</span> {STRING.WITH_CARE}.
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0">
                            {STRING.HERO_PERA}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button onClick={scrollToCalculator} className="bg-emerald-500 hover:bg-emerald-600 text-[#0b3d2e] px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl shadow-emerald-500/20">
                                {STRING.GET_STARTED_BUTTON}
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Visual Elements (The "Meco" Style) */}
                    <div className="lg:w-1/2 relative w-full h-[400px] md:h-[500px]">
                        {/* Main Center Card/Mockup */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-[450px] bg-slate-900 rounded-[3rem] border-8 border-slate-800 shadow-2xl z-20 overflow-hidden">
                            <div className="p-4 pt-12">
                                <div className="w-full h-32 bg-emerald-500/20 rounded-2xl mb-4 border border-emerald-500/30"></div>
                                <div className="w-2/3 h-4 bg-slate-700 rounded-full mb-2"></div>
                                <div className="w-1/2 h-4 bg-slate-700 rounded-full"></div>
                            </div>
                        </div>

                        {/* Floating Card 1: Interest Rate */}
                        <div className="absolute top-10 left-10 md:left-20 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 animate-pulse z-30">
                            <span className="text-emerald-400 font-bold block">0%</span>
                            <span className="text-xs text-white uppercase tracking-widest">{STRING.INTERESTE_RATE}</span>
                        </div>

                        {/* Floating Card 2: Loan Limit */}
                        <div className="absolute bottom-10 right-10 md:right-20 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 animate-bounce z-30" style={{ animationDuration: '3s' }}>
                            <span className="text-emerald-400 font-bold block">Rs. 500,000</span>
                            <span className="text-xs text-white uppercase tracking-widest">{STRING.MAX_LOAN}</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default HeroSec
