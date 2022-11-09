import { useState } from 'react';
import "./PageTemplate.css";

import list from "../../assets/list.png";
import search from "../../assets/search.png";
import signIn from '../../assets/signIn.png';

function PageTemplate() {
    const [inputVal, setInputVal] = useState(null);

    //Handling user input when user hits 'Enter'
    function handleKeyPress(e) {
      if (e.key === "Enter") {
        console.log("Key press is entered");
        getInputValue();
      }
    }
  
    function getInputValue() {
      // Selecting the input element and get its value
      const newInputVal = document.getElementById("search").value;
      console.log("Input Value: " + newInputVal);
      setInputVal(newInputVal);
    }
    return (
        <div className="App">
            <div className="header-container container-fluid">

                <div className="menu-header">
                    {/* Not sure the purpose of this, it was on cheqroom, might end up being a dropdown menu instead of a button */}
                    <button type="menu" class="btn btn-default">
                        <img src={list} alt="list" width="30" height="30" />
                    </button>
                </div>

                <div className="search-header">
                    {/* form waiting to be linked */}
                    <form action="/" />
                    <input
                        type="text"
                        onKeyDown={handleKeyPress}
                        class="form-control"
                        id="search"
                        placeholder="Search"
                        name="search"
                    />
                    <button type="submit" onClick={getInputValue} class="btn btn-default">
                        <img src={search} alt="search" width="22" height="22" />
                    </button>
                    
                </div>

                <div className="right-header">
                    {/* Extra space next to search bar to fill header, also includes sign in button */}

                    <form action="/" />
                    <button type="signIn" class="btn btn-default">Sign In
                        <img src={signIn} alt="signIn" width="22" height="22" /></button>

                </div>
            </div>
 
        </div>
    );
}

export default PageTemplate;