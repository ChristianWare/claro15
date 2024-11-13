// "use client";

import styles from "./Nav.module.css";
// import { useState, useEffect } from "react";
import Link from "next/link";
import NavIcons from "../NavIcons/NavIcons";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import ShoppingCartButton from "./ShoppingCartButton";
import UserButton from "./UserButton";
import { getLoggedInMember } from "@/wix-api/members";

interface NavProps {
  color?: string;
}

// function Nav({ color = "" }: NavProps) {
export default async function Nav({ color = "" }: NavProps) {
  const wixClient = await getWixServerClient(); // Await the async function here

  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
  ]);
  // const [isOpen, setIsOpen] = useState(false);

  // const openMenu = () => {
  //   setIsOpen(!isOpen);
  // };

  // useEffect(() => {
  //   const body = document.querySelector("body");
  //   if (body) {
  //     if (window.innerWidth <= 968 && isOpen) {
  //       body.style.overflow = "hidden";
  //     } else {
  //       body.style.overflow = "auto";
  //     }
  //   }

  //   const handleResize = () => {
  //     setIsOpen(false);
  //     window.addEventListener("resize", handleResize);
  //   };

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     if (body) {
  //       body.style.overflow = "auto";
  //     }
  //   };
  // }, [isOpen]);

  const navItems = [
    {
      text: "shop",
      href: "/shop",
    },
    {
      text: "collections",
      href: "/collections",
    },
    {
      text: "About Us",
      href: "/about",
    },

    {
      text: "Support",
      href: "/support",
    },
  ];

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <Link href='/' className={`${styles.logo} ${styles[color]}`}>
            CLARO
          </Link>
          <ul
            // className={
            //   isOpen === false
            //     ? styles.navMenu
            //     : `${styles.navMenu} ${styles.active}`
            // }
            className={styles.navMenu}
          >
            {navItems.map((navItem, index) => (
              <li
                key={index}
                className={`${styles.navItem} ${styles[color]}`}
                // onClick={() => setIsOpen(false)}
              >
                <Link
                  href={navItem.href}
                  className={`${styles.navItem} ${styles[color]}`}
                >
                  {navItem.text}
                </Link>
              </li>
            ))}
            <div className={styles.navIconsContainer}>
              <NavIcons color={color} />
              {/* Nav Icons Here */}
            </div>
          </ul>
          <span
            // className={
            //   isOpen === false
            //     ? styles.hamburger
            //     : `${styles.hamburger} ${styles.active}`
            // }
            // onClick={openMenu}
            className={styles.hamburger}
          >
            <span className={styles.whiteBar}></span>
            <span className={styles.whiteBar}></span>
            <span className={styles.whiteBar}></span>
          </span>
        </nav>
      </header>
    </>
  );
}
