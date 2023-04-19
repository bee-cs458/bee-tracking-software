import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { editUserProfile } from "../../api/UserService";

function UserInformation(props) {
  const { user, edit, toggleEdit, setAlertMessage, setAlertType } = props;
  const [newFirstName, setNewFirstName] = useState(user.first_name);
  const [newLastName, setNewLastName] = useState(user.last_name);
  var perms = "";
  //translates permission number to it's name
  switch (user.permissions) {
    case -1:
      perms = "Guest";
      break;
    case 0:
      perms = "Student";
      break;
    case 1:
      perms = "Operator";
      break;
    case 2:
      perms = "Owner";
      break;
    default:
      perms = "Guest";
  }

  //for when the first name is changed
  function handleFirstChange(newVal) {
    setNewFirstName(newVal);
  }

  //for when the last name is changed
  function handleLastChange(newVal) {
    setNewLastName(newVal);
  }

  //for when the submit button is pressed
  const handleSubmit = async () => {
    let error = await editUserProfile(user.user_id, newFirstName, newLastName);
    //If it doesn't see an error send green alert message
    setAlertMessage("User has been updated with these changes!");
    setAlertType(3);
    // Read a error of 400 and displays custom error message
    if (error.response.status === 400) {
      setAlertMessage(
        "Error while updating the user: This User Id is already being used"
      );
      setAlertType(0);
    }

    //will eventually change the user data in the DB
  };

  //for when the cancel button is pressed
  function handleCancel() {
    //sets the states back to normal
    setNewFirstName(user.first_name);
    setNewLastName(user.last_name);
  }

  return (
    <div className="profileInfo">
      <div className="seperator"></div>
      <b>ID:</b> {user.user_id} <br />
      {edit ? (
        <>
          <Form>
            <Row>
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>
                  <b>First Name</b>
                </Form.Label>
                <Form.Control
                  className="text"
                  type="text"
                  defaultValue={newFirstName}
                  maxLength="45"
                  onChange={(event) => {
                    handleFirstChange(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>
                  <b>Last Name</b>
                </Form.Label>
                <Form.Control
                  className="text"
                  type="text"
                  defaultValue={newLastName}
                  maxLength="45"
                  onChange={(event) => {
                    handleLastChange(event.target.value);
                  }}
                />
              </Form.Group>
            </Row>
          </Form>
        </>
      ) : (
        <>
          <b>First Name:</b> {newFirstName} <br /> <b>Last Name: </b>
          {newLastName} <br />
        </>
      )}
      <b>Username:</b> {user.username} <br />
      <b>Email:</b> {user.email ?? "No email associated with this account"}
      <br />
      <b>Password:</b> ********** <br />
      <b>Permissions:</b> {perms} <br />
      {user.advanced ? (
        <>
          Advanced User <br />
        </>
      ) : (
        ""
      )}
      <div className="seperator"></div>
      {edit ? (
        <>
          <Button
            className="beets_buttons"
            onClick={() => {
              toggleEdit();
              handleSubmit();
            }}
          >
            Submit Profile Changes
          </Button>{" "}
          <Button
            variant="secondary"
            onClick={() => {
              toggleEdit();
              handleCancel();
            }}
          >
            Cancel
          </Button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default UserInformation;
