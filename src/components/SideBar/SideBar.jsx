import "./SideBar.css";
import avatarDefault from "../../assets/avatar-placeholder.png";

function SideBar({ username, avatar, onEditProfile, onSignOut }) {
  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        {avatar ? (
          <img
            src={avatar}
            alt={`${username}'s avatar`}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar sidebar__avatar_placeholder">
            {username?.charAt(0).toUpperCase()}
          </div>
        )}
        <p className="sidebar__username">{username}</p>
      </div>
      <div className="sidebar__buttons">
        <button className="sidebar__button" onClick={onEditProfile}>
          Edit Profile
        </button>
        <button
          className="sidebar__button sidebar__button_type_logout"
          onClick={onSignOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
