import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Login from "../Login/Login";
import Logout from "../Login/Logout";
import Alert from 'react-bootstrap/Alert';
import { AccessControl } from "../AccessControl/AccessControl";
import { Ranks } from "../../constants/PermissionRanks";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logoDark.png";
import list from "../../assets/list.png";
import checkOut from "../../assets/checkout.png";
import checkIn from "../../assets/checkIn.png";
import operators from "../../assets/operators.png";
import logOut from "../../assets/logOut.png";
import signIn from "../../assets/signIn.png";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import "./NavBar.css";

function NavBar(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    sessionStorage.clear();
  }; //clear session storage to wipe the current Cart on user change

  return (
    <nav className="App-nav">
      <img
        src={props.mode === "light" ? logo : logoDark}
        alt="logo"
        width="200"
      ></img>
      <ul className="navBarList">


        <AccessControl passwordReset={true} allowedRank={Ranks.GUEST} renderNoAccess={() => {
          return <Alert variant={"primary"}>
            A password change is required to regain system access
          </Alert>;
        }}>



          {/* Shows the Checkout and Checkin Nav buttons to operators & above*/}
          <AccessControl allowedRank={Ranks.OPERATOR}>

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
                {/* Linked back to home page/asset view */}
                <img src={list} alt="list" width="20" height="18" />
                Assets
              </Link>
            </li>
          </AccessControl>
          {/* Shows the Users and Records Nav buttons to Owners*/}
          <AccessControl allowedRank={Ranks.OWNER}>
            <li>
              <Link to="/Records">
                <img src={list} alt="records" width="20" height="18" />
                Records
              </Link>
            </li>
            <li>
              <Link to="/Users">
                <img src={operators} alt="operators" width="20" height="18" />
                Users
              </Link>
            </li>
          </AccessControl>
        </AccessControl>

        <AccessControl onlyLoggedOut={true}>
          <li onClick={handleShow}>
            <Link to="/">
              <img src={logOut} alt="log in" width="20" height="18" />
              Log In
            </Link>
          </li>
        </AccessControl>
        <AccessControl allowedRank={Ranks.STUDENT}>
          <li>
            <Link to="/profile">
              <img src={signIn} alt="profile" width="20" height="18" />
              Profile
            </Link>
          </li>

          <li onClick={handleShow}>
            <Link to="/">
              <img src={logOut} alt="log out" width="20" height="18" />
              Log Out
            </Link>
          </li>
        </AccessControl>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <AccessControl
                allowedRank={Ranks.STUDENT}
                renderNoAccess={() => {
                  return "Login";
                }}
              >
                Logout
              </AccessControl>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AccessControl
              allowedRank={Ranks.STUDENT}
              renderNoAccess={() => {
                return <Login callback={handleClose} />;
              }}
            >
              <Logout callback={handleClose} />
            </AccessControl>
          </Modal.Body>
        </Modal>

        {/* Weather Widget */}
        <li id="weather">
          <div className="weather-widget-container">
            <WeatherWidget
              crossorigin="anonymous"
              apiKey={"b3cd383e1a41099de4513c032475c2ea"}
            />
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
