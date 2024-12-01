import styles from "./AddToCartButton.module.css";

import { useAdditemToCart } from "@/hooks/cart";
import { products } from "@wix/stores";

interface AddToCartButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  ...props
}: AddToCartButtonProps) {
  const mutation = useAdditemToCart();

  return (
    <button
      onClick={() =>
        mutation.mutate({
          product,
          selectedOptions,
          quantity,
        })
      }
      {...props}
      className={`${styles.btn} ${styles.pulseWrapper}`}
    >
      <span className={styles.pulse}></span> Add To Cart
    </button>
  );
}
