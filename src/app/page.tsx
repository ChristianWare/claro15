import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import FinalCTA from "@/components/FinalCTA/FinalCTA";
import Hero from "@/components/Hero/Hero";
import TakeControl from "@/components/TakeControl/TakeControl";
import Usp from "@/components/Usp/Usp";
import Uspii from "@/components/Uspii/Uspii";
import VideoUsp from "@/components/VideoUsp/VideoUsp";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Hero />
      <Suspense fallback='Loading...'>
        <FeaturedProducts />
      </Suspense>
      <Usp />
      <Uspii />
      <VideoUsp />
      <TakeControl />
      <FinalCTA />
    </main>
  );
}
