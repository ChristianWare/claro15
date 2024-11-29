import CollectionGroup from "@/components/CollectionGroup/CollectionGroup";
import PageIntro from "@/components/PageIntro/PageIntro";
import img from "../../../public/images/collections.jpg";
import Footer from "@/components/Footer/Footer";

export default function page() {
  return (
    <main>
      <PageIntro
        src={img}
        eyebrow="Experience the CHUXLY difference you've been hearing about"
        text='Collections'
      />
      <CollectionGroup />
      <Footer />
    </main>
  );
}
