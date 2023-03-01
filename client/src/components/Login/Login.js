import Button from "react-bootstrap/esm/Button";
import { googleLogin, verifyLogin } from "../../api/AuthService.js";
import { useEffect, useState } from 'react';
import { setUserId, setUserPerm } from "../../App.js";
import './Login.css';

function update(perams) {
    setUserId(perams.user_id);
    setUserPerm(perams.permissions);
}

function Login(props) {
    const [updated, changeUpdate] = useState(null);
    useEffect(() => { }, [updated]);
    const toggleUpdate = () => {updated ? changeUpdate(false): changeUpdate(true)}  ;
    const { callback } = props;
    return (
        <>

            {(localStorage.getItem("userPerms") <= 0) ?
                <>
                    {
                        (localStorage.getItem("userPerms") < 0) ?
                            <>
                                <div className="alert alert-danger">Check your credentials and try again</div>
                            </>
                            :
                            <>
                                <p>Please log in</p>
                            </>
                    }
                    Username:<br></br>
                    <input id="username" type="text"></input>
                    <br></br>
                    Password:<br></br>
                    <input id="password" type="password"></input>
                    <div>
                        <Button variant="primary" onClick={
                            async () => {
                                update(await verifyLogin(document.getElementById('username').value, document.getElementById('password').value));
                                toggleUpdate(true);
                            }
                        } style={{ float: 'right' }}>
                            Login
                        </Button>

                        <Button variant="primary" onClick={
                            async () => {
                                update(await googleLogin());
                                toggleUpdate(true);
                            }
                            
                        } style={{ float: 'right' }}>
                            Login with Google
                        </Button>
                    </div>
                </>
                :
                <>
                    Login Successful!
                    {callback()}
                </>
            }
        </>
    );
}

export default Login;