import { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import { makeUserGuest, makeUserOperator, makeUserOwner, makeUserStudent, promoteOrDemoteAdvancedUser } from '../../../api/UserService';

function UserRow(props) {

    const user = props.item;

    // Holds the state for the "advanced" field's checkbox/switch
    const [advancedChecked, setAdvancedCheck] = useState(user.advanced);

    useEffect(() => { }, [user, advancedChecked])

    // Called when the advanced field's switch is flipped
    async function handleSwitchAdvanced(user) {

        // Inverts the switch value in the UI
        setAdvancedCheck(!advancedChecked);
        // Calls the API to invert the advanced value in the DB
        await promoteOrDemoteAdvancedUser(user.user_id);

    }

    async function handlePermissionChange(value) {

        switch (value) {
            case "-1": await makeUserGuest(user.user_id); return;
            case "0": await makeUserStudent(user.user_id); return;
            case "1": await makeUserOperator(user.user_id); return;
            case "2": await makeUserOwner(user.user_id); return;
            default: console.log("Error handling permission change"); return;
        }

    }

    return (
        <tr>
            <td>{user.user_id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.strikes}</td>
            <td><Form.Select defaultValue={user.permissions} onChange={(event) => {
                handlePermissionChange(event.target.value);
            }}>
                <option value="-1">Guest</option>
                <option value="0">Student</option>
                <option value="1">Operator</option>
                <option value="2">Owner</option>
            </Form.Select></td>
            <td><Form.Check type="switch" id="advancedSwitch" checked={advancedChecked} onChange={() => { handleSwitchAdvanced(user) }} /></td>
        </tr>
    );

}

export default UserRow;