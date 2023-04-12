import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Form, Row, Col } from "react-bootstrap/esm/";
import { editUser } from "../../api/UserService";
import "./EditUser.css";

function EditUser(props) {
  const { user, setUser, setAlertType, setAlertMessage } = props;
  const [user_id, setId] = useState(user.user_id);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [updatePassword, setUpdatePass] = useState(user.updatePass);


  async function handleSubmitUser() {
    await editUser(user.user_id, user_id, firstName, lastName, updatePassword)
      .then(() => {
        if (user_id >= 0) {
          setUser(
            Object.assign({}, user, {
              user_id,
              first_name: firstName,
              last_name: lastName,
              updatePass: updatePassword
            })
          );
        }
      })
      .catch((error) => {
        return error;
      })
      .then((error) => {
        if (user_id >= 0) {
          //If it doesn't see an error send green alert message
          if (!error) {
            setAlertMessage("User has been updated with these changes!");
            setAlertType(3);
          }
          // Read a error of 400 and displays custom error message
          else if (error.response.status === 400) {
            setAlertMessage(
              "Error while updating the user: This User Id is already being used"
            );
            setAlertType(0);
          }
          //If a random error is found it will just return the error handler message
          else {
            setAlertMessage(error.response.data.message);
            setAlertType(0);
          }
        } else {
          setAlertMessage(
            "Error: User Id is not a valid ID only positive ID's"
          );
          setAlertType(0);
        }
      });
  }
  function handleUpdatePass(switchValue){
    // if the user clicks the switch the value will update
    if(switchValue === 0){
      switchValue = 1;
    } else{
      switchValue = 0;
    }
    setUpdatePass(switchValue);
  }

  function handleIdChange(newVal) {
    setId(newVal);
    setAlertMessage(null);
    setAlertType(null);
  }

  function handleFirstNameChange(newVal) {
    setFirstName(newVal);
    setAlertMessage(null);
    setAlertType(null);
  }

  function handleLastNameChange(newVal) {
    setLastName(newVal);
    setAlertMessage(null);
    setAlertType(null);
  }


  return (
    <Form>
      <Row>
        <Form.Group as={Col} controlId="userId">
          <Form.Label>User Id</Form.Label>
          <Form.Control
            required
            type="number"
            min="1"
            className="text"
            defaultValue={user.user_id}
            maxLength="20"
            onChange={(event) => {
              handleIdChange(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="FirstName">
          <Form.Label>User First Name</Form.Label>
          <Form.Control
            className="text"
            type="text"
            defaultValue={user.first_name}
            onChange={(event) => {
              handleFirstNameChange(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="LastName">
          <Form.Label>User Last Name</Form.Label>
          <Form.Control
            className="text"
            type="text"
            defaultValue={user.last_name}
            onChange={(event) => {
              handleLastNameChange(event.target.value);
            }}
          />
        </Form.Group>
      </Row>
      <Row>
      <Form.Check as={Col} controlId="UpdatePassword">
          <Form.Label>Password Reset</Form.Label>
          <Form.Check
          type="switch"
          id="passwordResetSwitch"
          defaultValue={updatePassword}
          onChange={() => {handleUpdatePass(updatePassword)}}
        />
        </Form.Check>
        <Col></Col>
        <Col></Col>
        <Button
          as={Col}
          className="submitButton"
          variant="primary"
          onClick={handleSubmitUser}
        >
          Submit Edit
        </Button>
      </Row>
    </Form>
  );
}
export default EditUser;
