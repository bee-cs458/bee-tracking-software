import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import { useState, useEffect } from "react";

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
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
      <NavBar switchTheme={toggleTheme} mode={theme}/>
      <div className={"App " + theme}>
        <Outlet context={[theme, setTheme]}/>
      </div>
    </div>
  );
};

export default App;
export { setUserId };
export { setUserPerm };
