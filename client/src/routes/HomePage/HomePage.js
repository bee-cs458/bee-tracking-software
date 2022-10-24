import './HomePage.css';

import list from '../../assets/list.png';
import search from '../../assets/search.png';
import signIn from '../../assets/signIn.png';

function HomePage() {
    return (
        <div className="App">
            <div className="header-container">
                <div className="menu-header">
                    {/* Not sure the purpose of this, it was on cheqroom, might end up 
                            being a dropdown menu instead of a button */}
                    <button type="menu" class="btn btn-default">
                        <img src={list} alt="list" width="30" height="30"/>
                    </button>
                </div>
                <div className="search-header">
                    {/* form waiting to be linked */}
                    <form action="/" />
                        <input type="text" class="form-control" id="search" placeholder="Search" name="search"/>
                        <button type="submit" class="btn btn-default">
                        <img src={search} alt="search" width="22" height="22"/>
                    </button>
                </div>
                {/* Extra space next to search bar to fill header, intended to stay empty */}
                <div className="right-header">
                    <form action="/" />
                        <button type="signIn" class="btn btn-default">Sign In
                        <img src={signIn} alt="signIn" width="22" height="22"/></button>
                        
                </div>    
            </div>
            <div className="main-content">
                {/* Container for the main section of the page, can be edited to include more functions */}

            </div>
        </div>
    );
}

export default HomePage;