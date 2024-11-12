import CategoryNav from "@/components/CategoryNav/CategoryNav";
import LayoutWrapper from "@/components/LayoutWrapper";
import PageIntro from "@/components/PageIntro/PageIntro";
import Product from "@/components/Product/Product";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import styles from "../ShopPage.module.css";
import Shop from "../../../../public/images/shop.jpg";

interface PageProps {
  params: { slug: string }; // Use params for category slug
}

// Generate metadata based on collection name
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params;
  const collection = await getCollectionBySlug(
    await getWixServerClient(),
    slug
  );

  return {
    title: collection ? collection.name : "Products",
    description: collection ? collection.description : "Browse our products",
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;
  const collection = await getCollectionBySlug(
    await getWixServerClient(),
    slug
  );

  if (!collection?._id) notFound();

  const banner = collection.media?.mainMedia?.image?.url || Shop;
  const categoryName = collection.name;

  return (
    <main>
      <PageIntro
        src={banner} // Use dynamic banner from Wix
        eyebrow="Experience the CLARO difference you've been hearing about"
        text={categoryName} // Set category name as the text
      />
      <LayoutWrapper>
        <Suspense fallback='Loading...'>
          <ProductResults collectionIds={[collection._id]} page={1} />{" "}
          {/* Pass the collection ID */}
        </Suspense>
      </LayoutWrapper>
    </main>
  );
}

interface ProductResultsProps {
  collectionIds: string[];
  page: number;
}

async function ProductResults({ collectionIds, page }: ProductResultsProps) {
  const pageSize = 8;

  const products = await queryProducts(await getWixServerClient(), {
    collectionIds,
    limit: pageSize,
    skip: (page - 1) * pageSize,
  });

  if (page > (products.totalPages || 1)) notFound();

  return (
    <section>
      <div className={styles.content}>
        <CategoryNav />
        <div className={styles.products}>
          {products.items.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
