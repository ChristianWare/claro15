import styles from "./Hero.module.css";
import Image from "next/image";
import HeroImage from "../../../public/images/herov.jpg";
import Nav from "../Nav/Nav";
import Eyebrow from "../Eyebrow/Eyebrow";
import Button from "../Button/Button";
import ContentPadding from "../ContentPadding/ContentPadding";

const Hero = () => {
  return (
    <div className={styles.parent}>
      <section className={styles.container}>
        <div className={styles.imgOverlay}></div>

        <div className={styles.navContainer}>
          <ContentPadding>
            <Nav />
          </ContentPadding>
        </div>
        <Image src={HeroImage} alt='hero' fill className={styles.img} />
        <div className={styles.content}>
          <div className={styles.actualContent}>
            <Eyebrow
              text='The all-new Studio Elite headphones'
              btnType='white'
            />
            <h1 className={styles.heading}>
              Immerse yourself in sound <br /> like never before
            </h1>
            <div className={styles.btnContainer}>
              <Button
                href=''
                text='Shop Studio Elite'
                btnType='white'
                pulse={true}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Hero;
