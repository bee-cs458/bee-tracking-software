import { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import { promoteOrDemoteAdvancedUser } from '../../../api/UserService';

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

    function mapPermissionNumber(permNum) {
        switch (permNum) {
            case -1: return "Guest";
            case 0: return "Student";
            case 1: return "Operator";
            case 2: return "Owner";
        }
    }

    return (
        <tr>
            <td><Form.Check type="checkbox" /></td>
            <td>{user.user_id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.strikes}</td>
            <td>{mapPermissionNumber(user.permissions)}</td>
            <td><Form.Check type="switch" id="advancedSwitch" checked={advancedChecked} onChange={() => { handleSwitchAdvanced(user) }} /></td>
        </tr>
    );

}

export default UserRow;