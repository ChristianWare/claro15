/* eslint-disable @typescript-eslint/no-explicit-any */
import Image, { StaticImageData } from "next/image";
import Nav from "../Nav/Nav";
import styles from "./PageIntro.module.css";
import Eyebrow from "../Eyebrow/Eyebrow";
import ContentPadding from "../ContentPadding/ContentPadding";

interface Props {
  eyebrow: any;
  text: string | null | undefined;
  copy?: string;
  src?: StaticImageData | string;
}

const PageIntro = ({ eyebrow, text, copy, src = "" }: Props) => {
  return (
    <div className={styles.parent}>
      <section className={styles.container}>
        <div className={styles.imgOverlay}></div>
        <div className={styles.navContainer}>
          <ContentPadding>
            <Nav />
          </ContentPadding>
        </div>
        {src && <Image src={src} alt='hero' fill className={styles.img} />}
        <div className={styles.content}>
          <div className={styles.actualContent}>
            <Eyebrow text={eyebrow} btnType='white' />
            <h1 className={styles.heading}>{text}</h1>
            {copy && <p>{copy}</p>}
          </div>
        </div>
      </section>
    </div>
  );
};
export default PageIntro;
