import Button from "../Button/Button";
import styles from "./TakeControl.module.css";
import Image from "next/image";
import Control from "../../../public/images/control.jpg";
import LayoutWrapper from "../LayoutWrapper";

const TakeControl = () => {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.imgContainer}>
              <Image src={Control} alt='' fill className={styles.img} />
            </div>
          </div>
          <div className={styles.right}>
            <h2 className={styles.heading}>Take control of your music</h2>
            <p className={styles.copy}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              eum unde quae, ab illum quisquam sunt mollitia nemo deserunt eos
              soluta, sint animi fugiat!
            </p>
            <div className={styles.btnContainer}>
              <Button
                href='/'
                text='Download the CLARO app →'
                btnType='blackOutline'
              />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
};
export default TakeControl;
