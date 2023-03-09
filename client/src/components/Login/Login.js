import Button from "react-bootstrap/esm/Button";
import { verifyLogin } from "../../api/AuthService.js";
import { useEffect, useState } from 'react';
import { setUserId, setUserPerm } from "../../App.js";
import './Login.css';

function update(perams) {
    setUserId(perams.user_id);
    setUserPerm(perams.permissions);
    window.location.reload();
}

const googleLogin = () => {
    window.open("http://localhost:5000/api/login/google", "_self");
}

function Login(props) {
    const [updated, changeUpdate] = useState(null);
    const [errorState, setErrorState] = useState(false);
    useEffect(() => { }, [updated, errorState]);
    const toggleUpdate = () => { updated ? changeUpdate(false) : changeUpdate(true) };
    const { callback } = props;

    const submit = async () => {
        var loginResult = await verifyLogin(document.getElementById('username').value, document.getElementById('password').value).then((result) => {
            if (result.status === 401) {
                setErrorState(true);
            } else {
                setErrorState(false);
                update(result);
            }
        });
        toggleUpdate(true);
    }

    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            submit()
        }
    };

    return (
        <>

            {(localStorage.getItem("userPerms") <= 0) ?
                <>
                    {
                        (errorState) ?
                            <>
                                <div className="alert alert-danger">Check your credentials and try again</div>
                            </>
                            :
                            <>
                                <p>Please log in</p>
                            </>
                    }
                    Username:<br></br>
                    <input id="username" type="text" onKeyDown={handleKeypress}></input>
                    <br></br>
                    Password:<br></br>
                    <input id="password" type="password" onKeyDown={handleKeypress}></input>
                    <div>
                        <Button variant="primary" onClick={
                            async () => {
                                submit();
                            }
                        } style={{ float: 'right' }}>
                            Login
                        </Button>

                        <Button variant="primary" onClick={
                            async () => {
                                googleLogin();
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