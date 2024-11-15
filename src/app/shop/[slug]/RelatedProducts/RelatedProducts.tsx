// RelatedProducts.tsx
import React from "react";
import { getRelatedProducts } from "@/wix-api/products";
import { getWixServerClient } from "@/lib/wix-client.server";
import Product from "@/components/Product/Product";
import styles from "./RelatedProducts.module.css";
import LayoutWrapper from "@/components/LayoutWrapper";

interface RelatedProductsProps {
  productId: string;
}

async function fetchRelatedProducts(productId: string) {
  const wixClient = await getWixServerClient();
  return await getRelatedProducts(wixClient, productId);
}

export default async function RelatedProducts({
  productId,
}: RelatedProductsProps) {
  const relatedProducts = await fetchRelatedProducts(productId);

  if (!relatedProducts.length) return null;

  return (
    <LayoutWrapper>
      <div className={styles.content}>
        <h2 className={styles.heading}>Browse more products</h2>
        <div className={styles.bottom}>
          {relatedProducts.slice(0, 3).map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </LayoutWrapper>
  );
}
