import styles from "./LoadingSkeleton.module.css";

export default function LoadingSkeleton() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonText}></div>
    </div>
  );
}
