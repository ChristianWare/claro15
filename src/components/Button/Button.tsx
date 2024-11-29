"use client";

import { FC } from "react";
import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
  href: string;
  text: string;
  btnType: string;
  target?: string;
  download?: boolean;
  arrow?: boolean;
  pulse?: boolean; // New prop
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: any;
}

const Button: FC<ButtonProps> = ({
  href = "",
  text,
  btnType,
  target = "",
  download,
  onClick,
  pulse = false, // Default to false
}) => {
  return (
    <button
      className={styles.container}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <Link
        href={href}
        className={`${styles.btn} ${styles[btnType]} ${
          pulse && styles.pulseWrapper
        }`} // Conditionally add pulseWrapper class
        target={target}
        download={download}
      >
        {pulse && <span className={styles.pulse}></span>}{" "}
        {/* Pulsating circle */}
        {text}
      </Link>
    </button>
  );
};

export default Button;
