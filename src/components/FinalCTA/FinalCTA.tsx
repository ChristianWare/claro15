import Button from "../Button/Button";
import LayoutWrapper from "../LayoutWrapper";
import styles from "./FinalCTA.module.css";

const FinalCTA = () => {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <h2 className={styles.heading}>
            Experience the <span>CHUXLY</span> difference you&apos;ve been
            hearing about
          </h2>
          <div className={styles.btnContainer}>
            <Button
              href='/shop'
              text='Shop Now →'
              btnType='whiteOutline'
              pulse
            />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
};
export default FinalCTA;
