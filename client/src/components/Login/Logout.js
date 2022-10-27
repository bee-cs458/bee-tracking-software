import Button from "react-bootstrap/esm/Button";
import { useEffect , useState} from 'react';
import {setUserId, setUserPerm } from "../../App.js";
import './Login.css'; 

function update(){
    setUserId(-1);
    setUserPerm(0);
}

function Logout() {
    const [updated, toggleUpdate] = useState(null);
    useEffect(() => { }, [updated]);
    return(
        <>
        {(localStorage.getItem("userPerms") != 0) ?
        <>
            Are you sure you want to Logout?
            <div >
            <Button variant="primary" onClick= {() => {update() ; toggleUpdate(true)}}>
                Logout
            </Button>
            </div>
            </>
            :
            <>
            Logout Successful! Click the X to get back to the asset list.
            </>
}
            </>
    );
}

export default Logout;