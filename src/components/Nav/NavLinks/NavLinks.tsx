"use client";

import styles from "./NavLinks.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavProps {
  color?: string;
}

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

const NavLinks = ({ color = "" }: NavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) {
      if (window.innerWidth <= 968 && isOpen) {
        body.style.overflow = "hidden";
      } else {
        body.style.overflow = "auto";
      }
    }

    const handleResize = () => {
      setIsOpen(false);
      window.addEventListener("resize", handleResize);
    };

    return () => {
      window.removeEventListener("resize", handleResize);
      if (body) {
        body.style.overflow = "auto";
      }
    };
  }, [isOpen]);

  return (
    <nav className={styles.navbar}>
      <ul
        className={
          isOpen === false
            ? styles.navMenu
            : `${styles.navMenu} ${styles.active}`
        }
      >
        {navItems.map((navItem, index) => (
          <li
            key={index}
            className={`${styles.navItem} ${styles[color]}`}
            onClick={() => setIsOpen(false)}
          >
            <Link
              href={navItem.href}
              className={`${styles.navItem} ${styles[color]}`}
            >
              {navItem.text}
            </Link>
          </li>
        ))}
        {/* <div className={styles.navIconsContainer}>
          <NavIcons color={color} />
        </div> */}
      </ul>
      <span
        className={
          isOpen === false
            ? styles.hamburger
            : `${styles.hamburger} ${styles.active}`
        }
        onClick={openMenu}
      >
        <span className={`${styles.whiteBar} ${styles[color]}`}></span>
        <span className={`${styles.whiteBar} ${styles[color]}`}></span>
        <span className={`${styles.whiteBar} ${styles[color]}`}></span>
      </span>
    </nav>
  );
};
export default NavLinks;
