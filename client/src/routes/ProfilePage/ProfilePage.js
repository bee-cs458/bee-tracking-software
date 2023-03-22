import ChangePassword from "../../components/ChangePassword/ChangePassword";
import { AccountLink } from "../../components/AccountLink/AccountLink";
import "./ProfilePage.css";

export default function ProfilePage() {
  return (
    <div>
      <div className="header-container">
        <div style={{ marginLeft: "70%" }}>
          <AccountLink />
        </div>
      </div>
      <div className="main-content">
        <h1>Change Password</h1>
        <ChangePassword></ChangePassword>
      </div>
    </div>
  );
}
