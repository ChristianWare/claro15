"use client";

import styles from "./ProductDetails.module.css";
import { products } from "@wix/stores";
import { useState } from "react";
import { checkInStock, findVariant } from "@/lib/utils";
import ProductMedia from "../ProductMedia/ProductMedia";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductOptions from "../ProductOptions/ProductOptions";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import CollapsibleSection from "@/components/CollapsibleSection/CollapsibleSection";

interface ProductDetailsProps {
  product: products.Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0].description || "",
      }))
      ?.reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {}
  );

  // Filter media based on selected options
  const getFilteredMedia = () => {
    const selectedOptionsMedia = product.productOptions?.flatMap((option) => {
      const selectedChoice = option.choices?.find(
        (choice) => choice.description === selectedOptions[option.name || ""]
      );
      return selectedChoice?.media?.items ?? [];
    });

    return !!selectedOptionsMedia?.length
      ? selectedOptionsMedia // Filtered media for selected options
      : product.media?.items; // Fallback to all media if no specific media
  };

  const selectedMedia = getFilteredMedia();

  const selectedVariant = findVariant(product, selectedOptions);

  const inStock = checkInStock(product, selectedOptions);

  const availableQuantity = Math.min(product.stock?.quantity || 10, 10) ?? 1;

  const availableQuantityExceeded =
    !!availableQuantity && quantity > availableQuantity;

  const increaseQuantity = () => {
    if (quantity < availableQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <ProductMedia media={selectedMedia} />
      </div>
      <div className={styles.right}>
        <span className={styles.breadcrumbs}>Shop • {product.ribbon}</span>
        <h1 className={styles.heading}>{product.name}</h1>
        <ProductPrice product={product} selectedVariant={selectedVariant} />
        <ProductOptions
          product={product}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
        {product.description && (
          <div
            dangerouslySetInnerHTML={{ __html: product.description }}
            className={styles.description}
          />
        )}

        {!!product.additionalInfoSections?.length && (
          <>
            <p
              className={styles.readMore}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "- Show Less" : "+ Read More"}
            </p>
            <div
              className={`${styles.infoContainer} ${
                showMore ? styles.show : ""
              }`}
            >
              {product.additionalInfoSections.map((section) => (
                <div key={section.title}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: section.description || "",
                    }}
                    className={styles.description}
                  />
                </div>
              ))}
            </div>
          </>
        )}
        <div className={styles.quantityInfo}>
          <div className={styles.quantitySelector}>
            <button
              onClick={decreaseQuantity}
              className={styles.quantityButton}
            >
              -
            </button>
            <span className={styles.quantityDisplay}>{quantity}</span>
            <button
              onClick={increaseQuantity}
              className={styles.quantityButton}
            >
              +
            </button>
          </div>
          {!!availableQuantity &&
            (availableQuantityExceeded || availableQuantity < 10) && (
              <span className={styles.stockWarning}>
                Only {availableQuantity} left in stock
              </span>
            )}
        </div>

        {inStock ? (
          <div className={styles.btnContainer}>
            <AddToCartButton
              product={product}
              selectedOptions={selectedOptions}
              quantity={quantity}
            />
          </div>
        ) : (
          <button className={styles.outOfStockButton}>Out of stock</button>
        )}

        <div className={styles.collapsibleSection}>
          <CollapsibleSection
            title='Warranty'
            content='Your investment in CLARO headphones is backed by our unwavering commitment to quality. Every purchase comes with a 90-day warranty, ensuring your audio journey is supported with peace of mind.'
          />
          <CollapsibleSection
            title='Shipping & delivery'
            content='Our global shipping network ensures that no matter where you are, your headphones will arrive at your doorstep with swift efficiency. All orders ship next business day.'
          />
          <CollapsibleSection
            title='Support'
            content='Download the CLARO app now – available on Google Play and the Apple Store. For technical support, please visit our Support page.'
          />
        </div>
      </div>
    </div>
  );
}
