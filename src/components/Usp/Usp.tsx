import styles from "./Usp.module.css";
import USPImage from "../../../public/images/ups.jpg";
import Image from "next/image";
import Button from "../Button/Button";

const Usp = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.top}>
            <h2 className={styles.heading}>
              Designed with artists & producers to deliver unmatched sound
            </h2>
            <p className={styles.copy}>
              At our core, we believe in the profound relationship between
              artistry and exceptional sound. We&apos;ve meticulously crafted
              our headphones in collaboration with renowned artists and
              engineers, bringing their expertise and passion into every detail.
            </p>
          </div>
          <div className={styles.bottom}>
            <div className={styles.btnContainer}>
              <Button href='' text='About CLARO' btnType='whiteOutline' />
            </div>{" "}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.imgContainer}>
            <Image src={USPImage.src} alt='image' fill className={styles.img} />{" "}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Usp;
