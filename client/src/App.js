import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";

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
      <Header switchTheme={toggleTheme} />
      <NavBar mode={theme} />
      <div className={"App " + theme}>
        <Outlet context={[theme, setTheme]} />
      </div>
    </div>
  );
};

export default App;
