import { getProductBySlug } from "@/wix-api/products";
import { notFound } from "next/navigation";
import ProductDetails from "./ProductDetails/ProductDetails";
import { Metadata } from "next";
import { getWixServerClient } from "@/lib/wix-client.server";
import Features from "@/components/Features/Features";
import LayoutWrapper from "@/components/LayoutWrapper";
import VideoUsp from "@/components/VideoUsp/VideoUsp";
import Featuresii from "@/components/Featuresii/Featuresii";
import TextImageFlip from "@/components/TextImageFlip/TextImageFlip";
import FlipOne from "../../../../public/images/flipOne.jpg";
import FlipTwo from "../../../../public/images/flipTwo.jpg";
import Witb from "@/components/Witb/Witb";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import FinalCTA from "@/components/FinalCTA/FinalCTA";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params; // Await params here

  const wixClient = await getWixServerClient();
  const product = await getProductBySlug(wixClient, slug);

  if (!product) notFound();

  const mainImage = product.media?.mainMedia?.image;

  return {
    title: product.name,
    description: "Get this product on flowshop",
    openGraph: {
      images: mainImage?.url
        ? [
            {
              url: mainImage.url,
              width: mainImage.width,
              height: mainImage.height,
              alt: mainImage.altText || "",
            },
          ]
        : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params; // Await params here

  const wixClient = await getWixServerClient();
  const product = await getProductBySlug(wixClient, slug);

  if (!product?._id) notFound();

  const media = product.media?.items; // Extract media items from the product

  return (
    <main>
      <LayoutWrapper>
        <div style={{ marginTop: "5rem" }}>
          <ProductDetails product={product} />
        </div>
      </LayoutWrapper>
      <Features />
      <VideoUsp />
      <Featuresii />
      <TextImageFlip
        src={FlipOne}
        title='Feel the music, embrace the silence'
        text="Unlike conventional headphones, CHUXLY's noise-cancelling technology isn't just about silence; it's about elevating your music to new dimensions. By eliminating external disturbances, every note resonates with crystal clarity, and every beat is felt with deep intensity. With CHUXLY, you're not just hearing music –– you're experiencing it in its purest form."
      />
      <TextImageFlip
        src={FlipTwo}
        title='Perfect sound, no strings attached'
        text="Our CHUXLY Bluetooth connection gives you the freedom to explore your auditory universe without any constraints. Whether you're tuning into a playlist or diving into a podcast, your listening experience is transformed into a realm of boundless sound, redefining wireless possibilities with every note."
        flip='flip'
      />
      <Witb media={media} itemName={product.name || undefined} />
      <RelatedProducts productId={product._id} />
      <FinalCTA />
    </main>
  );
}
