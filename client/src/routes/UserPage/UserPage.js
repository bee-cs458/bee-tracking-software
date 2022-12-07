import React from "react";
import { useState } from "react";
import "./UserPage.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserTable from "./../../components/UserTable/UserTable";
import Accordion from 'react-bootstrap/Accordion';
import CreateUserForm from "../../components/CreateUserForm/CreateUserForm";

export default function UserPage() {

    const [inputVal, setInputVal] = useState(null);

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

    const handleSubmit = event => {
        event.preventDefault();
        console.log('Form submitted')
    };



    return (
        <>
            <div className="header-container" />
            <div className="main-content-user">
                <h1 className="mb-3">Users</h1>

                <Accordion className="mb-3 border">
                    <Accordion.Header>Add a User</Accordion.Header>
                    <Accordion.Body>
                        <CreateUserForm></CreateUserForm>
                    </Accordion.Body>

                </Accordion>

                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        {/* Search for user by ID */}
                        {/* console error: controlId="userId" ignored when id is specified  */}
                        <Form.Group as={Col} >
                            <Form.Control 
                            type="text" 
                            onKeyDown={handleKeyPress}
                            id="search"
                            placeholder="Search" 
                            name="search"
                            />
                        </Form.Group>
                        {/* console error: controlId="userId" ignored when id is specified  */}
                        <Form.Group as={Col} >
                            <Button
                            type = "submit" 
                            onClick={getInputValue}
                            >Search</Button>
                        </Form.Group>
                    </Row>
                </Form>
                {/* Display information of users */}
                <div className="container-fluid user-content">
                    <UserTable input={inputVal}> </UserTable>
                </div>

            </div>
        </>
    );
}