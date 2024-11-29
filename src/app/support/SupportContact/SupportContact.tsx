import styles from "./SupportContact.module.css";
import Person from "../../../../public/icons/person.svg";
import Headphones from "../../../../public/icons/headphones.svg";
import LayoutWrapper from "@/components/LayoutWrapper";

const data = [
  {
    id: 1,
    icon: <Person className={styles.icon} />,
    title: "Sales & Inquiries",
    phone: "1800-444-5555",
    email: "sales@chuxly.com",
  },
  {
    id: 1,
    icon: <Headphones className={styles.icon} />,
    title: "Technical support",
    phone: "1800-555-7777",
    email: "support@chuxly.com",
  },
];

const SupportContact = () => {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          {data.map((x) => (
            <div className={styles.box} key={x.id}>
              {x.icon}
              <div className={styles.boxBtm}>
                <span className={styles.title}>{x.title}</span>
                <h3 className={styles.phone}>{x.phone}</h3>
                <h3 className={styles.email}>{x.email}</h3>
              </div>
            </div>
          ))}
        </div>
      </LayoutWrapper>
    </section>
  );
};
export default SupportContact;
