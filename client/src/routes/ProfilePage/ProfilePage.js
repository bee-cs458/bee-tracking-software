import ChangePassword from "../../components/ChangePassword/ChangePassword";
import "./ProfilePage.css";

export default function ProfilePage() {
  return (
    <div>
      <div className="header-container"></div>
      <div className="main-content">
        <h1>Change Password</h1>
        <ChangePassword></ChangePassword>
      </div>
    </div>
  );
}
