import { Link } from "react-router-dom";
import list from '../../assets/list.png';
import checkOut from '../../assets/checkout.png';
import checkIn from '../../assets/checkIn.png';
import operators from '../../assets/operators.png';
import logOut from '../../assets/logOut.png';
import './NavBar.css';


function NavBar() {
    return (
        <nav className="App-nav">
            <ul>
                <li>
                    <Link to="/">
                    <img src={list} alt="list" width="20" height="18"/>Assets
                    </Link>
                </li>
                <li>
                    <Link to="/">
                    <img src={checkOut} alt="check out" width="20" height="18"/>Check Out
                    </Link>
                </li>
                <li>
                    <Link to="/">
                    <img src={checkIn} alt="check in" width="20" height="18"/>Check In
                    </Link>
                </li>
                <li>
                    <Link to="/">
                    <img src={operators} alt="operators" width="20" height="18"/>Operators
                    </Link>
                </li>
                <li>
                    <Link to="/">
                    <img src={logOut} alt="log out" width="20" height="18"/>Log Out
                    </Link>
                </li>

            </ul>
        </nav>
    );
}

export default NavBar;