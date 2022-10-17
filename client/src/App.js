import { Outlet } from "react-router";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App;
