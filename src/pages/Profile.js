import { useEffect } from "react";  
import { useNavigate } from "react-router-dom";
import UserIcon from "../images/user.png";
import "./Profile.css";

const Profile = () => {
  const name = localStorage.getItem("userName") || "User Name";
  const email = localStorage.getItem("userEmail") || "user@example.com";

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; 

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");  
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="profile-container">
      <div className="profile-card">
      <h1>Profile</h1>
        <div className="profile-header">
          <img
            alt="User Icon"
            src={UserIcon}
            className="profile-avatar"
          />
          <h5 className="profile-name">{name}</h5>
          <span className="profile-email">{email}</span>
        </div>
        <div className="profile-actions">
          <a href="addfriend" className="profile-btn add-friend">
            Add Friend
          </a>
          <a href="message" className="profile-btn message">
            Message
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
