import React from 'react';
import { Briefcase, Heart, Home, GraduationCap, ArrowRight } from 'lucide-react'; 
import { STRING } from '../../constant/string';

const Categories = () => {
    
    const loanCategories = [
        {
            title: "Wedding Loans",
            description: "Support for Valima, Furniture, and Jahez to start your new journey.",
            icon: Heart,
            iconBg: "bg-pink-100",
            iconColor: "text-pink-600",
            link: "#calculator", 
        },
        {
            title: "Home Construction",
            description: "Loans for building, renovation, or purchasing your own home.",
            icon: Home,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            link: "#calculator",
        },
        {
            title: "Business Startup",
            description: "Financial help to start a small business or expand an existing one.",
            icon: Briefcase,
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
            link: "#calculator",
        },
        {
            title: "Education Loans",
            description: "Cover fees and expenses for higher education or vocational training.",
            icon: GraduationCap,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            link: "#calculator",
        },
    ];

    return (
        <section id="categories" className="py-14 bg-white relative overflow-hidden">

            {/* Background Decorative Element*/}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* 2. Heading Area */}
                <div className="text-center mb-20 max-w-2xl mx-auto">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold mb-4 border border-emerald-100">
                        {STRING.LOAN_SCHEMES}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
                        {STRING.TAILORED} <span className="text-emerald-600">{STRING.FINANCIAL_SO}</span> {STRING.FOR_EVERY}
                    </h2>
                    <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                        {STRING.CATEGORY_PERA}
                    </p>
                </div>

                {/* 3. The Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {loanCategories.map((category, index) => {
                        const IconComponent = category.icon; // 
                        return (
                            <div
                                key={index}
                                className="group relative bg-white p-8 pt-16 rounded-3xl border-2 border-slate-200/60 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-emerald-200/60 hover:border-emerald-500 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col"
                            >
                                {/* 4. Overflow Icon */} 
                                <div className={`absolute -top-8 left-8 w-20 h-20 ${category.iconBg} rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 border-4 border-white`}>
                                    <IconComponent className={`w-10 h-10 ${category.iconColor}`} />
                                </div>

                                {/* 5. Card Content */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-700 transition-colors">
                                    {category.title}
                                </h3>
                                <p className="text-gray-600 text-base leading-relaxed mb-6 grow">
                                    {category.description}
                                </p>

                                {/* 6. Action Button */}
                                <a
                                    href={category.link}
                                    className="inline-flex items-center justify-center gap-2.5 w-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-xl font-bold text-base transition-all shadow-md group-hover:shadow-emerald-200"
                                >
                                    {STRING.APPLY_NOW} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default Categories;