import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import { useEffect, useState, useContext } from "react";
import { GlobalStateContext } from "./components/Context/UserContext";

const App = () => {
  const [theme, setTheme] = useState("light");

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
      <NavBar switchTheme={toggleTheme} mode={theme} />
      <div className={"App " + theme}>
        <Outlet context={[theme, setTheme]} />
      </div>
    </div>
  );
};

export default App;
