import { useState } from "react";
import styles from "./CollapsibleSection.module.css";

interface CollapsibleSectionProps {
  title: string;
  content: string;
}

export default function CollapsibleSection({
  title,
  content,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.section}>
      <div className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <h3 className={styles.title}>{title}</h3>
        <button className={styles.toggleButton}>{isOpen ? "−" : "+"}</button>
      </div>
      <div className={`${styles.content} ${isOpen ? styles.contentOpen : ""}`}>
        <p>{content}</p>
      </div>
    </div>
  );
}
