import styles from "./Nav.module.css";

import NavLogo from "./NavLogo/NavLogo";
import NavLinks from "./NavLinks/NavLinks";
import NavIcons from "./NavIcons/NavIcons";

export default async function Nav() {
  return (
    <>
      <header className={styles.header}>
        <NavLogo />
        <div className={styles.right}>
          <NavLinks />
          <NavIcons />
        </div>
      </header>
    </>
  );
}
