import { Link } from "react-router-dom";
import './HomePage.css';

import list from '../../assets/list.png';
import search from '../../assets/search.png'

function HomePage() {
    return (
        <div className="App">
            <div className="header-container container-fluid">
                <div className="menu-header">
                    <Link to="/">
                        <img src={list} alt="list" width="30" height="30"/>
                    </Link>
                </div>
                <div className="search-header">
                    <form action="/" />
                        <input type="text" class="form-control" id="search" placeholder="Search" name="search"/>

                    <button type="submit" class="btn btn-default">
                    <img src={search} alt="search" width="22" height="22"/>
                    </button>
                </div>
                <div className="right-header"></div>
            </div>
            <div className="container-fluid main-content">
                <p>hello hello hello hello hello hello hello</p>

            </div>
        </div>
    );
}

export default HomePage;