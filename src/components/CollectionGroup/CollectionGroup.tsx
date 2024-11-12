import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollections } from "@/wix-api/collections";
import Link from "next/link";
import LayoutWrapper from "../LayoutWrapper";
import styles from "./CollectionGroup.module.css";
import Image from "next/image";

export default async function CollectionGroup() {
  const wixClient = await getWixServerClient(); 

  const collections = await getCollections(wixClient);

  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          {collections.map((collection) => (
            <Link href={`/collections/${collection.slug}`} key={collection._id}>
              <div className={styles.imgContainer}>
                <div className={styles.imgOverlay}></div>
                {collection.bannerImage ? (
                  <Image
                    src={collection.bannerImage}
                    alt={collection.name || "Collection Banner"}
                    fill
                    className={styles.img}
                  />
                ) : (
                  // Fallback if no banner image exists
                  <div className={styles.noImage}>No Image Available</div>
                )}
                <p className={styles.text}>{collection.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </LayoutWrapper>
    </section>
  );
}
