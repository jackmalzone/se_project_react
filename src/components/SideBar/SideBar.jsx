import "./SideBar.css";
import avatar from "../../assets/avatar-placeholder.png";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Username</p>
    </div>
  );
}

export default SideBar;
