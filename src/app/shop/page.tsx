import { ProductsSort } from "@/wix-api/products";
import { Metadata } from "next";
import { Suspense } from "react";
import ProductResults from "@/components/ProductResults/ProductResults";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollections } from "@/wix-api/collections";
import SearchFilterLayout from "./SearchFilterLayout";
import LayoutWrapper from "@/components/LayoutWrapper";
// import Nav from "@/components/Nav/Nav";
// import styles from "./ShopPage.module.css";

interface PageProps {
  searchParams: {
    q?: string;
    page?: string;
    collection?: string[];
    price_min?: string;
    price_max?: string;
    sort?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { q } = await Promise.resolve(searchParams);
  return {
    title: q ? `Results for "${q}"` : "Products",
  };
}

export default async function Page({ searchParams }: PageProps) {
  const {
    q,
    page = "1",
    collection: collectionIds,
    price_min,
    price_max,
    sort,
  } = await Promise.resolve(searchParams);

  // Fetch collections
  const collections = await getCollections(await getWixServerClient());

  return (
    <LayoutWrapper>
      <SearchFilterLayout collections={collections}>
      
        <Suspense fallback='Loading...' key={`${q}-${page}`}>
          <ProductResults
            q={q}
            page={parseInt(page)}
            collectionIds={collectionIds}
            priceMin={price_min ? parseInt(price_min) : undefined}
            priceMax={price_max ? parseInt(price_max) : undefined}
            sort={sort as ProductsSort}
          />
        </Suspense>
      </SearchFilterLayout>
    </LayoutWrapper>
  );
}
