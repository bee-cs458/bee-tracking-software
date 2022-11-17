import Button from "react-bootstrap/esm/Button";
import {updatePass, updatePassword } from '../../api/UserService.js';
import './ChangePassword.css';

function verifyPass(nPass1, nPass2) {
return((nPass1 == nPass2))
}

function ChangePassword() {
    return(
        <div style={{ position: 'absolute',
                        left: '300px',
                        top: '40px' }}>
                <p>Current Password:</p>
                <input id="passwordCur" type="password"></input>
                
                <p>New Password:</p>
                <input id="passwordNew" type="password"></input>
                
                <p>Verify Password:</p>
                <input id="passwordNew2" type="password"></input>
                <br/>
                <div>
                <Button variant="primary" onClick={
                     async () => {
                       (verifyPass(document.getElementById('passwordNew').value, document.getElementById('passwordNew2').value) ? 
                        updatePassword(document.getElementById('passwordCur').value, document.getElementById('passwordNew').value): console.log("Passwords do not match") );
                        }} style={{ position: 'relative',
                                    top: '10px' }} >  Update Password </Button>
              
                </div>
            
        </div>
);
}

export default ChangePassword;
