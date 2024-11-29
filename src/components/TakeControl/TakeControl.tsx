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
              The CHUXLY app puts you in complete control of your music
              experience with customizable EQ settings and seamless integration
              with Apple Music and Spotify.
            </p>
            <div className={styles.btnContainer}>
              <Button
                href='https://www.apple.com/app-store/'
                target='blank_'
                text='Download the CHUXLY app →'
                btnType='blackOutline'
                pulse
              />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
};
export default TakeControl;
