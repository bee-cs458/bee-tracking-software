import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {updatePass, updatePassword } from '../../api/UserService.js';
import './ChangePassword.css';

function verifyPass(nPass1, nPass2) {
return((nPass1 == nPass2))
}

function password(){

}
function ChangePassword() {
    return(
    <>
        
        <div id="mainContent"style={{ }}>

                <Form>
                    <Row>
                        <Form.Group as={Col} >
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control id="passwordCur" className="search" type="password" placeholder="Enter Old Password" />
                            <Form.Label>New Password</Form.Label>
                            <Form.Control id="passwordNew" className="search" type="password" placeholder="Enter New Password" />
                            <Form.Label>Verify Password</Form.Label>
                            <Form.Control id="passwordNew2" className="search" type="password" placeholder="Verify New Password" />
                            <div id="btnContainer">
                                <Button variant="primary" onClick={
                                    async () => {
                                    (verifyPass(document.getElementById('passwordNew').value, document.getElementById('passwordNew2').value) ? 
                                       updatePassword(document.getElementById('passwordCur').value, document.getElementById('passwordNew').value): console.log("Passwords do not match") );
                                        }} >  Update Password 
                                </Button>
                            </div>
                        </Form.Group>

                    </Row>
                </Form>

              
                
            
        </div>

    </>
);
}

export default ChangePassword;
