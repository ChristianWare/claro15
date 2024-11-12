import PageIntro from "@/components/PageIntro/PageIntro";
// import Product from "@/components/Product/Product";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollectionBySlug } from "@/wix-api/collections";
// import { queryProducts } from "@/wix-api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: { slug: string };
}

// Update generateMetadata to handle params asynchronously
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
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

export default async function Page({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const collection = await getCollectionBySlug(
    await getWixServerClient(),
    slug
  );

  if (!collection?._id) notFound();

  const banner = collection.media?.mainMedia?.image?.url; // Retrieve the banner image URL
  const categoryName = collection.name; // Retrieve the category name

  return (
    <main>
      <PageIntro
        src={banner} // Set banner as the src
        eyebrow="Experience the CLARO difference you've been hearing about"
        text={categoryName} // Set category name as the text
      />
      <div className='space-y-5'>
        <h2 className='text-2xl font-bold'>Products</h2>
        <Suspense fallback={"Loading..."}>
          {/* <Products collectionId={collection._id} /> */}
        </Suspense>
      </div>
    </main>
  );
}

// interface ProductProps {
//   collectionId: string;
// }

// async function Products({ collectionId }: ProductProps) {
//   const collectionProducts = await queryProducts(await getWixServerClient(), {
//     collectionIds: collectionId,
//   });

//   if (!collectionProducts.length) notFound();

//   return (
//     <div>
//       {collectionProducts.items.map((product) => (
//         <Product key={product._id} product={product} />
//       ))}
//     </div>
//   );
// }
