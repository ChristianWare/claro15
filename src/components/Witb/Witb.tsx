"use client";

import { useEffect, useState } from "react";
import LayoutWrapper from "../LayoutWrapper";
import WixImage from "../WixImage";
import styles from "./Witb.module.css";
import { products } from "@wix/stores";

interface WitbProps {
  media: products.MediaItem[] | undefined;
  itemName: string | undefined; // Add itemName prop
}

export default function Witb({ media, itemName }: WitbProps) {
  const [firstImage, setFirstImage] = useState<string | null>(null);

  useEffect(() => {
    if (media?.length) {
      const image = media[0]?.image?.url || null;
      setFirstImage(image);
    }
  }, [media]);

  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            {firstImage && (
              <div className={styles.imgContainer}>
                <WixImage
                  scaleToFill={false}
                  mediaIdentifier={firstImage}
                  alt={media?.[0]?.image?.altText || "Product Image"}
                  className={styles.img}
                />
              </div>
            )}
          </div>
          <div className={styles.right}>
            <h2 className={styles.heading}>What&apos;s in the box</h2>
            {itemName && (
              <div className={styles.contentsInfo}>
                <h3 className={styles.itemName}>{itemName}</h3>
                <h3 className={styles.itemName}>Carrying case</h3>
                <h3 className={styles.itemName}>
                  8&quot; USB-C charging cable
                </h3>
                <h3 className={styles.itemName}>3.5mm audio cable</h3>
                <h3 className={styles.itemName}>
                  3.5mm to Apple Lightning audio cable
                </h3>
              </div>
            )}{" "}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
