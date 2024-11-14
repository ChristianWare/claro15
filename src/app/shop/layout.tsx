import styles from "./layout.module.css";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollections } from "@/wix-api/collections";
import SearchFilterLayout from "./SearchFilterLayout";
import Nav from "@/components/Nav/Nav";
import ContentPadding from "@/components/ContentPadding/ContentPadding";
import Footer from "@/components/Footer/Footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  pathname?: string;
}) {
  const collections = await getCollections(await getWixServerClient());

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <ContentPadding>
          <Nav color='black' />
        </ContentPadding>
      </div>
      <SearchFilterLayout collections={collections}>
        {children}
      </SearchFilterLayout>
      <Footer />
    </div>
  );
}
