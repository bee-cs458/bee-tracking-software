import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import minus from "../../assets/minus.png";

export default function CheckInRow(props) {
  const { asset, removeAsset, disabledButton, cats } = props;
  const [damaged, setDamaged] = useState(false);
  const [notes, setNotes] = useState(null);

  const handleRemove = (asset_tag) => {
    removeAsset(asset_tag);
  };

  useEffect(() => {}, [asset]);

  useEffect(() => {
    asset.operational = !damaged;
  }, [damaged, asset]);

  useEffect(() => {
    asset.notes = notes;
  }, [notes, asset]);

  function handleDamageChange(newVal) {
    setDamaged(!damaged);
  }

  function handleNotesChange(newNotes) {
    setNotes(newNotes);
  }

  return (
    <tr>
      <td>
        <Form.Check
          type="switch"
          id="damageSwitch"
          onChange={(event) => {
            handleDamageChange(event.target.value);
          }}
        />
      </td>
      <td>{asset.asset_tag}</td>
      <td>{asset.name}</td>
      <td>
        {cats.map((cat) =>
          cat.category_id === asset.category ? cat.catName : null
        )}
      </td>
      <td>{asset.due_date}</td>
      <td>
        <Form.Control
          className="damgeNotes"
          disabled={!damaged}
          onChange={(event) => {
            handleNotesChange(event.target.value);
          }}
        />
      </td>
      <td>
        <Button variant="danger">
          <img
            alt="minus"
            src={minus}
            width="25"
            disabled={disabledButton}
            onClick={() => {
              handleRemove(asset.asset_tag);
            }}
          />
        </Button>
      </td>
    </tr>
  );
}
