import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { updatePassword } from "../../api/UserService.js";
import "./ChangePassword.css";
import { passwordStrength } from "check-password-strength";
import ConditionalAlert from "../../components/CheckInUtilities/ConditionalAlert.js";
import PasswordAlert from "../../components/PasswordAlert/PasswordAlert.js";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [alertType, setAlertType] = useState(null);
  const [alertMesssage, setAlertMessage] = useState("");
  const [strength, setStrength] = useState({
    id: 0,
    value: "Too weak",
    minDiversity: 0,
    minLength: 0,
  });
  const [requirements, setRequirements] = useState("");

  /**
   * a function to set the type and message of a ConditionalAlert
   * @param {int} type the type of alert
   * @param {String} message the massage for the alert
   */
  function setAlert(type, message) {
    setAlertType(type);
    setAlertMessage(message);
  }

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      submit();
    }
  };

  function handleOldPassChange(password) {
    setOldPassword(password);
  }

  function checkRequirements(){//updates the message in the passwordAlert
    if (strength.id < 2) {
      setAlert(null, ""); //makes conditional alert blank
      var missingReqs =
        "Your password is missing these strength requirements:\t"; //error message
      var lowercasePattern = new RegExp("^(?=.*[a-z]).+"); //lowercase letter pattern
      var uppercasePattern = new RegExp("^(?=.*[A-Z]).+"); //uppercase letter pattern
      var numberPattern = new RegExp("^(?=.*\\d).+$"); //number pattern
      var specialPattern = new RegExp("^(?=.*[-+_!@#$%^&*.,?]).+$"); //specail character pattern
      if (newPassword.length < 8) {
        //checks if the password is long enough
        missingReqs += "<br>Password must be at least 8 characters long!"; //adds error to message
      }
      if (!lowercasePattern.test(newPassword)) {
        //checks if the password includes a lowercase letter
        missingReqs += "<br>Please include a lowercase letter in password!"; //adds error to message
      }
      if (!uppercasePattern.test(newPassword)) {
        //checks if the password includes an uppercase letter
        missingReqs += "<br>Please include a uppercase letter in password!"; //adds error to message
      }
      if (!numberPattern.test(newPassword)) {
        //checks if the password includes a number
        missingReqs += "<br>Please include a number in password!"; //adds error to message
      }
      if (!specialPattern.test(newPassword)) {
        //checks if the password includes a special character
        missingReqs += "<br>Please include a special character in password!"; //adds error to message
      }
      setRequirements(missingReqs); //prompts user with error alert and any requirement they are missing
    } else {
      setRequirements("Passed")//lest the user know that everything is going to be alright
    }
  }

  function handleNewPassChange(password) {
    setNewPassword(password);
    setStrength(passwordStrength(password));
    checkRequirements(); //updates password alert for any changes made to newPassword
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
    if (oldPassword === "") {
      setAlert(1, "Please enter your old password.");
      setRequirements(""); // makes password alert disapear
    } else if (newPassword !== passwordAgain) {
      setAlert(0, "Passwords do not match!");
      setRequirements(""); // makes password alert disapear
    } else if (strength.id < 2) {
      checkRequirements()// sets the password alert if any are missed.
    } else {
      updatePassword(oldPassword, newPassword).then((res) => {
        if (res === 404) {
          setAlert(
            0,
            "Your old password is not correct! Please check that you entered the right password!"
          );
          setRequirements(""); // makes password alert disapear
        } else {
          setAlert(3, "Password has been updated!");
          setRequirements(""); // makes password alert disapear
          clearFields();
        }
      }); //if oldPassword is incorrect display an error
    }
  }

  //componet renders upon these states changing
  useEffect(() => {checkRequirements()}, [newPassword, oldPassword, passwordAgain]);

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
              onKeyDown={handleKeypress}
              onChange={(event) => {
                handleNewPassChange(event.target.value);
              }}
            />
            <ConditionalAlert
              type={alertType}
              message={alertMesssage}
            ></ConditionalAlert>
            <PasswordAlert message={requirements}></PasswordAlert>
            {/* special alert for passwords */}
            <Form.Label>Verify Password</Form.Label>
            <Form.Control
              id="passwordNew2"
              className="search"
              type="password"
              placeholder="Verify New Password"
              onKeyDown={handleKeypress}
              onChange={(event) => {
                handlePassAgainChange(event.target.value);
              }}
            />
            <div id="btnContainer">
              <Button
                className="beets_buttons"
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
