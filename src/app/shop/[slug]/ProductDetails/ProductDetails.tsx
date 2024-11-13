"use client";

import styles from "./ProductDetails.module.css";
import { products } from "@wix/stores";
import { useState } from "react";
import { checkInStock, findVariant } from "@/lib/utils";
import ProductMedia from "../ProductMedia/ProductMedia";
import ProductPrice from "../ProductPrice/ProductPrice";
import ProductOptions from "../ProductOptions/ProductOptions";

interface ProductDetailsProps {
  product: products.Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQunatity] = useState(1);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0].description || "",
      }))
      ?.reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {}
  );

  const selectedVariant = findVariant(product, selectedOptions);

  const inStock = checkInStock(product, selectedOptions);

  const availableQuantity =
    selectedVariant?.stock?.quantity ?? product.stock?.quantity;

  const availableQuantityExceeded =
    !!availableQuantity && quantity > availableQuantity;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <ProductMedia media={product.media?.items} />
      </div>
      <div className={styles.right}>
        <span className={styles.breadcrumbs}>Shop • {product.ribbon}</span>
        <h1 className={styles.heading}>{product.name}</h1>
        {/* {product.brand && <p>Brand: {product.brand}</p>}
        {product.ribbon && <p>Ribbon: {product.ribbon}</p>} */}
        <ProductPrice product={product} selectedVariant={selectedVariant} />
        <ProductOptions
          product={product}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />

        {product.description && (
          <div
            dangerouslySetInnerHTML={{ __html: product.description }}
            className='prose'
          ></div>
        )}
        <label htmlFor='quantity'>Quantity</label>
        <div className='gap2-.5 flex items-center'>
          <input
            type='number'
            name='quantity'
            value={quantity}
            onChange={(e) => setQunatity(Number(e.target.value))}
            className='w-24 border-blue-500'
            disabled={!inStock}
          />
          {!!availableQuantity &&
            (availableQuantityExceeded || availableQuantity < 10) && (
              <span className='text-destructive'>
                Only {availableQuantity} left in stock
              </span>
            )}
        </div>
        {!!product.additionalInfoSections?.length && (
          <>
            <p>Additional product information</p>
            {product.additionalInfoSections.map((section) => (
              <div key={section.title}>
                <p>{section.title}</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: section.description || "",
                  }}
                  className='prose text-muted-foreground dark:prose-invert text-sm'
                />
              </div>
            ))}{" "}
          </>
        )}
      </div>
    </div>
  );
}
