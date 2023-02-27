import { useState } from "react";
import "./HomePage.css";
import search from "../../assets/search.png";
import AssetTable from "../../components/AssetTable/AssetTable";
import CatDropdown from "../../components/CatDropdown/CatDropdown";
import CheckedOut from '../../components/CheckedOutTable/CheckedOutSwitch/CheckedOutSwitch';

export default function HomePage() {
    const [categories, updateCategories] = useState([]);
    const [currentCategory, updateCategory] = useState({
        catName: undefined,
        category_id: -1
    })

    const [inputVal, setInputVal] = useState(null);
    /*const removeAsset = (asset_tag) => {
        if(asset_tag){
            let tempList = currentAssetList.slice(); //creates a temp list that isn't a state
            //let index = 0; // for the index of the asset
            currentAssetList.forEach((asset) => {// go through every element in the list
                if(asset.asset_tag === asset_tag) //check if the current asset is the passes in asset
                    tempList.shift(); //removes the first element in the list which is the asset with the tag that was passed in
                else
                    tempList.push(tempList.shift()); //shifts the list so that the first element is now at the back
            })
            setCurrentAssetList(tempList); //set the state to the temp list that has the change
        }
    } */
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
    const [selectList, setSelectList] = useState([]); //list of selected assets, for passing to Check Out
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

            <div className=" main-content">
                <div className="category">
                    <CatDropdown state={currentCategory} update={updateCategory} categories={categories} updateCategories={updateCategories} ></CatDropdown>
                </div>
                <CheckedOut state={checked} update={setChecked}></CheckedOut>
                <div className="asset-table">
                    <AssetTable filterByCheckedOut={checked} cat={currentCategory?.category_id} categoryList={categories} input={inputVal} selectedList={selectList} setSelectedList={setSelectList}></AssetTable>
                </div>

            </div>

        </div>

    );
}
