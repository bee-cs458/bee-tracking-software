import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import "./App.css";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  const [collapse, setCollapse] = useState(localStorage.getItem("collapse"));

  const toggleTheme = () => {
    if (theme === "light" || theme === undefined) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("collapse", collapse);
  }, [collapse]);

  return (
    <div>
      <Header switchTheme={toggleTheme} collapse={collapse} setCollapse={setCollapse} theme={theme} />
      <NavBar mode={theme} collapse={collapse} setCollapse={setCollapse} />
      <div className={collapse ? "shrunk" : "full"}>
        <Outlet context={[theme, setTheme]} />
      </div>
    </div>
  );
};

export default App;
