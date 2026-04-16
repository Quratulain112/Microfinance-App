import React from 'react';
import { CheckCircle2, Users, ShieldCheck, Globe } from 'lucide-react';
import { STRING } from '../../constant/string';
import about from "../../assets/about.png"

const About = () => {
    const features = [
        { title: "Interest-Free Loans", desc: "Purely Qarz-e-Hasana with 0% interest.", icon: ShieldCheck },
        { title: "Community Driven", desc: "Empowering thousands of families across Pakistan.", icon: Users },
        { title: "Global Standards", desc: "Transparent and modern financial technology.", icon: Globe },
    ];

    return (
        <section id="about" className="pb-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* 1. Left Side: Interactive Visuals */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative z-10 rounded-4xl overflow-hidden shadow-2xl border-8 border-white">
                            <img
                                src={about}
                                alt="Saylani Impact"
                                className="w-full h-125 object-cover hover:scale-105 transition-transform"
                            />
                        </div>
                        {/* Floating Experience Card */}
                        <div className="absolute -bottom-10 -right-10 bg-emerald-600 p-8 rounded-3xl shadow-xl text-white z-20 hidden md:block">
                            <p className="text-4xl font-black mb-1">25+</p>
                            <p className="text-sm font-medium opacity-90 uppercase tracking-widest">{STRING.TRUST_YEAR}</p>
                        </div>
                        {/* Decorative Background Blob */}
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-10"></div>
                    </div>

                    {/* 2. Right Side: Content */}
                    <div className="lg:w-1/2">
                        <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm">{STRING.ABOUT_SAYLANI}</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-4 mb-8 leading-tight">
                            {STRING.WE_PROVIDE} <br />
                            <span className="text-emerald-600 underline decoration-emerald-200">{STRING.JUST_LOAN}</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                            {STRING.ABOUT_PARA}
                        </p>

                        {/* Feature List */}
                        <div className="space-y-6">
                            {features.map((item, index) => (
                                <div key={index} className="flex items-start gap-4 group">
                                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                                        <p className="text-gray-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;