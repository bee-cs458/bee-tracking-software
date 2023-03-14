import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/esm/Row";
import ConditionalAlert from "../../CheckInUtilities/ConditionalAlert";
import {
  makeUserGuest,
  makeUserOperator,
  makeUserOwner,
  makeUserStudent,
  deleteUser,
} from "../../../api/UserService";
import EditUser from "../../EditUser/EditUser";
import "./UserRow.css";
import { AccessControl } from "../../AccessControl/AccessControl";
import { Ranks } from "../../../constants/PermissionRanks";

function UserRow(props) {
  const [user, setUser] = useState(props.item);
  const { popModal, lastUserPromoted, setLastUserPromoted } = props;

  // Holds the state for the "advanced" field's checkbox/switch
  const [advancedChecked, setAdvancedCheck] = useState(user.advanced);

  const [editUser, setEditUser] = useState(false);
  const [deleteUserVar, setDeleteUser] = useState(false);

  const warningStr =
    "Deleting this user cannot be undone. Are you sure you want to go through with deleting it?";

  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType2, setAlertType2] = useState(1);
  const [alertMessage2, setAlertMessage2] = useState(warningStr);

  const handleEditUserTrue = () => setEditUser(true);
  const handleEditUserFalse = () => setEditUser(false);
  const handleDeleteUserTrue = () => setDeleteUser(true);
  const handleDeleteUserFalse = () => setDeleteUser(false);

  async function handleDeleteUser() {
    console.log("delete called");
    await deleteUser(user.user_id).catch((err) => {
      setAlertType2(0);
      setAlertMessage2(err.response.data.message);
      return err;
    });
  }

  useEffect(() => {
    if (lastUserPromoted.user_id === user.user_id) {
      setAdvancedCheck((x) => !x);
      setLastUserPromoted({});
      user.advanced = !user.advanced;
    }
  }, [lastUserPromoted, setLastUserPromoted, user]);

  async function handlePermissionChange(value) {
    switch (value) {
      case "-1":
        await makeUserGuest(user.user_id);
        return;
      case "0":
        await makeUserStudent(user.user_id);
        return;
      case "1":
        await makeUserOperator(user.user_id);
        return;
      case "2":
        await makeUserOwner(user.user_id);
        return;
      default:
        console.log("Error handling permission change");
        return;
    }
  }

  function handleUserStrikes(value) {
    switch (value) {
      case 0:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
            className="dot"
          >
            <circle cx="3" cy="3" r="3" fill="green" fillOpacity="1.0" />
          </svg>
        );
      case 1:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
            className="dot"
          >
            <circle cx="3" cy="3" r="3" fill="red" fillOpacity="1.0" />
          </svg>
        );
      case 2:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
            className="dot"
          >
            <circle cx="3" cy="3" r="3" fill="red" fillOpacity="1.0" />
            <circle cx="15" cy="3" r="3" fill="red" fillOpacity="1.0" />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
            className="dot"
          >
            <circle cx="3" cy="3" r="3" fill="red" fillOpacity="1.0" />
            <circle cx="15" cy="3" r="3" fill="red" fillOpacity="1.0" />
            <circle cx="27" cy="3" r="3" fill="red" fillOpacity="1.0" />
          </svg>
        );
    }
  }

  return (
    <tr>
      <td>{user.user_id}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td>{handleUserStrikes(user.strikes)}</td>
      <td>
        <Form.Select
          defaultValue={user.permissions}
          onChange={(event) => {
            handlePermissionChange(event.target.value);
          }}
        >
          <option value="-1">Guest</option>
          <option value="0">Student</option>
          <option value="1">Operator</option>
          <option value="2">Owner</option>
        </Form.Select>
      </td>
      <td>
        <Form.Check
          type="switch"
          id="advancedSwitch"
          checked={advancedChecked}
          onChange={() => {
            popModal(user);
          }}
        />{" "}
      </td>
      <td>
        <AccessControl allowedRank={Ranks.OWNER}>
          <Button variant="primary" onClick={handleEditUserTrue}>
            Edit User
          </Button>
          <> </>
          <Button variant="danger" onClick={handleDeleteUserTrue}>
            Delete User
          </Button>
        </AccessControl>
      </td>

      <Modal backdrop="static" show={editUser} onHide={handleEditUserFalse}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="m-3">
            <ConditionalAlert type={alertType} message={alertMessage} />
          </Row>
          <EditUser
            key={user.user_id}
            user={user}
            setUp={props.setUp}
            setUser={setUser}
            setAlertType={setAlertType}
            setAlertMessage={setAlertMessage}
          />
        </Modal.Body>
      </Modal>

      <Modal
        backdrop="static"
        show={deleteUserVar}
        onHide={handleDeleteUserFalse}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete {user.user_id}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="m-3">
            <ConditionalAlert type={alertType2} message={alertMessage2} />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteUser}>
            Delete
          </Button>
          <> </>
          <Button variant="secondary" onClick={handleDeleteUserFalse}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
}

export default UserRow;
