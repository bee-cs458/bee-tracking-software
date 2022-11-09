import { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import AssetTable from "../../components/AssetTable/AssetTable";
import CatDropdown from '../../components/CatDropdown/CatDropdown';

export default function HomePage() {
    const [currentCategory, updateCategory] = useState({
        catName: undefined,
        category_id: -1
    });

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
          {/* Not sure the purpose of this, it was on cheqroom, might end up 
                            being a dropdown menu instead of a button */}
          <Link to="/">
            <img src={list} alt="list" width="30" height="30" />
          </Link>
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
          {/* Just the category drop down */}
          <CatDropdown
            state={currentCategory}
            update={updateCategory}
          ></CatDropdown>
        </div>
        {/* Extra space next to search bar to fill header, also includes sign in button */}
        <div className="right-header">
          <form action="/" />
          <button type="signIn" class="btn btn-default">Sign In
            <img src={signIn} alt="signIn" width="22" height="22" /></button>

        </div>
      </div>
      <div className="container-fluid main-content">
        {/* Container for the main section of the page, can be edited to include more functions */}

        <AssetTable
          cat={currentCategory?.category_id}
          input={inputVal}
        ></AssetTable>
      </div>
    </div>
  );
}
