'use client'

import styles from './ProductDetails.module.css'
import { products } from "@wix/stores";
import { useState } from "react";
import { checkInStock, findVariant } from "@/lib/utils";
import ProductMedia from '../ProductMedia/ProductMedia';

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
      <ProductMedia media={product.media?.items} />

      <h1 className='text-3xl font-bold lg:text-4xl'>{product.name}</h1>
      {product.brand && <p>Brand: {product.brand}</p>}
      {product.ribbon && <p>Ribbon: {product.ribbon}</p>}
      {product.description && (
        <div
          dangerouslySetInnerHTML={{ __html: product.description }}
          className='prose'
        ></div>
      )}
      <div className='5 space-y-1'>
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