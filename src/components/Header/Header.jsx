import { Link } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../assets/logo.svg";
import avatarDefault from "../../assets/avatar-placeholder.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddButtonClick, weatherData, avatar, username }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const onAddButtonClick = () => {
    console.log("Add Clothes button clicked");
    handleAddButtonClick();
  };

  return (
    <header className="header">
      <Link to="/">
        <img src={headerLogo} alt="Header wtwr logo" className="header__logo" />
      </Link>
      <p className="header__spacetime">{`${currentDate}, ${
        weatherData.city || "Loading..."
      }`}</p>
      <div className="header__controls">
        <ToggleSwitch className="header__toggle-switch" />
        <button
          onClick={onAddButtonClick}
          type="button"
          className="header__button-add-clothes"
          aria-label="Add new clothes"
        >
          + Add Clothes
        </button>
      </div>
      <Link to="/profile" className="header__profile-link">
        <div className="header__profile">
          <p className="header__username">{username || "Username"}</p>
          {avatar ? (
            <img
              className="header__avatar"
              src={avatar || avatarDefault}
              alt="avatar"
            />
          ) : (
            <span className="header__avatar header__avatar_none">
              {username?.toUpperCase().charAt(0) || "U"}
            </span>
          )}
        </div>
      </Link>
    </header>
  );
}

export default Header;
