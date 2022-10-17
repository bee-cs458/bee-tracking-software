import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/counter">Counter</Link>
        </nav>
    );
}

export default NavBar;