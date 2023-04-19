import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import "./App.css";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [collapse, setCollapse] = useState(false);

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
      <Header switchTheme={toggleTheme} collapse={collapse} setCollapse={setCollapse} />
      <NavBar mode={theme} collapse={collapse} setCollapse={setCollapse} />
      <div className={collapse ? "shrunk" : "full"}>
        {" "}
        {/* set this width to adapt the Outlet to the NavBar width*/}
        <Outlet context={[theme, setTheme]} />
      </div>
    </div>
  );
};

export default App;
