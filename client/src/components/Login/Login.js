import Button from "react-bootstrap/esm/Button";
import { verifyLogin } from "../../api/UserService";
import './Login.css'; 

function Login(){
    return(
        <>
            Username:<br></br>
            <input id="username" type="text" value = "Username"></input>
            <br></br>
            Password:<br></br>
            <input id ="password" type="text" value = "Password"></input>
            <div >
            <Button variant="primary" onClick= {() => verifyLogin('seynon5' , '2tn4mdI0GA8')} style={{float: 'right'}}>
                Login
            </Button>
            </div>
        </>
    );
}

export default Login;