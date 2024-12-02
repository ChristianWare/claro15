import Product from "@/components/Product/Product";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PageIntro from "@/components/PageIntro/PageIntro";
import styles from "./SlupPage.module.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import VideoUspiii from "@/components/VideoUspiii/VideoUspiii";
import Footer from "@/components/Footer/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Updated generateMetadata function
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params; // Await the params to access the slug
  const collection = await getCollectionBySlug(
    await getWixServerClient(),
    slug
  );

  if (!collection) notFound();

  const banner = collection.media?.mainMedia?.image;

  return {
    title: collection.name,
    description: collection.description,
    openGraph: {
      images: banner ? [{ url: banner.url }] : [],
    },
  };
}

// Updated Page component
export default async function Page({ params }: PageProps) {
  const { slug } = await params; // Await the params to access the slug
  const collection = await getCollectionBySlug(
    await getWixServerClient(),
    slug
  );

  if (!collection?._id) notFound();

  const banner = collection.media?.mainMedia?.image?.url || "";
  const categoryName = collection.name || "Category";

  return (
    <main>
      <PageIntro
        src={banner}
        eyebrow="Experience the CHUXLY difference you've been hearing about"
        text={categoryName}
      />
      <LayoutWrapper>
        <Suspense fallback={"Loading..."}>
          <Products collectionId={collection._id} />
        </Suspense>
        <br />
        <br />
        <br />
        <VideoUspiii />
      </LayoutWrapper>
      <Footer />
    </main>
  );
}

interface ProductProps {
  collectionId: string;
}

// Updated Products component
async function Products({ collectionId }: ProductProps) {
  const collectionProducts = await queryProducts(await getWixServerClient(), {
    collectionIds: collectionId,
  });

  if (!collectionProducts.length) notFound();

  return (
    <div className={styles.container}>
      {collectionProducts.items.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}
