import UnitMenu from "../UnitMenu";
import logo from "/logo.svg";

function Header() {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Sun made of stack overflows" />
      </div>
      <UnitMenu />
    </header>
  );
}

export default Header;
