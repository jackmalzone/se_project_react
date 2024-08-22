import "./Header.css";
import headerLogo from "../../assets/logo.svg";
import avatar from "../../assets/avatar-placeholder.png";

function Header({ handleAddButtonClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img src={headerLogo} alt="" className="header__logo" />
      <p className="header__spacetime">{`${currentDate}, Location`}</p>
      <button
        onClick={handleAddButtonClick}
        type="button"
        className="header__button-add-clothes"
      >
        + Add Clothes
      </button>
      <div className="header__profile">
        <p className="header__username">Name</p>
        <img src={avatar} alt="" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;
