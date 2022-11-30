import React from "react";
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
                        <Form.Group as={Col} controlId="userId">
                            {/* Search for user by ID */}
                            <Form.Label>User ID</Form.Label>
                            <Form.Control className="userId" type="search" placeholder="Enter User ID Number"  />
                        </Form.Group>
                        <Form.Group as={Col} controlId="userSearch">
                            <Button className="user-search" id="userSearch">Search</Button>
                        </Form.Group>
                    </Row>
                    <br />
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="userActions">
                            <Form.Label>Operator Actions</Form.Label>
                            <Button className="user-actions" id="demoteOperator" >Demote Operator</Button>
                            <Button className="user-actions" id="editOperator" >Edit Operator</Button>
                            
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="userActions">
                        <Form.Label>Student Actions</Form.Label>
                            <Button className="user-actions" id="promoteStudent" >Promote Student</Button>
                            <Button className="user-actions" id="editStudent" >Edit Student</Button>
                            <Button className="user-actions" id="addStudent">Add Student</Button>
                            
                        </Form.Group>
                    </Row>
                </Form>
                <UserTable />
                <Button className="save-changes" id="saveChanges" >Save Changes</Button>

            </div>
        </>
    );
}

export default UserPage;