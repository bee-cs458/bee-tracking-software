import Button from "react-bootstrap/esm/Button";
import signIn from '../../assets/signIn.png';
import { useEffect, useState } from 'react';

function Profile(){
    return (
    <>
        <button type="signIn" class="btn btn-default">Profile
   <img src={signIn} alt="signIn" width="22" height="22"/></button>
    </>
    )
}

function ChangePassword() {
    const [updated, toggleUpdate] = useState(null);
    useEffect(() => { }, [updated]);
    return(
<>
                    Current Password:<br></br>
                    <input id="passwordCur" type="password"></input>
                    <br></br>
                     New Password:<br></br>
                    <input id="passwordNew" type="password"></input>
                    <br></br>
                     Verify Password:<br></br>
                    <input id="passwordNew2" type="password"></input>
                    <div>
                        <Button variant="primary" onClick={
                            async () => {
                            }
                        } style={{ float: 'right' }}>
                            Update Password
                        </Button>
                    </div>


</>
    );
}

export default ChangePassword;