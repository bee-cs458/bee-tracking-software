import Button from "react-bootstrap/esm/Button";
import { verifyLogin } from "../../api/UserService";
import {setUserId, setUserPerm } from "../../App.js";
import './Login.css'; 

function update(perams){
    setUserId(perams.user_id);
    setUserPerm(perams.permissions);
}

function Login(){
    console.log(window.userPermission);
    return(
        
        <>
        {(window.userPermission == 0) ?
        <>
            Username:<br></br>
            <input id="username" type="text"></input>
            <br></br>
            Password:<br></br>
            <input id ="password" type="password"></input>
            {false ? <>Username or Passowrd is not correct <br></br></>:<></>}
            <div>
            <Button variant="primary" onClick= {async () =>  update( await verifyLogin('seynon5' , '2tn4mdI0GA8'))} style={{float: 'right'}}>
                Login
            </Button>
            </div>
            </>
            :
            <>
            Are you sure you want to Logout?
            <div >
            <Button variant="primary" onClick= {update({user_id: -1, permissions: 0})} style={{float: 'right'}}>
                Logout
            </Button>
            </div>
            </>
            }
        </>
    );
}

export default Login;