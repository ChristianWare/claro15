import LayoutWrapper from "@/components/LayoutWrapper";
import styles from "./AboutPostHero.module.css";

const AboutPostHero = () => {
  return (
    <section className={styles.contianer}>
      <LayoutWrapper>
        <div className={styles.content}>
          <h2 className={styles.heading}>
            Our purpose is to redefine the way you experience sound. We are
            driven by a singular purpose: to elevate your world through the
            magic of exceptional audio.
          </h2>
        </div>
      </LayoutWrapper>
    </section>
  );
};
export default AboutPostHero;
