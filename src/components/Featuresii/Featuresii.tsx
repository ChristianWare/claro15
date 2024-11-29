import styles from "./Featuresii.module.css";
import Battery from "../../../public/icons/battery.svg";
import Phone from "../../../public/icons/phone.svg";
import Bluetooth from "../../../public/icons/bluetooth.svg";
import Volume from "../../../public/icons/volume.svg";
import LayoutWrapper from "../LayoutWrapper";
import { ReactNode } from "react";

interface DataItem {
  title: ReactNode;
  id: number;
  icon: JSX.Element;
  text: string;
}

const data = [
  {
    id: 1,
    icon: <Phone width={50} height={50} className={styles.icon} />,
    title: "CHUXLY app",
    text: "Take full control of your music listening experience with dynamic EQ settings.",
  },
  {
    id: 2,
    icon: <Volume width={50} height={50} className={styles.icon} />,
    title: "Noise cancelling",
    text: "Tune out the world around you with 4 noise cancelling features to choose from.",
  },
  {
    id: 3,
    icon: <Bluetooth width={50} height={50} className={styles.icon} />,
    title: "Bluetooth",
    text: "Stream hi-fidelity audio wirelessly over our top-rated bluetooth technology.",
  },
  {
    id: 4,
    icon: <Battery width={50} height={50} className={styles.icon} />,
    title: "Battery",
    text: "Enjoy lossless audio for up to 32 hours of battery life on a single charge.",
  },
];

const Featuresii = () => {
  return (
    <LayoutWrapper>
      <div className={styles.bottomii}>
        {data.map((x: DataItem) => (
          <div key={x.id} className={styles.box}>
            {x.icon}
            <h3 className={styles.title}>{x.title}</h3>
            <p className={styles.text}>{x.text}</p>
          </div>
        ))}
      </div>
    </LayoutWrapper>
  );
};
export default Featuresii;
