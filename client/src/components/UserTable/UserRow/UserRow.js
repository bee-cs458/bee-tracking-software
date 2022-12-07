import { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import { makeUserGuest, makeUserOperator, makeUserOwner, makeUserStudent } from '../../../api/UserService'; 
import "./UserRow.css";

function UserRow(props) {

    const user = props.item;
    const { popModal, lastUserPromoted, setLastUserPromoted } = props;

    // Holds the state for the "advanced" field's checkbox/switch
    const [advancedChecked, setAdvancedCheck] = useState(user.advanced);

    useEffect(() => {
        if (lastUserPromoted.user_id === user.user_id) {
            setAdvancedCheck(x => !x);
            setLastUserPromoted({});
            user.advanced = !user.advanced;
        }
    }, [lastUserPromoted, setLastUserPromoted, user])

    async function handlePermissionChange(value) {

        switch (value) {
            case "-1": await makeUserGuest(user.user_id); return;
            case "0": await makeUserStudent(user.user_id); return;
            case "1": await makeUserOperator(user.user_id); return;
            case "2": await makeUserOwner(user.user_id); return;
            default: console.log("Error handling permission change"); return;
        }

    }

    
    function handleUserStrikes(value) {

        switch (value) {
            case 0:
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" className="dot">
                <circle cx="3" cy="3" r="3" fill="green" fillOpacity="1.0" />
                </svg>;
            case 1:
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" className="dot">
                <circle cx="3" cy="3" r="3" fill="red" fillOpacity="1.0"/>
                </svg>;
            case 2:
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" className="dot">
                <circle cx="3" cy="3" r="3" fill="red" fillOpacity="1.0"/>
                <circle cx="15" cy="3" r="3" fill="red" fillOpacity="1.0"/>
                </svg>;
            default: 
                return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" className="dot">
                <circle cx="3" cy="3" r="3" fill="red" fillOpacity="1.0"/>
                <circle cx="15" cy="3" r="3" fill="red" fillOpacity="1.0"/>
                <circle cx="27" cy="3" r="3" fill="red" fillOpacity="1.0"/>
                </svg>;
        }
    }
    

    return (
        <tr>
            <td>{user.user_id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{handleUserStrikes(user.strikes)}</td>
            <td><Form.Select defaultValue={user.permissions} onChange={(event) => {
                handlePermissionChange(event.target.value);
            }}>
                <option value="-1">Guest</option>
                <option value="0">Student</option>
                <option value="1">Operator</option>
                <option value="2">Owner</option>
            </Form.Select></td>
            <td><Form.Check type="switch" id="advancedSwitch" checked={advancedChecked} onChange={() => { popModal(user) }} />
                
            </td>
        </tr>
    );

}

export default UserRow;