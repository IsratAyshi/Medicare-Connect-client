import FeaturedDoctors from "@/components/homepage/FeaturedDoctors";
import HeroBanner from "@/components/homepage/HeroBanner";
import MedSpecialization from "@/components/homepage/MedSpecialization";
import ReadyStart from "@/components/homepage/ReadyStart";
import SuccesStories from "@/components/homepage/SuccessStories";
import WhyChoose from "@/components/homepage/WhyChoose";
import { getFeaturedDoctors } from "@/lib/api/doctors";
import { getOverviewStats } from "@/lib/api/stats";
import Image from "next/image";

export default async function Home() {


  const statsData = await getOverviewStats();
  const featuredDoctors = await getFeaturedDoctors();

  return (
    <div >
        <HeroBanner stats= {statsData}/>
        <MedSpecialization />
        <WhyChoose />
        <FeaturedDoctors featuredDoctors= {featuredDoctors}/>
        <SuccesStories />
        <ReadyStart />
    </div>
  );
}
