import ChangePassword from "../../components/ChangePassword/ChangePassword";
import { AccountLink } from "../../components/AccountLink/AccountLink";
import "./ProfilePage.css";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
//import { useOutletContext } from "react-router-dom";

export default function ProfilePage() {
  const [show, setShow] = useState(false);
  //const [theme, setTheme] = useOutletContext();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    sessionStorage.clear();
  };

  return (
    <div>
      <div className="header-container">
        <div style={{ marginLeft: "70%" }}>
          <AccountLink />
        </div>
      </div>
      <div className="main-content">
        <Button
          className="beets_buttons"
          onClick={() => {
            handleShow();
          }}
        >
          Change Password
        </Button>
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static" >
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
