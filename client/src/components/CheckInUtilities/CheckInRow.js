import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import getAllCategories from "../../api/CategoryService";

export default function CheckInRow(props) {
  const asset = props.item;
  const [damaged, setDamaged] = useState(false);
  const [notes, setNotes] = useState(null);
  // const [categories, updateCategories] = useState([]);
  // const [dom, updateDom] = useState("Loading...");

  // useEffect(() => {
  //   getAllCategories()
  //     .then((value) => {
  //       updateCategories(value);
  //       return value;
  //     })
  //     .then(generateList)
  //     .then(updateDom)
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {}, [asset]);

  useEffect(() => {
    asset.operational = !damaged;
  }, [damaged]);
  
  useEffect(() => {
    asset.damage_notes = notes;
  }, [notes]);

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
      <td>{asset.category}</td>
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
    </tr>
  );
}
