// 'use client';

import Link from 'next/link';
import { ArrowRight } from '@gravity-ui/icons';
// Import proper medical icons from Lucide
import {
    HeartPulse,
    Brain,
    Baby,
    Sparkles,
    BoneFracture
} from 'lucide-react';
import { GiStomach } from 'react-icons/gi';

export default function MedSpecialization() {
    // Array updated to use inline React Component instances for icons
    const specializations = [
        {
            title: "Cardiology",
            description: "Expert heart care services including diagnostics, preventative care, and specialized treatments for cardiac health.",
            icon: <HeartPulse size={24} />
        },
        {
            title: "Neurology",
            description: "Comprehensive care for nervous system disorders, brain health, and neurological wellness programs.",
            icon: <Brain size={24} />
        },
        {
            title: "Orthopedics",
            description: "Specialized care for bones, joints, and muscular skeletal conditions to restore your mobility.",
            icon: <BoneFracture size={24} /> // Represents skeletal/joint mobility tracking
        },
        {
            title: "Pediatrics",
            description: "Gentle and expert medical care for infants, children, and adolescents in a welcoming environment.",
            icon: <Baby size={24} />
        },
        {
            title: "Dermatology",
            description: "Expert skin care services including treatment for chronic conditions and preventative dermatological health.",
            icon: <Sparkles size={24} /> // Represents clean, healthy skin glowing properties
        },
        {
            title: "Gastroenterology",
            description: "Comprehensive digestive health services focused on treatment and management of GI disorders.",
            icon: <GiStomach size={24} />
        }
    ];

    return (
        <section className="w-full bg-[#f8f9ff] dark:bg-[#0D1C2D] py-20 px-6 font-manrope transition-colors duration-200">
            <div className="max-w-[1200px] mx-auto">

                {/* Section Header with Blue Accent Bar */}
                <div className="flex flex-col items-center text-center mb-16">
                    <h2 className="text-[32px] sm:text-[36px] font-[800] text-[#003f83] dark:text-[#fff] mb-3">
                        Expertise & specializations
                    </h2>
                    <div className="w-[70px] h-[4px] bg-[#0052ad] dark:bg-[#b7ceff] rounded-full" />
                </div>

                {/* 3-Column Specialization Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {specializations.map((spec, index) => (
                        <div
                            key={index}
                            className="
                group relative bg-white dark:bg-[#002b5c] 
                border border-[#c2c6d3]/30 dark:border-white/5 
                rounded-2xl p-8 flex flex-col justify-between items-start
                shadow-[0_4px_20px_rgba(0,0,0,0.02)]
                hover:shadow-[0_12px_30px_rgba(0,63,131,0.08)] dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)]
                hover:-translate-y-1.5
                transition-all duration-300 ease-out
              "
                        >
                            <div>
                                {/* Circular Badge Container - Native Tailwind handling fill-color adjustments */}
                                <div className="
  w-14 h-14 rounded-full 
  bg-blue-100 dark:bg-blue-950/50 
  flex items-center justify-center mb-6
  text-[#0052ad] dark:text-blue-200
  group-hover:bg-[#0052ad] dark:group-hover:bg-blue-200 
  group-hover:text-white dark:group-hover:text-blue-950
  transition-all duration-300 ease-out
">
                                    {/* Clean direct injection instead of the old Next.js <Image> element */}
                                    {spec.icon}
                                </div>

                                {/* Specialization Title */}
                                <h3 className="text-[22px] font-[800] text-[#00234a] dark:text-[#fff] mb-3">
                                    {spec.title}
                                </h3>

                                {/* Description Body Text */}
                                <p className="text-[14px] sm:text-[15px] font-[500] leading-[24px] text-[#575f69] dark:text-[#bfc7d3] mb-6">
                                    {spec.description}
                                </p>
                            </div>

                            {/* Interactive Anchor Trigger Link */}
                            <Link
                                href="#"
                                className="
                  inline-flex items-center gap-2 
                  text-[14px] font-[700] 
                  text-[#0052ad] dark:text-[#abc7ff]
                  hover:text-[#00234a] dark:hover:text-[#fff]
                  transition-colors mt-auto
                "
                            >
                                <span>Learn More</span>
                                <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-200" />
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}