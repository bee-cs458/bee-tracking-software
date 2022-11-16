import Button from "react-bootstrap/esm/Button";
import { useEffect, useState } from 'react';
import changePassword from '../../api/UserService';


function ChangePassword() {
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
                                update(await changePassword('New Password2','newPass' ));
                            }
                        } style={{ float: 'right' }}>
                            Update Password
                        </Button>
                    </div>


</>
    );
}

export default ChangePassword;
