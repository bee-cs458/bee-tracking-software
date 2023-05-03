import React from "react";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { createNewUser } from "../../api/UserService";
import ConditionalAlert from "../CheckInUtilities/ConditionalAlert";

function CreateUserForm(props) {
  const bcrypt = require("bcryptjs"); //hashing object
  const saltRounds = 10; //number of rounds to be used when creating a salt
  const [userData, setUserData] = useState({
    user_id: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    permissions: -1,
    advanced: 0,
  });
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    //hashes the entered password
    bcrypt.hash(userData.password, saltRounds).then(async (hash) => {
      //sends the new user and the hash to the API
      await createNewUser(userData, hash).then((result) => {
        if (result.status === 202) {
          setAlertType(3);
          setAlertMessage("User created successfully");
          clearForm();
        } else if (result.status === 409) {
          setAlertType(1);
          setAlertMessage("User ID already in use.");
        } else if (result.status === 410) {
          setAlertType(1);
          setAlertMessage("Username already in use");
        } else if (result.status === 411) {
          setAlertType(1);
          setAlertMessage(
            "User must have both a username and a password, or neither. Please enter a password"
          );
        } else if (result.status === 412) {
          setAlertType(1);
          setAlertMessage(
            "User must have both a username and a password, or neither. Please enter a username"
          );
        } else if (result.status === 413) {
          setAlertType(1);
          setAlertMessage(
            "Username must be an email address. Please enter a valid email address"
          );
        } else {
          setAlertType(0);
          setAlertMessage("There was an unidentified error creating this user");
        }
      });
    });
  };

  function clearForm() {
    setUserData({
      user_id: "",
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      permissions: -1,
      advanced: 0
    });
  }

  return (
    <div>
      <h2>Creating a User</h2>
      <ConditionalAlert
        type={alertType}
        message={alertMessage}
      ></ConditionalAlert>
      <Form className="p-5 mb-5" onSubmit={handleSubmit}>
        <Row className="mb-1">
          <Form.Group as={Col} xs={4}>
            <Form.Label>User ID</Form.Label>
            <Form.Control
              required
              type="number"
              id="user_id"
              min="1"
              value={userData.user_id}
              onChange={(event) => {
                setUserData({
                  ...userData,
                  user_id: parseInt(event.target.value),
                });
                setAlertType(null);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} xs={4}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              id="first_name"
              value={userData.first_name}
              onChange={(event) => {
                setUserData({ ...userData, first_name: event.target.value });
                setAlertType(null);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} xs={4}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              id="last_name"
              value={userData.last_name}
              onChange={(event) => {
                setUserData({ ...userData, last_name: event.target.value });
                setAlertType(null);
              }}
            />
          </Form.Group>
        </Row>
        <Row className="mb-1">
          <Form.Group as={Col} xs={6}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              id="username"
              value={userData.username}
              onChange={(event) => {
                setUserData({ ...userData, username: event.target.value });
                setAlertType(null);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} xs={6}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              value={userData.password}
              onChange={(event) => {
                setUserData({ ...userData, password: event.target.value });
                setAlertType(null);
              }}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} xs={6}>
            <Form.Label>Permission Level</Form.Label>
            <Form.Select
              id="permissionsSelect"
              value={userData.permissions}
              onChange={(event) => {
                setUserData({ ...userData, permissions: event.target.value });
                setAlertType(null);
              }}
            >
              <option value="-1">Guest</option>
              <option value="0">Student</option>
              <option value="1">Operator</option>
              <option value="2">Owner</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} xs={6}>
            <Form.Label>Advanced</Form.Label>
            <Form.Check
              type="switch"
              id="advancedSwitch"
              checked={userData.advanced}
              onChange={(event) => {
                setUserData({
                  ...userData,
                  advanced: !userData.advanced ? 1 : 0,
                });
                setAlertType(null);
              }}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col className="w-100 mb-2">
            <Button
              variant="primary"
              size="md"
              type="submit"
              className="w-100 beets_buttons"
            >
              Submit
            </Button>
          </Col>
        </Row>
        <Row>
          <Col className="w-100">
            <Button
              variant="danger"
              size="md"
              type="button"
              className="w-100"
              onClick={() => {
                clearForm();
                setAlertType(null);
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CreateUserForm;
