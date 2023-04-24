import Button from "react-bootstrap/esm/Button";
import GoogleButton from "react-google-button";
import { verifyLogin } from "../../api/AuthService.js";
import { useEffect, useState, useContext } from "react";
import { GlobalStateContext } from "../Context/UserContext.js";
import "./Login.css";
import { getPassowrdForUsername } from "../../api/UserService.js";

const googleLogin = () => {
  window.open("http://localhost:5000/api/login/google", "_self");
};

function Login(props) {
  const bcrypt = require("bcryptjs"); //includes functions for hashing
  const saltRounds = 10; //for salt generation
  const [updated, changeUpdate] = useState(null);
  const [errorState, setErrorState] = useState(false);
  useEffect(() => {}, [updated, errorState]);
  const toggleUpdate = () => {
    updated ? changeUpdate(false) : changeUpdate(true);
  };

  const [globalState, setGlobalState] = useContext(GlobalStateContext);

  const submit = async () => {
    bcrypt.hash(
      document.getElementById("password").value, saltRounds).then((hash) => {
      console.log(hash);
  });
    const hash = (await getPassowrdForUsername(document.getElementById("username").value));
    bcrypt.compare(document.getElementById("password").value, hash).then( async (res) => {
      if(res){
        await verifyLogin(
          document.getElementById("username").value, 
        ).then((result) => {
          console.log(globalState);
          if (result.status === 401) {
            setErrorState(true);
          } else {
            setErrorState(false);
            setGlobalState(result);
            window.location.reload();
          }
        });
        toggleUpdate(true);
      } else {
        setErrorState(true);
      }
    });
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      submit();
    }
  };

  return (
    <>
      {errorState ? (
        <>
          <div className="alert alert-danger">
            Check your credentials and try again
          </div>
        </>
      ) : (
        <></>
      )}
      Email Address:<br></br>
      <input
        id="username"
        type="text"
        onKeyDown={handleKeypress}
        autoFocus
      ></input>
      <br></br>
      Password:<br></br>
      <input id="password" type="password" onKeyDown={handleKeypress}></input>
      <div>
        <Button
          variant="primary"
          onClick={async () => {
            submit();
          }}
          className={"beets_buttons mt-2 mb-2"}
        >
          Login
        </Button>

        <GoogleButton
          onClick={async () => {
            googleLogin();
            toggleUpdate(true);
          }}
        />
      </div>
    </>
  );
}

export default Login;
