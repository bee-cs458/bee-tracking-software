// import PageTemplate from "../../components/PageTemplate/PageTemplate";
import { useEffect, useState } from "react";
import "./CheckInPage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ConditionalAlert from "../../components/CheckInUtilities/ConditionalAlert";
import { getSpecificAsset } from "../../api/AssetService";
import {
  getAssetsByUserID,
  incrementUserStrikes,
  getOverdue,
  checkInAssetWithNotes,
  getCheckoutRecordsByUserID,
  getCheckoutRecordsByTag,
} from "../../api/CheckInServices";
import CheckInTable from "../../components/CheckInUtilities/CheckInTable";

export default function CheckInPage() {
  const [assets, setAssets] = useState([]);
  const [currentTag, setEnteredTag] = useState(null);
  const [studentID, setEnteredID] = useState(null);
  const [notes, setNotes] = useState("No Notes");
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [strikes, setStrikes] = useState(0);
  const [selectedStudent, setStudent] = useState("TODO Enter Student Here");

  function handleIDChange(newValue) {
    setEnteredID(newValue);
    setAlertType(null);
    console.log("input value: " + studentID);
  }

  function handleTagChange(newValue) {
    setEnteredTag(newValue);
    setAlertType(null);
    console.log("Input Value: " + currentTag);
  }

  function clearAll() {
    setAssets([]);
    setNotes("");
    setAlertType(null);
    console.log("Pending Assets Cleared");
  }

  const handleTagPress = async (event) => {
    if (currentTag != null) {
      let currentList = [...assets];
      if (currentList.every((asset) => asset.asset_tag !== currentTag)) {
        await getCheckoutRecordsByTag(currentTag).then((result) => {
          const newAsset = result[0];
          if (newAsset) {
            currentList.push(newAsset);
            setAlertType(null);
            setAssets(currentList);
          } else {
            setAlertType(0);
            setAlertMessage("Asset is checked in");
          }
        });
      } else {
        console.log("Asset already in the list");
        setAlertType(0);
        setAlertMessage("Asset is Already Queued for Check In");
      }
      console.log(assets);
    }
  };

  const handleIDPress = async (event) => {
    if (studentID != null) {
      await getCheckoutRecordsByUserID(studentID).then((result) => {
        const newAssets = result;
        if (newAssets) {
          setAssets(newAssets);
          console.log(newAssets);
        } else {
          console.log("User did not exist!");
          setAlertType(0);
          setAlertMessage("User does not exist");
        }
      });
    }
  };

  const checkIn = async (asset) => {
    const today = new Date();
    await checkInAssetWithNotes(
      asset.record_id,
      notes,
      asset.operational,
      asset.damage_notes +
        "\n" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate() +
        "-" +
        today.getFullYear() +
        ": " +
        asset.notes
    );

    const overDue = await getOverdue(asset.record_id);

    if (overDue.overdue) {
      incrementUserStrikes(overDue.student_id);
      setStrikes(strikes + 1);
    }
  };

  const handleSubmit = async (event) => {
    console.log("started submission");
    if (assets.length < 1) {
      setAlertType(0);
      setAlertMessage("No Assets Selected");
    } else {
      setAlertType(null);
      setAlertMessage(null);

      assets.forEach((asset) => {
        checkIn(asset);
      });

      clearAll();

      if (strikes > 0) {
        setAlertType(1);
        setAlertMessage(
          "Late Asset Checked In\n" + strikes + " strikes added to student"
        );
      } else {
        setAlertType(3);
        setAlertMessage("Assets Successfully Checked In");
      }

      setStrikes(0);
    }

    // set date in on records
    // add note to records

    // add damage notes to assets
    // add damaged var to assets
    // if overdue, add strike to student
    // make assets available if not damaged
  };

  // re-render the assets table
  useEffect(() => {}, [assets, currentTag, studentID, alertMessage]);

  return (
    <div>
      <div className="main-content">
        <h1 className="m-3">Check In Equipment</h1>
        <Form>
          <Row className="m-3">
            <ConditionalAlert
              type={alertType}
              message={alertMessage}
            ></ConditionalAlert>
          </Row>
          <Row className="m-3">
            <Form.Group as={Col} controlId="assetTag">
              <Form.Label>Asset Tag</Form.Label>
              <Form.Control
                className="search"
                type="search"
                placeholder="Enter Asset Tag Number"
                onChange={(event) => {
                  handleTagChange(event.target.value);
                }}
              />
              <Button onClick={handleTagPress}>Add</Button>
            </Form.Group>

            <Form.Group as={Col} controlid="studentId">
              <Form.Label>Student ID Number</Form.Label>
              <Form.Control
                className="search"
                type="search"
                placeholder="Enter Student ID Number"
                onChange={(event) => {
                  handleIDChange(event.target.value);
                }}
              />
              <Button onClick={handleIDPress}>Submit</Button>
            </Form.Group>
          </Row>
          <Row className="m-3">
            <CheckInTable as={Row} assets={assets}></CheckInTable>

            <Form.Group as={Row}>
              <Form.Label>Check In Notes</Form.Label>
              <Form.Control
                as="textarea"
                row={3}
                onChange={(event) => {
                  setNotes(event.target.value);
                }}
              />
            </Form.Group>
          </Row>

          <div className="m-3">
            <Button className="clearAll" type="reset" onClick={clearAll}>
              Clear All
            </Button>
            <Button
              className="checkIn"
              variant="primary"
              onClick={handleSubmit}
            >
              Check In
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

// Checked out assets in the database:
// 11
// 12
// 13
// 14
