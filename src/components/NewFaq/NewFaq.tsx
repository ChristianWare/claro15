/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC, useState } from "react";
import LayoutWrapper from "../LayoutWrapper";
import styles from "./NewFaq.module.css";

const faqs = [
  {
    id: 301,
    question: "What makes Chuxly headphones different from other brands?",
    answer:
      "At Chuxly, we prioritize delivering unparalleled sound quality, comfort, and style. Our headphones are crafted with cutting-edge audio technology, ergonomic designs, and premium materials to ensure you enjoy a superior listening experience every time.",
  },
  {
    id: 302,
    question: "Do Chuxly headphones come with a warranty?",
    answer:
      "Yes, all Chuxly headphones come with a 12-month limited warranty covering manufacturing defects. For additional peace of mind, we also offer optional extended warranty plans at checkout.",
  },
  {
    id: 303,
    question: "Are Chuxly headphones compatible with all devices?",
    answer:
      "Absolutely! Chuxly headphones are designed for universal compatibility. Whether you’re using a smartphone, tablet, laptop, or other Bluetooth-enabled devices, our headphones work seamlessly. For wired options, we provide standard 3.5mm and USB-C cables.",
  },
  {
    id: 304,
    question: "What is Chuxly's return policy?",
    answer:
      "We offer a 30-day satisfaction guarantee. If you’re not completely satisfied with your purchase, you can return it within 30 days for a full refund or exchange, provided the product is in its original condition and packaging.",
  },
];


const NewFaq: FC = () => {
  const [selected, setSelected] = useState(0);

  const toggle = (i: any) => {
    setSelected(i);
  };
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <h2 className={styles.heading}>Frequently Asked Questions</h2>
          </div>
          <div className={styles.bottom}>
            <div className={styles.bRight}>
              {faqs.slice(0, 4).map((x: any, i: number) => (
                <div
                  key={x.id}
                  className={`${styles.qaContainer} ${
                    selected === i ? styles.active : ""
                  }`}
                  onClick={() => toggle(i)}
                >
                  <div className={styles.headingArrowContainer}>
                    <h3 className={styles.question} lang='en'>
                      [ {i + 1} ]
                    </h3>
                    <h3 className={styles.question} lang='en'>
                      {x.question}
                    </h3>
                  </div>
                  <div
                    className={
                      selected === i
                        ? styles.answerContainer + " " + styles.show
                        : styles.answerContainer
                    }
                  >
                    <div className={styles.answerbox}>
                      <div></div>
                      <p className={styles.answer} lang='en'>
                        {x.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
};
export default NewFaq;
