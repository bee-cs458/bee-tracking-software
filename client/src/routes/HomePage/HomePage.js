import { useState } from "react";
import "./HomePage.css";
import search from "../../assets/search.png";
import AssetTable from "../../components/AssetTable/AssetTable";
import CatDropdown from "../../components/CatDropdown/CatDropdown";
import CheckedOut from '../../components/CheckedOutTable/CheckedOutSwitch/CheckedOutSwitch';

export default function HomePage() {
    const [currentCategory, updateCategory] = useState({
        catName: undefined,
        category_id: -1
    })

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
    };

    const [checked, setChecked] = useState(false);

    return (
        <div className="App">
            <div className="header-container container-fluid">
                <div className="search-header">
                    <input
                        type="text"
                        onKeyDown={handleKeyPress}
                        className="form-control"
                        id="search"
                        placeholder="Search"
                        name="search"
                    />
                    <button type="submit" onClick={getInputValue} className="btn btn-default">
                        <img src={search} alt="search" width="22" height="22" />
                    </button>
                    
                </div>
            </div>

            <div className="container-fluid main-content">
                <div className="category">
                        <CatDropdown state={currentCategory} update={updateCategory} ></CatDropdown>
                </div>
                <CheckedOut state={checked} update={setChecked}></CheckedOut>
                <AssetTable filterByCheckedOut={checked} cat={currentCategory?.category_id} input={inputVal}></AssetTable>

            </div> 

        </div>

    );
}
