import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import { useEffect } from "react";
import { getLoggedInUser } from "./api/AuthService";

var userPermission = -1;
var userId = -1;
if (localStorage.getItem("userPerms") == null) {
  localStorage.setItem("userPerms", userPermission);
  localStorage.setItem("userId", userId);
}

function setUserId(newId) {
  localStorage.setItem("userId", newId);
}
function setUserPerm(newPerm) {
  localStorage.setItem("userPerms", newPerm);
}

const App = () => {

  //const [user, setUser] = useContext(UserContext);

  useEffect(() => {

    getLoggedInUser()
      .then((response) => {
        if (response.status === 200) return response.data;
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
export { setUserId };
export { setUserPerm };
