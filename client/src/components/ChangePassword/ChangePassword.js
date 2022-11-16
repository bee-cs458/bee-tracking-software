import Button from "react-bootstrap/esm/Button";
import {updatePass, updatePassword } from '../../api/UserService.js';

function ChangePassword() {
    return(
        <div style={{ position: 'absolute',
                        left: '400px',
                        top: '100px' }}>
                <p>Current Password:</p><br></br>
                <input id="passwordCur" type="password"></input>
                <br></br>
                <p>New Password:</p><br></br>
                <input id="passwordNew" type="password"></input>
                <br></br>
                <p>Verify Password:</p><br></br>
                <input id="passwordNew2" type="password"></input>
                <div>
                <Button variant="primary" onClick={
                     async () => {
                        updatePassword(document.getElementById('passwordCur').value,document.getElementById('passwordNew').value);
                        }} >  Update Password </Button>
              
                </div>
            
        </div>
);
}

export default ChangePassword;
