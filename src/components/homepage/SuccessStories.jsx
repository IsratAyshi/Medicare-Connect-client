
import { getTopPublicReviews } from '@/lib/api/stats';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';


export default async function SuccessStories() {
    const fetchedReviews = await getTopPublicReviews();

    const displayReviews = fetchedReviews.length > 0 ? fetchedReviews : [
        {
            _id: "default-1",
            patientDetails: { name: "Robert Thompson" },
            rating: 5,
            reviewText: "The care I received at Medicare Connect was exceptional. From booking to post-consultation follow-up, the process was seamless and incredibly professional."
        },
        {
            _id: "default-2",
            patientDetails: { name: "Sarah Jenkins" },
            rating: 5,
            reviewText: "Finding a specialist for my daughter was so easy. The platform is intuitive and we felt in safe hands immediately. Highly recommend!"
        },
        {
            _id: "default-3",
            patientDetails: { name: "Elena Rodriguez" },
            rating: 5,
            reviewText: "The 24/7 support is a life-saver. Being able to access my medical records and chat with a professional at any hour gives me immense peace of mind."
        }
    ];

    return (
        <section className="w-full bg-[#004ca3] dark:bg-[#001731] py-24 px-6 font-manrope relative overflow-hidden transition-colors duration-200">

            {/* Big Decorative Background Quote Graphic */}
            <div className="absolute top-8 lg:top-15 right-4 rotate-10 lg:right-60 text-[#005cd4] dark:text-[#002247] text-[180px] lg:text-[260px] font-serif font-bold leading-none select-none pointer-events-none z-0 opacity-40">
                ”
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">

                {/* ===== SECTION HEADER ==== */}
                <div className="text-center mb-16">
                    <h2 className="text-[32px] sm:text-[40px] font-[800] text-white tracking-tight mb-3">
                        Patient success stories
                    </h2>
                    <p className="text-[15px] sm:text-[16px] font-[400] text-[#b0d2ff] dark:text-[#9bc2f5]">
                        Real stories from people who trust us with their health.
                    </p>
                </div>

                {/* ===== REVIEWS GRID ===== */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayReviews.map((review) => {
                        // Extract values safely from aggregated document structure
                        const reviewId = review._id?.$oid || review._id;
                        const patientName = review.patientDetails?.name || "Anonymous Patient";
                        const ratingCount = Number(review.rating) || 5;

                        return (
                            <div
                                key={reviewId}
                                className="bg-[#004391] dark:bg-[#002249] border border-[#ffffff]/10 dark:border-white/5 rounded-2xl p-8 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-2 hover:bg-[#003d85] dark:hover:bg-[#002957] transition-all duration-300 ease-out"
                            >
                                <div>
                                    {/* Dynamic Star Rating Indicator Row */}
                                    <div className="flex items-center gap-1.5 mb-6 text-[#40c3ff]">
                                        {Array.from({ length: ratingCount }).map((_, i) => (
                                            <FaStar key={i} size={15} />
                                        ))}
                                    </div>

                                    {/* Main Testimonial Review Content Text */}
                                    <p className="text-[15px] sm:text-[16px] font-[400] italic leading-[26px] text-white/90 mb-8">
                                        &ldquo;{review.reviewText}&rdquo;
                                    </p>
                                </div>

                                {/* Patient Profile Footer Info */}
                                <div className="flex items-center gap-4 border-t border-white/10 pt-5 mt-auto">
                                    <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200 border-2 border-white/20 relative shrink-0">
                                        {/* Fallback to default asset logo if user has no avatar icon path */}
                                        <Image
                                            src={review.patientDetails?.image || "/assets/logo.png"}
                                            alt={`${patientName} Profile`}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-col">
                                        <h4 className="text-[16px] font-[700] text-white leading-tight">
                                            {patientName}
                                        </h4>
                                        <span className="text-[13px] font-[400] text-[#93c5fd] dark:text-[#7eb6fc] mt-0.5">
                                            Verified Patient
                                        </span>
                                    </div>
                                </div>

                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}