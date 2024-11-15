import styles from "./Features.module.css";
import Calendar from "../../../public/icons/calendar.svg";
import Rotate from "../../../public/icons/rotate.svg";
import Mailbox from "../../../public/icons/mailbox.svg";
import Globe from "../../../public/icons/globe.svg";

interface DataItem {
  id: number;
  icon: JSX.Element;
  text: string;
}

const data = [
  {
    id: 1,
    icon: <Calendar width={50} height={50} className={styles.icon} />,
    text: "90 Day Guarantee",
  },
  {
    id: 2,
    icon: <Rotate width={50} height={50} className={styles.icon} />,
    text: "30 Day Returns",
  },
  {
    id: 3,
    icon: <Mailbox width={50} height={50} className={styles.icon} />,
    text: "Ships Next Day",
  },
  {
    id: 4,
    icon: <Globe width={50} height={50} className={styles.icon} />,
    text: "Ships Globally",
  },
];

const Features = () => {
  return (
    <div className={styles.bottomii}>
      {data.map((x: DataItem) => (
        <div key={x.id} className={styles.box}>
          {x.icon}
          <p className={styles.text}>{x.text}</p>
        </div>
      ))}
    </div>
  );
};
export default Features;
