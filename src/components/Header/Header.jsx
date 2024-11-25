import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../assets/logo.svg";
import avatarDefault from "../../assets/avatar-placeholder.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddButtonClick, weatherData }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={headerLogo} alt="Header wtwr logo" className="header__logo" />
      </Link>
      <p className="header__spacetime">{`${currentDate}, ${
        weatherData.city || "Loading..."
      }`}</p>
      {isLoggedIn ? (
        <>
          <div className="header__controls">
            <ToggleSwitch className="header__toggle-switch" />
            <button
              onClick={handleAddButtonClick}
              type="button"
              className="header__button-add-clothes"
            >
              + Add Clothes
            </button>
          </div>
          <Link to="/profile" className="header__profile-link">
            <div className="header__profile">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  className="header__avatar"
                  src={currentUser.avatar}
                  alt="avatar"
                />
              ) : (
                <span className="header__avatar header__avatar_none">
                  {currentUser.name?.toUpperCase().charAt(0) || "U"}
                </span>
              )}
            </div>
          </Link>
        </>
      ) : (
        <div className="header__auth-buttons">
          <Link to="/login" className="header__button">
            Log in
          </Link>
          <Link to="/signup" className="header__button">
            Sign up
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
