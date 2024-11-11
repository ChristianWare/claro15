import LayoutWrapper from "../LayoutWrapper";
import styles from "./Uspii.module.css";
import Image from "next/image";
import Headphones from "../../../public/images/headphones.jpg";
import Earbuds from "../../../public/images/earbuds.jpg";

const Uspii = () => {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <h2 className={styles.heading}>Experience world class quality</h2>
        <div className={styles.content}>
          <div className={styles.imgContainer}>
            <div className={styles.imgOverlay}></div>
            <Image src={Earbuds} alt='' fill className={styles.img} />
            <p className={styles.text}>Shop earbuds</p>
          </div>
          <div className={styles.imgContainer}>
            <div className={styles.imgOverlay}></div>
            <Image src={Headphones} alt='' fill className={styles.img} />
            <p className={styles.text}>Shop headphones</p>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
};
export default Uspii;
