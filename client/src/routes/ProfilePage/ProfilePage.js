import ChangePassword from "../../components/ChangePassword/ChangePassword";
import { AccountLink } from "../../components/AccountLink/AccountLink";
import "./ProfilePage.css";
import { useEffect, useState } from "react";
import { getCheckoutRecordsByUserID } from "../../api/CheckInServices";
import { useAuthenticatedUser } from "../../components/Context/UserContext";
import ProfileAssetTable from "../../components/ProfileAssetTable/ProfileAssetTable";
import { useOutletContext } from "react-router-dom";
import getCategories from "../../api/CategoryService";

export default function ProfilePage() {
  const [checkedOutAssets, setCheckedOutAssets] = useState([]);
  const [userId] = useState(useAuthenticatedUser().user_id); //gets id of signed in user
  const [cats, setCats] = useState([]);
  const [theme] = useOutletContext(); //gets darkmode theme

  
  const getUserCheckedOutAssets = async (event) => {
    //gets the info for the assets checked out by the user
    getCheckoutRecordsByUserID(userId).then((result) => {
      const newAssets = result;
      if (newAssets) setCheckedOutAssets(newAssets);
    });
    //gets the categories for dispalying in the asset table
    getCategories()
      .then((value) => {
        setCats(value);
        return value;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUserCheckedOutAssets(); //gets the asset table information when the page renders
  }, []);

  return (
    <div>
      <div className="header-container">
        <div style={{ marginLeft: "70%" }}>
          <AccountLink />
        </div>
      </div>
      <div className="main-content">
        <h2>Checked Out Assets</h2>
        <ProfileAssetTable
          assets={checkedOutAssets}
          cats={cats}
          variant={theme}
        ></ProfileAssetTable>
        <h1>Change Password</h1>
        <ChangePassword></ChangePassword>
      </div>
    </div>
  );
}
