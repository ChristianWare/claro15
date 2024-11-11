import FinalCTA from "@/components/FinalCTA/FinalCTA";
import Hero from "@/components/Hero/Hero";
import TakeControl from "@/components/TakeControl/TakeControl";
import Usp from "@/components/Usp/Usp";
import Uspii from "@/components/Uspii/Uspii";
import VideoUsp from "@/components/VideoUsp/VideoUsp";

export default function Home() {
  return (
    <main>
      <Hero />
      <Usp />
      <Uspii />
      <VideoUsp />
      <TakeControl />
      <FinalCTA />
    </main>
  );
}
