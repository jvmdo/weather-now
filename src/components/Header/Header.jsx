import UnitMenu from "../UnitMenu";
import styles from "./Header.module.css";
import logo from "/logo.svg";

function Header() {
  return (
    <header className={styles.header}>
      <div>
        <img src={logo} alt="Sun made of stack overflows" />
      </div>
      <UnitMenu />
    </header>
  );
}

export default Header;
