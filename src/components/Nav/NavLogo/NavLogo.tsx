import styles from "./NavLogo.module.css";
import Link from "next/link";

interface NavProps {
  color?: string;
}

const NavLogo = ({ color = "" }: NavProps) => {
  return (
    <Link href='/' className={`${styles.logo} ${styles[color]}`}>
      CHUXLY
    </Link>
  );
};
export default NavLogo;
