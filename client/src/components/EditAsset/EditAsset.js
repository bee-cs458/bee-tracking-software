import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { editAsset } from "../../api/AssetService";
import { Form, Row, Col} from "react-bootstrap/esm/";

function EditAsset(props) {
  const {asset, cats, setAsset, setAlertType, setAlertMessage} = props;
  const [asset_tag, setTag] = useState(props.key);
  const [name, setName] = useState(asset.name);
  const [description, setDes] = useState(asset.description);
  const [damage_notes, setDamage] = useState(asset.damage_notes);
  const [category, setCategory] = useState(asset.category);
  const [operational, setOp] = useState(asset.operational);
  const [advanced, setAdvan] = useState(asset.advanced);

  async function handleSubmit() {
    let error = await editAsset(
      asset.asset_tag,
      asset_tag,
      name,
      description,
      damage_notes,
      category,
      operational,
      advanced
    ).then((res) => {
      if (res !== 404 && res !== 400) setAsset(
        Object.assign({}, asset, {
          asset_tag,
          name,
          description,
          damage_notes,
          category,
          operational,
          advanced,
        })
      );
      return res;
    });
    if (error === 404) {
      setAlertMessage("Error 404: The asset cannot be found in the database");
      setAlertType(0);
    } else if (error === 400) {
      setAlertMessage(
        "Error 400: Asset could not be updated. This is likey because the asset tag already exists on another asset."
      );
      setAlertType(0);
    } else {
      setAlertMessage("Asset has been updated with these changes!");
      setAlertType(3);
    }
  }

  function handleTagChange(newVal) {
    setTag(newVal);
    setAlertMessage(null);
    setAlertType(null);
    console.log(newVal);
  }

  function handleNameChange(newVal) {
    setName(newVal);
    setAlertMessage(null);
    setAlertType(null);
    console.log(newVal);
  }

  function handleDesChange(newVal) {
    setDes(newVal);
    setAlertMessage(null);
    setAlertType(null);
    console.log(newVal);
  }

  function handleDamageChange(newVal) {
    setDamage(newVal);
    setAlertMessage(null);
    setAlertType(null);
    console.log(newVal);
  }

  function handleCatChange(newVal) {
    setCategory(newVal);
    setAlertMessage(null);
    setAlertType(null);
    console.log(newVal);
  }

  function handleOpChange(newVal) {
    setOp(!operational);
    setAlertMessage(null);
    setAlertType(null);
    console.log(operational);
  }

  function handleAdvanChange(newVal) {
    setAdvan(!advanced);
    setAlertMessage(null);
    setAlertType(null);
    console.log(advanced);
  }

  return (
    <Form>
      <Row>
        <Form.Group as={Col} controlId="assetTag">
          <Form.Label>Asset Tag</Form.Label>
          <Form.Control
            className="text"
            type="text"
            defaultValue={asset.asset_tag}
            maxLength="20"
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
