import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
// import getAllRecords from "";

export default function CheckInRow(props) {
  const record = props.item;
  const [damaged, setDamaged] = useState(false);
  const [notes, setNotes] = useState(null);

  useEffect(() => {}, [record]);

  useEffect(() => {
    record.operational = !damaged;
  }, [damaged]);

  useEffect(() => {
    record.notes = notes;
  }, [notes]);

  function handleDamageChange(newVal) {
    setDamaged(!damaged);
  }

  function handleNotesChange(newNotes) {
    setNotes(newNotes);
  }

  return (
    <tr>
      <td>{record.record_tag}</td>
      <td>{record.name}</td>
      <td>{record.category}</td>
      <td>{record.due_date}</td>
    </tr>
  );
}
