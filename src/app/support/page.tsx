import PageIntro from "@/components/PageIntro/PageIntro";
import SupportImage from "../../../public/images/support.jpg";
import SupportContact from "./SupportContact/SupportContact";

const SupportPage = () => {
  return (
    <main>
      <PageIntro
        src={SupportImage}
        eyebrow="Experience the CLARO difference you've been hearing about"
        text='Reach out to CLARO'
      />
      <SupportContact />
    </main>
  );
};
export default SupportPage;
