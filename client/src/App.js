import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";

window.userPermission = 0;
window.userId = -1;

function setUserId(newId){
  window.userId = newId;
}
function setUserPerm(newPerm){
  window.userPermission = newPerm;
}

const App = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App;
export {setUserId};
export{setUserPerm};
