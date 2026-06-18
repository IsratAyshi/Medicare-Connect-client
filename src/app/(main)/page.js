import HeroBanner from "@/components/homepage/HeroBanner";
import MedSpecialization from "@/components/homepage/MedSpecialization";
import ReadyStart from "@/components/homepage/ReadyStart";
import WhyChoose from "@/components/homepage/WhyChoose";
import Image from "next/image";

export default function Home() {
  return (
    <div >
        <HeroBanner />
        <MedSpecialization />
        <WhyChoose />
        <ReadyStart />
    </div>
  );
}
