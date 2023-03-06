import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from 'react';
import { setUserId, setUserPerm } from "../../App.js";
import './Login.css';
import { triggerLogout } from "../../api/AuthService.js";

function update() {
    setUserId(-1);
    setUserPerm(-1);
    triggerLogout();
}

function Logout(props) {
    const [updated, toggleUpdate] = useState(null);
    useEffect(() => { }, [updated]);
    const { callback } = props;
    return (
        <>
            {(localStorage.getItem("userPerms") > -1) ?
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