"use client";

import styles from "./Nav.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";
// import NavIcons from "../NavIcons/NavIcons";

interface NavProps {
  color?: string;
}

function Nav({ color = "" }: NavProps) {
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

  const navItems = [
    {
      text: "shop",
      href: "/shop",
    },
    {
      text: "About Us",
      href: "/about",
    },
    {
      text: "Locations",
      href: "/locations",
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
            <div className={styles.navIconsContainer}>
              {/* <NavIcons color={color} /> */}
              Nav Icons Here
            </div>
          </ul>
          <span
            className={
              isOpen === false
                ? styles.hamburger
                : `${styles.hamburger} ${styles.active}`
            }
            onClick={openMenu}
          >
            <span className={styles.whiteBar}></span>
            <span className={styles.whiteBar}></span>
            <span className={styles.whiteBar}></span>
          </span>
        </nav>
      </header>
      <div className={styles.greenTop}></div>
    </>
  );
}

export default Nav;
