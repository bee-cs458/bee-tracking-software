import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Login from "../Login/Login";
import Logout from "../Login/Logout";
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
import "./NavBar.css";
import { getAllRecords } from "../../api/RecordService";
import ConditionalAlert from "../CheckInUtilities/ConditionalAlert";
import Row from "react-bootstrap/esm/Row";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function NavBar(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    sessionStorage.clear();
  }; //clear session storage to wipe the current Cart on user change
  const [overdueItems, setOverdueItems] = useState(0); // State for storing the number of overdue items

  const getInfo = async () => {
    let allRecords = await getAllRecords();
    allRecords = allRecords.filter((record) => record.in_date === null);
    setOverdueItems(allRecords.length); // Update the state with the number of overdue items
  }

  useEffect(() => {
    // Call getInfo() function when component mounts
    getInfo();
  }, []);

  return (
    <nav className="App-nav">
      <img
        src={props.mode === "light" ? logo : logoDark}
        alt="logo"
        width="200"
      ></img>
      <ul className="navBarList">
        <li>
          <Link to="/">
            {/* Linked back to home page/asset view */}
            <img src={list} alt="list" width="20" height="18" />
            Assets
          </Link>
        </li>
        <AccessControl onlyLoggedOut={true}>
          <li onClick={handleShow}>
            <Link to="/">
              <img src={logOut} alt="log in" width="20" height="18" />
              Log In
            </Link>
          </li>
        </AccessControl>

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
        </AccessControl>
        <AccessControl allowedRank={Ranks.STUDENT}>
          <li>
            <Link to="/profile">
              <img src={signIn} alt="profile" width="20" height="18" />
              Profile
            </Link>
          </li>
        </AccessControl>

        {/* Shows the Users and Records Nav buttons to Owners*/}
        <AccessControl allowedRank={Ranks.OWNER}>
          <li>
            <Link to="/Users">
              <img src={operators} alt="operators" width="20" height="18" />
              Users
            </Link>
          </li>
          <li>
            <Link to="/Records" state={{ fromNavBar: false }}>
              <img src={list} alt="records" width="20" height="18" />
              Records
            </Link>
          </li>
        </AccessControl>
        <AccessControl allowedRank={Ranks.STUDENT}>
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
      </ul>
      <Row className="m-">
        <AccessControl allowedRank={Ranks.OPERATOR}>
          {overdueItems > 0 && (
            <Link style={none}
              to="/Records"
              state={{ fromNavBar: true }}>
              <ConditionalAlert type={0} message={`${overdueItems} Overdue Items \n`} />
            </Link>
          )}
        </AccessControl>
      </Row>
    </nav>
  );
}

export default NavBar;
