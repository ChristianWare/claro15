import PageIntro from "@/components/PageIntro/PageIntro";
import AboutImage from "../../../public/images/about.jpg";
import Footer from "@/components/Footer/Footer";
import AboutPostHero from "./AboutPostHero/AboutPostHero";
import AboutVideo from "./AboutVideo/AboutVideo";

const AboutPage = () => {
  return (
    <main>
      <PageIntro
        src={AboutImage}
        eyebrow="Experience the CLARO difference you've been hearing about"
        text='Our Vision'
      />
      <AboutPostHero />
      <AboutVideo />
      <Footer />
    </main>
  );
};
export default AboutPage;
