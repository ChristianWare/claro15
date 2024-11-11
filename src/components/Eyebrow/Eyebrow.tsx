"use client";

import styles from "./Eyebrow.module.css";

interface Props {
  text: string;
  btnType: string;
  onClose?: () => void;
}

const Eyebrow = ({ text, btnType, onClose }: Props) => {
  return (
    <div className={`${styles.btn} ${styles[btnType]}`} onClick={onClose}>
      {text}
    </div>
  );
};
export default Eyebrow;
