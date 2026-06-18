import Image from 'next/image';
import { LuUsers, LuFileText, LuCalendarDays } from 'react-icons/lu';

export default function WhyChoose() {
    const features = [
        {
            title: "Expert Doctors",
            description: "Access to board-certified specialists with decades of experience.",
            icon: <LuUsers size={22} />
        },
        {
            title: "Easy Records",
            description: "Securely manage your medical history and test results in one portal.",
            icon: <LuFileText size={22} />
        },
        {
            title: "Instant Booking",
            description: "Schedule appointments in seconds with real-time doctor availability.",
            icon: <LuCalendarDays size={22} />
        }
    ];

    return (
        <section id='about' className="w-full bg-[#eef3ff] dark:bg-[#002b5c] py-25 px-6 font-manrope transition-colors duration-200 overflow-hidden">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                {/* ==== LEFT COLUMN: IMAGES & OVERLAPPING CARD ====== */}
                <div className="lg:col-span-6 relative flex justify-center lg:justify-start">
                    <div className="relative w-full max-w-[480px] aspect-[2.1/2.3]">

                        {/* Main Section Image Container */}
                        <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-lg border border-white/20 relative group">
                            <Image
                                src="/assets/whychoose3.png" // Replace with your exact filename
                                alt="Medicare Connect Doctor"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                        </div>

                        {/* Overlapping 24/7 Support Card */}
                        <div className="
              absolute -bottom-15 -right-4 sm:-right-8 lg:-right-6
              w-[280px] sm:w-[320px] bg-[#003f83] dark:bg-[#002b5c] 
              text-white p-6 sm:p-8 rounded-[1.5rem] shadow-2xl shadow-black/10
              border border-white/10
              hover:-translate-y-2 hover:scale-[1.02]
              transition-all duration-300 ease-out cursor-default
            ">
                            <h4 className="text-[20px] sm:text-[22px] font-[800] mb-2">
                                24/7 Support
                            </h4>
                            <p className="text-[13px] sm:text-[14px] font-[400] leading-[22px] text-white/80">
                                Our emergency services and support teams are available around the clock for your peace of mind.
                            </p>
                        </div>

                    </div>
                </div>

                {/* ===== RIGHT COLUMN: VALUE PROPOSITIONS ====== */}
                <div className="mt-10 lg:mt-0 lg:col-span-6 flex flex-col justify-center">

                    {/* Main Section Heading Statement */}
                    <h2 className="text-[32px] sm:text-[40px] font-[800] leading-[1.2] text-[#00234a] dark:text-[#fff] mb-4">
                        Why choose Medicare Connect?
                    </h2>

                    {/* Intro Description Copy */}
                    <p className="text-[15px] sm:text-[16px] font-[500] leading-[26px] text-[#575f69] dark:text-[#bfc7d3] mb-10 max-w-[540px]">
                        We combine world-class medical expertise with cutting-edge digital infrastructure to provide a seamless healthcare experience.
                    </p>

                    {/* Interactive Feature List Rows */}
                    <div className="flex flex-col gap-6 w-full max-w-[520px]">
                        {features.map((item, index) => (
                            <div
                                key={index}
                                className="group flex items-start gap-5 p-3 -mx-3 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 hover:translate-x-2 transition-all duration-300 ease-out"
                            >
                                {/* Micro Icon Badge Container */}
                                <div className="
                  w-12 h-12 rounded-xl shrink-0
                  bg-blue-100 dark:bg-blue-950/50 
                  border border-[#c2c6d3]/40 dark:border-white/5
                  flex items-center justify-center 
                  text-[#0052ad] dark:text-[#abc7ff]
                  group-hover:bg-[#003f83] dark:group-hover:bg-[#b7ceff]
                  group-hover:text-white dark:group-hover:text-[#00234a]
                  shadow-sm group-hover:shadow-md
                  transition-all duration-300 ease-out
                ">
                                    {item.icon}
                                </div>

                                {/* Feature Copy details */}
                                <div className="flex flex-col">
                                    <h3 className="text-[18px] font-[700] text-[#00234a] dark:text-[#fff] mb-1 group-hover:text-[#0052ad] dark:group-hover:text-[#abc7ff] transition-colors duration-200">
                                        {item.title}
                                    </h3>
                                    <p className="text-[14px] font-[500] leading-[22px] text-[#575f69] dark:text-[#bfc7d3]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}