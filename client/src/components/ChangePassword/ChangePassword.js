import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { updatePassword } from "../../api/UserService.js";
import "./ChangePassword.css";
import { passwordStrength } from "check-password-strength";
import ConditionalAlert from "../../components/CheckInUtilities/ConditionalAlert.js";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [strength, setStrength] = useState({
    id: 0,
    value: "Too weak",
    minDiversity: 0,
    minLength: 0,
  });

  function handleOldPassChange(password) {
    setOldPassword(password);
  }

  function handleNewPassChange(password) {
    setNewPassword(password);
    setStrength(passwordStrength(password));
  }
  function handlePassAgainChange(password) {
    setPasswordAgain(password);
  }

  function clearFields() {
    setNewPassword("");
    setOldPassword("");
    setPasswordAgain("");
    setStrength({ id: 0, value: "Too weak", minDiversity: 0, minLength: 0 });
  }

  function submit() {
    if (strength.id < 2) {
      alert("Password is too weak");
    } else {
      if (newPassword === passwordAgain) {
        updatePassword(oldPassword, newPassword);
        alert("Password was updated");
        clearFields();
      } else {
        alert("Passwords do not match");
      }
    }
  }

  return (
    <div id="mainContent">
      <Form>
        <Row>
          <Form.Group as={Col}>
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              id="passwordCur"
              className="search"
              type="password"
              placeholder="Enter Old Password"
              onChange={(event) => {
                handleOldPassChange(event.target.value);
              }}
            />

            <Form.Label>New Password</Form.Label>
            <Form.Text>
              <p>Password must be at least 8 characters long, and contain:</p>
              <ul className="pt-0">
                <li>1 Uppercase Letter</li>
                <li>1 Lowercase Letter</li>
                <li>1 Number</li>
                <li>1 Symbol</li>
              </ul>
            </Form.Text>
            <Form.Control
              id="passwordNew"
              className="search"
              type="password"
              placeholder="Enter New Password"
              onChange={(event) => {
                handleNewPassChange(event.target.value);
              }}
            />
            <ConditionalAlert type={strength.id} message={strength.value} />
            <Form.Label>Verify Password</Form.Label>
            <Form.Control
              id="passwordNew2"
              className="search"
              type="password"
              placeholder="Verify New Password"
              onChange={(event) => {
                handlePassAgainChange(event.target.value);
              }}
            />
            <div id="btnContainer">
              <Button
                variant="primary"
                onClick={async () => {
                  submit();
                }}
              >
                Update
              </Button>
            </div>
          </Form.Group>
        </Row>
      </Form>
    </div>
  );
}

// https://www.npmjs.com/package/check-password-strength