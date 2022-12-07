import { Link } from "react-router-dom";
import list from "../../assets/list.png";
import checkOut from "../../assets/checkout.png";
import checkIn from "../../assets/checkIn.png";
import operators from "../../assets/operators.png";
import logOut from "../../assets/logOut.png";
import signIn from "../../assets/signIn.png";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Login from "../Login/Login";
import Logout from "../Login/Logout";

import "./NavBar.css";

function NavBar() {
  //   const [showPerms, setPermsShow] = useState(false);
  //   const handlePermsClose = () => setPermsShow(false);
  //   const handlePermsShow = () => setPermsShow(true);

  //   const [showCheckin, setCheckinShow] = useState(false);
  //   const handleCheckinClose = () => setCheckinShow(false);
  //   const handleCheckinOpen = () => setCheckinShow(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <nav className="App-nav">
      <ul>
        {/* All links waiting to be linked to something, can be edited based on user type */}
        <li>
          <Link to="/">
            {/* Linked back to home page/asset view */}
            <img src={list} alt="list" width="20" height="18" />
            Assets
          </Link>
        </li>
        {localStorage.getItem("userPerms") <= 0 ? ( //if
          <li onClick={handleShow}>
            <Link to="/">
              <img src={logOut} alt="log in" width="20" height="18" />
              Log In
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/checkOut">
                <img src={checkOut} alt="check out" width="20" height="18" />
                Check Out
              </Link>
            </li>
            <li>
              <Link to="/checkIn">
                <img src={checkIn} alt="check in" width="20" height="18" />
                Check In
              </Link>
            </li>
            <li>
              <Link to="/">
                <img src={operators} alt="operators" width="20" height="18" />
                Users
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <img src={signIn} alt="profile" width="20" height="18" />
                Profile
              </Link>
            </li>

            {localStorage.getItem("userPerms") == 0 ? (
              <></>
            ) : (
              <li>
                <Link to="/records">
                  <img src={list} alt="records" width="20" height="18" />
                  Records
                </Link>
              </li>
            )}

            <li onClick={handleShow}>
              <Link to="/">
                <img src={logOut} alt="log out" width="20" height="18" />
                Log Out
              </Link>
            </li>
          </>
        )}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {localStorage.getItem("userPerms") <= 0 ? (
                <>Login</>
              ) : (
                <>Logout</>
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {localStorage.getItem("userPerms") <= 0 ? (
              <Login callback={handleClose} />
            ) : (
              <Logout callback={handleClose} />
            )}
          </Modal.Body>
        </Modal>
      </ul>
    </nav>
  );
}

export default NavBar;
