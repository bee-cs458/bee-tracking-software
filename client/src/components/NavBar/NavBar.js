import { Link } from "react-router-dom";
import list from "../../assets/list.png";
import checkOut from "../../assets/checkout.png";
import checkIn from "../../assets/checkIn.png";
import operators from "../../assets/operators.png";
import logOut from "../../assets/logOut.png";
import signIn from "../../assets/signIn.png";
import mode from "../../assets/mode.png";
import React, { useState} from "react";
import Modal from "react-bootstrap/Modal";
import Login from "../Login/Login";
import Logout from "../Login/Logout";
import logo from "../../assets/logo.png"
import logoDark from "../../assets/logoDark.png"

import "./NavBar.css";
import { Button } from "react-bootstrap";

function NavBar(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleClick() {
    props.switchTheme();
  }

  return (
    <nav className="App-nav">
      <img src={props.mode === "light" ? logo : logoDark} alt="logo" width="200"></img>
      <ul>
        <li>
          <Button
            variant={props.mode === "light" ? "light" : "dark"}
            onClick={handleClick}
          >
            <img src={mode} alt="list" width="20" height="18" />
          </Button>
        </li>
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
            {/* Shows the Checkout and Checkin Nav buttons to operators & above*/}
            {localStorage.getItem("userPerms") >= "1" && (
              <>
                <li>
                  <Link to="/checkOut">
                    <img
                      src={checkOut}
                      alt="check out"
                      width="20"
                      height="18"
                    />
                    Check Out
                  </Link>
                </li>
                <li>
                  <Link to="/checkIn">
                    <img src={checkIn} alt="check in" width="20" height="18" />
                    Check In
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/profile">
                <img src={signIn} alt="profile" width="20" height="18" />
                Profile
              </Link>
            </li>

            {/* Shows the Users and Records Nav buttons to Owners*/}
            {localStorage.getItem("userPerms") === "2" && (
              <>
                <li>
                  <Link to="/Users">
                    <img
                      src={operators}
                      alt="operators"
                      width="20"
                      height="18"
                    />
                    Users
                  </Link>
                </li>
                <li>
                  <Link to="/Records">
                    <img src={list} alt="records" width="20" height="18" />
                    Records
                  </Link>
                </li>
              </>
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
