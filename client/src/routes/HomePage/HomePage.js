import { useState } from "react";
import "./HomePage.css";
import PageTemplate from "../../components/PageTemplate/PageTemplate";
import AssetTable from "../../components/AssetTable/AssetTable";
import CatDropdown from "../../components/CatDropdown/CatDropdown";

export default function HomePage() {
    const [currentCategory, updateCategory] = useState({
        catName: undefined,
        category_id: -1
    })
    const [inputValue, getInputValue] = useState({
        inputVal: null
    });

    return (
        <div className="App">
            <PageTemplate></PageTemplate>
            <div className="container-fluid main-content">
                <div className="category">
                    <CatDropdown state={currentCategory} update={updateCategory} ></CatDropdown>
                </div>
                <AssetTable cat={currentCategory?.category_id} input={inputValue.inputVal}></AssetTable> 
            </div> 
    
        </div>
    );
}
