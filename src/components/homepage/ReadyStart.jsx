import Link from 'next/link';

export default function ReadyStart() {
    return (
        <section className="w-full bg-[#f8f9ff] dark:bg-[#0D1C2D] py-16 px-6 font-manrope transition-colors duration-200">
            <div className="max-w-[1100px] mx-auto">

                {/* Main Banner Card Wrapper */}
                <div className="
          w-full bg-[#dee9fc] dark:bg-[#233143] 
          rounded-xl px-6 py-16 sm:px-12 sm:py-20
          text-center flex flex-col items-center justify-center
          border border-[#c2c6d3]/20 dark:border-white/5
          shadow-[0_10px_30px_rgba(0,63,131,0.03)]
          hover:shadow-[0_15px_40px_rgba(0,63,131,0.07)] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)]
          transition-all duration-300 ease-in-out
        ">

                    {/* Section Call-To-Action Heading */}
                    <h2 className="text-[32px] sm:text-[42px] lg:text-[48px] font-[800] tracking-tight leading-[1.15] text-[#00234a] dark:text-[#fff] mb-6 max-w-[650px]">
                        Ready to start your wellness journey?
                    </h2>

                    {/* Descriptive Subtext */}
                    <p className="text-[15px] sm:text-[16px] font-[500] leading-[26px] text-[#575f69] dark:text-[#bfc7d3] max-w-[580px] mb-10">
                        Join thousands of others who have trusted Medicare Connect for their healthcare needs. Professional care is just a few clicks away.
                    </p>

                    {/* Interactive Button Groups */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">

                        {/* Primary Filled Call-To-Action */}
                        <Link
                            href="#appointments"
                            className="
                w-full sm:w-auto inline-flex items-center justify-center
                bg-[#003f83] dark:bg-[#b7ceff] 
                text-white dark:text-[#003f83] 
                font-[700] text-[15px] rounded-xl px-8 h-[52px]
                shadow-md shadow-[#003f83]/10 dark:shadow-none
                hover:opacity-95 hover:translate-y-[-1px] active:translate-y-0
                transition-all duration-200
              "
                        >
                            Book an Appointment
                        </Link>

                        {/* Secondary Outlined Call-To-Action */}
                        <Link
                            href="/auth/register"
                            className="
                w-full sm:w-auto inline-flex items-center justify-center
                bg-white dark:bg-transparent
                border-[2px] border-[#003f83] dark:border-[#abc7ff] 
                text-[#003f83] dark:text-[#abc7ff] 
                font-[700] text-[15px] rounded-xl px-8 h-[52px]
                hover:bg-[#003f83] dark:hover:bg-[#abc7ff]
                hover:text-white dark:hover:text-[#003f83]
                hover:translate-y-[-1px] active:translate-y-0
                transition-all duration-200
              "
                        >
                            Join as a Doctor
                        </Link>

                    </div>

                </div>

            </div>
        </section>
    );
}