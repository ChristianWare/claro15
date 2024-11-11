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
        className={`${styles.btn} ${styles[btnType]}`}
        target={target}
        download={download}
      >
        {text}
      </Link>
    </button>
  );
};
export default Button;
