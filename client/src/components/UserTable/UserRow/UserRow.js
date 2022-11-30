import { useEffect } from 'react';

function UserRow(props) {

    const user = props.item;

    useEffect(() => { }, [user])

    return (
        <tr>
            <td>{user.user_id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.strikes}</td>
            <td>{user.permissions}</td>
            <td>{user.advanced}</td>
        </tr>
    );

}

export default UserRow;