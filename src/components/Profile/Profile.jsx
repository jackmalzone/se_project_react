import "./Profile.css";
import SideBar from "../SideBar/SideBar.jsx";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";

function Profile({
  onCardClick,
  clothingItems,
  onDeleteItem,
  onAddNewClick,
  onEditProfile,
  onSignOut,
  username,
  avatar,
}) {
  return (
    <div className="profile">
      <div className="profile__content">
        <section className="profile__sidebar">
          <SideBar
            username={username}
            avatar={avatar}
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
          />
        </section>
      </div>
    </div>
  );
}

export default Profile;
