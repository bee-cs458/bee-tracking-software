import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { updatePass, updatePassword } from "../../api/UserService.js";
import "./ChangePassword.css";
import { passwordStrength } from 'check-password-strength'

function verifyPass(nPass1, nPass2) {
  return nPass1 == nPass2;
}

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  function handleOldPassChange(password) {
    setOldPassword(password);
    console.log(passwordStrength(password))
  }

  function handleNewPassChange(password) {
    setNewPassword(password);
  }
  function handlePassAgainChange(password) {
    setPasswordAgain(password);
  }

  return (
        <>
          <div id="mainContent" style={{}}>
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
                  <Form.Control
                    id="passwordNew"
                    className="search"
                    type="password"
                    placeholder="Enter New Password"
                    onChange={(event) => {
                      handleNewPassChange(event.target.value);
                    }}
                  />
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
                        verifyPass(newPassword, passwordAgain)
                          ? updatePassword(oldPassword, newPassword)
                          : console.log("Passwords do not match");
                      }}
                    >
                      Update Password
                    </Button>
                  </div>
                </Form.Group>
              </Row>
            </Form>
          </div>
        </>
  );
}

// https://www.npmjs.com/package/check-password-strength