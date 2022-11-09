import PageTemplate from "../../components/PageTemplate/PageTemplate";
import { useState } from "react";
import "./CheckInPage.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

export default function CheckInPage() {
  const [assets, setAssets] = useState([]);

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
              />
              <Button id="addAsset">Add</Button>
            </Form.Group>

            <Form.Group as={Col} controlID="studentId">
              <Form.Label>Student ID Number</Form.Label>
              <Form.Control
                className="search"
                type="search"
                placeholder="Enter Student ID Number"
              />
              <Button id="submitStudent">Submit</Button>
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
                {/* Figure out how to display each asset here as they are added */}
              </tbody>
            </Table>

            <Form.Group as={Row}>
              <Form.Label>Check In Notes</Form.Label>
              <Form.Control as="textarea" row={3} />
            </Form.Group>
          </Row>

          <Row className="m-3">
          <Form.Check type="switch" id="damageSwitch" label="Damaged?"/>
          </Row>

          <div className="m-3">
            <Button className="clearAll" type="reset">
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
