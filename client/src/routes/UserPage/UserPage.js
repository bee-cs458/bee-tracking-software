import React from "react";
import { useState } from "react";
import "./UserPage.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserTable from "./../../components/UserTable/UserTable";
import Accordion from "react-bootstrap/Accordion";
import CreateUserForm from "../../components/CreateUserForm/CreateUserForm";
import { AccountLink } from "../../components/AccountLink/AccountLink";
import { useOutletContext } from "react-router-dom";

import UserAsyncCSV from "../../components/ExportCSV/ExportUserCSV";

export default function UserPage() {
  const [inputVal, setInputVal] = useState(null);
  const [theme, setTheme] = useOutletContext();
  const [userTableChanged, setUserTableChanged] = useState(true); //use state for any changes made to the table
/*simply toggles the variable so that it changes. the actual value does not matter,
 just that it is changed when this function is called */
  function toggleTableChanged() {  
    setUserTableChanged(!userTableChanged);
  }

  //Handling user input when user hits 'Enter'
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      console.log("Key press is entered");
      getInputValue();
    }
    return false;
  }

  function getInputValue() {
    // Selecting the input element and get its value
    const newInputVal = document.getElementById("search").value;
    console.log("Input Value: " + newInputVal);
    setInputVal(newInputVal);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <>
      <div className="header-container">
        <div style={{ marginLeft: "70%" }}>
          <AccountLink />
        </div>
      </div>
      <div className="main-content-user">
        <h1 className="mb-3 users">Users</h1>

        <Accordion className="mb-3 border add-user">
          <Accordion.Header>Add a User</Accordion.Header>
          <Accordion.Body>
            <CreateUserForm
              toggleTableChanged={toggleTableChanged} //passes toggle function so table will be able to render upon adding user
            ></CreateUserForm>
          </Accordion.Body>
        </Accordion>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 search-user">
            {/* Search for user by ID */}
            {/* console error: controlId="userId" ignored when id is specified  */}
            <Form.Group as={Col}>
              <Form.Control
                type="text"
                onKeyDown={handleKeyPress}
                id="search"
                placeholder="Search"
                name="search"
              />
            </Form.Group>
            {/* console error: controlId="userId" ignored when id is specified  */}
            <Form.Group as={Col}>
              <Button
                className="beets_buttons"
                type="submit"
                onClick={getInputValue}
              >
                Search
              </Button>
            </Form.Group>
            <Form.Group as={Col}>
              <UserAsyncCSV />
            </Form.Group>
          </Row>
        </Form>

        {/* Display information of users */}
        <div className="container-fluid user-content">
          <UserTable
            input={inputVal}
            variant={theme}
            toggleTableChanged={toggleTableChanged} //passes toggle function so table will be able to render upon deleting user
            userTableChanged={userTableChanged} //pass the use state so the table will be able to render on any change made to it
          >
            {" "}
          </UserTable>
        </div>
      </div>
    </>
  );
}
