import React, { useEffect, useState } from "react";
import "./CheckOutPage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { doCheckout } from "../../api/CheckoutService";
import { getAssetByAssetTag } from "../../api/AssetService";
import CheckOutTable from "../../components/CheckOutUtilities/CheckOutTable";

function CheckOutPage() {

    const [show, setShow] = useState(false);
    const [studentId, setStudentId] = useState("");
    const [assetTag, setAssetTag] = useState("");
    const [currErrMsg, setErrMsg] = useState("");

    const [currentAssetList, setCurrentAssetList] = useState([]);
    const handleClose = () => {
        setCurrentAssetList([]);
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const handleAssetAddBtn = async () => {
        if (currentAssetList.some((asset) => asset.asset_tag === assetTag)) {
            console.error("asset already in the list");
            return;
        }
        const asset = (await getAssetByAssetTag(assetTag))[0];
        if (!asset) {
            console.error("asset didn't exist or some other error");
            return;
        }
        if (asset.checked_out) {
            console.error("asset already checked out");
            return;
        }
        setCurrentAssetList(prev => prev.concat(asset));
    }

    const handleCheckoutBtn = async () => {
        await doCheckout(currentAssetList.map((asset) => asset.asset_tag), studentId).then(
            (result) => {
                handleShow();
            }
        ).catch((error) => setErrMsg(error.message))
    }

    useEffect(() => {}, [currentAssetList]);

    return (
        <div>
            <div className="header-container"></div>
            <div className="main-content">
                <h1 className="mb-3">Check Out Equipment</h1>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="assetTag">
                            <Form.Label>Asset Tag</Form.Label>
                            <Form.Control className="search" type="search" placeholder="Enter Asset Tag Number" onChange={(e) => setAssetTag(e.target.value)} />
                            <Button id="addAsset" onClick={handleAssetAddBtn}>Add</Button>
                            {/* Should search for the matching asset and submit it to the table (check out queue) */}
                        </Form.Group>

                        <Form.Group as={Col} controlId="studentId">
                            <Form.Label>Student ID Number</Form.Label>
                            <Form.Control className="search" type="search" placeholder="Enter Student ID Number" onChange={(e) => setStudentId(e.target.value)} />
                        </Form.Group>
                    </Row>

                    {/* Check out queue */}
                    <CheckOutTable assets={currentAssetList}></CheckOutTable>
                    

                    <Button className="clearAll" type="reset" onClick={handleClose}>Clear All</Button>
                    <Button className="checkOut" variant="primary" onClick={handleCheckoutBtn}>Check Out</Button>
                    {/* Should submit the check out information to the database while also opening the confirmation modal */}
                </Form>
                <Modal 
                    show={currErrMsg !== ""}
                    onHide = {() => setErrMsg("")}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Unable to complete checkout:</p>
                        <p className="text-danger text-monospace">{currErrMsg}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setErrMsg("")}>Close</Button>
                    </Modal.Footer>
                </Modal>

                <Modal 
                    show={show} 
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Check Out Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Successfully checked out items
                        {/* print checkout info */}
                        <CheckOutTable assets={currentAssetList}></CheckOutTable>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={window.print}>Print Check Out Record</Button>
                    </Modal.Footer>
                </Modal>


            </div>

        </div>

    );
}

export default CheckOutPage;
