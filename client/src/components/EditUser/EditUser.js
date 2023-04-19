import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Form, Row, Col } from "react-bootstrap/esm/";
import { editUser } from "../../api/UserService";
import "./EditUser.css";

function EditUser(props) {
  const { user, setUser, setAlertType, setAlertMessage } = props;
  const [user_id, setId] = useState(user.user_id);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [strikes, setStrikes] = useState(user.strikes);

  /**
   * When button one is pressed sets strikes state to 1 if not 1, and sets strikes state to 0 if 1
   */
  function toggleStrikeOne() {
    if (strikes === 1) {
      setStrikes(0);
    } else {
      setStrikes(1);
    }
  }

  /**
   * When button two is pressed sets strikes state to 2 if not 2, and sets strikes state to 0 if 2
   */
  function toggleStrikeTwo() {
    if (strikes === 2) {
      setStrikes(0);
    } else {
      setStrikes(2);
    }
  }

  /**
   * When button one is pressed sets strikesstate  to 3 if not 3, and sets strikes state to 0 if 3 or greater
   */
  function toggleStrikeThree() {
    if (strikes >= 3) {
      setStrikes(0);
    } else {
      setStrikes(3);
    }
  }

  async function handleSubmitUser() {
    await editUser(user.user_id, user_id, firstName, lastName, strikes)
      .then(() => {
        if (user_id >= 0) {
          setUser(
            Object.assign({}, user, {
              user_id,
              first_name: firstName,
              last_name: lastName,
              strikes: strikes,
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

  //renders page when strikes changes
  useEffect(() => {}, [strikes]);

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
      <div className="seperator"></div>
      <Row>
        <h5>Strikes ({strikes})</h5>
      </Row>
      <Row>
        <Col>
          <Button
            className={strikes > 0 ? "redButton" : "greenButton"}
            onClick={() => {
              toggleStrikeOne();
            }}
          ></Button>
        </Col>
        <Col>
          <Button
            className={strikes > 1 ? "redButton" : "greenButton"}
            onClick={() => {
              toggleStrikeTwo();
            }}
          ></Button>
        </Col>
        <Col>
          <Button
            className={strikes > 2 ? "redButton" : "greenButton"}
            onClick={() => {
              toggleStrikeThree();
            }}
          ></Button>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
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
