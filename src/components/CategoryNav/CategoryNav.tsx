/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

import Link from "next/link";
import styles from "./CategoryNav.module.css";
import Circle from "../../../public/icons/circle.svg";
import { getCollections } from "@/wix-api/collections";
import { getWixServerClient } from "@/lib/wix-client.server";

interface CategoryNavProps {
  currentCollectionIds?: string[]; // Optional array of current collection IDs
}

const CategoryNav = async ({ currentCollectionIds }: CategoryNavProps) => {
  const wixClient = await getWixServerClient();
  const [collections] = await Promise.all([getCollections(wixClient)]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.heading}>Shop</span>
        <div className={styles.bottom}>
          <h6 className={styles.link}>
            <span className={styles.span}>
              <Circle width={10} height={10} className={styles.icon} />
            </span>{" "}
            <Link href='/shop'>All</Link>
          </h6>
          {collections.map((x: any) => (
            <div key={x.id} className={styles.list}>
              <h6 className={styles.link}>
                <span className={styles.span}>
                  <Circle
                    width={10}
                    height={10}
                    className={
                      currentCollectionIds?.includes(x.id)
                        ? styles.activeIcon
                        : styles.icon
                    }
                  />
                </span>{" "}
                <Link href={`/shop/${x.slug}`}>{x.name}</Link>
              </h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
