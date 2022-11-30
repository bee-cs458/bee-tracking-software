import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import UserRow from "./UserRow/UserRow";

export default function UsersTable(props) {
    const [users] = useState([]);

    return (
        <div>

            {(users != null && users.length > 0) ? (
                <div>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <td>User Id</td>
                                <td>First Name</td>
                                <td>Last Name</td>
                                <td>Strikes</td>
                                <td>Permissions</td>
                                <td>Advanced</td>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <UserRow key={user.user_tag} item={user}></UserRow>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <Alert variant="warning">No assets found!</Alert>
            )}
        </div>
    );
}