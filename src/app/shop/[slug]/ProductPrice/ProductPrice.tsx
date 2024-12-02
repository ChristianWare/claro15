import styles from "./ProductPrice.module.css";
import { products } from "@wix/stores";

interface ProductPriceProps {
  product: products.Product;
  selectedVariant: products.Variant | null;
}

export default function ProductPrice({
  product,
  selectedVariant,
}: ProductPriceProps) {
  const priceData = selectedVariant?.variant?.priceData || product.priceData;

  if (!priceData) return null;

  const hasDiscount = priceData.discountedPrice !== priceData.price;

  return (
    <div className={styles.container}>
      {hasDiscount && (
        <span className={styles.discountedPrice}>
          {priceData.formatted?.discountedPrice}
        </span>
      )}
      <span
        className={`${styles.price} ${hasDiscount ? styles.strikethrough : ""}`}
      >
        {priceData.formatted?.price}
      </span>
    </div>
  );
}
