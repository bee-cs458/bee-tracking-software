import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import { useEffect } from "react";
import { getLoggedInUser } from "./api/AuthService";

function setUserId(newId) {
  localStorage.setItem("userId", newId);
}
function setUserPerm(newPerm) {
  localStorage.setItem("userPerms", newPerm);
}
function getLoggedInUserId() {
  var id = localStorage.getItem("userId");
  if (id === null || id === undefined) {
    return -1;
  } else {
    return id;
  }
}
function getLoggedInUserPerms() {
  var perms = localStorage.getItem("userPerms");
  if (perms === null || perms === undefined) {
    return -1;
  } else {
    return perms;
  }
}

const App = () => {

  //const [user, setUser] = useContext(UserContext);

  useEffect(() => {

    getLoggedInUser()
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }

        setUserId(-1);
        setUserPerm(-1);

        throw new Error("Failed to get logged in user");
      })
      .then((resObject) => {
        //setUser(resObject);
        setUserId(resObject.user.user_id);
        setUserPerm(resObject.user.permissions);
      })
      .catch((err) => {
        console.log(err);
      })

  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App;
export { setUserId, setUserPerm, getLoggedInUserId, getLoggedInUserPerms };
