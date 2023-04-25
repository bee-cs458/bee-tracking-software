import RecordTable from "../../components/RecordsUtils/RecordTable.js";
import CheckedOut from "../../components/CheckedOutTable/CheckedOutSwitch/CheckedOutRecords.js";
import "./RecordsPage.css";
import React, { useState } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CheckoutRecordCSV from "../../components/ExportCSV/ExportRecordsCSV.js";
import { AccessControl } from "../../components/AccessControl/AccessControl.js";
import { Ranks } from "../../constants/PermissionRanks.js"; 
export default function RecordsPage() {
  const [checked, setChecked] = useState(false);
  const [selectList, setSelectList] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");

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
  function handleStartDate(date) {
    setstartDate(date);
  }

  /**
   *Sets selected Date 2 as endDate for search
   *
   * @param {*} date Date selected from end date
   */
  function handleEndDate(date) {
    setendDate(date);
  }

  function handleByCheckedOut() {
    setChecked(!checked);
  }

  return (
    <div className="App">
      <div className="main-content">
        <Container fluid className={"mb-2"}>
          <Row className="align-items-center">
            <Col xs={8} className="search-header mb-2">
              <input
                type="text"
                onKeyDown={handleKeyPress}
                className="form-control"
                id="search"
                placeholder="Search Records"
                name="search"
              />
              <button
                type="submit"
                onClick={getInputValue}
                className="beets_buttons"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>
            </Col>
            <Col>
              <Form.Check
                onClick={handleByCheckedOut}
                label="Checked Out"
              ></Form.Check>
            </Col>
            <Col>
              <AccessControl allowedRank={Ranks.OWNER}>
                <CheckoutRecordCSV></CheckoutRecordCSV>
              </AccessControl>
            </Col>
          </Row>

          <Row>
            <Col>
              <label htmlFor="start">Start Date:</label>
              <input
                type="date"
                onChange={(e) => handleStartDate(e.target.value)}
                value={startDate}
                className="form-control"
              />
            </Col>
            <Col>
              <label htmlFor="end">End Date:</label>
              <input
                type="date"
                onChange={(e) => handleEndDate(e.target.value)}
                value={endDate}
                className="form-control"
              />
            </Col>
          </Row>
        </Container>
        <div className="record-table">
          <RecordTable
            filterByCheckedOut={checked}
            inputVal={inputVal}
            selectList={selectList}
            setSelectList={setSelectList}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
    </div>
  );
}
