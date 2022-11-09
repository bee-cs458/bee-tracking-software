import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";

var userPermission = 0;
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
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default App;
export { setUserId };
export { setUserPerm };
