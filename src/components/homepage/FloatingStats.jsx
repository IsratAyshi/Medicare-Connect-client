import React from 'react';

const FloatingStats = () => {
    return (
        <div className="w-full bg-white/60 dark:bg-[#00234a]/40 backdrop-blur-xl border border-white/30 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 divide-x-0 divide-y md:divide-y-0 md:divide-x divide-[#c2c6d3]/30">

            <div className="text-center px-2">
                <h4 className="text-[28px] sm:text-[36px] font-[800] leading-none text-[#003f83] dark:text-[#fff] mb-1">20+</h4>
                <p className="text-[12px] sm:text-[13px] font-[600] text-[#575f69] dark:text-[#bfc7d3] uppercase tracking-wider">Total Doctors</p>
            </div>

            <div className="text-center px-2 pt-4 sm:pt-0">
                <h4 className="text-[28px] sm:text-[36px] font-[800] leading-none text-[#003f83] dark:text-[#fff] mb-1">95</h4>
                <p className="text-[12px] sm:text-[13px] font-[600] text-[#575f69] dark:text-[#bfc7d3] uppercase tracking-wider">Total Appointments</p>
            </div>

            <div className="text-center px-2 pt-4 sm:pt-0">
                <h4 className="text-[28px] sm:text-[36px] font-[800] leading-none text-[#003f83] dark:text-[#fff] mb-1">5,000+</h4>
                <p className="text-[12px] sm:text-[13px] font-[600] text-[#575f69] dark:text-[#bfc7d3] uppercase tracking-wider">Total Patients</p>
            </div>

            <div className="text-center px-2 pt-4 sm:pt-0">
                <h4 className="text-[28px] sm:text-[36px] font-[800] leading-none text-[#003f83] dark:text-[#fff] mb-1">10+</h4>
                <p className="text-[12px] sm:text-[13px] font-[600] text-[#575f69] dark:text-[#bfc7d3] uppercase tracking-wider">Total Reviews</p>
            </div>

        </div>
    );
};

export default FloatingStats;