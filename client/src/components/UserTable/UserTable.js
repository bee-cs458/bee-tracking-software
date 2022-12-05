import { useEffect, useState } from "react";
import {
    getAllUsers,
    searchingForUsers
} from "../../api/UserService";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import UserRow from "./UserRow/UserRow";

export default function UsersTable(props) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function userTableInit() {
            let userResults = 0;
            if (props.input !== undefined && props.input !== ""){
                userResults = await searchingForUsers(props.input);
                setUsers(userResults);
            }
            else {
                userResults = await getAllUsers();
            }    
            setUsers(userResults);
        }
        userTableInit();
    }, [props.input]);

    return (
        <div>
            {(users != null && users.length > 0) ? (
                <div>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <td>Select</td>
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
                                <UserRow key={user.user_id} item={user}></UserRow>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <Alert variant="warning">No Users found!</Alert>
            )}
        </div>
    );
}