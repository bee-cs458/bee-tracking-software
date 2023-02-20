import React, { useEffect, useState } from "react";
import "./CheckOutPage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ConditionalAlert from "../../components/CheckInUtilities/ConditionalAlert";
import Modal from "react-bootstrap/Modal";
import { doCheckout, makeAssetCheckedOut } from "../../api/CheckoutService";
import { getAssetByAssetTag } from "../../api/AssetService";
import CheckOutTable from "../../components/CheckOutUtilities/CheckOutTable";
import { getUserById } from "../../api/UserService";

function CheckOutPage() {

    const [show, setShow] = useState(false);
    const [studentId, setStudentId] = useState("");
    const [assetTag, setAssetTag] = useState("");
    const [currErrMsg, setErrMsg] = useState("");
    const [opId, setOpId] = useState(localStorage.getItem("userId"));
    const [disabledButton, setDisabledButton] = useState(false);
    const [alertType, setAlertType] = useState(null);
    const [alertMessage, setAlertMessage] = useState(null);
    const [currentAssetList, setCurrentAssetList] = useState([]);
    //setOpId(localStorage.getItem("userId"));

    const removeAsset = (asset_tag) => {
        if(asset_tag){
            let tempList = currentAssetList.slice(); //creates a temp list that isn't a state
            //let index = 0; // for the index of the asset
            currentAssetList.forEach((asset) => {// go through every element in the list
                if(asset.asset_tag === asset_tag) //check if the current asset is the passes in asset
                    tempList.shift(); //removes the first element in the list which is the asset with the tag that was passed in
                else
                    tempList.push(tempList.shift()); //shifts the list so that the first element is now at the back
            })
            setCurrentAssetList(tempList); //set the state to the temp list that has the change
        }
    }

    const handleClose = () => { //clear asset list
        setAlertType(null);
        setCurrentAssetList([]); //makes asset list empty
        setShow(false); //hides modal
    }
    const handleShow = () => setShow(true); //shows modal

    const handleAssetAddBtn = async () => {
        setAlertType(null);
        if (typeof assetTag === "string" && assetTag.trim() === "") { //checks if asset field is blank
            setAlertMessage("You must specify an asset ID!");
            setAlertType(1);
            return;
        }
        if (currentAssetList.some((asset) => asset.asset_tag === assetTag)) { //checks if asset is already in list
            setAlertMessage("Asset is already in the list!")
            setAlertType(1);
            return;
        }
        const asset = (await getAssetByAssetTag(assetTag))[0]; //checks if asset tag is in database
        if (!asset) {
            setAlertMessage(`Unable to retrieve asset '${assetTag}' (did you type the ID wrong?)`); 
            setAlertType(1);
            return;
        }
        if (asset.checked_out) { //checks if asset is already checked out
            setAlertMessage("That asset is already checked out!");
            setAlertType(0);
            return;
        }
        setCurrentAssetList(prev => prev.concat(asset)); //sets the current asset list with the new asset
    }

    const handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        handleAssetAddBtn();
      }
    };

    const handleCheckoutBtn = async () => {
        if(studentId === "" ){  //checks for the two 
            setAlertMessage('Please enter the student ID of the user checking out the asset(s)'); 
            setAlertType(1);
            return;
        }       
        const user = (await getUserById(studentId))[0];
        if(!user){
            setAlertMessage(`The student with ID '${studentId}' does not exist in the DB!`);
            setAlertType(1);
            return;
        }
        console.log(localStorage.getItem("userPerms"))
        if(localStorage.getItem("userPerms") <= 0){
            setAlertMessage(`The student with ID '${studentId}' does not have the permissions to checkout assets`);
            setAlertType(0);
            return;
        }
        if(user.strikes >= 3){
            setAlertMessage(`The student '${user.first_name} ${user.last_name}' has too many strikes!`);
            setAlertType(0);
            return;
        }
        if(!user.advanced){
            if(currentAssetList.some((asset) => asset.advanced)){
                setAlertMessage(`The student '${user.first_name} ${user.last_name}' is not allowed to check out advanced assets!`);
                setAlertType(0);
            }
            return;
        }
        
        setAlertType(null);
        setDisabledButton(true);
        currentAssetList.forEach((asset) =>{
            doCheckout(asset.asset_tag, studentId, opId).then( //passes assets, student id and operator id to the query
            (result) => {
                makeAssetCheckedOut(asset.asset_tag);
                handleShow(); //shows the confirmation modal
            }
        ).catch((error) => setErrMsg(error.message)) //displays error message in the modal*/
        });
        /*
        }
        await doCheckout(currentAssetList.map((asset) => asset.asset_tag), studentId, opId).then( //passes assets, student id and operator id to the query
            (result) => {
                handleShow(); //shows the confirmation modal                old things
            }
        ).catch((error) => setErrMsg(error.message)) //displays error message in the modal*/
        setDisabledButton(false);
    }

    
    useEffect(() => {}, [currentAssetList]); //rerenders page on change to asset list

    return (
        <div>
            <div className="header-container"></div>
            <div className="main-content-checkout">
                <h1 className="mb-3">Check Out Equipment</h1>
                <Form>
                <Row className="m-3">
                <ConditionalAlert  //alert bar for error messages
                    type={alertType}
                    message={alertMessage}
                ></ConditionalAlert>
                </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="assetTag">
                            <Form.Label>Asset Tag</Form.Label>
                            <Form.Control className="search" type="search" placeholder="Enter Asset Tag Number" onKeyDown={handleKeypress} onChange={(e) => {setAssetTag(e.target.value); setAlertType(null)}} />
                            <Button id="addAsset" disabled={disabledButton} onClick={handleAssetAddBtn}>Add</Button>
                            {/* Should search for the matching asset and submit it to the table (check out queue) */}
                        </Form.Group>

                        <Form.Group as={Col} controlId="studentId">
                            <Form.Label>Student ID Number</Form.Label>
                            <Form.Control className="search" type="search" disabled={disabledButton} placeholder="Enter Student ID Number" onChange={(e) => {setStudentId(e.target.value); setAlertType(null) }} />
                        </Form.Group>
                    </Row>

                    {/* Check out queue */}
                    <CheckOutTable assets={currentAssetList} removeAsset={removeAsset} receipt={false} disabledButton={disabledButton}></CheckOutTable>
                    

                    <Button className="clearAll" type="reset" disabled={disabledButton} onClick={handleClose}>Clear All</Button>
                    <Button className="checkOut" variant="primary" disabled={disabledButton} onClick={handleCheckoutBtn}>Check Out</Button>
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
                        <CheckOutTable receipt={true} assets={currentAssetList}></CheckOutTable>
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
