import React, { useState } from "react";
import { createNewAsset } from "../../api/AssetService";
import ConditionalAlert from "../CheckInUtilities/ConditionalAlert";
import { Form, Button, Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import "./AddAsset.css";

export default function AddAsset({ cats }) {
  const [category, setCategory] = useState(cats[0]?.category_id);
  const [advancedChecked, setAdvancedChecked] = useState(false);
  const [operationalChecked, setOperationalChecked] = useState(true);
  const [assetTag, setAssetTag] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [disabledState, setSubmitBtnDisabled] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [theme] = useOutletContext();

  const handleCatChange = (newVal) => {
    setCategory(newVal);
    setAlertMessage(null);
    setAlertType(null);
  };

  const handleSubmit = async () => {
    if (assetTag && name && description) {
      console.log("Passed Validation");
      setSubmitBtnDisabled(true);

      const advanced = advancedChecked ? 1 : 0;
      const operational = operationalChecked ? 1 : 0;

      try {
        const result = await createNewAsset(
          assetTag,
          name,
          description,
          category,
          operational,
          advanced
        );
        console.log(result);
        setAlertMessage("Asset has been Successfully Created!");
        setAlertType(3);
      } catch (err) {
        setAlertType(1);
        setAlertMessage("Failed to Create New Asset!");
        console.log(err);
      } finally {
        setSubmitBtnDisabled(false);
      }
    } else {
      console.log("All Fields required");
      setAlertType(1);
      setAlertMessage("All fields must be filled out to create an asset");
    }
  };

  return (
    <>
      <Row className="m-3">
        <ConditionalAlert type={alertType} message={alertMessage} />
      </Row>

      <div className="AddAsset">
        <Form>
          <Form.Group>
            <Form.Label>Asset Tag:</Form.Label>
            <Form.Control
              maxLength="20"
              type="text"
              id="assetTag"
              name="assetTag"
              onChange={(event) => setAssetTag(event.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              id="assetName"
              name="assetName"
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              rows="2"
              cols="50"
              id="description"
              name="description"
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Select Category:</Form.Label>
            <Form.Control
              as="select"
              defaultValue={cats[0].category_id}
              onChange={(event) => handleCatChange(event.target.value)}
            >
              {cats.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.catName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Advanced Status:</Form.Label>
            <Form.Check
              type="checkbox"
              id="advanced"
              onChange={() => setAdvancedChecked(!advancedChecked)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Operational Status:</Form.Label>
            <Form.Check
              type="checkbox"
              id="operational"
              onChange={() => setOperationalChecked(!operationalChecked)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
