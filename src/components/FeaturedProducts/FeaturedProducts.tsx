import styles from "./FeaturedProducts.module.css";
import { getWixServerClient } from "@/lib/wix-client.server";
import { getCollectionBySlug } from "@/wix-api/collections";
import { queryProducts } from "@/wix-api/products";
import Product from "@/components/Product/Product";
import LayoutWrapper from "../LayoutWrapper";
import Calendar from "../../../public/icons/calendar.svg";
import Rotate from "../../../public/icons/rotate.svg";
import Mailbox from "../../../public/icons/mailbox.svg";
import Globe from "../../../public/icons/globe.svg";

interface DataItem {
  id: number;
  icon: JSX.Element;
  text: string;
}

export default async function FeaturedProducts() {
  const wixClient = await getWixServerClient();

  const collection = await getCollectionBySlug(wixClient, "featured-products");

  if (!collection?._id) {
    return null;
  }

  const featuredProducts = await queryProducts(wixClient, {
    collectionIds: collection._id,
  });

  if (!featuredProducts.items.length) {
    return null;
  }

    const data = [
      {
        id: 1,
        icon: <Calendar width={50} height={50} className={styles.icon} />,
        text: "90 Day Guarantee",
      },
      {
        id: 2,
        icon: <Rotate width={50} height={50} className={styles.icon} />,
        text: "30 Day Returns",
      },
      {
        id: 3,
        icon: <Mailbox width={50} height={50} className={styles.icon} />,
        text: "Ships Next Day",
      },
      {
        id: 4,
        icon: <Globe width={50} height={50} className={styles.icon} />,
        text: "Ships Globally",
      },
    ];

  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <h2 className={styles.heading}>Popular</h2>
          <div className={styles.bottom}>
            {featuredProducts.items.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </LayoutWrapper>
      <div className={styles.parent}>
        <LayoutWrapper>
          <div className={styles.bottomii}>
            {data.map((x: DataItem) => (
              <div key={x.id} className={styles.box}>
                {x.icon}
                <p className={styles.text}>{x.text}</p>
              </div>
            ))}
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
