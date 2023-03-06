import React, { useState } from "react";
import "./HomePage.css";
import search from "../../assets/search.png";
import AssetTable from "../../components/AssetTable/AssetTable";
import CatDropdown from "../../components/CatDropdown/CatDropdown";
import CheckedOut from "../../components/CheckedOutTable/CheckedOutSwitch/CheckedOutSwitch";
import AddAsset from "../../components/AddAsset/AddAsset";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import getCategories from "../../api/CategoryService";

import AssetAsyncCSV from "../../components/ExportCSV/ExportAssetCSV";

export default function HomePage(props) {
  const [categories, updateCategories] = useState([]);
  const [currentCategory, updateCategory] = useState({
    catName: undefined,
    category_id: -1,
  });
  //Displaying Add Asset
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputVal, setInputVal] = useState("");

  //Store Categories
  const [cats, setCats] = useState([]);

  const [theme, setTheme] = useOutletContext();

  useEffect(() => {
    getCategories()
      .then((value) => {
        setCats(value);
        return value;
      })
      .catch((err) => console.log(err));
  }, [show]);

  //Handling user input when user hits 'Enter'
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      //console.log("Key press is entered");
      getInputValue();
    }
  }

  function getInputValue() {
    // Selecting the input element and get its value
    const newInputVal = document.getElementById("search").value;
    //console.log("Input Value: " + newInputVal);
    setInputVal(newInputVal);
  }

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
          <button
            type="submit"
            onClick={getInputValue}
            className="btn btn-default"
          >
            <img src={search} alt="search" width="22" height="22" />
          </button>
        </div>
      </div>

      <div className=" main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <CatDropdown
                state={currentCategory}
                update={updateCategory}
                categories={categories}
                updateCategories={updateCategories}
              ></CatDropdown>
            </div>
            <div className="col">
              <CheckedOut state={checked} update={setChecked}></CheckedOut>
            </div>
            <div className="col">
              {localStorage.getItem("userPerms") === "2" ? (
                <Button onClick={handleShow}>Add Asset</Button>
              ) : (
                <></>
              )}
            </div>
            <div className="col">
              <AssetAsyncCSV></AssetAsyncCSV>
            </div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
        </div>

        <div className="asset-table">
          <AssetTable
            filterByCheckedOut={checked}
            cat={currentCategory?.category_id}
            categoryList={categories}
            input={inputVal}
            variant={theme}
          ></AssetTable>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {localStorage.getItem("userPerms") === "2" ? (
              <>Add Asset</>
            ) : (
              <>Invalid Permissions</>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {localStorage.getItem("userPerms") === "2" ? (
            <AddAsset cats={cats} onSubmit={handleClose} />
          ) : (
            <>Only Owner can Add Assets</>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}
