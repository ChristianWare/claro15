import styles from "./layout.module.css";
import Nav from "@/components/Nav/Nav";
import ContentPadding from "@/components/ContentPadding/ContentPadding";
import Footer from "@/components/Footer/Footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  pathname?: string;
}) {
  // const collections = await getCollections(await getWixServerClient());

  return (
    <div className={styles.container}>
      <div className={styles.navContainer}>
        <ContentPadding>
          <Nav color='black' />
        </ContentPadding>
      </div>
        {children}
      <Footer />
    </div>
  );
}
