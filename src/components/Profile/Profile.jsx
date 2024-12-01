import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Profile({
  onCardClick,
  clothingItems,
  onDeleteItem,
  onAddNewClick,
  onEditProfile,
  onSignOut,
  onCardLike,
}) {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="profile">
      <div className="profile__content">
        <section className="profile__sidebar">
          <SideBar
            username={currentUser?.name}
            avatar={currentUser?.avatar}
            onEditProfile={onEditProfile}
            onSignOut={onSignOut}
          />
        </section>
        <section className="profile__clothing-items">
          <ClothesSection
            onCardClick={onCardClick}
            clothingItems={clothingItems}
            onDeleteItem={onDeleteItem}
            onAddNewClick={onAddNewClick}
            onCardLike={onCardLike}
          />
        </section>
      </div>
    </div>
  );
}

export default Profile;
