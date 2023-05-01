import Button from "react-bootstrap/esm/Button";
import GoogleButton from "react-google-button";
import { verifyLogin } from "../../api/AuthService.js";
import { useEffect, useState, useContext } from "react";
import { GlobalStateContext } from "../Context/UserContext.js";
import "./Login.css";

const googleLogin = () => {
  window.open("http://localhost:5000/api/login/google", "_self");
};

function Login(props) {
  //remove
  const bcrypt = require("bcryptjs"); //includes functions for hashing
  const saltRounds = 10; //for salt generation
  //remove
  const [updated, changeUpdate] = useState(null);
  const [errorState, setErrorState] = useState(false);
  useEffect(() => {}, [updated, errorState]);
  const toggleUpdate = () => {
    updated ? changeUpdate(false) : changeUpdate(true);
  };

  const [globalState, setGlobalState] = useContext(GlobalStateContext);

  const submit = async () => {
    await verifyLogin( //sends the entered username and password to verify the login attempt
      document.getElementById("username").value,
      document.getElementById("password").value
    ).then((result) => {
      //console.log(globalState);
      if (result.status === 401) {
        //if the username and password do not match that of a user send an incorrect credentials alert
        setErrorState(true);
      } else {
        //if the credentials are verified
        setErrorState(false);//clear any alerts
        setGlobalState(result);//, log the user in 
        window.location.reload();//reload the page so the page updates with the user logged in.
      }
    });
    toggleUpdate(true);
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
      <input id="password" type="text" onKeyDown={handleKeypress}></input>
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
