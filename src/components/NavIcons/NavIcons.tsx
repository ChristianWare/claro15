/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import styles from "./NavIcons.module.css";
import { useEffect, useState } from "react";
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCartStore";
import ProfileIcon from "../../../public/icons/profile.svg";
import BasketIcon from "../../../public/icons/basket.svg";
import Modal from "../Modal/Modal";

interface NavIconsProps {
  color: string;
}

const NavIcons = ({ color }: NavIconsProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const wixClient = useWixClient();

  const handleCloseModal = () => {
    setIsCartOpen(false);
  };

  const { cart, counter, getCart } = useCartStore();

  useEffect(() => {
    getCart(wixClient);
  }, [wixClient, getCart]);

  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <ProfileIcon className={`${styles.icon} ${styles[color]}`} />
      <div className={styles.basketContainer}>
        <BasketIcon
          className={`${styles.icon} ${styles[color]}`}
          onClick={() => setIsCartOpen((prev) => !prev)}
        />
        <div className={styles.counter}>
          <p>{counter}</p>
        </div>
      </div>
      {isCartOpen && (
        <Modal isOpen={isCartOpen} onClose={handleCloseModal}>
          <h3>Cart Info Here</h3>
          <h6 className={styles.copy}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            cum a ad similique quae sapiente, doloribus commodi, deserunt quasi
            pariatur at facere consequuntur ipsam culpa enim, earum dignissimos
            amet? Reprehenderit?
          </h6>
        </Modal>
      )}
    </div>
  );
};

export default NavIcons;
