import PageTemplate from "../../components/PageTemplate/PageTemplate";
import { useEffect, useState } from "react";
import "./CheckInPage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { getSpecificAsset } from "../../api/AssetService";
import { getAssetsByUserID } from "../../api/CheckInServices";

export default function CheckInPage() {
  const [assets, setAssets] = useState([]);
  const [currentTag, setEnteredTag] = useState(null);
  const [studentID, setEnteredID] = useState(null);

  function handleIDChange(newValue){
    setEnteredID(newValue)
    console.log("input value: " + studentID);
  }

  function handleTagChange(newValue) {
    setEnteredTag(newValue);
    console.log("Input Value: " + currentTag);
  }

  function clearAll() {
    setAssets([]);
    console.log("Pending Assets Cleared");
    console.log(assets);
  }

  const handleTagPress = async (event) => {
    if (currentTag != null) {
      let currentList = assets;
      await getSpecificAsset(currentTag).then((result) => {
        const newAsset = result[0];
        if (newAsset) {
          currentList.push(newAsset);
        }
        else {
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
          setAssets(newAssets)
          console.log(newAssets);
        }
        else {
          console.log("User did not exist!");
        }
      });
      
    }
  };

  // re-render the assets table
  useEffect(() => {}, [assets]);

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
                onChange={(event => {handleTagChange(event.target.value)})}
              />
              <Button onClick={handleTagPress}>Add</Button>
            </Form.Group>

            <Form.Group as={Col} controlid="studentId">
              <Form.Label>Student ID Number</Form.Label>
              <Form.Control
                className="search"
                type="search"
                placeholder="Enter Student ID Number"
                onChange={(event => {handleIDChange(event.target.value)})}
              />
              <Button onClick={handleIDPress}>Submit</Button>
            </Form.Group>
          </Row>
          <Row className="m-3">
            <Table responsive>
              <caption>Selected Assets</caption>
              <thead>
                <tr>
                  <th>Remove</th>
                  <th>Tag</th>
                  <th>Name</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>{}</tr>
              </tbody>
            </Table>

            <Form.Group as={Row}>
              <Form.Label>Check In Notes</Form.Label>
              <Form.Control as="textarea" row={3} />
            </Form.Group>
          </Row>

          <Row className="m-3">
            <Form.Check type="switch" id="damageSwitch" label="Damaged?" />
          </Row>

          <div className="m-3">
            <Button className="clearAll" type="reset" onClick={clearAll}>
              Clear All
            </Button>
            <Button className="checkOut" variant="primary" type="submit">
              Check Out
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
