/* eslint-disable @typescript-eslint/no-explicit-any */
import PageIntro from "@/components/PageIntro/PageIntro";
import Shop from "../../../public/images/shop.jpg";
import { wixClientServer } from "@/lib/wixClientServer";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Suspense } from "react";
import ProductList from "@/components/ProductList/ProductList";
import FinalCTA from "@/components/FinalCTA/FinalCTA";
import styles from "./ShopPage.module.css";
import CategoryNav from "@/components/CategoryNav/CategoryNav";

const ShopPage = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await wixClientServer();

  const cat = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );

  return (
    <main>
      <PageIntro
        src={Shop}
        eyebrow="Experience the CLARO difference you've been hearing about"
        text='Shop CLARO'
      />
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <CategoryNav />
          </div>
          <div className={styles.right}>
            <Suspense fallback='loading'>
              <ProductList
                categoryId={
                  cat.collection?._id || "00000000-000000-000000-000000000001"
                }
                searchParams={searchParams}
              />
            </Suspense>
          </div>
        </div>
      </LayoutWrapper>
      <FinalCTA />
    </main>
  );
};
export default ShopPage;
