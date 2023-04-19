import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Login from "../Login/Login";
import Logout from "../Login/Logout";
import { AccessControl } from "../AccessControl/AccessControl";
import { Ranks } from "../../constants/PermissionRanks";
import DarkModeSwitch from "../DarkModeSwitch/DarkModeSwitch";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logoDark.png";
import logoShrunk from "../../assets/logo-shrunk.png";
import logoDarkShrunk from "../../assets/logoDark-shrunk.png";
import list from "../../assets/list.png";
import checkOut from "../../assets/checkout.png";
import checkIn from "../../assets/checkIn.png";
import operators from "../../assets/operators.png";
import logOut from "../../assets/logOut.png";
import signIn from "../../assets/signIn.png";
import doubleArrow from "../../assets/double-arrow.png";
import WeatherWidget from "../WeatherWidget/WeatherWidget";
import "./NavBar.css";

function NavBar(props) {
  const [show, setShow] = useState(false);
  const { collapse, setCollapse } = props;
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    sessionStorage.clear();
  }; //clear session storage to wipe the current Cart on user change

  function handleClick() {
    props.switchTheme();
  }

  function handleCollapse() {
    //the collapse Boolean changes various display elements
    //there are ternary functions in the return below that utilize it
    //it also raises into App.js so the Outlet knows it can expand into the new space.
    setCollapse(!collapse);
  }

  return (
    <nav className={collapse ? "App-nav-shrunk" : "App-nav"}>
      <img
        src={
          props.mode === "light" && !collapse
            ? logo
            : !collapse
            ? logoDark
            : props.mode === "light" && collapse
            ? logoShrunk
            : logoDarkShrunk
        }
        alt="logo"
        height="55px"
        width={"auto"}
        className="logo-image"
      ></img>
      <div className={collapse ? "collapsed" : null}>
        <ul className="navBarList">
          <li>
            <Link to="/">
              {/* Linked back to home page/asset view */}
              <img
                src={list}
                className={collapse ? "collapsed" : null}
                alt="list"
                width="20"
                height="18"
              />
              {!collapse ? "Assets" : null}
            </Link>
          </li>
          <AccessControl onlyLoggedOut={true}>
            <li onClick={handleShow}>
              <Link to="/">
                <img
                  src={logOut}
                  className={collapse ? "collapsed" : null}
                  alt="log in"
                  width="20"
                  height="18"
                />
                {!collapse ? "Log In" : null}
              </Link>
            </li>
          </AccessControl>

          {/* Shows the Checkout and Checkin Nav buttons to operators & above*/}

          <AccessControl allowedRank={Ranks.OPERATOR}>
            <li>
              <Link to="/checkOut">
                <img
                  src={checkOut}
                  className={collapse ? "collapsed" : null}
                  alt="check out"
                  width="20"
                  height="18"
                />
                {!collapse ? "Check Out" : null}
              </Link>
            </li>
            <li>
              <Link to="/checkIn">
                <img
                  src={checkIn}
                  className={collapse ? "collapsed" : null}
                  alt="check in"
                  width="20"
                  height="18"
                />
                {!collapse ? "Check In" : null}
              </Link>
            </li>
          </AccessControl>
          <AccessControl allowedRank={Ranks.STUDENT}>
            <li>
              <Link to="/profile">
                <img
                  src={signIn}
                  className={collapse ? "collapsed" : null}
                  alt="profile"
                  width="20"
                  height="18"
                />
                {!collapse ? "Profile" : null}
              </Link>
            </li>
          </AccessControl>

          {/* Shows the Users and Records Nav buttons to Owners*/}
          <AccessControl allowedRank={Ranks.OWNER}>
            <li>
              <Link to="/Users">
                <img
                  src={operators}
                  className={collapse ? "collapsed" : null}
                  alt="operators"
                  width="20"
                  height="18"
                />
                {!collapse ? "Users" : null}
              </Link>
            </li>
            <li>
              <Link to="/Records">
                <img
                  src={list}
                  className={collapse ? "collapsed" : null}
                  alt="records"
                  width="20"
                  height="18"
                />
                {!collapse ? "Records" : null}
              </Link>
            </li>
          </AccessControl>
          <AccessControl allowedRank={Ranks.STUDENT}>
            <li onClick={handleShow}>
              <Link to="/">
                <img
                  src={logOut}
                  className={collapse ? "collapsed" : null}
                  alt="log out"
                  width="20"
                  height="18"
                />
                {!collapse ? "Log Out" : null}
              </Link>
            </li>
          </AccessControl>

          <li onClick={handleCollapse}>
            <Link>
              <img
                src={doubleArrow}
                className={collapse ? "collapsed" : "collapsed left"}
                alt="collapse"
                width="20"
                height="18"
              />
            </Link>
          </li>
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
      </div>
    </nav>
  );
}

export default NavBar;
