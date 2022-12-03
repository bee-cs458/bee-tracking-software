import React from "react"
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";

function CreateUserForm() {


    const [userData, setUserData] = useState({

        user_id: "",
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        permissions: -1,
        advanced: 0

    });

    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(userData);

    };

    return (
        <div>
            <h2>Creating a User</h2>

            <Form className="p-5 mb-5" onSubmit={handleSubmit}>
                <Row className="mb-1">
                    <Form.Group as={Col} xs={4}>

                        <Form.Label>User ID</Form.Label>
                        <Form.Control type="text" id="user_id" onChange={(event) => setUserData({ ...userData, user_id: event.target.value })} />

                    </Form.Group>
                    <Form.Group as={Col} xs={4}>

                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" id="first_name" onChange={(event) => setUserData({ ...userData, first_name: event.target.value })} />

                    </Form.Group>
                    <Form.Group as={Col} xs={4}>

                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" id="last_name" onChange={(event) => setUserData({ ...userData, last_name: event.target.value })} />

                    </Form.Group>
                </Row>
                <Row className="mb-1">
                    <Form.Group as={Col} xs={6}>

                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" id="username" onChange={(event) => setUserData({ ...userData, username: event.target.value })} />

                    </Form.Group>
                    <Form.Group as={Col} xs={6}>

                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" id="password" onChange={(event) => setUserData({ ...userData, password: event.target.value })} />

                    </Form.Group>
                </Row>
                <Row className="mb-2">
                    <Form.Group as={Col} xs={6}>

                        <Form.Label>Permission Level</Form.Label>
                        <Form.Select id="permissionsSelect" defaultValue="-1" onChange={(event) => setUserData({ ...userData, permissions: event.target.value })}>
                            <option value="-1">Guest</option>
                            <option value="0">Student</option>
                            <option value="1">Operator</option>
                            <option value="2">Owner</option>
                        </Form.Select>

                    </Form.Group>
                    <Form.Group as={Col} xs={6}>

                        <Form.Label>Advanced</Form.Label>
                        <Form.Check type="switch" id="advancedSwitch" onChange={(event) => setUserData({ ...userData, advanced: (!userData.advanced ? 1 : 0) })} />

                    </Form.Group>
                </Row>
                <Row>
                    <Col className="w-100">
                        <Button variant="primary" size="md" type="submit" className="w-100">Submit</Button>
                    </Col>
                </Row>
            </Form>
        </div >
    );
}

export default CreateUserForm;