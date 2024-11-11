import Button from "../Button/Button";
import LayoutWrapper from "../LayoutWrapper";
import styles from "./FinalCTA.module.css";

const FinalCTA = () => {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <h2 className={styles.heading}>
            Experience the CLARO difference you&apos;ve been hearing about
          </h2>
          <div className={styles.btnContainer}>
            <Button href='/' text='Find a retailer →' btnType='blackOutline' />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
};
export default FinalCTA;
