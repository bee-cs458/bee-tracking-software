import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Form, Row, Col} from "react-bootstrap/esm/";
import { editUser } from "../../api/UserService";


function EditUser(props){

    const {user, setUser, setAlertType, setAlertMessage} = props;
    const [user_id, setId] = useState(user.user_id);
    const [firstName, setFirstName] = useState(user.first_name);
    const [lastName, setLastName] = useState(user.last_name);

    async function handleSubmitUser(){
        await editUser(
            user.user_id,
            user_id,
            firstName,
            lastName
        ).then(() => {
            setUser(Object.assign({}, user, {
                user_id,
                first_name: firstName,
                last_name: lastName
            }));
        }
        ).catch((error) => {
            return error;
        }).then((error) => {
            if (!error) {
                setAlertMessage("User has been updated with these changes!");
                setAlertType(3);
            }
            else {
                setAlertMessage(error.response.data.message);
                setAlertType(0);
            }
        });
    }

    function handleIdChange(newVal) {
        setId(newVal);
        setAlertMessage(null);
        setAlertType(null);
        console.log(newVal);
    }

    function handleFirstNameChange(newVal) {
        setFirstName(newVal);
        setAlertMessage(null);
        setAlertType(null);
        console.log(newVal);
    }

    function handleLastNameChange(newVal) {
        setLastName(newVal);
        setAlertMessage(null);
        setAlertType(null);
        console.log(newVal);
    }

    return (
        <Form>
      <Row>
        <Form.Group as={Col} controlId="userId">
          <Form.Label>User Id</Form.Label>
          <Form.Control
            required type="number" 
            id="user_id"
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
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <Button as={Col} variant="primary" onClick={handleSubmitUser}>
          Submit Edit
        </Button>
      </Row>
    </Form>
    );

}
export default EditUser;