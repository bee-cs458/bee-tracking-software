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
  const [strikeOne, setStrikeOne] = useState(false);
  const [strikeTwo, setStrikeTwo] = useState(false);
  const [strikeThree, setStrikeThree] = useState(false);
  const [strikes, setStrikes] = useState(user.strikes);

  /**
   * based of the user's incoming strike count sets the states for the strike buttons
   */
  function defaultStrikes() {
    if (user.strikes > 2) {
      //if the user has three or more strikes
      setStrikeThree(true);
      setStrikeTwo(true);
      setStrikeOne(true);
    } else if (user.strikes === 2) {
      //if the user has two strikes
      setStrikeTwo(true);
      setStrikeOne(true);
    } else if (user.strikes === 1) {
      //if the user has one strike
      setStrikeOne(true);
    }
    //since the strike states are set to false and 0, the default values for a user with zero strikes have already been assigned
  }

  /**
   * logic for when the strike one button is pressed
   */
  function toggleStrikeOne() {
    if (strikeOne) {
      //if the first button is red
      if (strikeThree) {
        //if the third button is red set the third and second button to green and strikes to one
        setStrikeThree(false);
        setStrikeTwo(false);
        setStrikeOne(true);
        setStrikes(1);
      } else if (strikeTwo) {
        //if the second button is red set the second button to green and the strike to one
        setStrikeTwo(false);
        setStrikeOne(true);
        setStrikes(1);
      } else {
        setStrikeOne(false); //set the button to green and strikes to 0
        setStrikes(0);
      }
    } else {
      //if the button is green
      setStrikeOne(true); //set strikes to 1 and button to red
      setStrikes(1);
    }
  }

  function toggleStrikeTwo() {
    if (strikeTwo) {
      //if the second button is red
      if (strikeThree) {
        //if the third button is red set the third button to green and strikes to 2
        setStrikeThree(false);
        setStrikeTwo(true);
        setStrikes(2);
      } else {
        //else set strikes to 0 and button two and one to green
        setStrikeTwo(false);
        setStrikeOne(false);
        setStrikes(0);
      }
    } else {
      //if button is green set button two and one to red and strikes to 2
      setStrikeTwo(true);
      setStrikeOne(true);
      setStrikes(2);
    }
  }

  function toggleStrikeThree() {
    if (strikeThree) {
      //if the button is red set all buttons to green and strikes to 0
      setStrikeThree(false);
      setStrikeTwo(false);
      setStrikeOne(false);
      setStrikes(0);
    } else {
      //if the button is green set all buttons to red and strikes to 3
      setStrikeThree(true);
      setStrikeTwo(true);
      setStrikeOne(true);
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

  useEffect(() => {}, [strikeOne, strikeTwo, strikeThree]);
  useEffect(() => {
    defaultStrikes();
  }, []);

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
            className={strikeOne ? "redButton" : "greenButton"}
            onClick={() => {
              toggleStrikeOne();
            }}
          ></Button>
        </Col>
        <Col>
          <Button
            className={strikeTwo ? "redButton" : "greenButton"}
            onClick={() => {
              toggleStrikeTwo();
            }}
          ></Button>
        </Col>
        <Col>
          <Button
            className={strikeThree ? "redButton" : "greenButton"}
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
