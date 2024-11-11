import LayoutWrapper from "../LayoutWrapper";
import styles from "./Hero.module.css";
import Image from "next/image";
import HeroImage from "../../../public/images/herov.jpg";
import Nav from "../Nav/Nav";
import Eyebrow from "../Eyebrow/Eyebrow";
import Button from "../Button/Button";

const Hero = () => {
  return (
    <div className={styles.parent}>
      <section className={styles.container}>
        <div className={styles.imgOverlay}></div>
        <div className={styles.navContainer}>
          <Nav />
        </div>
        <Image src={HeroImage} alt='hero' fill className={styles.img} />
        <LayoutWrapper>
          <div className={styles.content}>
            <div className={styles.actualContent}>
              <Eyebrow
                text='The all-new Studio Elite headphones'
                btnType='white'
              />
              <h1 className={styles.heading}>
                Hi-fidelity for your <br /> high standards
              </h1>
              <div className={styles.btnContainer}>
                <Button href='' text='Shop Studio Elite' btnType='white' />
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </section>
    </div>
  );
};
export default Hero;
