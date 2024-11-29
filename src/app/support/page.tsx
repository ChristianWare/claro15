import PageIntro from "@/components/PageIntro/PageIntro";
import SupportImage from "../../../public/images/support.jpg";
import SupportContact from "./SupportContact/SupportContact";
import NewFaq from "@/components/NewFaq/NewFaq";
import Footer from "@/components/Footer/Footer";

const SupportPage = () => {
  return (
    <main>
      <PageIntro
        src={SupportImage}
        eyebrow="Experience the CHUXLY difference you've been hearing about"
        text='Reach out to CHUXLY'
      />
      <SupportContact />
      <NewFaq />
      <Footer />
    </main>
  );
};
export default SupportPage;
