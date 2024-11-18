/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { products } from "@wix/stores";
import Link from "next/link";
import WixImage from "../WixImage";
import { formatCurrency } from "@/lib/utils";
import styles from "./Product.module.css";

interface ProductProps {
  product?: products.Product; // Optional to handle loading state
  isLoading?: boolean; // Flag to show the loading skeleton
}

export default function Product({ product, isLoading }: ProductProps) {
  if (isLoading) {
    return (
      <article className={`${styles.container} ${styles.skeleton}`}>
        <div className={styles.imgSkeleton}></div>
        <div className={styles.textSkeleton}></div>
        <div className={styles.textSkeleton}></div>
      </article>
    );
  }

  const mainImage = product?.media?.mainMedia?.image;

  return (
    <article className={styles.container}>
      <Link href={`/shop/${product?.slug}`} className={styles.card}>
        <WixImage
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText}
          width={700}
          height={700}
          className={styles.img}
        />
        <div className={styles.infoSection}>
          <h3 className={styles.productName}>{product?.name}</h3>
          <p className={styles.price}>{getFormattedPrice(product)}</p>
        </div>
      </Link>
    </article>
  );
}

function getFormattedPrice(product?: products.Product) {
  const minPrice = product?.priceRange?.minValue;
  const maxPrice = product?.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formatCurrency(minPrice, product.priceData?.currency)}`;
  } else {
    return (
      product?.priceData?.formatted?.discountedPrice ||
      product?.priceData?.formatted?.price ||
      "n/a"
    );
  }
}
