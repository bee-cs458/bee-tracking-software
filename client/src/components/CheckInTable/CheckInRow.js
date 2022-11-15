import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

export default function CheckInRow(props) {
  const asset = props.item;
  const [damaged, setDamaged] = useState(false);

  useEffect(() => {}, [asset]);

  function handleDamageChange(newVal) {
    setDamaged(!damaged);
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
      <td>{asset.category}</td>
      <td>{asset.due_date}</td>
      <td>
        <Form.Control className="damgeNotes" disabled={!damaged} />
      </td>
    </tr>
  );
}
