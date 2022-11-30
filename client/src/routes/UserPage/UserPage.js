import React from "react";
import { useState } from "react";
import "./UserPage.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserTable from "./../../components/UserTable/UserTable";

function UserPage() {

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

    return (
        <>
            <div className="header-container"/>
            <div className="main-content">
                <h1 className="mb-3">Users</h1>
                <Form>
                    <Row className="mb-3">
                        {/* Search for user by ID */}
                        <Form.Group as={Col} controlId="userId">
                            <Form.Control className="userId" onKeyDown={handleKeyPress} type="search" placeholder="Enter User ID Number" name="search"  />
                        </Form.Group>
                        <Form.Group as={Col} controlId="userSearch">
                            <Button id="userSearch" onClick={getInputValue}>Search</Button>
                        </Form.Group>
                    </Row>
                    <br />
                    <Row className="mb-3">
                        {/* Buttons for editing Operators */}
                        <Form.Group as={Col} controlId="userActions">
                            <Form.Label className="actions">Operator Actions</Form.Label>
                            <Button className="user-actions" id="demoteOperator" >Demote Operator</Button>
                            <Button className="user-actions" id="editOperator" >Edit Operator</Button>
                            
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        {/* Buttons for editing Students */}
                        <Form.Group as={Col} controlId="userActions">
                            <Form.Label className="actions">Student Actions</Form.Label>
                            <Button className="user-actions" id="promoteStudent" >Promote Student</Button>
                            <Button className="user-actions" id="editStudent" >Edit Student</Button>
                            <Button className="user-actions" id="addStudent">Add Student</Button>
                        </Form.Group>
                    </Row>
                    {/* <Button className="mb-3 clear" id="clearSelected" >Clear Selected</Button> */}

                </Form>
                {/* Display information of users */}
                <UserTable input={inputVal}></UserTable>

            </div>
        </>
    );
}

export default UserPage;