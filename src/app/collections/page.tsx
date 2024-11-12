import CollectionGroup from "@/components/CollectionGroup/CollectionGroup";
import PageIntro from "@/components/PageIntro/PageIntro";
import img from "../../../public/images/collections.jpg";

export default function page() {
  return (
    <main>
      <PageIntro
        src={img}
        eyebrow="Experience the CLARO difference you've been hearing about"
        text='Collections'
      />
      <CollectionGroup />
    </main>
  );
}
