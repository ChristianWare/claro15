import LayoutWrapper from "../LayoutWrapper";
import styles from "./Uspii.module.css";
import Image from "next/image";
import Headphones from "../../../public/images/headphones.jpg";
import Earbuds from "../../../public/images/earbuds.jpg";
import Link from "next/link";
import Button from "../Button/Button";

const Uspii = () => {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <h2 className={styles.heading}>Experience world class quality</h2>
        <div className={styles.content}>
          <Link href='/collections/earbuds'>
            <div className={styles.imgContainer}>
              <div className={styles.imgOverlay}></div>
              <Image src={Earbuds} alt='' fill className={styles.img} />
              <p className={styles.text}>Shop earbuds</p>
            </div>
          </Link>
          <Link href='/collections/headphones'>
            <div className={styles.imgContainer}>
              <div className={styles.imgOverlay}></div>
              <Image src={Headphones} alt='' fill className={styles.img} />
              <p className={styles.text}>Shop headphones</p>
            </div>
          </Link>
        </div>
        <div className={styles.btnContainer}>
          <Button
            btnType='whiteOutline'
            href='/collections'
            text='See All Categories'
            pulse
          />
        </div>
      </LayoutWrapper>
    </section>
  );
};
export default Uspii;
