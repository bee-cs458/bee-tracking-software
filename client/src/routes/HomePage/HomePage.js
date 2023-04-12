import React, { useState } from "react";
import "./HomePage.css";
import search from "../../assets/search.png";
import AssetTable from "../../components/AssetTable/AssetTable";
import CatDropdown from "../../components/CatDropdown/CatDropdown";
import CheckedOut from "../../components/CheckedOutTable/CheckedOutSwitch/CheckedOutSwitch";
import AddAsset from "../../components/AddAsset/AddAsset";
import {
  Container,
  Col,
  Row,
  OverlayTrigger,
  Tooltip,
  Button,
  Modal,
} from "react-bootstrap";
import { useEffect } from "react";
import getCategories from "../../api/CategoryService";
import { AccessControl } from "../../components/AccessControl/AccessControl";
import { Ranks } from "../../constants/PermissionRanks";
import AssetAsyncCSV from "../../components/ExportCSV/ExportAssetCSV";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faStoreSlash } from "@fortawesome/free-solid-svg-icons";

export default function HomePage(props) {
  const [categories, updateCategories] = useState([]);
  const [updated, setUpdated] = useState(false);

  const [currentCategory, updateCategory] = useState({
    catName: undefined,
    category_id: -1,
  });

  const [selectList, setSelectList] = useState([]);

  //Displaying Add Asset
  const [show, setShow] = useState(false);

  // When the user clicks the close button, the modal will close
  // and the current category will be set to -1, thus
  // re-rendering the table
  const handleClose = () => {
    setUpdated(!updated);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const [inputVal, setInputVal] = useState("");

  //Store Categories
  const [cats, setCats] = useState([]);

  useEffect(() => {
    getCategories()
      .then((value) => {
        setCats(value);
        return value;
      })
      .catch((err) => console.log(err));
  }, [show]);

  // Changes the search result on every key press, so as to live update the search results
  function handleKeyPress(e) {
    getInputValue();
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
  const [byCart, setByCart] = useState(false);

  function handleByCart() {
    setByCart(!byCart);
  }

  function tooltip(text) {
    return (
      <Tooltip id="tooltip" style={{ position: "fixed" }}>
        {text}
      </Tooltip>
    );
  }

  return (
    <div className="App">
      <div className=" main-content">
        <Container fluid>
          <Row>
            <Col>
              <CatDropdown
                state={currentCategory}
                update={updateCategory}
                categories={categories}
                updateCategories={updateCategories}
              ></CatDropdown>
              <CheckedOut state={checked} update={setChecked}></CheckedOut>
              <AccessControl allowedRank={Ranks.OPERATOR}>
                <input type="checkbox" id="showcart" onClick={handleByCart} />
                <label htmlFor="showcart"> Only Show Assets in Cart</label>
              </AccessControl>
            </Col>
          </Row>
          <Row>
            <Col xs={8} className="search-header mb-2">
              <input
                type="text"
                onKeyDown={handleKeyPress}
                className="form-control"
                id="search"
                placeholder="Search Assets"
                name="search"
              />
              <button
                type="submit"
                onClick={getInputValue}
                className="beets_button"
              >
                <img src={search} alt="search" width="22" height="22" />
              </button>
            </Col>
            <Col xs={4}>
              <AccessControl allowedRank={Ranks.OWNER}>
                <OverlayTrigger placement="top" overlay={tooltip("Add Asset")}>
                  <Button className="beets_buttons" onClick={handleShow}>
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      style={{ color: "#ffffff" }}
                      size="lg"
                    />
                  </Button>
                </OverlayTrigger>
              </AccessControl>

              <OverlayTrigger
                placement="top"
                overlay={tooltip("Export Asset CSV")}
              >
                <AccessControl allowedRank={Ranks.OPERATOR}>
                  <AssetAsyncCSV></AssetAsyncCSV>
                </AccessControl>
              </OverlayTrigger>

              <AccessControl allowedRank={Ranks.OPERATOR}>
                <OverlayTrigger placement="top" overlay={tooltip("Clear Cart")}>
                  <Button className="beets_buttons" onClick={clearSelection}>
                    <FontAwesomeIcon
                      icon={faStoreSlash}
                      size="lg"
                      style={{ color: "#ffffff" }}
                    />
                  </Button>
                </OverlayTrigger>
              </AccessControl>
            </Col>
          </Row>
        </Container>

        <div className="asset-table">
          <AssetTable
            filterByCheckedOut={checked}
            filterByCart={byCart}
            cat={currentCategory?.category_id}
            categoryList={categories}
            input={inputVal}
            selectList={selectList}
            setSelectList={setSelectList}
            updated={updated}
            setUpdated={setUpdated}
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
            <AddAsset categories={categories} onSubmit={handleClose} />
          </AccessControl>
        </Modal.Body>
      </Modal>
    </div>
  );
}
