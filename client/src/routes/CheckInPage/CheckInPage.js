import PageTemplate from "../../components/PageTemplate/PageTemplate";
import { useEffect, useState } from "react";
import "./CheckInPage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getSpecificAsset } from "../../api/AssetService";
import { getAssetsByUserID } from "../../api/CheckInServices";
import CheckInTable from "../../components/CheckInTable/CheckInTable";

export default function CheckInPage() {
  const [assets, setAssets] = useState([]);
  const assetList = new Map();
  const [currentTag, setEnteredTag] = useState(null);
  const [studentID, setEnteredID] = useState(null);
  const [notes, setNotes] = useState("");

  function handleIDChange(newValue) {
    setEnteredID(newValue);
    console.log("input value: " + studentID);
  }

  function handleTagChange(newValue) {
    setEnteredTag(newValue);
    console.log("Input Value: " + currentTag);
  }

  function clearAll() {
    setAssets([]);
    setNotes("");
    assetList.clear() // potential replacement
    console.log("Pending Assets Cleared");
  }

  const handleTagPress = async (event) => {
    if (currentTag != null) {
      let currentList = assets;
      await getSpecificAsset(currentTag).then((result) => {
        const newAsset = result[0];
        if (newAsset) {
          currentList.push(newAsset);
          assetList.set(newAsset)
        } else {
          console.log("Asset did not exist!");
        }
      });
      console.log(currentList);
    }
  };

  const handleIDPress = async (event) => {
    if (studentID != null) {
      await getAssetsByUserID(studentID).then((result) => {
        const newAssets = result;
        if (newAssets) {
          setAssets(newAssets);
          console.log(newAssets);
        } else {
          console.log("User did not exist!");
        }
      });
    }
  };

  const handleSubmit = async (event) => {
    // Check there are assets
    // Check the assets exist
    // Check assets are checked out

    // set date in on records
    // add notes to records
    // add damage notes to assets
    // add damaged var to assets
    // if overdue, add strike to student
    // make assets available if not damaged
  };

  // re-render the assets table
  useEffect(() => {}, [assets, assetList, currentTag, studentID]);

  return (
    <div>
      <PageTemplate></PageTemplate>
      <div className="main-content">
        <h1 className="m-3">Check In Equipment</h1>
        <Form>
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
              <Form.Control as="textarea" row={3} />
            </Form.Group>
          </Row>

          <div className="m-3">
            <Button className="clearAll" type="reset" onClick={clearAll}>
              Clear All
            </Button>
            <Button className="checkIn" variant="primary" type="submit">
              Check In
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
