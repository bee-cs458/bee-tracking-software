import { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

function UserInformation(props) {
  const { user, edit, toggleEdit } = props;
  const [newFirstName, setNewFirstName] = useState(user.first_name);
  const [newLastName, setNewLastName] = useState(user.last_name);

  function handleFirstChange(newVal) {
    setNewFirstName(newVal);
  }

  function handleLastChange(newVal) {
    setNewLastName(newVal);
  }

  return (
    <div className="profileInfo">
      <b>ID:</b> {user.user_id} <br />
      {edit ? (
        <>
          <Form>
            <Row>
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="text"
                  type="text"
                  defaultValue={user.first_name}
                  maxLength="45"
                  onChange={(event) => {
                    handleFirstChange(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className="text"
                  type="text"
                  defaultValue={user.last_name}
                  maxLength="45"
                  onChange={(event) => {
                    handleLastChange(event.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Button className="beets-buttons" onClick={() => {}}></Button>
          </Form>
        </>
      ) : (
        <>
          <b>Name:</b> {user.first_name} {user.last_name} <br />
        </>
      )}
      <b>Username:</b> {user.username} <br />
      <b>Email:</b> {user.email ?? "No Email associated with this account"}{" "}
      <br />
      <b>Password:</b> ********** <br />
      <b>Permissions:</b> {user.permissions} <br />
      {user.advanced} <br />
    </div>
  );
}

export default UserInformation;
