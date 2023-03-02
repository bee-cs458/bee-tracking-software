import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from 'react';
import { setUserId, setUserPerm } from "../../App.js";
import './Login.css';
import { triggerLogout } from "../../api/AuthService.js";

function update() {
    setUserId(-1);
    setUserPerm(0);
    triggerLogout();
}

function Logout(props) {
    const [updated, toggleUpdate] = useState(null);
    useEffect(() => { }, [updated]);
    const { callback } = props;
    return (
        <>
            {(localStorage.getItem("userPerms") !== '0') ?
                <>
                    Are you sure you want to Logout?
                    <div >
                        <Button variant="primary" onClick={() => { update(); toggleUpdate(true) }}>
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