import RecordTable from "../../components/RecordsUtils/RecordTable.js";
import { AccountLink } from "../../components/AccountLink/AccountLink.js";
import CheckedOut from "../../components/CheckedOutTable/CheckedOutSwitch/CheckedOutRecords.js";
import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import search from "../../assets/search.png";
import { Button } from "react-bootstrap";
import CheckoutRecordCSV from "../../components/ExportCSV/ExportRecordsCSV.js";

export default function RecordsPage() {
  const [checked, setChecked] = useState(false);
  const [selectList, setSelectList] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);

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

  
  /**
   *Sets selected Date 1 as start Date for search
   *
   * @param {*} date Date selected from start date
   */
  function handleDateChange(date) {
    setSelectedDate1(date);
  }

  /**
   *Sets selected Date 2 as endDate for search
   *
   * @param {*} date Date selected from end date
   */
  function handleDateChange2(date) {
    setSelectedDate2(date);
  }

  
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

      <div className="main-content">
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
            <div className="col">
              <label for="start">Start Date:</label>
              <input
                type="date"
                onChange={(e) => handleDateChange(e.target.value)}
                value={selectedDate1}
              />
            </div>
            <div className="col">
              <label for="end">End Date:</label>
                <input
                  type="date"
                  onChange={(e) => handleDateChange2(e.target.value)}
                  value={selectedDate2}
                />
            </div>
            <div className="col"> 
             </div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
        <RecordTable
          filterByCheckedOut={checked}
          inputVal={inputVal}
          selectList={selectList}
          setSelectList={setSelectList}
          selectedDate1={selectedDate1}
          selectedDate2={selectedDate2}
        />
      </div>

    </div>
  );
}
