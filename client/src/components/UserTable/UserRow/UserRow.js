import { useEffect } from 'react';
import Form from "react-bootstrap/Form";

function UserRow(props) {

    const user = props.item;

    useEffect(() => { }, [user])

    return (
        <tr>
            <td><Form.Check type="checkbox" /></td>
            <td>{user.user_id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.strikes}</td>
            <td>{user.permissions}</td>
            {/* <td>{user.advanced}</td> */}
            <td><Form.Check type="switch" id="advancedSwitch" /></td>   
        </tr>
    );

}

export default UserRow;