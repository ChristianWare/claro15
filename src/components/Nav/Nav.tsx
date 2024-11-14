import styles from "./Nav.module.css";
import NavLogo from "./NavLogo/NavLogo";
import NavLinks from "./NavLinks/NavLinks";
import NavIcons from "./NavIcons/NavIcons";

interface NavProps {
  color?: string;
}

export default async function Nav({ color = "" }: NavProps) {
  return (
    <header className={styles.header}>
      <NavLogo color={color} />
      <div className={styles.right}>
        <NavLinks color={color} />
        <NavIcons color={color} />
      </div>
    </header>
  );
}
