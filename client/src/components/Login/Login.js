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

function Login(props) {
    const [updated, changeUpdate] = useState(null);
    useEffect(() => { }, [updated]);
    const toggleUpdate = () => {updated ? changeUpdate(false): changeUpdate(true)}  ;
    const { callback } = props;

    const submit = async () => {
        update(await verifyLogin(document.getElementById('username').value, document.getElementById('password').value));
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