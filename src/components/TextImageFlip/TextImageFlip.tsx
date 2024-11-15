import Image, { StaticImageData } from "next/image";
import LayoutWrapper from "../LayoutWrapper";
import styles from "./TextImageFlip.module.css";

interface Props {
  src?: StaticImageData | string;
  title: string | null | undefined;
  text: string | null | undefined;
  flip?: string;
}

const TextImageFlip = ({ src = "", title, text, flip = "" }: Props) => {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.imgContainer}>
              <Image src={src} alt='image' fill className={styles.img} />
            </div>
          </div>
          <div className={`${styles.right} ${styles[flip]}`}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.text}>{text}</p>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
};
export default TextImageFlip;
