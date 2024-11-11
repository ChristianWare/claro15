"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import styles from "./CategoryNav.module.css";
import { usePathname } from "next/navigation";
import Circle from "../../../public/icons/circle.svg";

const data = [
  {
    id: 1,
    title: "All",
    href: "/shop",
  },
  {
    id: 2,
    title: "Headphones",
    href: "/shop/headphones",
  },
  {
    id: 3,
    title: "Earbuds",
    href: "/shop/earbuds",
  },
];

const CategoryNav = () => {
  const pathname = usePathname(); // Get the current path

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.heading}>Shop</span>
        <div className={styles.bottom}>
          {data.map((x: any) => (
            <div key={x.id} className={styles.list}>
              <h6 className={styles.link}>
                <span className={styles.span}>
                  <Circle
                    width={10}
                    height={10}
                    className={
                      pathname === x.href
                        ? `${styles.icon} ${styles.activeIcon}`
                        : styles.icon
                    }
                  />
                </span>{" "}
                <Link href={x.href}>{x.title}</Link>
              </h6>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
