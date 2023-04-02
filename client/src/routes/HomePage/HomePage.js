import React, { useState } from "react";
import "./HomePage.css";
import search from "../../assets/search.png";
import AssetTable from "../../components/AssetTable/AssetTable";
import CatDropdown from "../../components/CatDropdown/CatDropdown";
import CheckedOut from "../../components/CheckedOutTable/CheckedOutSwitch/CheckedOutSwitch";
import AddAsset from "../../components/AddAsset/AddAsset";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Container, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import getCategories from "../../api/CategoryService";
import { AccessControl } from "../../components/AccessControl/AccessControl";
import { Ranks } from "../../constants/PermissionRanks";
import AssetAsyncCSV from "../../components/ExportCSV/ExportAssetCSV";
import { AccountLink } from "../../components/AccountLink/AccountLink";

export default function HomePage(props) {
  const [categories, updateCategories] = useState([]);
  const [currentCategory, updateCategory] = useState({
    catName: undefined,
    category_id: -1,
  });
  const [selectList, setSelectList] = useState([]);
  //Displaying Add Asset
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inputVal, setInputVal] = useState("");

  //Store Categories
  const [cats, setCats] = useState([]);

  const theme = useOutletContext();

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

  // Create a function that will be called when the user clicks the search button
  function getInputValue() {
    // Get the value of the user's input from the input field
    const newInputVal = document.getElementById("search").value;
    // Update the inputVal state variable with the new value
    setInputVal(newInputVal);
  }

  function clearSelection() {
    sessionStorage.clear();
    setSelectList([]);
  }

  const [checked, setChecked] = useState(false);

  return (
    <div className="App">
      <Container fluid className={"header-container"}>
        <Row>
          <Col xs={10} className={"search-header"}>
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
          </Col>
          <Col
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "19.4em",
            }}
          >
            <AccountLink />
          </Col>
        </Row>
      </Container>

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
              <AccessControl allowedRank={Ranks.OWNER}>
                <Button className="beets_buttons" onClick={handleShow}>
                  Add Asset
                </Button>
              </AccessControl>
            </div>

            <div className="col">
              <AssetAsyncCSV></AssetAsyncCSV>
            </div>

            <div className="col"></div>
            <div className="col"></div>
            <div className="col">
              <AccessControl allowedRank={Ranks.OPERATOR}>
                <Button className="beets_buttons" onClick={clearSelection}>
                  Clear Selection
                </Button>
              </AccessControl>
            </div>
          </div>
        </div>

        <div className="asset-table">
          <AssetTable
            filterByCheckedOut={checked}
            cat={currentCategory?.category_id}
            categoryList={categories}
            input={inputVal}
            variant={theme}
            selectList={selectList}
            setSelectList={setSelectList}
          ></AssetTable>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <AccessControl
              allowedRank={Ranks.OWNER}
              renderNoAccess={() => {
                return "Invalid Permissions";
              }}
            >
              Add Asset
            </AccessControl>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AccessControl
            allowedRank={Ranks.OWNER}
            renderNoAccess={() => {
              return "Only Owner can Add Assets";
            }}
          >
            <AddAsset cats={cats} onSubmit={handleClose} />
          </AccessControl>
        </Modal.Body>
      </Modal>
    </div>
  );
}
