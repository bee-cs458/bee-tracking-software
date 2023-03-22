import Button from "react-bootstrap/esm/Button";
import { useContext } from "react";
import { GlobalStateContext } from "../Context/UserContext";
import "./Login.css";
import { triggerLogout } from "../../api/AuthService.js";
import { Ranks } from "../../constants/PermissionRanks";

function Logout(props) {
  const { callback } = props;
  const [userState, setUserState] = useContext(GlobalStateContext);

  function update() {
    setUserState({ user: { user_id: Ranks.GUEST, permissions: Ranks.GUEST } });
    callback();
    triggerLogout();
  }

  return (
    <div>
      Are you sure you want to Logout?
      <div>
        <Button
          
            className="buttons" variant="primary"
          onClick={() => {
            update();
            window.location.reload();
            return false;
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default Logout;
