import "./Header.css";
import headerLogo from "../../assets/logo.svg";
import avatar from "../../assets/avatar-placeholder.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddButtonClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={headerLogo} alt="Header wtwr logo" className="header__logo" />
      <p className="header__spacetime">{`${currentDate}, ${
        weatherData.city || "Loading..."
      }`}</p>
      <div className="header__controls">
        <ToggleSwitch className="header__toggle-switch" />
        <button
          onClick={handleAddButtonClick}
          type="button"
          className="header__button-add-clothes"
          aria-label="Add new clothes"
        >
          + Add Clothes
        </button>
      </div>
      <div className="header__profile">
        <p className="header__username">Name</p>
        <img src={avatar} alt="User avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
