import React from "react";
import UsersTable from "../../components/UserTable/UserTable";
import "./UserPage.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserTable from "./../../components/UserTable/UserTable"

function UserPage() {


    return (
        <>
            <div className="header-container"/>
            <div className="main-content">
                <h1 className="mb-3">Users</h1>
                <Form>
                    <Row className="mb-3">
                        {/* Search for user by ID */}
                        <Form.Group as={Col} controlId="userId">
                            <Form.Control className="userId" type="search" placeholder="Enter User ID Number"  />
                        </Form.Group>
                        <Form.Group as={Col} controlId="userSearch">
                            <Button id="userSearch">Search</Button>
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
                <UsersTable />

            </div>
        </>
    );
}

export default UserPage;