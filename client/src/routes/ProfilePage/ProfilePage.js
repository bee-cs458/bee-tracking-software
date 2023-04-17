import ChangePassword from "../../components/ChangePassword/ChangePassword";
import { AccountLink } from "../../components/AccountLink/AccountLink";
import "./ProfilePage.css";
import { useEffect, useState } from "react";
import { getCheckoutRecordsByUserID } from "../../api/CheckInServices";
import { useAuthenticatedUser } from "../../components/Context/UserContext";
import ProfileAssetTable from "../../components/ProfileAssetTable/ProfileAssetTable";
import { useOutletContext } from "react-router-dom";
import getCategories from "../../api/CategoryService";
import { Button, Modal } from "react-bootstrap";
import UserInformation from "../../components/UserInformation/UserInformation";
import ConditionalAlert from "../../components/CheckInUtilities/ConditionalAlert";
//import { useOutletContext } from "react-router-dom";

export default function ProfilePage() {
  const [checkedOutAssets, setCheckedOutAssets] = useState([]);
  const [editPage, setEditPage] = useState(false);
  const [user] = useState(useAuthenticatedUser()); //gets information of signed in user
  const [cats, setCats] = useState([]);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [theme] = useOutletContext(); //gets darkmode theme
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    sessionStorage.clear();
  };
  const toggleEdit = () => {
    setEditPage(!editPage);
  };

  const getUserCheckedOutAssets = async (event) => {
    //gets the info for the assets checked out by the user
    getCheckoutRecordsByUserID(user.user_id).then((result) => {
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

  //gets the asset table information when the page renders
  useEffect(() => {
    getUserCheckedOutAssets();
  }, [editPage]);

  return (
    <div>
      <div className="main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h2>Profile Information</h2>
              <UserInformation
                user={user}
                edit={editPage}
                toggleEdit={toggleEdit}
                setAlertMessage={setAlertMessage}
                setAlertType={setAlertType}
              ></UserInformation>
              {editPage ? (
                <></>
              ) : (
                <>
                  <Button
                    className="beets_buttons"
                    onClick={() => {
                      toggleEdit();
                      setAlertType(null)
                    }}
                    disabled={editPage}
                  >
                    Edit Information
                  </Button>
                  <br />
                </>
              )}
              <br />
              <Button
                className="beets_buttons"
                onClick={() => {
                  handleShow();
                  setAlertType(null)
                }}
                disabled={editPage}
              >
                Change Password
              </Button>
              <br />
              <br />
              <ConditionalAlert
                message={alertMessage}
                type={alertType}
              ></ConditionalAlert>
            </div>
            <div className="col">
              <h2>Checked Out Assets</h2>
              <div className="seperator"></div>
              {checkedOutAssets.length > 0 ? (
                <ProfileAssetTable
                  assets={checkedOutAssets}
                  cats={cats}
                  variant={theme}
                ></ProfileAssetTable>
              ) : (
                <h3>No assets checked out</h3>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ChangePassword></ChangePassword>
        </Modal.Body>
      </Modal>
    </div>
  );
}
