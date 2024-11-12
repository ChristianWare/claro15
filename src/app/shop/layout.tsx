import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollections } from "@/wix-api/collections";
import SearchFilterLayout from "./SearchFilterLayout";
import PageIntro from "@/components/PageIntro/PageIntro";
import Shop from "../../../public/images/shop.jpg";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collections = await getCollections(await getWixServerClient());

  return (
    <>
      <PageIntro
        src={Shop}
        eyebrow="Experience the CLARO difference you've been hearing about"
        text='Products'
      />
      <SearchFilterLayout collections={collections}>
        {children}
      </SearchFilterLayout>
    </>
  );
}
