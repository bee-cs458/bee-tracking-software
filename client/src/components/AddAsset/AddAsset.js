import React, { useState } from "react";
import { createNewAsset } from "../../api/AssetService";
import ConditionalAlert from "../CheckInUtilities/ConditionalAlert";
import { Form, Button, Row } from "react-bootstrap";
import "./AddAsset.css";

export default function AddAsset({ categories }) {
  const [category, setCategory] = useState(categories[0]?.category_id);
  const [advancedChecked, setAdvancedChecked] = useState(false);
  const [operationalChecked, setOperationalChecked] = useState(true);
  const [assetTag, setAssetTag] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  // This function is called when a user changes the category they are interested in.
  // It updates the state variables for the category and clears any existing alert.
  const handleCatChange = (newVal) => {
    setCategory(newVal); // Sets the category state variable to the new value
    setAlertMessage(null); // Clears the alert message
    setAlertType(null); // Clears the alert type
  };

  /*
    Handles the submission of an asset creation form by checking if all 
    required fields have been filled out, disabling the submit button and 
    displaying a success message if all fields are filled out, creating the 
    asset, displaying a success message if the creation is successful, 
    displaying an error message if the creation fails, and resetting 
    the submit button to the default state.
  */
  const handleSubmit = async () => {
    // 1. Check if all required fields have been filled out
    if (assetTag && name && description) {
      // 2. Check if the user has selected advanced or operational and set the variable to 1 or 0
      const advanced = advancedChecked ? 1 : 0;
      const operational = operationalChecked ? 1 : 0;
      try {
        // 3. Create the Asset
        const result = await createNewAsset(
          assetTag,
          name,
          description,
          category,
          operational,
          advanced
        );
        console.log(result);
        // 4. Display a success message
        setAlertMessage("Asset has been Successfully Created!");
        setAlertType(3);
      } catch (err) {
        // 5. Display an error message if the asset creation fails
        setAlertType(1);
        setAlertMessage("Failed to Create New Asset!");
        console.log(err);
      } finally {
        // 6. Reset the assetTag, name, and description fields
        setAssetTag("");
        setName("");
        setDescription("");
      }
    } else {
      // 7. Display an error message if the user has not filled out all required fields
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
              defaultValue={categories[0].category_id}
              onChange={(event) => handleCatChange(event.target.value)}
            >
              {categories.map((cat) => (
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
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
