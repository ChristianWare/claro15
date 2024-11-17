"use client";

import styles from "./Modal.module.css";
import { useEffect } from "react";
import Close from "../../../public/icons/close.svg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: Props) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Disable scrolling when the modal is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button
          onClick={onClose}
          // style={{ marginBottom: "10px", cursor: "pointer",  }}
          className={styles.button}
        >
          <Close width={30} height={30} className={styles.icon} />
        </button>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
}
