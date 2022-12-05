import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { editAsset } from "../../api/AssetService";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ConditionalAlert from "../CheckInUtilities/ConditionalAlert";

function EditAsset(props) {
  const asset = props.asset;
  const cats = props.cats;
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [tag, setTag] = useState(asset.asset_tag);
  const [name, setName] = useState(asset.name);
  const [des, setDes] = useState(asset.description);
  const [damage, setDamage] = useState(asset.damage_notes);
  const [category, setCategory] = useState(asset.category);
  const [op, setOp] = useState(asset.operational);
  const [advan, setAdvan] = useState(asset.advanced);

  function handleSubmit() {
    editAsset(asset.asset_tag, tag, name, des, damage, category, op, advan);
    setAlertType(3);
    setAlertMessage("Asset has been updated with these changes!");
  }

  function handleTagChange(newVal) {
    setTag(newVal);
    console.log(newVal);
  }

  function handleNameChange(newVal) {
    setName(newVal);
    console.log(newVal);
  }

  function handleDesChange(newVal) {
    setDes(newVal);
    console.log(newVal);
  }

  function handleDamageChange(newVal) {
    setDamage(newVal);
    console.log(newVal);
  }

  function handleCatChange(newVal) {
    setCategory(newVal);
    console.log(newVal);
  }

  function handleOpChange(newVal) {
    setOp(!op);
    console.log(op);
  }

  function handleAdvanChange(newVal) {
    setAdvan(!advan);
    console.log(advan);
  }

  return (
    <Form>
      <Row className="m-3">
        <ConditionalAlert
          type={alertType}
          message={alertMessage}
        ></ConditionalAlert>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="assetTag">
          <Form.Label>Asset Tag</Form.Label>
          <Form.Control
            className="text"
            type="text"
            defaultValue={asset.asset_tag}
            onChange={(event) => {
              handleTagChange(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="Name">
          <Form.Label>Asset Name</Form.Label>
          <Form.Control
            className="text"
            type="text"
            defaultValue={asset.name}
            onChange={(event) => {
              handleNameChange(event.target.value);
            }}
          />
        </Form.Group>
      </Row>
      <Form.Group as={Row} controlId="Description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          defaultValue={asset.description}
          onChange={(event) => {
            handleDesChange(event.target.value);
          }}
        />
      </Form.Group>
      <Form.Group as={Row} controlId="Damage Notes">
        <Form.Label>Damage Notes</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          defaultValue={asset.damage_notes}
          onChange={(event) => {
            handleDamageChange(event.target.value);
          }}
        />
      </Form.Group>
      <Row>
        <Form.Group as={Col} controlId="Category">
          <Form.Label>Category</Form.Label>
          <Form.Select
            defaultValue={asset.category}
            onChange={(event) => {
              handleCatChange(event.target.value);
            }}
          >
            {cats.map((cat) => (
              <option value={cat.category_id}>{cat.catName}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="Operational">
          <Form.Label>Operational</Form.Label>
          <Form.Check
            type="switch"
            id="opSwitch"
            defaultChecked={asset.operational}
            onChange={(event) => {
              handleOpChange(event.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="Advanced">
          <Form.Label>Advanced</Form.Label>
          <Form.Check
            type="switch"
            id="adSwitch"
            defaultChecked={asset.advanced}
            onChange={(event) => {
              handleAdvanChange(event.target.value);
            }}
          />
        </Form.Group>
      </Row>
      <Row>
        <Col></Col>
        <Col></Col>
        <Button as={Col} variant="primary" onClick={handleSubmit}>
          Submit Edit
        </Button>
      </Row>
    </Form>
  );
}

export default EditAsset;
