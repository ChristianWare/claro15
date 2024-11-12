/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { products } from "@wix/stores";
import Link from "next/link";
// import { media as wixMedia } from "@wix/sdk";
import WixImage from "../WixImage";
import { formatCurrency } from "@/lib/utils";
import styles from "./Product.module.css";
import DOMPurify from "isomorphic-dompurify";

interface ProductProps {
  product: products.Product;
}

export default function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;

  return (
    <article className={styles.container}>
      <Link href={`/shop/${product.slug}`} className={styles.card}>
        <WixImage
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText}
          width={700}
          height={700}
          className={styles.img}
        />
        <div className={styles.infoSection}>
          <h3 className={styles.productName}>{product.name}</h3>

          {/* <div
            className='line-clamp-5'
            dangerouslySetInnerHTML={{ __html: product.description || "" }}
          /> */}
          {product.additionalInfoSections && (
            <div
              className={styles.addInfoDetails}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections
                    .find((section: any) => section.title === "shortDesc")
                    ?.description?.slice(0, 22) || ""
                ),
              }}
            ></div>
          )}
          <p className={styles.price}>{getFormattedPrice(product)}</p>
        </div>
      </Link>
    </article>
  );
}

function getFormattedPrice(product: products.Product) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formatCurrency(minPrice, product.priceData?.currency)}`;
  } else {
    return (
      product.priceData?.formatted?.discountedPrice ||
      product.priceData?.formatted?.price ||
      "n/a"
    );
  }
}
