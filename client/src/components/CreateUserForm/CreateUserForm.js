import React from "react"
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { createNewUser } from "../../api/UserService";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

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
    const [toastData, setToastData] = useState({
        title: "",
        message: "",
        variant: "",
        show: false,
    });

    const handleSubmit = async (event) => {

        event.preventDefault();

        await createNewUser(userData).then((result) => {
            if (result.status === 202) {
                setToastData({
                    title: "Success",
                    message: "User created successfully!",
                    variant: "success",
                    show: true
                })
                clearForm();
            } 
            else if(result.status === 409){
                setToastData({
                    title: "Error 409",
                    message: "User ID already in use.",
                    variant: "danger",
                    show: true
                })
            } else if(result.status === 410){
                 setToastData({
                    title: "Error 410",
                    message: "Username already in use.",
                    variant: "danger",
                    show: true
                })
            } else if(result.status === 411){
                setToastData({
                   title: "Error 411",
                   message: "No password entered",
                   variant: "danger",
                   show: true
               })
            
            
            } else if(result.status === 412){
                setToastData({
                   title: "Error 412",
                   message: "No Username entered",
                   variant: "danger",
                   show: true
               })
            
            } else {
                setToastData({
                    title: "Error",
                    message: "There was an error creating this user!",
                    variant: "danger",
                    show: true
                })
            }
        });
    };

    function clearForm() {

        setUserData({
            user_id: "",
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            permissions: -1,
            advanced: 0
        })

    }

    return (
        <div>
            <h2>Creating a User</h2>

            <ToastContainer position="bottom-center" className="p-5 m-5">
                <Toast bg={toastData.variant} onClose={() => setToastData({ ...toastData, show: false })} show={toastData.show} delay={4000}>
                    <Toast.Header>
                        <strong className="me-auto">{toastData.title}</strong>
                    </Toast.Header>
                    <Toast.Body className={"text-bg-" + toastData.variant}>{toastData.message}</Toast.Body>
                </Toast>
            </ToastContainer>

            <Form className="p-5 mb-5" onSubmit={handleSubmit}>
                <Row className="mb-1">
                    <Form.Group as={Col} xs={4}>

                        <Form.Label>User ID</Form.Label>
                        <Form.Control required type="number" id="user_id"  min="1" value={userData.user_id} onChange={(event) => setUserData({ ...userData, user_id: parseInt(event.target.value) })} />

                    </Form.Group>
                    <Form.Group as={Col} xs={4}>

                        <Form.Label>First Name</Form.Label>
                        <Form.Control required type="text" id="first_name" value={userData.first_name} onChange={(event) => setUserData({ ...userData, first_name: event.target.value })} />

                    </Form.Group>
                    <Form.Group as={Col} xs={4}>

                        <Form.Label>Last Name</Form.Label>
                        <Form.Control required type="text" id="last_name" value={userData.last_name} onChange={(event) => setUserData({ ...userData, last_name: event.target.value })} />

                    </Form.Group>
                </Row>
                <Row className="mb-1">
                    <Form.Group as={Col} xs={6}>

                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" id="username" value={userData.username} onChange={(event) => setUserData({ ...userData, username: event.target.value })} />

                    </Form.Group>
                    <Form.Group as={Col} xs={6}>

                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" id="password" value={userData.password} onChange={(event) => setUserData({ ...userData, password: event.target.value })} />

                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} xs={6}>

                        <Form.Label>Permission Level</Form.Label>
                        <Form.Select id="permissionsSelect" value={userData.permissions} onChange={(event) => setUserData({ ...userData, permissions: event.target.value })}>
                            <option value="-1">Guest</option>
                            <option value="0">Student</option>
                            <option value="1">Operator</option>
                            <option value="2">Owner</option>
                        </Form.Select>

                    </Form.Group>
                    <Form.Group as={Col} xs={6}>

                        <Form.Label>Advanced</Form.Label>
                        <Form.Check type="switch" id="advancedSwitch" checked={userData.advanced} onChange={(event) => setUserData({ ...userData, advanced: (!userData.advanced ? 1 : 0) })} />

                    </Form.Group>
                </Row>
                <Row>
                    <Col className="w-100 mb-2">
                        <Button variant="primary" size="md" type="submit" className="w-100">Submit</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="w-100">
                        <Button variant="danger" size="md" type="button" className="w-100" onClick={clearForm}>Clear</Button>
                    </Col>
                </Row>
            </Form>
        </div >
    );
}

export default CreateUserForm;