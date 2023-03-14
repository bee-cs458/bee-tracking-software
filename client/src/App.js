import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { GlobalStateProvider } from "./components/Context/UserContext";

const App = () => {

  //const [user, setUser] = useContext(UserContext);

  
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
    <GlobalStateProvider>
      <NavBar switchTheme={toggleTheme} mode={theme} />
      <div className={"App " + theme}>
        <Outlet context={[theme, setTheme]} />
      </div>
    </GlobalStateProvider>
  );
};

export default App;
