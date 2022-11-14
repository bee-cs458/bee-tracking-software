import React, { useState } from "react";
import "./CheckOutPage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

function CheckOutPage() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div className="header-container"></div>
            <div className="main-content">
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="assetTag">
                            <Form.Label>Asset Tag</Form.Label>
                            <Form.Control className="search" type="search" placeholder="Enter Asset Tag Number" />
                            <Button id="addAsset">Add</Button>
                        </Form.Group>

                        <Form.Group as={Col} controlID="studentId">
                            <Form.Label>Student ID Number</Form.Label>
                            <Form.Control className="search" type="search" placeholder="Enter Student ID Number" />
                            <Button id="submitStudent">Submit</Button>
                        </Form.Group>
                    </Row>

                    <Table responsive>
                        <caption>Selected Assets</caption>
                        <thead>
                            <tr>
                                <th>Tag</th>
                                <th>Name</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Figure out how to display each asset here as they are added */}

                        </tbody>
                    </Table>

                    <Button className="clearAll" type="reset">Clear All</Button>
                    <Button className="checkOut" variant="primary" onClick={handleShow}>Check Out</Button>
                </Form>
                <Modal 
                    show={show} 
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Check Out Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Successfully checked out items to: (Student Name) by: (Operator)
                        <Table responsive>
                            <caption>Selected Assets</caption>
                            <thead>
                                <tr>
                                    <th>Quantity</th>
                                    <th>Tag</th>
                                    <th>Name</th>
                                    <th>Due Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Figure out how to display each asset here as they are added */}

                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={handleClose}>Print Check Out Record</Button>
                    </Modal.Footer>
                </Modal>

            </div>

        </div>

    );
}

export default CheckOutPage;
