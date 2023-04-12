import RecordTable from "../../components/RecordsUtils/RecordTable.js";
import { AccountLink } from "../../components/AccountLink/AccountLink.js";
import CheckedOut from "../../components/CheckedOutTable/CheckedOutSwitch/CheckedOutRecords.js";
import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import search from "../../assets/search.png";

import CheckoutRecordCSV from "../../components/ExportCSV/ExportRecordsCSV.js";

export default function RecordsPage() {
  const [checked, setChecked] = useState(false);
  const [selectList, setSelectList] = useState([]);
  const [inputVal, setInputVal] = useState("");

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
    // console.log("Input Value: " + newInputVal);
    setInputVal(newInputVal);
  }

  return (
    <div className="App">
      <div className="main-content">
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
          ></Col>
        </Row>
        <div className="row">
          <div className="col">
            <CheckedOut state={checked} update={setChecked} />
          </div>
          <div className="col">
            {localStorage.getItem("userPerms") === "2" ? (
              <CheckoutRecordCSV></CheckoutRecordCSV>
            ) : (
              <></>
            )}
          </div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
          <div className="col"></div>
        </div>
        <RecordTable
          filterByCheckedOut={checked}
          inputVal={inputVal}
          selectList={selectList}
          setSelectList={setSelectList}
        />
      </div>
    </div>
  );
}
