import { useEffect, useState } from "react";
import { getAllUsers, searchingForUsers } from "../../api/UserService";
import { Table, Alert, Modal, Button } from "react-bootstrap/";
import UserRow from "./UserRow/UserRow";
import { promoteOrDemoteAdvancedUser } from "../../api/UserService";
import { useOutletContext } from "react-router-dom";

export default function UsersTable(props) {
  const [users, setUsers] = useState([]);
  const [lastUserPromoted, setLastUserPromoted] = useState({});
  const [userPendingChange, setUserPendingChange] = useState({});
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useOutletContext();

  function popModal(user) {
    setUserPendingChange(user);
  }

  async function handleConfirmButton() {
    setLoading(true);
    // Calls the API to invert the advanced value in the DB
    await promoteOrDemoteAdvancedUser(userPendingChange.user_id)
      .then((result) => {
        setLastUserPromoted(userPendingChange);
        setUserPendingChange({});
      })
      .finally(() => setLoading(false));
  }

  function handleCloseButton() {
    setUserPendingChange({});
  }

  useEffect(() => {
    async function userTableInit() {
      let userResults = 0;
      if (props.input !== undefined && props.input !== "") {
        userResults = await searchingForUsers(props.input);
        setUsers(userResults);
      } else {
        userResults = await getAllUsers();
      }
      setUsers(userResults);
    }
    userTableInit();
  }, [props.input, props.userTableChanged]); //renders table when these useStates change

  return (
    <div>
      {users != null && users.length > 0 ? (
        <div>
          <Table striped bordered variant={theme}>
            <thead>
              <tr>
                <th width="100px">User Id</th>
                <th width="200px">First Name</th>
                <th width="200px">Last Name</th>
                <th width="100px">Strikes</th>
                <th width="200px">Permissions</th>
                <th width="100px">Advanced</th>
                <th width="200px">Edit User</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserRow
                  key={user.user_id}
                  lastUserPromoted={lastUserPromoted}
                  setLastUserPromoted={setLastUserPromoted}
                  popModal={popModal}
                  item={user}
                  toggleTableChanged={props.toggleTableChanged}
                ></UserRow>
              ))}
            </tbody>
          </Table>
          <Modal
            show={userPendingChange.user_id !== undefined ? true : false}
            onHide={handleCloseButton}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Advanced User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {userPendingChange.user_id !== undefined ? (
                <>
                  <p>
                    You are about to{" "}
                    {userPendingChange.advanced
                      ? `prohibit the user with ID '${userPendingChange.user_id}' from checking out advanced items`
                      : `grant the user with ID '${userPendingChange.user_id}' access to advanced items`}
                    . Are you sure?
                  </p>
                </>
              ) : (
                <></>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                className="beets_buttons"
                onClick={handleConfirmButton}
                disabled={loading}
              >
                Confirm
              </Button>

              <Button variant="secondary" onClick={handleCloseButton}>
                Cancel
              </Button>
              {/* Should export/print the information on the confirmation modal when clicked */}
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <Alert variant="warning">No Users found!</Alert>
      )}
    </div>
  );
}
