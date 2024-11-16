/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC, useState } from "react";
import LayoutWrapper from "../LayoutWrapper";
import styles from "./NewFaq.module.css";

const faqs = [
  {
    id: 301,
    question: "What services do you offer?",
    answer:
      "We offer custom-coded solutions for direct booking websites, e-commerce platforms, and business websites, tailored to enhance user experience and SEO.",
  },
  {
    id: 302,
    question: "Why should I choose custom-coded websites?",
    answer:
      "Custom-coded websites provide better performance, enhanced security, and improved SEO compared to templates or site builders. They are tailored specifically to your business needs.",
  },
  {
    id: 303,
    question: "How long does it take to build a website?",
    answer:
      "The timeline depends on the complexity of the project. Typically, a custom website can take anywhere from a few weeks to a few months to complete.",
  },
  {
    id: 304,
    question: "Do you provide ongoing support?",
    answer:
      "Yes, we offer ongoing maintenance and support packages to ensure your website remains updated, secure, and optimized for performance.",
  },
  {
    id: 305,
    question: "Can I update the content on my website myself?",
    answer:
      "Absolutely. We integrate user-friendly content management systems (CMS) that allow you to easily update and manage your website content.",
  },
  {
    id: 306,
    question: "Will my website be mobile-friendly?",
    answer:
      "Yes, all our websites are designed to be fully responsive, ensuring they look and perform well on all devices, including smartphones and tablets.",
  },
  {
    id: 307,
    question: "What kind of businesses do you work with?",
    answer:
      "We work with a variety of businesses, including healthcare providers, hospitality services, e-commerce stores, and many other sectors that need a strong online presence.",
  },
  {
    id: 308,
    question: "How do you ensure my website is secure?",
    answer:
      "We implement advanced security measures, including secure payment gateways and regular security updates, to protect your website and customer data.",
  },
  {
    id: 309,
    question: "Do you offer SEO services?",
    answer:
      "Yes, our websites are built with SEO best practices in mind. We also offer additional SEO services to help improve your website's visibility in search engine results.",
  },
  {
    id: 310,
    question: "How do I get started with your services?",
    answer:
      "You can get started by contacting us through our website. We'll discuss your needs and provide a customized plan to help you achieve your business goals.",
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
