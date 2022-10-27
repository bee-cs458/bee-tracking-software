import Button from "react-bootstrap/esm/Button";
import { verifyLogin } from "../../api/UserService";
import { useEffect , useState} from 'react';
import {setUserId, setUserPerm } from "../../App.js";
import './Login.css'; 

function update(perams){
    setUserId(perams.user_id);
    setUserPerm(perams.permissions);
}

function Login(){
    const [updated, toggleUpdate] = useState(null);
    useEffect(() => { }, [updated]);
    return( 
    <>

        {(localStorage.getItem("userPerms") == 0) ?
            <>
            Username:<br></br>
            <input id="username" type="text"></input>
            <br></br>
            Password:<br></br>
            <input id ="password" type="password"></input>
            {false ? <>Username or Passowrd is not correct <br></br></>:<></>}
            <div>
            <Button variant="primary" onClick= {async () =>  {update( await verifyLogin('seynon5' , '2tn4mdI0GA8')); toggleUpdate(true)}} style={{float: 'right'}}>
                Login
            </Button>
            </div>
        </>
        : 
        <>
        Login Successful! Click the X to get back to the asset list.
        </>
        }
        </>
    );
}

export default Login;