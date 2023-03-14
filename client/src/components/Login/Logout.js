import Button from "react-bootstrap/esm/Button";
import { useContext, useEffect, useState } from 'react';
import { GlobalStateContext, LOGGED_OUT_STATE, setUserId, setUserPerm } from "../Context/UserContext";
import './Login.css';
import { triggerLogout } from "../../api/AuthService.js";
import { Ranks } from "../../constants/PermissionRanks";



function Logout(props) {
    const [updated, toggleUpdate] = useState(null);
    useEffect(() => { }, [updated]);
    const { callback } = props;
    const [userState, setUserState] = useContext(GlobalStateContext);

    function update() {
        setUserId(-1);
        setUserPerm(-1);
        setUserState({user: {user_id: -1, permissions: -1}});
        triggerLogout();
    }

    return (
        <>
            {(userState.permissions > Ranks.GUEST) ?
                <>
                    Are you sure you want to Logout?
                    <div >
                        <Button variant="primary" onClick={() => { update(); toggleUpdate(true); window.location.reload(); return false; }}>
                            Logout
                        </Button>
                    </div>
                </>
                :
                <>
                    Logout Successful!
                    {callback()}
                </>
            }
        </>
    );
}

export default Logout;