import "./RecordRow.css";

export default function CheckInRow(props) {
  const record = props.record;
  // declare functions and var from the parent for ipc
  const setShow = props.setShow;
  const setPrintInfo = props.setPrintInfo;

  const dueDate = new Date(record.due_date);

  function formatDate(input) {
    if (input != null) {
      const dateValues = input.split("T")[0];
      const [year, month, day] = dateValues.split("-");
      const formattedDate = [month, "/", day, "/", year];
      return formattedDate;
    } else {
      return input;
    }
  }

  const handleShow = () => {
    // Create the formatted information to be sent back to the parent for printing
    var output =
      "<table><tr><td>Student:</td><td>" +
      props.userName +
      "</td></tr><tr><td>Out Date:</td><td>" +
      formatDate(record.out_date) +
      "</td></tr><tr><td>Asset Name:</td><td>" +
      props.assetName +
      "</td></tr><tr><td>Due Date:</td><td>" +
      formatDate(record.due_date) +
      "</td></tr><tr><td>In Date:</td><td>" +
      formatDate(record.in_date) +
      "</td></tr><tr><td>Notes:</td><td>" +
      record.notes +
      "</td></tr></table>";
    setPrintInfo(output);
    setShow(true);
  };

  return (
    <tr
      style={{
        background: record.in_date === null ? (props.date > dueDate && !record.in_date ? "#ffb9b9" : "#55ff77") :  "",
      }}
      // On click, open the print modal with the clicked row's information
      onClick={handleShow}
    >
      <td>{props.userName}</td>
      <td>{record.student_id}</td>
      <td>{props.opName}</td>
      <td>{record.operator_id}</td>
      <td>{formatDate(record.out_date)}</td>
      <td>{record.asset_tag}</td>
      <td>{props.assetName}</td>
      <td>{formatDate(record.due_date)}</td>
      <td>{formatDate(record.in_date)}</td>
      <td>{record.notes}</td>
    </tr>
  );
}
