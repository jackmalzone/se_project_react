import "./SideBar.css";
import avatarDefault from "../../assets/avatar-placeholder.png";

function SideBar({ username, avatar }) {
  return (
    <div className="sidebar">
      {avatar ? (
        <img src={avatar} alt="Avatar" className="sidebar__avatar" />
      ) : (
        <div className="sidebar__avatar sidebar__avatar_none">
          {username?.toUpperCase().charAt(0) || "U"}
        </div>
      )}
      <p className="sidebar__username">{username || "Username"}</p>
    </div>
  );
}

export default SideBar;
