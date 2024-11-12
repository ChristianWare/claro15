// import PaginationBar from "@/components/PaginationBar";
import Product from "@/components/Product/Product";
import { getWixServerClient } from "@/lib/wix-client.server";
import { ProductsSort, queryProducts } from "@/wix-api/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import styles from "./ShopPage.module.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import PageIntro from "@/components/PageIntro/PageIntro";
import Shop from "../../../public/images/shop.jpg";
import CategoryNav from "@/components/CategoryNav/CategoryNav";

interface PageProps {
  searchParams: {
    q?: string;
    page?: string;
    collection?: string[]; // Categories filter
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

  const title = q ? `Results for "${q}"` : "Products";

  return (
    <main>
      <PageIntro
        src={Shop}
        eyebrow="Experience the CLARO difference you've been hearing about"
        text={title}
      />
      <LayoutWrapper>
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
      </LayoutWrapper>
    </main>
  );
}

interface ProductResultsProps {
  q?: string;
  page: number;
  collectionIds?: string[];
  priceMin?: number;
  priceMax?: number;
  sort?: ProductsSort;
}

async function ProductResults({
  q,
  page,
  collectionIds,
  priceMin,
  priceMax,
  sort,
}: ProductResultsProps) {
  const pageSize = 8;

  const products = await queryProducts(await getWixServerClient(), {
    q,
    limit: pageSize,
    skip: (page - 1) * pageSize,
    collectionIds,
    priceMin,
    priceMax,
    sort,
  });

  if (page > (products.totalPages || 1)) notFound();

  return (
    <section>
      <div className={styles.content}>
        {/* Category navigation with the active category highlighted */}
        <CategoryNav currentCollectionIds={collectionIds || []} />
        <div className={styles.products}>
          {products.items.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
        {/* <PaginationBar currentPage={page} totalPages={products.totalPages || 1} /> */}
      </div>
    </section>
  );
}
