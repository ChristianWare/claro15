import Button from "../Button/Button";
import styles from "../Footer/Footer.module.css";
import LayoutWrapper from "../LayoutWrapper";
import Instagram from "../../../public/icons/instagram.svg";
import Facebook from "../../../public/icons/facebook.svg";
import LinkedIn from "../../../public/icons/linkedin.svg";
import Youtube from "../../../public/icons/youtube.svg";
import Link from "next/link";

const data = [
  {
    id: 1,
    section: "Shop",
    options: [
      {
        id: 1.2,
        title: "headphones",
        href: "/collections/headphones",
      },
      {
        id: 1.3,
        title: "earbuds",
        href: "/collections/earbuds",
      },
      {
        id: 1.4,
        title: "soundbars",
        href: "/collections/soundbars",
      },
      {
        id: 1.5,
        title: "speakers",
        href: "/collections/speakers",
      },
    ],
  },
  {
    id: 2,
    section: "CHUXLY",
    options: [
      {
        id: 2.1,
        title: "about",
        href: "/about",
      },
      {
        id: 2.3,
        title: "support",
        href: "/support",
      },
    ],
  },
];

const dataii = [
  {
    id: 3,
    section: "Follow",
    options: [
      {
        id: 3.1,
        icon: <Instagram className={styles.icon} />,
      },
      {
        id: 3.2,
        icon: <Facebook className={styles.icon} />,
      },
      {
        id: 3.3,
        icon: <LinkedIn className={styles.icon} />,
      },
      {
        id: 3.4,
        icon: <Youtube className={styles.icon} />,
      },
    ],
  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <LayoutWrapper>
        <div className={styles.topContent}>
          <div className={styles.left}>
            <span className={styles.logo}>CHUXLY</span>
            <h2 className={styles.heading}>
              Join our newsletter and get 15% off your first purchase
            </h2>
            <div className={styles.inputContainer}>
              <input
                type='text'
                placeholder='Your email address'
                className={styles.input}
              />
              <Button href='' text='Sign Up' btnType='input' />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.rightTop}>
              {data.map((x) => (
                <div className={styles.box} key={x.id}>
                  <span className={styles.section}>{x.section}</span>
                  <ul className={styles.optionsContainer}>
                    {x.options.map((y) => (
                      <Link href={y.href} key={y.id}>
                        <li className={styles.option}>{y.title}</li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className={styles.rightBottom}>
              {dataii.map((x) => (
                <div key={x.id}>
                  <span className={styles.section}>{x.section}</span>
                  <div className={styles.iconSection}>
                    {x.options.map((y) => (
                      <div className={styles.iconBox} key={y.id}>
                        {y.icon}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.small}>Copyright &#xA9; 2024 CHUXLY</p>
          <p className={styles.small}>Terms of Use</p>
          <p className={styles.small}>Privcay Policy</p>
        </div>
      </LayoutWrapper>
    </footer>
  );
};
export default Footer;
